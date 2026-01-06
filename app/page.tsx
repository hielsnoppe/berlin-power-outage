"use client";

import dynamic from "next/dynamic";

// Dynamically import the Map component to prevent SSR issues
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <p>Loading Map...</p>,
});

export default function Home() {
  return (
    <main>
      <div className="relative z-10 p-4 bg-white shadow-md m-4 rounded-lg absolute top-0 left-0">
        <h1 className="text-xl text-gray-800 font-bold">Stromausfallkarte Steglitz-Zehlendorf Januar 2026</h1>
        <p className="text-sm text-gray-500">
          Klicke auf eine Straße, um sie als hell (Strom funktioniert) oder
          dunkel (kein Strom) zu markieren.
        </p>
      </div>
      <Map />
    </main>
  );
}
