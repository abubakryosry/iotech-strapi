"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { FaTwitter, FaFacebookF, FaGooglePlusG } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Footer() {
  // Dynamically get the current locale from the URL
  const params = useParams();
  const locale = params.locale === "ar" ? "ar" : "en";

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(
          locale === "ar"
            ? "يرجى إدخال عنوان بريد إلكتروني صالح"
            : "Please enter a valid email address"
        )
        .required(
          locale === "ar"
            ? "البريد الإلكتروني مطلوب"
            : "Email is required"
        ),
    }),
    onSubmit: (values, { resetForm }) => {
      setTimeout(() => {
        toast.success(
          locale === "ar"
            ? "تم الاشتراك بنجاح!"
            : "Subscribed successfully!"
        );
        resetForm();
      }, 1000);
    },
  });

  return (
    <footer
      className={`bg-brown text-white py-6 px-4 text-sm relative ${
        locale === "ar" ? "rtl" : "ltr"
      }`}
    >
      <ToastContainer />

      <div className="w-[80%] mx-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-end gap-6">
          <form
            onSubmit={formik.handleSubmit}
            className="relative w-full max-w-xs"
          >
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder={
                  locale === "ar" ? "البريد الإلكتروني" : "Email"
                }
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 pr-24 rounded-md text-black text-sm bg-white focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                disabled={!formik.isValid || !formik.dirty}
                className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 bg-brown text-white text-sm rounded-md hover:bg-brown/90 disabled:opacity-80 transition"
              >
                {locale === "ar" ? "اشترك" : "Subscribe"}
              </button>
            </div>

            {formik.touched.email && formik.errors.email && (
              <p className="text-red-300 mt-1 text-xs">{formik.errors.email}</p>
            )}
          </form>

          <div className="flex items-center gap-6">
            <span>{locale === "ar" ? "جهات الاتصال" : "Contacts"}</span>
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={locale === "ar" ? "تويتر" : "Twitter"}
              >
                <FaTwitter />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={locale === "ar" ? "فيسبوك" : "Facebook"}
              >
                <FaFacebookF />
              </a>
              <a
                href="mailto:example@gmail.com"
                aria-label={locale === "ar" ? "جيميل" : "Gmail"}
              >
                <FaGooglePlusG className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        <hr className="my-4 border-white/20" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs gap-2">
          <div
            className={`flex flex-wrap gap-4 justify-center ${
              locale === "ar" ? "md:justify-end" : "md:justify-start"
            }`}
          >
            <Link href="#">
              {locale === "ar" ? "عن الشركة" : "About"}
            </Link>
            <Link href="#">
              {locale === "ar" ? "استراتيجيتنا" : "Our Strategy"}
            </Link>
            <Link href="#">
              {locale === "ar" ? "مزايا" : "Our Advantages"}
            </Link>
            <Link href="#">
              {locale === "ar" ? "المسؤولية الاجتماعية" : "Social Responsibility"}
            </Link>
            <Link href="#">
              {locale === "ar" ? "خدماتنا" : "Our Services"}
            </Link>
          </div>
          <div className="text-white/70 mt-2 md:mt-0">
            © 2024.{" "}
            {locale === "ar" ? "جميع الحقوق محفوظة" : "All rights reserved."}
          </div>
        </div>
      </div>
    </footer>
  );
}
