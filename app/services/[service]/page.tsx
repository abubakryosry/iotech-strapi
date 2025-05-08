'use client';

import CoverImage from '@/app/[locale]/components/CoverImage';
import { useRouter } from 'next/navigation';
import React from 'react';
import NextImage from 'next/image';

const ServicePage = ({ params }: { params: Promise<{ service: string }> }) => {
  const router = useRouter();
  const unwrappedParams = React.use(params);

  if (!unwrappedParams) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  const serviceName = unwrappedParams.service.replace(/-/g, ' ');

  return (
    <>
      <CoverImage />
      <div className="relative min-h-screen">
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
            <button
              onClick={() => router.back()}
              className="text-brown flex items-center mb-4 text-lg font-medium"
            >
              <span className="mr-2">&larr;</span> Back
            </button>
            <h1 className="text-4xl font-bold mb-4 text-brown capitalize">{serviceName}</h1>
            <p className="text-lg leading-relaxed text-gray-500">
              Detailed information about {serviceName}. More content will be added here.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicePage;
