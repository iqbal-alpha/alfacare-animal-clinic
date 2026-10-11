import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabaseServer';
import { CASE_STUDIES } from '@/data/mockData';
import { CaseStudyItem } from '@/types';

interface SupabaseCaseStudyRow {
  id: string;
  slug: string;
  category: 'emergency' | 'dermatology' | 'dental' | 'inpatient';
  species: 'CAT' | 'DOG';
  pet_name: string;
  breed: string | null;
  age: string | null;
  before_image_url: string;
  after_image_url: string;
  veterinarian_name: string;
  veterinarian_title: string | null;
  recovery_duration_id: string;
  recovery_duration_en: string;
  title_id: string;
  title_en: string;
  clinical_summary_id: string;
  clinical_summary_en: string;
  owner_name: string;
  review_quote_id: string;
  review_quote_en: string;
  rating: number;
}

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();

    if (!supabase) {
      // Supabase credentials not set, serve verified local mock data
      return NextResponse.json({
        success: true,
        source: 'mock',
        data: CASE_STUDIES,
      });
    }

    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) {
        console.warn('[Supabase Cases Query Warning]', error.message);
      }
      return NextResponse.json({
        success: true,
        source: 'mock_fallback',
        data: CASE_STUDIES,
      });
    }

    const formattedCases: CaseStudyItem[] = (data as SupabaseCaseStudyRow[]).map((row) => ({
      id: row.id,
      slug: row.slug,
      category: row.category,
      species: row.species,
      petName: row.pet_name,
      breed: row.breed || '',
      age: row.age || '',
      beforeImageUrl: row.before_image_url,
      afterImageUrl: row.after_image_url,
      veterinarianName: row.veterinarian_name,
      veterinarianTitle: row.veterinarian_title || 'Spesialis Medis AlfaCare',
      recoveryDuration: {
        id: row.recovery_duration_id,
        en: row.recovery_duration_en,
      },
      title: {
        id: row.title_id,
        en: row.title_en,
      },
      clinicalSummary: {
        id: row.clinical_summary_id,
        en: row.clinical_summary_en,
      },
      ownerName: row.owner_name,
      ownerReviewQuote: {
        id: row.review_quote_id,
        en: row.review_quote_en,
      },
      rating: row.rating || 5,
    }));

    return NextResponse.json({
      success: true,
      source: 'supabase',
      data: formattedCases,
    });
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[API Route Cases Error]', errMsg);
    return NextResponse.json({
      success: true,
      source: 'mock_fallback_on_error',
      data: CASE_STUDIES,
    });
  }
}
