'use client';

import React from 'react';
import Link from 'next/link';

const serviceItems = [
  [
    "Legal Consultation Services",
    "Foreign Investment Services",
    "Contracts",
    "Notarization",
    "Insurance",
  ],
  [
    "..... and Defense in All Cases",
    "Banks and Financial Institutions",
    "Corporate Governance Services",
    "Companies Liquidation",
    "Internal Regulations for Companies",
  ],
  [
    "Services for Companies and Institutions",
    "Arbitration",
    "Intellectual Property",
    "Corporate Restructuring and Reorganization",
  ],
  [
    "Establishing National and Foreign Companies",
    "Commercial Agencies",
    "Supporting Vision 2030",
    "Estates",
  ],
];

const Services = () => {
  return (
    <div className="p-12 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-brown">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {serviceItems.map((group, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-lg transition transform hover:scale-105"
          >
            <ul className="space-y-3">
              {group.map((service, idx) => (
                <li key={idx}>
                  <Link
                    href={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block text-gray-700 text-lg font-medium hover:text-blue-600 transition"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
