'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type Language = {
  code: string;
  label: string;
};

const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const languages: Language[] = [
    { code: 'en', label: 'En' },
    { code: 'ar', label: 'Ar' },
  ];

  const changeLanguage = (lang: string) => {
    // Check if the current pathname already contains a language segment
    const newPath = pathname.replace(/^\/(en|ar)(\/|$)/, `/${lang}/`);
    
    // If no language segment exists, add it to the path
    const formattedPath = newPath.startsWith(`/${lang}`) ? newPath : `/${lang}${pathname}`;
  
    router.push(formattedPath);
    setIsOpen(false);
  };
  

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button 
        onClick={toggleDropdown} 
        className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Language
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 bg-white rounded shadow-lg">
          {languages.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => changeLanguage(code)}
              className="block px-3 py-2 w-full text-left hover:bg-gray-100 hover:text-brown"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
