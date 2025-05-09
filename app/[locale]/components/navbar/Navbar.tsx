"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Search, ChevronUp } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import LanguageSwitcher from "../LanguageSwitcher";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const selectedLanguage = useSelector((state: RootState) => state.language.language);
  const isRtl = selectedLanguage === "ar";
  if (!isHydrated) return null;
    const navLinks = [
    { label: selectedLanguage === "ar" ? "الرئيسية" : "Home", href: "/" },
    { label: selectedLanguage === "ar" ? "من نحن" : "About Us", href: "/about" },
    { label: selectedLanguage === "ar" ? "المدونة" : "Blog", href: `/${selectedLanguage}/blog/` },
    { label: selectedLanguage === "ar" ? "فريقنا" : "Our Team", href: `/${selectedLanguage}/team/` },
    { label: selectedLanguage === "ar" ? "اتصل بنا" : "Contact Us", href: `/${selectedLanguage}/contact/` },
  ];
  

  const serviceItems = [
    [
      selectedLanguage === "ar"
        ? "خدمات الاستشارات القانونية"
        : "Legal Consultation Services",
      selectedLanguage === "ar" ? "خدمات الاستثمار الأجنبي" : "Foreign Investment Services",
      selectedLanguage === "ar" ? "العقود" : "Contracts",
      selectedLanguage === "ar" ? "التوثيق" : "Notarization",
      selectedLanguage === "ar" ? "التأمين" : "Insurance",
    ],
    [
      selectedLanguage === "ar"
        ? "..... والدفاع في جميع القضايا"
        : "..... and Defense in All Cases",
      selectedLanguage === "ar"
        ? "البنوك والمؤسسات المالية"
        : "Banks and Financial Institutions",
      selectedLanguage === "ar"
        ? "خدمات الحوكمة"
        : "Corporate Governance Services",
      selectedLanguage === "ar" ? "تصفية الشركات" : "Companies Liquidation",
      selectedLanguage === "ar"
        ? "اللوائح الداخلية للشركات"
        : "Internal Regulations for Companies",
    ],
    [
      selectedLanguage === "ar"
        ? "خدمات الشركات والمؤسسات"
        : "Services for Companies and Institutions",
      selectedLanguage === "ar" ? "التحكيم" : "Arbitration",
      selectedLanguage === "ar" ? "الملكية الفكرية" : "Intellectual Property",
      selectedLanguage === "ar"
        ? "إعادة هيكلة الشركات وتنظيمها"
        : "Corporate Restructuring and Reorganization",
    ],
    [
      selectedLanguage === "ar"
        ? "تأسيس الشركات الوطنية والأجنبية"
        : "Establishing National and Foreign Companies",
      selectedLanguage === "ar" ? "الوكالات التجارية" : "Commercial Agencies",
      selectedLanguage === "ar" ? "دعم رؤية 2030" : "Supporting Vision 2030",
      selectedLanguage === "ar" ? "التركات" : "Estates",
    ],
  ];

  return (
    <header
      className={`w-full fixed z-50 text-lg transition-colors duration-300 ${
        servicesOpen ? "bg-brown" : "bg-transparent"
      }`}
    >
      <div
        className={`container mx-auto px-4 flex items-center justify-between text-white ${
          servicesOpen ? "py-4" : "py-8"
        }`}
      >
        {servicesOpen && (
          <div className="text-xl font-bold">
            <Link href="/">
              <Image src={"/logo.png"} alt="logo" width={100} height={100} />
            </Link>
          </div>
        )}

        {!showSearch && (
          <nav
          className={clsx(
            "hidden md:flex space-x-6 font-medium items-center absolute left-1/2 transform -translate-x-1/2",
            {
              "space-x-reverse": isRtl,
            }
          )}
        >
        
            {!servicesOpen && (
              <Link
              href={`/${selectedLanguage}/`}
                className="hover:text-primary transition mx-5 cursor-pointer"
              >
                {selectedLanguage === "ar" ? "الرئيسية" : "Home"}
              </Link>
            )}
            <Link
              href={`/${selectedLanguage}/about`}
              className="hover:text-primary transition mx-5 cursor-pointer"
            >
              {selectedLanguage === "ar" ? "من نحن" : "About Us"}
            </Link>

            <div className="relative text-center mx-0">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center space-x-1 focus:outline-none  cursor-pointer"
              >
                <span>{selectedLanguage === "ar" ? "الخدمات" : "Services"}</span>
                {servicesOpen && <ChevronUp size={16} />}
              </button>
            </div>

            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-primary transition mx-5 cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center justify-end flex-1 space-x-4">
          {showSearch ? (
            <div className="relative">
              <button
                onClick={() => setShowSearch(false)}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white"
              >
                <Search size={20} />
              </button>
              <input
                type="text"
                className="pl-8 pr-2 py-2 px-4 border rounded text-sm focus:outline-none bg-transparent transition md:w-80 text-white"
              />
            </div>
          ) : (
            <button onClick={() => setShowSearch(true)} className="text-white">
              <Search size={20} />
            </button>
          )}

          <Link
            href="/appointment"
            className={clsx(
              "border border-white text-white px-4 py-2 rounded-md hover:bg-white hover:text-brown text-sm transition",
              {
                "bg-brown": servicesOpen,
                "bg-transparent": !servicesOpen,
              }
            )}
          >
            {selectedLanguage === "ar" ? "حجز موعد" : "Book Appointment"}
          </Link>
          <LanguageSwitcher />
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {servicesOpen && (
        <div
        className={`absolute left-1/2 transform -translate-x-1/2 w-[95vw] p-6 bg-brown text-white rounded rounded-t-none z-50 ${
          isRtl ? "text-right" : "text-left"
        }`}
      >
      
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
      )}

      {menuOpen && (
        <div
          className={`md:hidden bg-white shadow-md border-t text-black ${
            selectedLanguage === "ar" ? "text-right" : "text-left"
          }`}
        >
          <nav className="flex flex-col space-y-3 p-4">
            {[...navLinks, { label: selectedLanguage === "ar" ? "الخدمات" : "Services", href: `/${selectedLanguage}/services` }].map(
              (link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-primary"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}