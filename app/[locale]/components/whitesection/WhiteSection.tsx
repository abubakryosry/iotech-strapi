"use client";

type WhiteSectionProps = {
  locale: string;
};

export default function WhiteSection({ locale }: WhiteSectionProps) {
  return (
    <section className="bg-white py-2">
      <div className="container mx-auto text-center">
      </div>
    </section>
  );
}