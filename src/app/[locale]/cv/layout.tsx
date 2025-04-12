"use client";

export default function CVLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div>      
      {/* Main content */}
      <div className="mt-6">
        {children}
      </div>
    </div>
  );
}
