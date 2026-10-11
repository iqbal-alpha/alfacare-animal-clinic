import { Resend } from 'resend';
import { AppointmentBooking } from '@/types';

const resendApiKey = process.env.RESEND_API_KEY?.trim();
const clinicEmail = process.env.NEXT_PUBLIC_CLINIC_EMAIL || 'care@alfacare.co.id';

export async function sendBookingNotifications(booking: AppointmentBooking) {
  if (!resendApiKey) {
    console.info(
      `[Email Notifier (Simulation)] RESEND_API_KEY not configured. Simulated confirmation email dispatched for booking ${booking.bookingCode} to ${booking.owner.email}`
    );
    return { success: true, simulated: true };
  }

  try {
    const resend = new Resend(resendApiKey);

    // 1. Send confirmation to pet owner
    const ownerEmailResult = await resend.emails.send({
      from: 'AlfaCare Animal Clinic <reservasi@alfacare.co.id>',
      to: [booking.owner.email],
      subject: `Konfirmasi Reservasi Medis: ${booking.bookingCode} - AlfaCare Jakarta`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; color: #1e293b;">
          <div style="background-color: #0c1e36; padding: 20px; border-radius: 6px; text-align: center; margin-bottom: 24px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 0.5px;">AlfaCare Animal Clinic Jakarta</h1>
            <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 13px;">Pusat Layanan Medis & Bedah Hewan Terpadu 24/7</p>
          </div>

          <h2 style="color: #0c1e36; font-size: 18px; margin-top: 0;">Halo, ${booking.owner.fullName}</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #475569;">
            Terima kasih telah mempercayakan perawatan anabul Anda kepada AlfaCare. Reservasi jadwal konsultasi dan tindakan medis Anda telah kami terima dalam sistem.
          </p>

          <div style="background-color: #f8fafc; border-left: 4px solid #10b981; padding: 16px; border-radius: 4px; margin: 20px 0;">
            <div style="font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: bold;">KODE TIKET RESERVASI</div>
            <div style="font-size: 22px; font-weight: 800; color: #0c1e36; letter-spacing: 1px; margin-top: 4px;">${booking.bookingCode}</div>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b; width: 40%;">Nama Pasien Pet</td>
              <td style="padding: 10px 0; font-weight: 600; color: #0f172a;">${booking.pet.name} (${booking.pet.species}, ${booking.pet.ageYears})</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b;">Layanan</td>
              <td style="padding: 10px 0; font-weight: 600; color: #0f172a;">${booking.serviceCategory}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b;">Tingkat Urgensi</td>
              <td style="padding: 10px 0; font-weight: 600; color: ${booking.urgencyLevel === 'EMERGENCY' ? '#dc2626' : '#0f172a'};">
                ${booking.urgencyLevel}
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b;">Jadwal Tanggal</td>
              <td style="padding: 10px 0; font-weight: 600; color: #0f172a;">${booking.appointmentDate}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b;">Waktu Kunjungan</td>
              <td style="padding: 10px 0; font-weight: 600; color: #0f172a;">${booking.timeSlot}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b;">Dokter Pilihan</td>
              <td style="padding: 10px 0; font-weight: 600; color: #0f172a;">${booking.preferredDoctor}</td>
            </tr>
          </table>

          <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 14px; margin: 24px 0; font-size: 13px; color: #1e40af;">
            <strong>Langkah Selanjutnya:</strong> Tim front-desk AlfaCare akan menghubungi Anda melalui WhatsApp di nomor <strong>${booking.owner.phoneWhatsApp}</strong> untuk verifikasi kedatangan dan arahan pra-tindakan.
          </div>

          <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-top: 32px; border-top: 1px solid #f1f5f9; padding-top: 16px;">
            AlfaCare Animal Clinic Jakarta &bull; Jl. Kemang Raya No. 42B, Jakarta Selatan &bull; Hotline: +62 21 5555 0199
          </p>
        </div>
      `,
    });

    // 2. Also send internal alert to clinic operations
    if (clinicEmail && clinicEmail !== booking.owner.email) {
      await resend.emails.send({
        from: 'AlfaCare System <sistem@alfacare.co.id>',
        to: [clinicEmail],
        subject: `[LEAD BARU] Reservasi ${booking.bookingCode} - ${booking.pet.name} (${booking.urgencyLevel})`,
        text: `Lead baru masuk:\nKode: ${booking.bookingCode}\nOwner: ${booking.owner.fullName} (${booking.owner.phoneWhatsApp})\nPet: ${booking.pet.name} (${booking.pet.species})\nLayanan: ${booking.serviceCategory}\nJadwal: ${booking.appointmentDate} ${booking.timeSlot}\nCatatan: ${booking.symptomsNotes || '-'}`,
      });
    }

    return { success: true, ownerEmailResult };
  } catch (error) {
    console.error('[Email Notifier] Failed to send email via Resend:', error);
    return { success: false, error };
  }
}
