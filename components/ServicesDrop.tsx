import React from 'react';

interface ServicesDropdownProps {
  servicesOpen: boolean;
  serviceItems: string[][];
}

const ServicesDropdown: React.FC<ServicesDropdownProps> = ({ servicesOpen, serviceItems }) => {
  if (!servicesOpen) return null;

  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 w-[95vw] p-6 bg-brown text-white rounded rounded-t-none z-50">
      <div className="max-w-7xl mx-auto flex flex-col justify-center pb-10 md:flex-row gap-16">
        {serviceItems.map((column, i) => (
          <div key={i} className="space-y-10 text-sm">
            {column.map((item, j) => (
              <div key={j} className="hover:underline cursor-pointer">
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesDropdown;
