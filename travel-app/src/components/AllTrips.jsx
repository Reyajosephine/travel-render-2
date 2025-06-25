import React, { useState } from "react";
import { FiMapPin, FiCalendar, FiUsers, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const dummyTrips = [
  {
    id: 1,
    title: "Bali Adventure",
    destination: "Bali, Indonesia",
    date: "March 15–22, 2025",
    image: "/assets/images/baliadventure.jpeg",
    spots: 3,
    category: "Adventure",
  },
  {
    id: 2,
    title: "Tokyo Explorer",
    destination: "Tokyo, Japan",
    date: "April 10–15, 2025",
    image: "/assets/images/Tokyo.jpeg",
    spots: 2,
    category: "City",
  },
  {
    id: 3,
    title: "Swiss Alps Trek",
    destination: "Switzerland",
    date: "May 20–30, 2025",
    image: "/assets/images/swissmount.jpeg",
    spots: 4,
    category: "Mountain",
  },
  {
    id: 4,
    title: "Paris Getaway",
    destination: "Paris, France",
    date: "June 5–10, 2025",
    image: "/assets/images/paris.jpeg",
    spots: 1,
    category: "City",
  },
  {
    id: 5,
    title: "Goa Beach Bash",
    destination: "Goa, India",
    date: "July 12–18, 2025",
    image: "/assets/images/goa.jpeg",
    spots: 5,
    category: "Beach",
  },
  {
    id: 6,
    title: "Amazon Rainforest Expedition",
    destination: "Amazon, Brazil",
    date: "August 1–14, 2025",
    image: "/assets/images/amazon.jpeg",
    spots: 2,
    category: "Adventure",
  },
];

const categories = [
  "All",
  ...Array.from(new Set(dummyTrips.map((t) => t.category))),
];

export default function AllTrips() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const filteredTrips = dummyTrips.filter((trip) => {
    const matchesCategory =
      selectedCategory === "All" || trip.category === selectedCategory;
    const matchesSearch =
      trip.title.toLowerCase().includes(search.toLowerCase()) ||
      trip.destination.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f4e3] to-[#f0d9b5] py-12 px-4 sm:px-8">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center mb-6 text-[#2c5e4a] hover:text-[#f87c6d] font-semibold text-base"
      >
        <FiArrowLeft className="mr-2" /> Back to Dashboard
      </button>
      <h2 className="text-4xl font-extrabold text-center text-[#2c5e4a] mb-8 tracking-tight drop-shadow-sm">
        All Trips
      </h2>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by title or destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-72 px-4 py-2 border border-[#d1c7b7] rounded-lg focus:ring-2 focus:ring-[#f8a95d] focus:border-[#f8a95d] outline-none text-[#5E5854] bg-white/90"
        />
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                selectedCategory === cat
                  ? "bg-[#f8d56b] text-[#2c5e4a]"
                  : "bg-white text-[#5E5854] border border-[#d1c7b7] hover:bg-[#f8f4e3]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredTrips.length === 0 ? (
          <div className="col-span-full text-center text-[#5E5854] text-lg py-12">
            No trips found.
          </div>
        ) : (
          filteredTrips.map((trip) => (
            <div
              key={trip.id}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-xl border border-[#d1c7b7] transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative h-56">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-3 left-3 bg-white/90 text-[#2c5e4a] text-sm font-semibold px-3 py-1 rounded-full shadow">
                  {trip.spots} Spots Left
                </div>
                <div className="absolute top-3 right-3 bg-[#f8d56b] text-[#2c5e4a] text-xs font-bold px-3 py-1 rounded-full shadow">
                  {trip.category}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-[#2c5e4a] mb-1 group-hover:text-[#f87c6d] transition-colors">
                  {trip.title}
                </h3>
                <p className="text-[#5E5854] text-sm flex items-center mb-1">
                  <FiMapPin className="mr-2" /> {trip.destination}
                </p>
                <p className="text-[#5E5854] text-sm flex items-center mb-1">
                  <FiCalendar className="mr-2" /> {trip.date}
                </p>
                <p className="text-[#5E5854] text-sm flex items-center">
                  <FiUsers className="mr-2" /> Group Travel
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
