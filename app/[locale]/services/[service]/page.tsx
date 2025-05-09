'use client';

import CoverImage from '@/app/[locale]/components/CoverImage';
import { useRouter } from 'next/navigation';
import React from 'react';
import NextImage from 'next/image';

const ServicePage = ({ params }: { params: Promise<{ locale: string; service: string }> }) => {
  const router = useRouter();
  const unwrappedParams = React.use(params);

  if (!unwrappedParams) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  const { locale, service } = unwrappedParams;
  const serviceName = service.replace(/-/g, ' ');

  return (
    <>
      <CoverImage />
      <div
        className={`relative min-h-screen ${locale === 'ar' ? 'text-right' : 'text-left'}`}
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
      >
        <NextImage
          src="/Bitmap.png"
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
          className="z-0"
          priority
        />

        {/* Main Content */}
        <div className="relative z-20 flex justify-center items-start h-screen">
          <div className="w-9/10 p-8">
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="text-brown flex items-center cursor-pointer mb-4 text-lg font-medium"
            >
              <span className="mr-2">&larr;</span> 
              {locale === 'ar' ? 'رجوع' : 'Back'}
            </button>

            {/* Service Title */}
            <h1 className="text-4xl font-bold mb-4 text-brown capitalize">
              {locale === 'ar' ? `خدمة: ${serviceName}` : `Service: ${serviceName}`}
            </h1>

            {/* Service Description */}
            <p className="text-lg leading-relaxed text-gray-500">
              {locale === 'ar'
                ? `تفاصيل عن خدمة ${serviceName}. سيتم إضافة المزيد من المحتوى هنا.`
                : `Detailed information about ${serviceName}. More content will be added here.`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicePage;
