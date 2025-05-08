'use client';

import React from 'react';

const Blog = () => {
  return (
    <div className="p-8 h-screen bg-gray-400 pt-18">
      <h1 className="text-4xl font-bold mb-4 text-brown">Our Blog</h1>
      <div className="space-y-6">
        {[1, 2, 3].map((post) => (
          <div key={post} className="p-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold">Blog Post {post}</h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse efficitur, 
              velit eu vehicula sollicitudin, felis lorem cursus justo, ac efficitur nulla orci sit amet erat.
            </p>
            <button className="mt-2 text-brown font-semibold hover:underline">Read More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
