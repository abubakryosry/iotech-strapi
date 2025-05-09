// app/[locale]/services/page.tsx
import React from 'react';
import CoverImage from '../components/CoverImage';
import { fetchServices } from '@/lib/api';

type Service = {
  id: number;
  title: string;
  description: string;
};

const ServicesPage = async ({ params }: { params: { locale: string } }) => {
  const locale = params.locale || 'en'; 

  
  const services = await fetchServices(locale);
  console.log("Fetched services:", services);

  return (
    <>
      <CoverImage />
      <div
        className={`p-12 min-h-screen bg-gray-100 ${locale === 'ar' ? 'text-right' : 'text-left'}`}
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
      >
        <h1 className="text-4xl font-extrabold mb-8 text-brown">
          {locale === 'ar' ? 'خدماتنا' : 'Our Services'}
        </h1>

        {services.length === 0 ? (
          <p className="text-gray-700">
            {locale === 'ar' ? 'لا توجد خدمات.' : 'No services found.'}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service : any) => (
              <div
                key={service.id}
                className="p-6 bg-white rounded-lg shadow-lg transition transform hover:scale-105"
              >
                <ul className="space-y-3">
                  <li>
                    <a
                      href={`/${locale}/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block text-gray-700 text-lg font-medium hover:text-blue-600 transition"
                    >
                      {service.title}
                    </a>
                  </li>
                  {service.description && (
                    <li className="text-gray-600">{service.description}</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ServicesPage;

// Enable dynamic params to support locales
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}
