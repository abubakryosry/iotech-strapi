
import React from "react";
import CoverImage from "../components/CoverImage";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

type Blog = {
  id: number;
  title: string;
  content: string;
};

async function fetchBlogs(locale: string): Promise<Blog[]> {
  const apiUrl = `${baseUrl}/api/blogs?locale=${locale}&populate=*`;

  try {
    const response = await fetch(apiUrl, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }
    const data = await response.json();

    return (
      data?.data?.map((blog: any) => ({
        id: blog.id,
        title: blog.title,
        content: blog.content,
      })) || []
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}


const BlogPage = async ({ params }: { params: { locale: string } }) => {
  const locale = params.locale || "en";
  const blogs = await fetchBlogs(locale);

  return (
    <>
    <CoverImage/>
    <div
      className={`p-8 h-screen bg-gray-100 pt-18 ${
        locale === "ar" ? "text-right" : "text-left"
      }`}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <h1 className="text-4xl font-bold mb-4 text-brown">
        {locale === "ar" ? "مدونتنا" : "Our Blog"}
      </h1>
      <div className="space-y-6">
        {blogs.length === 0 ? (
          <p className="text-gray-700">
            {locale === "ar" ? "لا توجد مقالات." : "No blog posts found."}
          </p>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="p-4 bg-white shadow-md rounded-md">
              <h2 className="text-2xl text-brown font-semibold">{blog.title}</h2>
              <p className="text-gray-700">{blog.content}</p>
            </div>
          ))
        )}
      </div>
    </div></>
  );
};

export default BlogPage;


export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}
