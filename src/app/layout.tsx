import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AlfaCare Animal Clinic Jakarta | Modern Veterinary & Emergency Lead Engine',
  description:
    'Klinik hewan modern & IGD darurat di Jakarta Selatan. Fasilitas bedah steril ISO, laboratorium darah on-site 20 menit, dan dokter berizin resmi SIPDH. Booking mudah via WhatsApp.',
  keywords: [
    'klinik hewan jakarta',
    'veterinary clinic jakarta',
    'dokter hewan jakarta selatan',
    'emergency vet jakarta 24 hours',
    'steril kucing jakarta',
    'scaling gigi anjing jakarta',
    'rawat inap hewan jakarta',
    'alfacare animal clinic',
  ],
  authors: [{ name: 'AlfaCare Animal Clinic' }],
  openGraph: {
    title: 'AlfaCare Animal Clinic Jakarta | Compassionate Care & Medical Precision',
    description:
      'Klinik hewan modern & IGD darurat di Jakarta. Hitung estimasi biaya transparan dan reservasi jadwal dokter tanpa antre.',
    url: 'https://alfacare.co.id',
    siteName: 'AlfaCare Animal Clinic Jakarta',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'AlfaCare Animal Clinic Jakarta',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VeterinaryCare',
    name: 'AlfaCare Animal Clinic',
    image: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=1000&q=80',
    '@id': 'https://alfacare.co.id',
    url: 'https://alfacare.co.id',
    telephone: '+62-21-5555-0199',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Senopati Raya No. 88, Kebayoran Baru',
      addressLocality: 'Jakarta Selatan',
      addressRegion: 'DKI Jakarta',
      postalCode: '12190',
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -6.230142,
      longitude: 106.812349,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '22:00',
      },
    ],
    medicalSpecialty: ['VeterinarySurgery', 'VeterinaryEmergencyMedicine', 'VeterinaryDentalCare'],
  };

  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
