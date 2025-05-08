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
      console.error(`Error fetching hero section: ${response.status} - ${response.statusText}`, errorText);
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
      console.error(`Error fetching clients: ${response.status} - ${response.statusText}`, errorText);
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
      console.error(`Error fetching teams: ${response.status} - ${response.statusText}`, errorText);
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
// contact
  interface ContactData {
    title: string;
    name: string;
    email: string;
    message: string;
    submit: string;
}

  export async function fetchContact(locale: string = 'en'): Promise<ContactData | null> {
    try {
        // Validate locale to ensure it's either 'en' or 'ar'
        const validLocale = ['en', 'ar'].includes(locale) ? locale : 'en';
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
        const url = `${baseUrl}/api/contacts?locale=${validLocale}`;

        console.log(`Fetching contact data from: ${url}`);
        
        const response = await fetch(url);

        if (!response.ok) {
            // Log the status and status text for better error tracing
            console.error(`Failed to fetch contact data (${validLocale}), Status: ${response.status} - ${response.statusText}`);
            throw new Error(`Failed to fetch contact data (${validLocale})`);
        }

        const { data } = await response.json();
        console.log("Fetched Contact Data:", data);

        // Check if data exists and has items
        if (Array.isArray(data) && data.length > 0) {
            const contact = data[0] || {};
            return {
                title: contact.title || 'Contact Us',
                name: contact.name || 'Name',
                email: contact.email || 'Email',
                message: contact.Message || 'Message',
                submit: validLocale === 'ar' ? 'إرسال' : 'Submit'
            };
        }

        console.warn(`No contact data found for locale: ${validLocale}`);
        return null;
    } catch (error) {
        // Improved error logging with specific details
        console.error(`Error fetching contact data for locale ${locale}: ${error instanceof Error ? error.message : String(error)}`);
        return null;
    }
}



  