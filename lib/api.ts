// hero
export async function fetchHeroSection() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

  // Construct the full API URL for the hero section
  const apiUrl = `${baseUrl}/api/hero-section?populate=*`;

  console.log("API URL being called:", apiUrl); // Log the API URL for debugging

  try {
    // Fetch data from the API
    const response = await fetch(apiUrl);

    if (!response.ok) {
      // Log the error response for debugging
      const errorText = await response.text();
      console.error(
        `Error fetching hero section: ${response.status} - ${response.statusText}`,
        errorText
      );
      throw new Error(`Failed to fetch hero section`);
    }

    const data = await response.json(); // Parse the JSON response
    console.log("Fetched hero section data:", data); // Debug fetched data

    // Extracting the video and image URLs
    const heroData = data?.data?.hero || [];
    const videos = heroData
      .filter((item: any) => item.mime.startsWith("video/"))
      .map((video: any) => `${baseUrl}${video.url}`);

    const images = heroData
      .filter((item: any) => item.mime.startsWith("image/"))
      .map((image: any) => `${baseUrl}${image.url}`);

    return { videos, images };
  } catch (error) {
    console.error("Network or other error:", error);
    throw error; // Re-throw the error to be handled higher up
  }
}

// testimonial
export async function fetchClients(locale: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

  // Construct the full API URL
  const apiUrl = `${baseUrl}/api/clients?locale=${locale}&populate=*`;

  console.log("API URL being called:", apiUrl); // Log the API URL for debugging

  try {
    // Fetch data from the API
    const response = await fetch(apiUrl);

    if (!response.ok) {
      // Log the error response for debugging
      const errorText = await response.text();
      console.error(
        `Error fetching clients: ${response.status} - ${response.statusText}`,
        errorText
      );
      throw new Error(`Failed to fetch clients for locale: ${locale}`);
    }

    const data = await response.json(); // Parse the JSON response
    console.log("Fetched data:", data); // Debug fetched data

    return data;
  } catch (error) {
    console.error("Network or other error:", error);
    throw error; // Re-throw the error to be handled higher up
  }
}
// teams
export async function fetchTeams(locale: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

  // Construct the full API URL
  const apiUrl = `${baseUrl}/api/teams?locale=${locale}&populate=*`;

  console.log("API URL being called:", apiUrl); // Log the API URL for debugging

  try {
    // Fetch data from the API
    const response = await fetch(apiUrl);

    if (!response.ok) {
      // Log the error response for debugging
      const errorText = await response.text();
      console.error(
        `Error fetching teams: ${response.status} - ${response.statusText}`,
        errorText
      );
      throw new Error(`Failed to fetch teams for locale: ${locale}`);
    }

    const data = await response.json(); // Parse the JSON response
    console.log("Fetched data:", data); // Debug fetched data

    return data;
  } catch (error) {
    console.error("Network or other error:", error);
    throw error; // Re-throw the error to be handled higher up
  }
}
// about
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

type AboutData = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export async function fetchAbout(locale: string): Promise<AboutData[]> {
  const apiUrl = `${baseUrl}/api/abouts?locale=${locale}&populate=*`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch about data for locale: ${locale}`);
    }
    const data = await response.json();

    // Format the data
    const formattedAbout: AboutData[] =
      data?.data?.map((item: any) => {
        const imageUrl = item?.attributes?.image?.data?.attributes?.url
          ? `${baseUrl}${item.attributes.image.data.attributes.url}`
          : "/image.png";

        return {
          id: item.id,
          title: item.attributes.title || "Title Here",
          description: item.attributes.description || "Description Here",
          image: imageUrl,
        };
      }) || [];

    return formattedAbout;
  } catch (error) {
    console.error("Error fetching about data:", error);
    return [];
  }
}
// blog
// app/api.ts

export async function fetchBlogs(locale: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
  const apiUrl = `${baseUrl}/api/blogs?locale=${locale}&populate=*`;

  try {
    const response = await fetch(apiUrl, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to fetch blogs for locale: ${locale}`);
    }
    const data = await response.json();
    return (
      data?.data?.map((blog: any) => ({
        id: blog.id,
        title: blog.attributes.title,
        content: blog.attributes.content,
      })) || []
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}
// services
export async function fetchServices(locale: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
  const apiUrl = `${baseUrl}/api/services?locale=${locale}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch services for locale: ${locale}`);
    }
    const data = await response.json();
    console.log("Fetched Data:", data); // Log the entire response data
    return (
      data?.data?.map((service: any) => ({
        id: service.id,
        title: service.serviceName,
        description: service.description || '',
      })) || []
    );
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}



// contact
interface ContactData {
  title: string;
  name: string;
  email: string;
  message: string;
  submit: string;
}

export async function fetchContact(
  locale: string = "en"
): Promise<ContactData | null> {
  try {
    // Validate locale to ensure it's either 'en' or 'ar'
    const validLocale = ["en", "ar"].includes(locale) ? locale : "en";
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
    const url = `${baseUrl}/api/contacts?locale=${validLocale}`;

    console.log(`Fetching contact data from: ${url}`);

    const response = await fetch(url);

    if (!response.ok) {
      // Log the status and status text for better error tracing
      console.error(
        `Failed to fetch contact data (${validLocale}), Status: ${response.status} - ${response.statusText}`
      );
      throw new Error(`Failed to fetch contact data (${validLocale})`);
    }

    const { data } = await response.json();
    console.log("Fetched Contact Data:", data);

    // Check if data exists and has items
    if (Array.isArray(data) && data.length > 0) {
      const contact = data[0] || {};
      return {
        title: contact.title || "Contact Us",
        name: contact.name || "Name",
        email: contact.email || "Email",
        message: contact.Message || "Message",
        submit: validLocale === "ar" ? "إرسال" : "Submit",
      };
    }

    console.warn(`No contact data found for locale: ${validLocale}`);
    return null;
  } catch (error) {
    // Improved error logging with specific details
    console.error(
      `Error fetching contact data for locale ${locale}: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    return null;
  }
}
