import React from "react";
import Image from "next/image";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

// Define the base URL for your API
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

// Type definition for team members
type TeamMember = {
  id: number;
  name: string;
  position: string;
  image: string;
};

// Server-side function to fetch team members based on locale
async function fetchTeams(locale: string): Promise<TeamMember[]> {
  const apiUrl = `${baseUrl}/api/teams?locale=${locale}&populate=*`;

  try {
    const response = await fetch(apiUrl, { cache: "no-store" }); // Ensure fresh data fetching
    if (!response.ok) {
      throw new Error(`Failed to fetch teams for locale: ${locale}`);
    }
    const data = await response.json();

    return (
      data?.data?.map((member: any) => {
        const imageUrl = member?.attributes?.image?.data?.attributes?.url
          ? `${baseUrl}${member.attributes.image.data.attributes.url}`
          : "/image.png";

        return {
          id: member.id,
          name: member.attributes.name || "Name Here",
          position: member.attributes.position || "Position Here",
          image: imageUrl,
        };
      }) || []
    );
  } catch (error) {
    console.error("Error fetching teams:", error);
    return [];
  }
}

// TeamsPage component
const TeamsPage = async ({ params }: { params: { locale: string } }) => {
  const locale = params.locale === "ar" ? "ar" : "en";

  // Fetch team data on the server
  const teams = await fetchTeams(locale);

  return (
    <section className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1
          dir={locale === "ar" ? "rtl" : "ltr"}
          className="text-4xl font-bold text-center mb-8 text-brown"
        >
          {locale === "ar" ? "فريق العمل" : "Our Team"}
        </h1>
        {teams.length === 0 ? (
          <p
            dir={locale === "ar" ? "rtl" : "ltr"}
            className="text-center text-gray-500"
          >
            {locale === "ar" ? "لا يوجد أعضاء" : "No team members found."}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teams.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition"
              >
                <div className="relative h-56 mb-4 rounded-md overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                    className="rounded-md"
                  />
                </div>
                <h3
                  dir={locale === "ar" ? "rtl" : "ltr"}
                  className="text-lg font-semibold text-brown text-center"
                >
                  {member.name}
                </h3>
                <p
                  dir={locale === "ar" ? "rtl" : "ltr"}
                  className="text-sm text-gray-500 text-center"
                >
                  {member.position}
                </p>
                <div className="flex justify-center gap-4 mt-3 text-brown text-lg">
                  <FaWhatsapp className="hover:text-green-500 transition" />
                  <FaPhoneAlt className="hover:text-blue-500 transition" />
                  <FaEnvelope className="hover:text-red-500 transition" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamsPage;