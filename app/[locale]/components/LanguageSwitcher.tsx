"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "@/app/redux/features/languageSlice";
import { RootState } from "@/app/redux/store";

type Language = {
  code: string;
  label: string;
};

const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const selectedLanguage = useSelector((state: RootState) => state.language.language);

  const languages: Language[] = [
    { code: "en", label: "en" },
    { code: "ar", label: "ar" },
  ];

  useEffect(() => {
    if (selectedLanguage) {
      // If language is already set in Redux, skip further logic
      return;
    }
  
    // Check localStorage for stored language
    const storedLang = localStorage.getItem("selectedLanguage");
    if (storedLang) {
      dispatch(setLanguage(storedLang));
      return;
    }
  
    // Check the URL path for a language code
    const currentLang = pathname.split("/")[1];
    const matchedLang = languages.find((lang) => lang.code === currentLang)?.label;
  
    // Set the language from URL or default to 'en'
    const defaultLang = matchedLang || "en";
    dispatch(setLanguage(defaultLang));
    localStorage.setItem("selectedLanguage", defaultLang);
  }, [pathname, dispatch, selectedLanguage]);  
  

  const changeLanguage = (lang: string, label: string) => {
    dispatch(setLanguage(label));
    localStorage.setItem("selectedLanguage", label);

    const newPath = pathname.replace(/^\/(en|ar)(\/|$)/, `/${lang}/`);
    const formattedPath = newPath.startsWith(`/${lang}`) ? newPath : `/${lang}${pathname}`;
    router.push(formattedPath);
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="px-3 py-1 text-black border border-white rounded-lg hover:bg-white hover:text-black transition"
      >
        {selectedLanguage || "Language"}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 bg-gray-300 rounded shadow-lg">
          {languages.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => changeLanguage(code, label)}
              className="block px-3 py-2 w-full text-left text-black hover:bg-white hover:text-black transition"
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
