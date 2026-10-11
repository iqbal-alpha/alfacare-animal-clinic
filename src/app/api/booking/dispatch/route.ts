import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabaseServer';
import { sendBookingNotifications } from '@/lib/emailNotifier';
import { AppointmentBooking } from '@/types';

export async function POST(request: Request) {
  try {
    const body: AppointmentBooking = await request.json();

    // Basic Validation
    if (!body.owner?.fullName || !body.owner?.phoneWhatsApp || !body.owner?.email) {
      return NextResponse.json(
        { success: false, message: 'Data kontak pemilik belum lengkap' },
        { status: 400 }
      );
    }

    if (!body.pet?.name || !body.pet?.species) {
      return NextResponse.json(
        { success: false, message: 'Data pasien hewan belum lengkap' },
        { status: 400 }
      );
    }

    if (!body.appointmentDate || !body.timeSlot || !body.serviceCategory) {
      return NextResponse.json(
        { success: false, message: 'Data jadwal atau layanan belum lengkap' },
        { status: 400 }
      );
    }

    const bookingCode =
      body.bookingCode ||
      `ALFA-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`;

    const supabase = getSupabaseServerClient();

    // Graceful Fallback if Supabase is not yet configured with valid credentials
    if (!supabase) {
      console.warn(
        `[Supabase Dispatch Warning] Supabase credentials not found in environment. Mocking successful persistence for code: ${bookingCode}`
      );

      // Still trigger simulated/real email notification
      await sendBookingNotifications({ ...body, bookingCode });

      return NextResponse.json({
        success: true,
        bookingCode,
        id: `mock-${Date.now()}`,
        isMock: true,
        message: 'Booking berhasil diterima (Mode Simulasi Lokal: Siap disambungkan ke Supabase)',
      });
    }

    // 1. Insert or reuse Owner
    const { data: existingOwner } = await supabase
      .from('owners')
      .select('id')
      .eq('email', body.owner.email.trim().toLowerCase())
      .maybeSingle();

    let ownerId = existingOwner?.id;

    if (!ownerId) {
      const { data: newOwner, error: ownerError } = await supabase
        .from('owners')
        .insert({
          full_name: body.owner.fullName.trim(),
          whatsapp_number: body.owner.phoneWhatsApp.trim(),
          email: body.owner.email.trim().toLowerCase(),
          preferred_locale: body.owner.preferredLocale || 'id',
          data_consent_approved: body.owner.dataConsentApproved ?? true,
        })
        .select('id')
        .single();

      if (ownerError) {
        console.error('[Supabase Error: owners insert]', ownerError);
        throw new Error(`Gagal menyimpan data pemilik: ${ownerError.message}`);
      }
      ownerId = newOwner.id;
    }

    // 2. Insert Pet
    const { data: newPet, error: petError } = await supabase
      .from('pets')
      .insert({
        owner_id: ownerId,
        name: body.pet.name.trim(),
        species: body.pet.species,
        breed: body.pet.breed?.trim() || null,
        age_years: body.pet.ageYears?.trim() || null,
        weight_class: body.pet.weightClass,
      })
      .select('id')
      .single();

    if (petError) {
      console.error('[Supabase Error: pets insert]', petError);
      throw new Error(`Gagal menyimpan data hewan: ${petError.message}`);
    }

    // 3. Insert Booking
    const { data: newBooking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        booking_code: bookingCode,
        pet_id: newPet.id,
        owner_id: ownerId,
        service_category: body.serviceCategory,
        service_code: body.serviceCode || null,
        urgency_level: body.urgencyLevel || 'ROUTINE',
        appointment_date: body.appointmentDate,
        time_slot: body.timeSlot,
        preferred_doctor: body.preferredDoctor || 'Dokter Jaga Standby',
        symptoms_notes: body.symptomsNotes?.trim() || null,
        estimated_cost_idr: body.estimatedCostIdr || null,
        status: 'PENDING_WHATSAPP',
        source_channel: 'WEB_FUNNEL',
      })
      .select('id, booking_code, created_at')
      .single();

    if (bookingError) {
      console.error('[Supabase Error: bookings insert]', bookingError);
      throw new Error(`Gagal menyimpan reservasi: ${bookingError.message}`);
    }

    // 4. Send Email Notification asynchronously
    try {
      await sendBookingNotifications({ ...body, bookingCode: newBooking.booking_code });
    } catch (emailErr) {
      console.error('[Email Dispatch Non-Blocking Error]', emailErr);
    }

    return NextResponse.json({
      success: true,
      bookingCode: newBooking.booking_code,
      id: newBooking.id,
      isMock: false,
      message: 'Booking berhasil tersimpan di Supabase',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    console.error('[API Route Booking Dispatch Error]', error);
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
