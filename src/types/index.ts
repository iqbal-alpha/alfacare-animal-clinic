export type Species = 'CAT' | 'DOG' | 'RABBIT' | 'BIRD_EXOTIC';

export type WeightClass =
  | 'FELINE_STANDARD'
  | 'CANINE_TOY_MINI'      // < 5 kg
  | 'CANINE_MEDIUM'        // 5 - 15 kg
  | 'CANINE_LARGE'         // 15 - 30 kg
  | 'CANINE_EXTRA_LARGE';  // > 30 kg

export type UrgencyLevel = 'ROUTINE' | 'URGENT' | 'EMERGENCY';

export type Locale = 'id' | 'en';

export interface PetPatient {
  id?: string;
  name: string;
  species: Species;
  breed?: string;
  ageYears: string;
  weightClass: WeightClass;
}

export interface OwnerContact {
  id?: string;
  fullName: string;
  phoneWhatsApp: string;
  email: string;
  preferredLocale: Locale;
  dataConsentApproved: boolean;
}

export interface AppointmentBooking {
  id?: string;
  bookingCode: string;
  pet: PetPatient;
  owner: OwnerContact;
  serviceCategory: string;
  serviceCode: string;
  urgencyLevel: UrgencyLevel;
  appointmentDate: string; // YYYY-MM-DD
  timeSlot: string;
  preferredDoctor: string;
  symptomsNotes?: string;
  estimatedCostIdr?: number;
  status: 'PENDING_WHATSAPP' | 'CONFIRMED_BY_ADMIN' | 'IN_TREATMENT' | 'COMPLETED' | 'CANCELLED';
  createdAt?: string;
}

export interface ServiceItem {
  code: string;
  category: 'CONSULTATION' | 'VACCINE' | 'STERILIZATION' | 'DENTAL' | 'INPATIENT' | 'DIAGNOSTIC' | 'LAB' | 'ADDON';
  nameId: string;
  nameEn: string;
  descriptionId: string;
  descriptionEn: string;
  basePriceIdr: number;
  basePriceUsd: number;
  appliesWeightMultiplier: boolean;
  requiresSpecies?: Species;
  emergencyEligible?: boolean;
}

export interface CaseStudyItem {
  id: string;
  slug: string;
  category: 'emergency' | 'dermatology' | 'dental' | 'inpatient';
  species: 'CAT' | 'DOG';
  title: Record<Locale, string>;
  petName: string;
  breed: string;
  age: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  veterinarianName: string;
  veterinarianTitle: string;
  recoveryDuration: Record<Locale, string>;
  clinicalSummary: Record<Locale, string>;
  ownerName: string;
  ownerReviewQuote: Record<Locale, string>;
  rating: number;
}
