import React from 'react';
import { fetchContact } from '@/lib/api';
import CoverImage from '@/app/[locale]/components/CoverImage';

interface ContactData {
    title: string;
    name: string;
    email: string;
    message: string;
    submit: string;
}

// Server-side function to fetch data
async function getContactData(locale: string): Promise<ContactData | null> {
    const currentLocale = (locale === 'ar' || locale === 'en') ? locale : 'en';
    return await fetchContact(currentLocale);
}

const Contact = async ({ params }: { params: { locale?: string } }) => {
    // Fetch the contact data on the server
    const contactData = await getContactData(params.locale ?? 'en');

    // Handle loading state (fallback UI)
    if (!contactData) return <p>Loading...</p>;

    return (
        <>
            <CoverImage />
            <div dir={params.locale === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
                <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-semibold text-brown mb-6">{contactData.title}</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-700">{contactData.name}</label>
                            <input
                                type="text"
                                name="name"
                                placeholder={contactData.name}
                                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-700">{contactData.email}</label>
                            <input
                                type="email"
                                name="email"
                                placeholder={contactData.email}
                                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-700">{contactData.message}</label>
                            <textarea
                                name="message"
                                placeholder={contactData.message}
                                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brown h-32 resize-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-brown text-white rounded-lg hover:bg-brown-dark focus:outline-none focus:ring-2 focus:ring-brown"
                        >
                            {contactData.submit}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Contact;
