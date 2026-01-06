"use client";

import {
  MapContainer,
  TileLayer,
  Polyline,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

// Fix for default Leaflet icons missing in React
import L from "leaflet";
// (Optional: Add logic here to fix marker icons if you use markers)

const supabase = createClient();

export default function StreetMap() {
  const [streets, setStreets] = useState<any[]>([]);

  // Fetch data from our SQL View
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("street_stats_decay") // Querying the View, not the raw table
        .select("*");

      if (data) setStreets(data);
      if (error) console.error(error);

      if (data) console.log("Fetched streets:", data.length);
    };

    fetchData();

    // Optional: Subscribe to realtime changes here
  }, []);

  const handleVote = async (streetId: number, type: "light" | "dark") => {
    const { error } = await supabase
      .from("votes")
      .insert({ street_id: streetId, vote_type: type });

    if (!error) {
      alert(`Voted ${type}! Refresh to see changes.`);
      // In a real app, you would optimistic update the UI here
    }
  };

  // Helper to determine color based on status
  const getColor = (status: string) => {
    switch (status) {
      case "light":
        return "#fbbf24"; // Amber/Yellow
      case "dark":
        return "#374151"; // Dark Gray
      default:
        return "#9ca3af"; // Neutral Gray
    }
  };

  return (
    <MapContainer
      center={[52.42794044299259, 13.19692827154347]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {streets.map((street) => {
        // Parse the PostGIS geometry (it usually comes as a GeoJSON object or WKB)
        // Note: Supabase can return GeoJSON directly if queried correctly,
        // or you might need a small parsing utility if it returns raw WKB.
        // For this example, we assume Supabase returns GeoJSON geometry.

        // Coordinates in Leaflet are [lat, lng], GeoJSON is [lng, lat]. We must flip them.
        const positions = street.geom.coordinates.map((coord: number[]) => [
          coord[1],
          coord[0],
        ]);

        return (
          <Polyline
            key={street.id}
            positions={positions}
            pathOptions={{ color: getColor(street.status), weight: 8 }}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold">{street.name}</h3>
                <div className="flex gap-2 mt-2">
                  <span className="border px-2 py-1 rounded text-xs">
                    💡 Strom: {street.light_score}
                  </span>
                  <span className="border px-2 py-1 rounded text-xs">
                    🌑 kein Strom: {street.dark_score}
                  </span>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleVote(street.id, "light")}
                    className="bg-yellow-400 px-2 py-1 rounded text-xs"
                  >
                    Als hell markieren
                  </button>
                  <button
                    onClick={() => handleVote(street.id, "dark")}
                    className="bg-gray-800 text-white px-2 py-1 rounded text-xs"
                  >
                    Als dunkel markieren
                  </button>
                </div>
              </div>
            </Popup>
          </Polyline>
        );
      })}
    </MapContainer>
  );
}
