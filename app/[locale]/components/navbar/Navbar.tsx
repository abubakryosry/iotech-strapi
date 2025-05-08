"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search, ChevronUp } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import LanguageSwitcher from "../LanguageSwitcher";

export default function Navbar({ locale }: { locale: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const navLinks = [
    { label: locale === "ar" ? "الرئيسية" : "Home", href: "/" },
    { label: locale === "ar" ? "من نحن" : "About Us", href: "/about" },
    { label: locale === "ar" ? "المدونة" : "Blog", href: "/blog" },
    { label: locale === "ar" ? "فريقنا" : "Our Team", href: "/team" },
    { label: locale === "ar" ? "اتصل بنا" : "Contact Us", href: "/contact" },
  ];

  const serviceItems = [
    [
      locale === "ar"
        ? "خدمات الاستشارات القانونية"
        : "Legal Consultation Services",
      locale === "ar" ? "خدمات الاستثمار الأجنبي" : "Foreign Investment Services",
      locale === "ar" ? "العقود" : "Contracts",
      locale === "ar" ? "التوثيق" : "Notarization",
      locale === "ar" ? "التأمين" : "Insurance",
    ],
    [
      locale === "ar"
        ? "..... والدفاع في جميع القضايا"
        : "..... and Defense in All Cases",
      locale === "ar"
        ? "البنوك والمؤسسات المالية"
        : "Banks and Financial Institutions",
      locale === "ar"
        ? "خدمات الحوكمة"
        : "Corporate Governance Services",
      locale === "ar" ? "تصفية الشركات" : "Companies Liquidation",
      locale === "ar"
        ? "اللوائح الداخلية للشركات"
        : "Internal Regulations for Companies",
    ],
    [
      locale === "ar"
        ? "خدمات الشركات والمؤسسات"
        : "Services for Companies and Institutions",
      locale === "ar" ? "التحكيم" : "Arbitration",
      locale === "ar" ? "الملكية الفكرية" : "Intellectual Property",
      locale === "ar"
        ? "إعادة هيكلة الشركات وتنظيمها"
        : "Corporate Restructuring and Reorganization",
    ],
    [
      locale === "ar"
        ? "تأسيس الشركات الوطنية والأجنبية"
        : "Establishing National and Foreign Companies",
      locale === "ar" ? "الوكالات التجارية" : "Commercial Agencies",
      locale === "ar" ? "دعم رؤية 2030" : "Supporting Vision 2030",
      locale === "ar" ? "التركات" : "Estates",
    ],
  ];

  return (
    <header
      className={`w-full fixed z-50 transition-colors duration-300 ${
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
                "space-x-reverse": locale === "ar",
              }
            )}
          >
            {!servicesOpen && (
              <Link
                href="/"
                className="hover:text-primary transition cursor-pointer"
              >
                {locale === "ar" ? "الرئيسية" : "Home"}
              </Link>
            )}
            <Link
              href="/about"
              className="hover:text-primary transition cursor-pointer"
            >
              {locale === "ar" ? "من نحن" : "About Us"}
            </Link>

            <div className="relative">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center space-x-1 focus:outline-none cursor-pointer"
              >
                <span>{locale === "ar" ? "الخدمات" : "Services"}</span>
                {servicesOpen && <ChevronUp size={16} />}
              </button>
            </div>

            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-primary transition cursor-pointer"
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
                placeholder={locale === "ar" ? "بحث..." : "Search..."}
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
            {locale === "ar" ? "حجز موعد" : "Book Appointment"}
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
            locale === "ar" ? "text-right" : "text-left"
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
            locale === "ar" ? "text-right" : "text-left"
          }`}
        >
          <nav className="flex flex-col space-y-3 p-4">
            {[...navLinks, { label: locale === "ar" ? "الخدمات" : "Services", href: "/services" }].map(
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