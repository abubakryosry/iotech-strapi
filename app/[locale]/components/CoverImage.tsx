'use client';

import React from 'react';

const CoverImage: React.FC = () => {
  return (
    <div className="h-[50vh] w-full overflow-hidden">
      <img
        src="/hero.png"
        alt="Cover Image"
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default CoverImage;
