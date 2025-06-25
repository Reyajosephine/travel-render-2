import React, { useState, useEffect } from "react";
import { useNavigate, Link, Routes, Route } from "react-router-dom"; // Add Link, Routes, Route import
import NotificationSystem from "./NotificationSystem";
import GroupChat from "./GroupChat";
import MemberProfiles from "./MemberProfiles";
import AllTrips from "./AllTrips"; // Import the new component (create this file)
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiX,
  FiMessageSquare,
  FiStar,
  FiEye,
  FiPlus,
  FiUser,
  FiCalendar,
  FiMapPin,
  FiDollarSign,
  FiUsers,
  FiTruck,
  FiEdit2,
  FiHeart,
  FiChevronLeft,
  FiChevronRight,
  FiMail,
  FiMenu,
  FiBell,
  FiLogOut,
  FiCamera,
  FiSearch,
  FiNavigation,
} from "react-icons/fi";
import { GiTrophy } from "react-icons/gi";
import axios from "axios";
import { useTrips } from "../context/TripsContext";

// Mock data for trips with enhanced structure
const mockTrips = [
  {
    id: 1,
    title: "Bali Adventure",
    destination: "Bali, Indonesia",
    duration: "7 days",
    price: "$1,200",
    image: "/assets/images/baliadventure.jpeg",
    spots: 3,
    maxSpots: 6,
    date: "March 15-22, 2025",
    organizer: "Sarah Chen",
    organizerId: "org_1",
    organizerAvatar: "/assets/images/sarachen.jpeg",
    tags: ["Beach", "Culture", "Adventure"],
    joinedMembers: [
      {
        id: "user_1",
        name: "Alex Rivera",
        avatar: "/assets/images/Alexrivera.jpeg",
        joinedDate: "2024-12-01",
      },
      {
        id: "user_2",
        name: "Maya Patel",
        avatar: "/assets/images/mayapatel.jpeg",
        joinedDate: "2024-12-03",
      },
      {
        id: "user_3",
        name: "Jordan Kim",
        avatar: "/assets/images/jordankim.jpeg",
        joinedDate: "2024-12-05",
      },
    ],
    description:
      "Explore the beautiful beaches and rich culture of Bali with fellow adventurers. Experience temple visits, beach relaxation, and local cuisine.",
  },
  {
    id: 2,
    title: "Tokyo Explorer",
    destination: "Tokyo, Japan",
    duration: "5 days",
    price: "$1,800",
    image: "/assets/images/Tokyo.jpeg",
    spots: 2,
    maxSpots: 4,
    date: "April 10-15, 2025",
    organizer: "Mike Johnson",
    organizerId: "org_2",
    organizerAvatar: "/assets/images/mikejohnson.jpeg",
    tags: ["City", "Food", "Culture"],
    joinedMembers: [
      {
        id: "user_4",
        name: "Sophie Chen",
        avatar: "/assets/images/sophiachen.jpeg",
        joinedDate: "2024-11-28",
      },
      {
        id: "user_5",
        name: "David Park",
        avatar: "/assets/images/davidpark.jpeg",
        joinedDate: "2024-12-02",
      },
    ],
    description:
      "Discover Tokyo's vibrant culture, amazing food scene, and modern attractions. From traditional temples to cutting-edge technology districts.",
  },
  {
    id: 3,
    title: "Swiss Alps Trek",
    destination: "Switzerland",
    duration: "10 days",
    price: "$2,500",
    image: "/assets/images/swissmount.jpeg",
    spots: 4,
    maxSpots: 8,
    date: "May 20-30, 2025",
    organizer: "Emma Wilson",
    organizerId: "org_3",
    organizerAvatar: "/assets/images/emmawilson.jpeg",
    tags: ["Mountains", "Hiking", "Nature"],
    joinedMembers: [
      {
        id: "user_6",
        name: "Carlos Rodriguez",
        avatar: "/assets/images/carlosrodriguez.jpeg",
        joinedDate: "2024-11-25",
      },
      {
        id: "user_7",
        name: "Lisa Zhang",
        avatar: "/assets/images/lisazhang.jpeg",
        joinedDate: "2024-11-30",
      },
      {
        id: "user_8",
        name: "Ahmed Hassan",
        avatar: "/assets/images/ahmedhassen.jpeg",
        joinedDate: "2024-12-01",
      },
      {
        id: "user_9",
        name: "Nina Kowalski",
        avatar: "/assets/images/ninakowalski.jpeg",
        joinedDate: "2024-12-04",
      },
    ],
    description:
      "Challenge yourself with breathtaking alpine hiking trails, stunning mountain vistas, and cozy mountain huts. Perfect for nature enthusiasts.",
  },
];

const completedTrips = [
  {
    id: 1,
    title: "Iceland Northern Lights",
    destination: "Reykjavik, Iceland",
    image: "/assets/images/icelandnorthernlights.jpeg",
    rating: 4.9,
    participants: 8,
    date: "December 2024",
  },
  {
    id: 2,
    title: "Santorini Sunset",
    destination: "Santorini, Greece",
    image: "/assets/images/santorinisunset.jpeg",
    rating: 4.8,
    participants: 6,
    date: "October 2024",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Alex Rodriguez",
    trip: "Bali Adventure",
    rating: 5,
    comment:
      "Amazing experience! Met incredible people and saw breathtaking places.",
    avatar: "/assets/images/Alexrivera.jpeg",
  },
  {
    id: 2,
    name: "Lisa Park",
    trip: "Tokyo Explorer",
    rating: 5,
    comment:
      "Perfect organization and wonderful travel companions. Highly recommend!",
    avatar: "/assets/images/lisazhang.jpeg",
  },
];

const popularDestinations = [
  {
    id: 1,
    name: "Paris, France",
    country: "France",
    visits: "2.3k",
    image: "/assets/images/paris.webp",
  },
  {
    id: 2,
    name: "New York, USA",
    country: "USA",
    visits: "1.8k",
    image: "/assets/images/newyork.jpeg",
  },
  {
    id: 3,
    name: "Dubai, UAE",
    country: "UAE",
    visits: "1.5k",
    image: "/assets/images/dubai.jpeg",
  },
  {
    id: 4,
    name: "London, UK",
    country: "UK",
    visits: "1.2k",
    image: "/assets/images/london.jpeg",
  },
];

function Profile({ user, onClose, onMessage, onPhotoClick }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-4xl w-full border border-[#d1c7b7] shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold text-[#2c5e4a]">Profile</h3>
          <button
            onClick={onClose}
            className="text-[#5E5854] hover:text-[#f87c6d] text-3xl font-bold"
          >
            <FiX />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <div className="flex flex-col items-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-[#f8d56b] object-cover mb-4 cursor-pointer"
                onClick={() => onPhotoClick(user.avatar)}
              />
              <h4 className="text-2xl font-bold text-[#2c5e4a]">
                {user.fullName || user.name}
              </h4>
              <p className="text-[#5E5854]">{user.location}</p>
              <button
                onClick={onMessage}
                className="mt-4 bg-gradient-to-r from-[#f8a95d] to-[#f87c6d] hover:from-[#f87c6d] hover:to-[#f8a95d] text-white px-6 py-2 rounded-full transition-colors font-cinzel flex items-center"
              >
                <FiMail className="mr-2" /> Message
              </button>
            </div>

            <div className="bg-[#f8f4e3] p-4 rounded-xl border border-[#d1c7b7]">
              <h4 className="font-bold text-[#2c5e4a] mb-3">
                Contact Information
              </h4>
              <div className="space-y-2 text-[#5E5854]">
                <p className="flex items-center">
                  <FiMail className="mr-2" /> {user.email}
                </p>
                <p className="flex items-center">
                  <FiUser className="mr-2" /> {user.phone}
                </p>
              </div>
            </div>

            <div className="bg-[#f8f4e3] p-4 rounded-xl border border-[#d1c7b7]">
              <h4 className="font-bold text-[#2c5e4a] mb-3">About Me</h4>
              <p className="text-[#5E5854]">{user.bio}</p>
            </div>
          </div>

          {/* Right Column - Photos and Trips */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-[#f8f4e3] p-4 rounded-xl border border-[#d1c7b7]">
              <h4 className="font-bold text-[#2c5e4a] mb-3">My Photos</h4>
              <div className="grid grid-cols-3 gap-4">
                {user.photos.map((photo, index) => (
                  <div
                    key={index}
                    className="aspect-square overflow-hidden rounded-lg cursor-pointer"
                    onClick={() => onPhotoClick(photo)}
                  >
                    <img
                      src={photo}
                      alt={`User photo ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#f8f4e3] p-4 rounded-xl border border-[#d1c7b7]">
              <h4 className="font-bold text-[#2c5e4a] mb-3">Upcoming Trips</h4>
              <div className="space-y-4">
                {(user.id === currentUserData.id
                  ? joinedTripsData
                  : mockTrips.filter((trip) =>
                      trip.joinedMembers.some((member) => member.id === user.id)
                    )
                ).map((trip) => (
                  <div
                    key={trip.id}
                    className="flex items-center bg-white p-3 rounded-lg border border-[#d1c7b7]"
                  >
                    <img
                      src={trip.image || "/assets/images/default-trip.jpg"}
                      alt={trip.title || trip.destination}
                      className="w-16 h-16 rounded-lg object-cover mr-4"
                    />
                    <div>
                      <h5 className="font-bold text-[#2c5e4a]">
                        {trip.title || trip.destination}
                      </h5>
                      <p className="text-sm text-[#5E5854]">
                        {trip.destination} •{" "}
                        {trip.date || `${trip.fromDate} - ${trip.toDate}`}
                      </p>
                    </div>
                  </div>
                ))}
                {user.id === currentUserData.id &&
                  joinedTripsData.length === 0 && (
                    <p className="text-[#5E5854] text-center py-4">
                      No upcoming trips
                    </p>
                  )}
                {user.id !== currentUserData.id &&
                  mockTrips.filter((trip) =>
                    trip.joinedMembers.some((member) => member.id === user.id)
                  ).length === 0 && (
                    <p className="text-[#5E5854] text-center py-4">
                      No upcoming trips
                    </p>
                  )}
              </div>
            </div>

            <div className="bg-[#f8f4e3] p-4 rounded-xl border border-[#d1c7b7]">
              <h4 className="font-bold text-[#2c5e4a] mb-3">The road so far</h4>
              <div className="grid grid-cols-2 gap-4">
                {completedTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="relative rounded-lg overflow-hidden h-32"
                  >
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-3">
                      <h5 className="text-white font-semibold text-sm">
                        {trip.title}
                      </h5>
                      <p className="text-white/80 text-xs">{trip.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Dashboard({ onLogout, currentUser, darkMode, setDarkMode }) {
  // --- STATE ---
  const [trips, setTrips] = useState([
    {
      id: 1,
      title: "Bali Adventure",
      destination: "Bali, Indonesia",
      duration: "7 days",
      price: "₹1200",
      image: "/assets/images/baliadventure.jpeg",
      spots: 3,
      maxSpots: 6,
      date: "2025-07-10",
      organizer: "Sarah Chen",
      organizerId: "org_1",
      organizerAvatar: "/assets/images/sarachen.jpeg",
      tags: ["Beach", "Culture", "Adventure"],
      joinedMembers: [
        {
          id: "user_1",
          name: "Alex Rivera",
          avatar: "/assets/images/Alexrivera.jpeg",
          joinedDate: "2024-12-01",
        },
        {
          id: "user_2",
          name: "Maya Patel",
          avatar: "/assets/images/mayapatel.jpeg",
          joinedDate: "2024-12-03",
        },
        {
          id: "user_3",
          name: "Jordan Kim",
          avatar: "/assets/images/jordankim.jpeg",
          joinedDate: "2024-12-05",
        },
      ],
      description:
        "Explore the beautiful beaches and rich culture of Bali with fellow adventurers. Experience temple visits, beach relaxation, and local cuisine.",
      genderPreference: "anyone",
      transport: "Flight",
    },
    {
      id: 2,
      title: "Tokyo Explorer",
      destination: "Tokyo, Japan",
      duration: "5 days",
      price: "₹1800",
      image: "/assets/images/Tokyo.jpeg",
      spots: 2,
      maxSpots: 4,
      date: "2025-08-15",
      organizer: "Mike Johnson",
      organizerId: "org_2",
      organizerAvatar: "/assets/images/mikejohnson.jpeg",
      tags: ["City", "Food", "Culture"],
      joinedMembers: [
        {
          id: "user_4",
          name: "Sophie Chen",
          avatar: "/assets/images/sophiachen.jpeg",
          joinedDate: "2024-11-28",
        },
        {
          id: "user_5",
          name: "David Park",
          avatar: "/assets/images/davidpark.jpeg",
          joinedDate: "2024-12-02",
        },
      ],
      description:
        "Discover Tokyo's vibrant culture, amazing food scene, and modern attractions. From traditional temples to cutting-edge technology districts.",
      genderPreference: "menOnly",
      transport: "Train",
    },
    {
      id: 3,
      title: "Swiss Alps Trek",
      destination: "Switzerland",
      duration: "10 days",
      price: "₹2500",
      image: "/assets/images/swissmount.jpeg",
      spots: 4,
      maxSpots: 8,
      date: "2025-09-20",
      organizer: "Emma Wilson",
      organizerId: "org_3",
      organizerAvatar: "/assets/images/emmawilson.jpeg",
      tags: ["Mountains", "Hiking", "Nature"],
      joinedMembers: [
        {
          id: "user_6",
          name: "Carlos Rodriguez",
          avatar: "/assets/images/carlosrodriguez.jpeg",
          joinedDate: "2024-11-25",
        },
        {
          id: "user_7",
          name: "Lisa Zhang",
          avatar: "/assets/images/lisazhang.jpeg",
          joinedDate: "2024-11-30",
        },
        {
          id: "user_8",
          name: "Ahmed Hassan",
          avatar: "/assets/images/ahmedhassen.jpeg",
          joinedDate: "2024-12-01",
        },
        {
          id: "user_9",
          name: "Nina Kowalski",
          avatar: "/assets/images/ninakowalski.jpeg",
          joinedDate: "2024-12-04",
        },
      ],
      description:
        "Challenge yourself with breathtaking alpine hiking trails, stunning mountain vistas, and cozy mountain huts. Perfect for nature enthusiasts.",
      genderPreference: "womenOnly",
      transport: "Bus",
    },
  ]);
  const [joinedTrips, setJoinedTrips] = useState([]); // array of trip ids
  const { joinedTripsData, setJoinedTripsData } = useTrips();
  const [showPostTrip, setShowPostTrip] = useState(false);
  const [newTrip, setNewTrip] = useState({
    destination: "",
    departure: "",
    fromDate: "",
    toDate: "",
    transport: "",
    currency: "INR",
    budget: "",
    numberOfPeople: 1,
    maxPeople: 1,
    genderPreference: "anyone",
    category: "",
    description: "",
    coverImage: null,
  });
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showTripDetails, setShowTripDetails] = useState(false);
  const [showGroupChat, setShowGroupChat] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMemberProfile, setShowMemberProfile] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showMemberProfiles, setShowMemberProfiles] = useState(false);
  const [selectedTripForMembers, setSelectedTripForMembers] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinedTripInfo, setJoinedTripInfo] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const navigate = useNavigate();

  // --- JOIN TRIP HANDLER ---
  const handleJoinTrip = async (tripId) => {
    if (!joinedTrips.includes(tripId)) {
      try {
        const tripObj = trips.find((t) => t.id === tripId);
        const response = await fetch("/api/joined-trips", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: currentUser.id, // or currentUser._id, depending on your user object
            tripId: tripId,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to join trip");
        }

        setJoinedTrips((prev) => [...prev, tripId]);
        setJoinedTripsData((prev) => [...prev, tripObj]);
        setShowJoinModal(true);
        setJoinedTripInfo(tripObj);

        // Add notification for joined trip
        setNotifications((prev) => [
          {
            id: Date.now(),
            type: "joined",
            title: `You joined: ${tripObj.title}`,
            trip: tripObj,
            date: new Date().toISOString(),
            read: false,
          },
          ...prev,
        ]);
      } catch (error) {
        alert("Error joining trip: " + error.message);
      }
    }

    // --- POST TRIP HANDLER ---
  };
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setNewTrip((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewTrip((prev) => ({ ...prev, coverImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handlePostTrip = (e) => {
    e.preventDefault();
    // You can add API call here if needed
    setShowPostTrip(false);
    // Optionally reset newTrip state
    setNewTrip({
      destination: "",
      departure: "",
      fromDate: "",
      toDate: "",
      transport: "",
      currency: "INR",
      budget: "",
      numberOfPeople: 1,
      maxPeople: 1,
      genderPreference: "anyone",
      category: "",
      description: "",
      coverImage: null,
    });
    navigate("/trips"); // or navigate to the dashboard or a trip details page
  };

  // --- FILTERED TRIPS FOR SEARCH ---
  const filteredTrips = trips.filter(
    (trip) =>
      trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (trip.tags &&
        trip.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
  );

  // --- TOGGLE NOTIFICATIONS HANDLER ---
  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleMarkNotificationAsRead = (notificationId) => {
    setNotifications(
      notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  // --- SHOW PROFILE HANDLER ---
  const handleShowProfile = () => {
    if (typeof navigate === "function") {
      navigate("/profile");
    } else {
      window.location.href = "/profile";
    }
    setMobileMenuOpen(false);
  };

  // --- VIEW TRIP HANDLER ---
  const handleViewTrip = (trip) => {
    setSelectedTrip(trip);
    setShowTripDetails(true);
  };

  // --- EFFECTS ---
  useEffect(() => {
    // Listen for notification action events
    const handleOpenGroupChat = (e) => {
      setSelectedTrip(e.detail);
      setShowGroupChat(true);
      setShowTripDetails(false);
      setShowNotifications(false);
    };
    const handleOpenTripDetails = (e) => {
      setSelectedTrip(e.detail);
      setShowTripDetails(true);
      setShowGroupChat(false);
      setShowNotifications(false);
    };
    window.addEventListener("openGroupChat", handleOpenGroupChat);
    window.addEventListener("openTripDetails", handleOpenTripDetails);
    return () => {
      window.removeEventListener("openGroupChat", handleOpenGroupChat);
      window.removeEventListener("openTripDetails", handleOpenTripDetails);
    };
  }, []);

  // Defensive effect: reset newTrip if undefined or null
  useEffect(() => {
    if (!newTrip || typeof newTrip !== "object") {
      setNewTrip({
        destination: "",
        departure: "",
        fromDate: "",
        toDate: "",
        transport: "",
        currency: "INR",
        budget: "",
        numberOfPeople: 1,
        maxPeople: 1,
        genderPreference: "anyone",
        category: "",
        description: "",
        coverImage: null,
      });
    }
  }, [showPostTrip]);

  // Replace all trip._id with trip.id in the JSX below
  // Replace all joinedTrips.includes(trip._id) with joinedTrips.includes(trip.id)
  // Replace all joinedTripsData logic to use trip.id
  // --- DUMMY LEADERBOARD DATA ---
  const leaderboardData = [
    {
      name: "Alex Rivera",
      tripsCompleted: 12,
      badge: "Jet Setter",
      topDestination: "Bali, Indonesia",
      points: 2450,
      rank: 1,
      profilePic: "/assets/images/Alexrivera.jpeg",
      memberSince: "Jan 2023",
    },
    {
      name: "Maya Patel",
      tripsCompleted: 10,
      badge: "Nomad Elite",
      topDestination: "Tokyo, Japan",
      points: 2100,
      rank: 2,
      profilePic: "/assets/images/mayapatel.jpeg",
      memberSince: "Mar 2023",
    },
    {
      name: "David Park",
      tripsCompleted: 8,
      badge: "Explorer",
      topDestination: "Swiss Alps",
      points: 1800,
      rank: 3,
      profilePic: "/assets/images/davidpark.jpeg",
      memberSince: "May 2023",
    },
    {
      name: "Lisa Zhang",
      tripsCompleted: 7,
      badge: "Adventurer",
      topDestination: "Santorini",
      points: 1600,
      rank: 4,
      profilePic: "/assets/images/lisazhang.jpeg",
      memberSince: "Jul 2023",
    },
    {
      name: "You",
      tripsCompleted: 5,
      badge: "Rising Star",
      topDestination: "Paris",
      points: 1200,
      rank: 5,
      profilePic: currentUser.avatar,
      memberSince: "Sep 2023",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#f8f4e3] to-[#f0d9b5]">
        {/* Header */}
        <header className="bg-gradient-to-r from-[#2c5e4a] to-[#1a3a2a] shadow-lg sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center relative">
                <div className="flex items-center">
                  <img
                    src="/assets/images/NomadNovalogo.jpg"
                    alt="NomadNova Logo"
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <h1 className="text-xl sm:text-2xl font-bold text-[#f8d56b]">
                    NomadNova
                  </h1>
                </div>
                {/* Make desktop links disappear on mobile */}
                <div className="hidden md:absolute md:left-[calc(100%+1rem)] md:whitespace-nowrap md:flex md:items-center md:h-full">
                  <a
                    href="#trips"
                    className="px-4 text-[#a8c4b8] hover:text-[#f8d56b] transition-colors font-cinzel text-base translate-y-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Trips
                  </a>
                  <a
                    href="#destinations"
                    className="px-4 text-[#a8c4b8] hover:text-[#f8d56b] transition-colors font-cinzel text-base translate-y-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Destinations
                  </a>
                  <a
                    href="#completed"
                    className="px-4 text-[#a8c4b8] hover:text-[#f8d56b] transition-colors font-cinzel text-base translate-y-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Completed
                  </a>
                </div>
              </div>
              {/* Trophy and Notification Icons */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate("/leaderboard")}
                  className="relative text-yellow-400 hover:text-yellow-500 focus:outline-none"
                >
                  <GiTrophy size={28} />
                </button>
                <NotificationSystem
                  notifications={notifications}
                  showNotifications={showNotifications}
                  onToggleNotifications={handleToggleNotifications}
                  onMarkAsRead={handleMarkNotificationAsRead}
                  onClearAll={handleClearAllNotifications}
                />
                <button
                  onClick={handleShowProfile}
                  className="flex items-center space-x-2 text-white transition-colors font-cinzel"
                >
                  <img
                    src={currentUser.avatar}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-[#f8d56b] object-cover"
                  />
                </button>
                <button
                  onClick={() => {
                    setShowPostTrip(true);
                    setMobileMenuOpen(false);
                  }}
                  className="bg-gradient-to-r from-[#f8a95d] to-[#f87c6d] hover:from-[#f87c6d] hover:to-[#f8a95d] text-white px-6 py-2 rounded-full transition-colors font-cinzel shadow-lg flex items-center"
                >
                  <FiPlus className="mr-1" />
                  Post Trip
                </button>
                <button
                  onClick={onLogout}
                  className="bg-[#5E5854] hover:bg-[#2c5e4a] text-white px-6 py-2 rounded-full transition-colors font-cinzel"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
              <div className="md:hidden bg-[#1a3a2a] py-4 px-2 rounded-b-lg">
                <nav className="flex flex-col space-y-3">
                  <a
                    href="#trips"
                    className="text-[#a8c4b8] hover:text-[#f8d56b] transition-colors font-cinzel py-2 px-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Trips
                  </a>
                  <a
                    href="#completed"
                    className="text-[#a8c4b8] hover:text-[#f8d56b] transition-colors font-cinzel py-2 px-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Completed
                  </a>
                  <a
                    href="#destinations"
                    className="text-[#a8c4b8] hover:text-[#f8d56b] transition-colors font-cinzel py-2 px-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Destinations
                  </a>
                  <hr className="border-[#2c5e4a]" />
                </nav>
              </div>
            )}
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
          {/* Welcome Section */}
          <section className="text-center bg-gradient-to-r from-[#6F93AD] to-[#4a708a] rounded-2xl p-4 sm:p-8 border border-[#5E5854] shadow-xl">
            <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 text-white">
              Welcome back, Traveler!
            </h2>
            <p className="font-southmind text-lg sm:text-xl text-white/90">
              Discover your next adventure with like-minded explorers
            </p>
          </section>

          {/* Available Trips Carousel */}
          <section id="trips" className="space-y-6 scroll-mt-24">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <h3 className="text-3xl font-bold text-[#2c5e4a]">
                Available Trips
              </h3>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                {/* Search Bar */}
                <div className="relative w-full sm:w-96">
                  <input
                    type="text"
                    placeholder="Search destinations, trip titles, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 pr-10 border border-[#d1c7b7] rounded-lg focus:ring-2 focus:ring-[#f8a95d] focus:border-[#f8a95d] focus:outline-none hover:border-[#f8a95d] text-[#5E5854] bg-white/90 backdrop-blur-sm"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#5E5854]">
                    <FiSearch className="w-5 h-5" />
                  </div>
                </div>
                {/* View All Trips Button */}
                <Link
                  to="/all-trips"
                  className="mt-2 sm:mt-0 sm:ml-3 inline-block px-4 py-2 rounded-lg bg-[#f8d56b] hover:bg-[#f87c6d] text-[#2c5e4a] hover:text-white font-semibold text-sm shadow transition-colors text-center"
                  style={{ minWidth: 120 }}
                >
                  View All Trips
                </Link>
              </div>
            </div>

            {/* No Results Message */}
            {filteredTrips.length === 0 && (
              <div className="text-center py-8 bg-white rounded-xl border border-[#d1c7b7]">
                <FiSearch className="w-12 h-12 mx-auto text-[#a8c4b8] mb-4" />
                <h4 className="text-xl font-bold text-[#2c5e4a] mb-2">
                  No trips found
                </h4>
                <p className="text-[#5E5854]">
                  Try adjusting your search terms or check back later for new
                  trips.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredTrips.map((trip, index) => (
                <div
                  key={trip.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#d1c7b7] shadow-lg transition-all duration-300 transform hover:scale-105 hover:z-10 hover:ring-2 hover:ring-[#f8a95d]"
                >
                  <div className="relative">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full h-40 sm:h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-to-r from-[#f8a95d] to-[#f87c6d] text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                        approx {trip.price}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 bg-gradient-to-b from-[#f8f4e3] to-[#f0d9b5]">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg sm:text-xl font-bold text-[#2c5e4a]">
                        {trip.title}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          joinedTrips.includes(trip.id)
                            ? "bg-[#f87c6d] text-white"
                            : "bg-[#f8d56b] text-[#2c5e4a]"
                        }`}
                      >
                        {joinedTrips.includes(trip.id) ? "JOINED" : "OPEN"}
                      </span>
                    </div>
                    <p className="text-[#2c5e4a] font-medium mb-2 flex items-center">
                      <FiMapPin className="mr-1" /> {trip.destination}
                    </p>
                    <p className="text-[#5E5854] mb-3 flex items-center">
                      <FiCalendar className="mr-1" /> {trip.duration} •{" "}
                      {trip.date}
                    </p>
                    <p className="text-[#5E5854] text-sm mb-3">
                      <span className="font-medium">Category:</span>{" "}
                      {trip.tags[0]}
                    </p>
                    <p className="text-[#5E5854] text-sm mb-3">
                      Organized by {trip.organizer}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {trip.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="bg-[#a8c4b8]/30 text-[#2c5e4a] px-2 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg"
                        >
                          {tag}
                        </span>
                      ))}
                      {trip.tags.length > 3 && (
                        <span className="bg-[#a8c4b8]/30 text-[#2c5e4a] px-2 py-1 rounded-full text-xs">
                          +{trip.tags.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[#2c5e4a] font-medium flex items-center text-sm">
                        <FiUsers className="mr-1" /> {trip.spots} spots
                      </span>
                      <div className="flex items-center text-[#2c5e4a]">
                        <FiStar className="mr-1" />
                        <span className="text-sm">4.8</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <button
                        onClick={() => handleViewTrip(trip)}
                        className="flex-1 bg-[#5E5854] hover:bg-[#2c5e4a] text-white px-4 py-2 rounded-full transition-colors font-cinzel flex items-center justify-center"
                      >
                        <FiEye className="mr-1" /> View
                      </button>
                      <button
                        onClick={() => handleJoinTrip(trip.id)}
                        disabled={joinedTrips.includes(trip.id)}
                        className={`flex-1 px-4 py-2 rounded-full transition-colors font-cinzel flex items-center justify-center ${
                          joinedTrips.includes(trip.id)
                            ? "bg-[#a8c4b8] text-[#2c5e4a] cursor-not-allowed"
                            : "bg-gradient-to-r from-[#f8a95d] to-[#f87c6d] hover:from-[#f87c6d] hover:to-[#f8a95d] text-white"
                        }`}
                      >
                        {joinedTrips.includes(trip.id) ? (
                          <>
                            <FiCheck className="mr-1" /> Joined
                          </>
                        ) : (
                          "Join Trip"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Add a section to display upcoming trips from joinedTripsData */}
          <section className="space-y-6 scroll-mt-24">
            <h3 className="text-2xl font-bold text-[#2c5e4a]">
              Upcoming Trips
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {(Array.isArray(joinedTripsData) ? joinedTripsData : []).map(
                (trip) => (
                  <div
                    key={trip.id}
                    className="bg-white rounded-xl overflow-hidden border border-[#d1c7b7] shadow-lg"
                  >
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="text-lg font-bold text-[#2c5e4a]">
                        {trip.title}
                      </h4>
                      <p className="text-[#5E5854]">{trip.destination}</p>
                      <p className="text-[#5E5854]">{trip.date}</p>
                    </div>
                  </div>
                )
              )}
              {Array.isArray(joinedTripsData) &&
                joinedTripsData.length === 0 && (
                  <p className="text-[#5E5854]">No upcoming trips yet.</p>
                )}
            </div>
          </section>

          {/* Enhanced Trip Details Modal */}
          {showTripDetails && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
              <div className="bg-gradient-to-br from-[#f8f4e3] to-[#f0d9b5] rounded-xl w-full max-w-4xl h-[90vh] shadow-2xl flex flex-col overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#2c5e4a] to-[#1a3a2a] p-4 sm:p-6 flex justify-between items-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {selectedTrip.title}
                  </h3>
                  <button
                    onClick={() => setShowTripDetails(false)}
                    className="p-2 hover:bg-[#f8d56b] rounded-full text-white hover:text-[#2c5e4a] transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                  {/* Modal Content */}
                  <div className="p-4 sm:p-6">
                    {/* Trip Image and Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="relative h-64 rounded-xl overflow-hidden">
                        <img
                          src={selectedTrip.image}
                          alt={selectedTrip.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="bg-gradient-to-r from-[#f8a95d] to-[#f87c6d] text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                            {selectedTrip.price}
                          </span>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-[#d1c7b7]">
                        <h4 className="font-bold text-[#2c5e4a] mb-3">
                          Trip Details
                        </h4>
                        <div className="space-y-2 text-[#5E5854]">
                          <p className="flex items-center">
                            <FiMapPin className="mr-2" />{" "}
                            <span className="font-medium">Destination:</span>{" "}
                            {selectedTrip.destination}
                          </p>
                          <p className="flex items-center">
                            <FiCalendar className="mr-2" />{" "}
                            <span className="font-medium">Duration:</span>{" "}
                            {selectedTrip.duration}
                          </p>
                          <p className="flex items-center">
                            <FiCalendar className="mr-2" />{" "}
                            <span className="font-medium">Dates:</span>{" "}
                            {selectedTrip.date}
                          </p>
                          <p className="flex items-center">
                            <FiUsers className="mr-2" />{" "}
                            <span className="font-medium">
                              Available Spots:
                            </span>{" "}
                            {selectedTrip.spots}/{selectedTrip.maxSpots}
                          </p>
                          <p className="flex items-center">
                            <FiStar className="mr-2" />{" "}
                            <span className="font-medium">Category:</span>{" "}
                            {selectedTrip.tags && selectedTrip.tags.length > 0
                              ? selectedTrip.tags[0]
                              : "Adventure"}
                          </p>
                          {selectedTrip.transport && (
                            <p className="flex items-center">
                              <FiNavigation className="mr-2" />{" "}
                              <span className="font-medium">Transport:</span>{" "}
                              {selectedTrip.transport}
                            </p>
                          )}
                          {/* Gender Preference */}
                          <p className="flex items-center">
                            <FiUsers className="mr-2" />{" "}
                            <span className="font-medium">
                              Gender Preference:
                            </span>
                            <span
                              className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                                selectedTrip.genderPreference === "womenOnly"
                                  ? "bg-pink-100 text-pink-700"
                                  : selectedTrip.genderPreference === "menOnly"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {selectedTrip.genderPreference === "womenOnly"
                                ? "Women Only"
                                : selectedTrip.genderPreference === "menOnly"
                                ? "Men Only"
                                : "Anyone Welcome"}
                            </span>
                          </p>
                          {/* Removed Trip Priority section */}
                        </div>
                      </div>
                    </div>

                    {/* Trip Description */}
                    <div className="bg-white p-4 rounded-xl border border-[#d1c7b7] mb-6">
                      <h4 className="font-bold text-[#2c5e4a] mb-3">
                        About This Trip
                      </h4>
                      <p className="text-[#5E5854]">
                        {selectedTrip.description ||
                          "No description available."}
                      </p>
                    </div>

                    {/* Trip Cost Breakdown and Map */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {/* Cost Breakdown */}
                      <div className="bg-white p-4 rounded-xl border border-[#d1c7b7]">
                        <h4 className="font-bold text-[#2c5e4a] mb-3">
                          Cost Breakdown
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center pb-2 border-b border-[#d1c7b7]">
                            <span className="text-[#5E5854]">Base Price</span>
                            <span className="font-medium text-[#2c5e4a]">
                              {selectedTrip.price}
                            </span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b border-[#d1c7b7]">
                            <span className="text-[#5E5854]">
                              Accommodation
                            </span>
                            <span className="font-medium text-[#2c5e4a]">
                              Included
                            </span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b border-[#d1c7b7]">
                            <span className="text-[#5E5854]">Activities</span>
                            <span className="font-medium text-[#2c5e4a]">
                              Included
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-2">
                            <span className="font-bold text-[#2c5e4a]">
                              Total Cost
                            </span>
                            <span className="font-bold text-[#f87c6d]">
                              approx {selectedTrip.price}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Google Map */}
                      <div className="bg-white p-4 rounded-xl border border-[#d1c7b7] h-full min-h-[200px]">
                        <h4 className="font-bold text-[#2c5e4a] mb-3">
                          Destination Map
                        </h4>
                        <div className="h-[calc(100%-2rem)] min-h-[150px] rounded-lg overflow-hidden border border-[#d1c7b7]">
                          <iframe
                            title={`Map of ${selectedTrip.destination}`}
                            className="w-full h-full"
                            frameBorder="0"
                            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
                              selectedTrip.destination
                            )}`}
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    </div>

                    {/* Trip Statistics */}
                    <div className="bg-white p-4 rounded-xl border border-[#d1c7b7] mb-6">
                      <h4 className="font-bold text-[#2c5e4a] mb-3">
                        Trip Statistics
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                        <div className="bg-[#f8f4e3] p-3 rounded-lg">
                          <p className="text-2xl font-bold text-[#f87c6d]">
                            {selectedTrip.maxSpots - selectedTrip.spots}
                          </p>
                          <p className="text-[#5E5854] text-sm">
                            Travelers Joined
                          </p>
                        </div>
                        <div className="bg-[#f8f4e3] p-3 rounded-lg">
                          <p className="text-2xl font-bold text-[#f87c6d]">
                            {selectedTrip.duration.split(" ")[0]}
                          </p>
                          <p className="text-[#5E5854] text-sm">Days</p>
                        </div>
                        <div className="bg-[#f8f4e3] p-3 rounded-lg">
                          <p className="text-2xl font-bold text-[#f87c6d]">
                            4.8
                          </p>
                          <p className="text-[#5E5854] text-sm">Rating</p>
                        </div>
                        <div className="bg-[#f8f4e3] p-3 rounded-lg">
                          <p className="text-2xl font-bold text-[#f87c6d]">
                            {selectedTrip.tags?.length || 0}
                          </p>
                          <p className="text-[#5E5854] text-sm">Categories</p>
                        </div>
                      </div>
                    </div>

                    {/* Trip Members */}
                    <div className="bg-white p-4 rounded-xl border border-[#d1c7b7] mb-6">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-bold text-[#2c5e4a]">
                          Trip Members
                        </h4>
                        <button
                          onClick={() => handleViewAllMembers(selectedTrip)}
                          className="text-[#f87c6d] hover:text-[#f8a95d] text-sm font-medium"
                        >
                          View All
                        </button>
                      </div>

                      {/* Organizer */}
                      <div className="mb-4">
                        <p className="text-[#5E5854] mb-2 text-sm">
                          Organizer:
                        </p>
                        <div className="flex items-center bg-[#f8f4e3] p-3 rounded-lg border border-[#d1c7b7]">
                          <img
                            src={
                              selectedTrip.organizerAvatar ||
                              "/assets/images/default-avatar.jpg"
                            }
                            alt={selectedTrip.organizer || "Trip Organizer"}
                            className="w-10 h-10 rounded-full object-cover mr-3 cursor-pointer"
                            onClick={() =>
                              handleViewMemberProfile({
                                id: selectedTrip.organizerId || "organizer_id",
                                name:
                                  selectedTrip.organizer || "Trip Organizer",
                                avatar:
                                  selectedTrip.organizerAvatar ||
                                  "/assets/images/default-avatar.jpg",
                                role: "organizer",
                              })
                            }
                          />
                          <div>
                            <h5 className="font-medium text-[#2c5e4a]">
                              {selectedTrip.organizer || "Trip Organizer"}
                            </h5>
                            <p className="text-xs text-[#5E5854]">
                              Trip Organizer
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Members Preview (showing only a few) */}
                      <div>
                        <p className="text-[#5E5854] mb-2 text-sm">
                          Members ({selectedTrip.joinedMembers?.length || 0}):
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {selectedTrip.joinedMembers
                            ?.slice(0, 4)
                            .map((member) => (
                              <div
                                key={member.id}
                                className="flex items-center bg-[#f8f4e3] p-3 rounded-lg border border-[#d1c7b7]"
                              >
                                <img
                                  src={member.avatar}
                                  alt={member.name}
                                  className="w-10 h-10 rounded-full object-cover mr-3 cursor-pointer"
                                  onClick={() =>
                                    handleViewMemberProfile(member)
                                  }
                                />
                                <div>
                                  <h5 className="font-medium text-[#2c5e4a]">
                                    {member.name}
                                  </h5>
                                  <p className="text-xs text-[#5E5854]">
                                    Joined {member.joinedDate}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>
                        {selectedTrip.joinedMembers?.length > 4 && (
                          <div className="mt-3 text-center">
                            <button
                              onClick={() => handleViewAllMembers(selectedTrip)}
                              className="text-[#f87c6d] hover:text-[#f8a95d] text-sm font-medium"
                            >
                              + {selectedTrip.joinedMembers.length - 4} more
                              members
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                      <button
                        onClick={() => setShowTripDetails(false)}
                        className="flex-1 bg-[#5E5854] hover:bg-[#2c5e4a] text-white py-3 rounded-xl transition-colors font-cinzel"
                      >
                        Close
                      </button>

                      {joinedTrips.includes(selectedTrip.id) ? (
                        <button
                          onClick={() => handleStartGroupChat()}
                          className="flex-1 bg-gradient-to-r from-[#f8a95d] to-[#f87c6d] hover:from-[#f87c6d] hover:to-[#f8a95d] text-white py-3 rounded-xl transition-colors font-cinzel flex items-center justify-center"
                        >
                          <FiMessageSquare className="mr-2" /> Group Chat
                        </button>
                      ) : (
                        <button
                          onClick={() => handleJoinTrip(selectedTrip.id)}
                          className="flex-1 bg-gradient-to-r from-[#f8a95d] to-[#f87c6d] hover:from-[#f87c6d] hover:to-[#f8a95d] text-white py-3 rounded-xl transition-colors font-cinzel"
                        >
                          Join Trip
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Completed Trips Section */}
          <section
            id="completed"
            className="space-y-4 sm:space-y-6 scroll-mt-24"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl sm:text-3xl font-bold text-[#2c5e4a]">
                The road so far
              </h3>
              <button
                onClick={() =>
                  navigate("/profile", { state: { activeTab: "memories" } })
                }
                className="text-[#f87c6d] hover:text-[#f8a95d] text-sm font-medium flex items-center"
              >
                View All <FiArrowRight className="ml-1" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {completedTrips.map((trip, index) => (
                <div
                  key={trip.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#d1c7b7] shadow-lg transition-all duration-300 transform hover:scale-105 hover:z-10 hover:ring-2 hover:ring-[#f8a95d]"
                  onClick={() => {
                    setSelectedTrip(trip);
                    setShowTripDetails(true);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div className="relative h-48 sm:h-64">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 sm:p-6">
                      <div className="flex items-center mb-2">
                        <span className="bg-[#f8d56b] text-[#2c5e4a] px-2 py-1 rounded-full text-xs font-bold">
                          Completed
                        </span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold text-white">
                        {trip.title}
                      </h4>
                      <p className="text-white/90">{trip.destination}</p>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-white flex items-center">
                          <FiCalendar className="mr-1" /> {trip.date}
                        </span>
                        <div className="flex items-center">
                          <span className="flex items-center text-white bg-black/30 px-2 py-1 rounded-full">
                            <FiStar className="text-[#f8d56b] mr-1" />{" "}
                            {trip.rating}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-white flex items-center text-sm">
                          <FiUsers className="mr-1" /> {trip.participants}{" "}
                          travelers
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/memories/${trip.id}`);
                          }}
                          className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm flex items-center backdrop-blur-sm transition-colors"
                        >
                          <FiCamera className="mr-1" /> The story behind the
                          stroll
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {completedTrips.length === 0 && (
                <div className="col-span-1 sm:col-span-2 bg-white p-6 rounded-xl border border-[#d1c7b7] text-center">
                  <div className="flex flex-col items-center justify-center py-8">
                    <FiMapPin className="w-12 h-12 text-[#a8c4b8] mb-4" />
                    <h4 className="text-xl font-bold text-[#2c5e4a] mb-2">
                      No Completed Trips Yet
                    </h4>
                    <p className="text-[#5E5854] mb-4">
                      Your completed trips will appear here.
                    </p>
                    <button
                      onClick={() => navigate("/trips")}
                      className="bg-gradient-to-r from-[#f8a95d] to-[#f87c6d] hover:from-[#f87c6d] hover:to-[#f8a95d] text-white px-4 py-2 rounded-full transition-colors font-cinzel"
                    >
                      Explore Trips
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-3xl font-bold text-[#2c5e4a]">
              Chronicles of Nomads
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-2xl p-4 sm:p-6 border border-[#d1c7b7] shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#f8d56b] mr-3 sm:mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-[#2c5e4a]">
                        {testimonial.name}
                      </h4>
                      <p className="text-[#5E5854] text-xs sm:text-sm">
                        {testimonial.trip}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`${
                          i < testimonial.rating
                            ? "text-[#f8d56b] fill-[#f8d56b]"
                            : "text-gray-300"
                        } w-4 h-4 sm:w-5 sm:h-5`}
                      />
                    ))}
                  </div>
                  <p className="text-[#5E5854] text-sm sm:text-base">
                    {testimonial.comment}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Popular Destinations Section */}
          <section
            id="destinations"
            className="space-y-4 sm:space-y-6 scroll-mt-24"
          >
            <h3 className="text-xl sm:text-3xl font-bold text-[#2c5e4a]">
              Popular Destinations
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {popularDestinations.map((destination) => (
                <div
                  key={destination.id}
                  className="relative rounded-xl overflow-hidden h-40 sm:h-56 group cursor-pointer"
                  onClick={() => handleDestinationClick(destination)}
                >
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-3 sm:p-4">
                    <h4 className="text-white font-bold text-sm sm:text-lg">
                      {destination.name}
                    </h4>
                    <p className="text-white/80 text-xs sm:text-sm">
                      {destination.country}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Post Trip Modal */}
          {showPostTrip && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
              <div className="bg-gradient-to-br from-[#f8f4e3] to-[#f0d9b5] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Modal Header with Close Button */}
                <div className="sticky top-0 bg-gradient-to-r from-[#2c5e4a] to-[#1a3a2a] z-10 flex justify-between items-center p-4 border-b border-[#5E5854]">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Post a New Trip
                  </h3>
                  <button
                    onClick={() => setShowPostTrip(false)}
                    className="text-white hover:text-[#f8d56b] p-2 rounded-full"
                  >
                    <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>

                {/* Form Content */}
                <form className="p-4 sm:p-6" onSubmit={handlePostTrip}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[#5E5854] font-medium mb-2">
                        Destination<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="destination"
                        value={newTrip.destination}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-[#d1c7b7] rounded-lg focus:ring-1 focus:ring-[#f8a95d] focus:border-[#f8a95d] focus:outline-none hover:border-[#f8a95d] text-[#5E5854]"
                        placeholder="e.g. Bali, Indonesia"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[#5E5854] font-medium mb-2">
                        Departure From<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="departure"
                        value={newTrip.departure}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-[#d1c7b7] rounded-lg focus:ring-1 focus:ring-[#f8a95d] focus:border-[#f8a95d] focus:outline-none hover:border-[#f8a95d] text-[#5E5854]"
                        placeholder="e.g. New York, USA"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[#5E5854] font-medium mb-2">
                        From<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="fromDate"
                        value={newTrip.fromDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-[#d1c7b7] rounded-lg focus:ring-1 focus:ring-[#f8a95d] focus:border-[#f8a95d] focus:outline-none hover:border-[#f8a95d] text-[#5E5854]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[#5E5854] font-medium mb-2">
                        To<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="toDate"
                        value={newTrip.toDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-[#d1c7b7] rounded-lg focus:ring-1 focus:ring-[#f8a95d] focus:border-[#f8a95d] focus:outline-none hover:border-[#f8a95d] text-[#5E5854]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[#5E5854] font-medium mb-2">
                        Transport<span className="text-red-500">*</span>
                      </label>
                      <select
                        name="transport"
                        value={newTrip.transport}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-[#d1c7b7] rounded-lg focus:ring-1 focus:ring-[#f8a95d] focus:border-[#f8a95d] focus:outline-none hover:border-[#f8a95d] text-[#5E5854]"
                        required
                      >
                        <option value="">Select transport</option>
                        <option value="Flight">Flight</option>
                        <option value="Train">Train</option>
                        <option value="Bus">Bus</option>
                        <option value="Car">Car</option>
                        <option value="Cruise">Cruise</option>
                        <option value="Multiple">Multiple</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#5E5854] font-medium mb-2">
                        Budget<span className="text-red-500">*</span>
                      </label>
                      <div className="flex space-x-2">
                        <select
                          name="currency"
                          value={newTrip.currency}
                          onChange={handleInputChange}
                          className="w-24 px-2 py-2 border border-[#d1c7b7] rounded-lg focus:ring-1 focus:ring-[#f8a95d] focus:border-[#f8a95d] focus:outline-none hover:border-[#f8a95d] text-[#5E5854]"
                          required
                        >
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                          <option value="GBP">GBP</option>
                          <option value="JPY">JPY</option>
                          <option value="AUD">AUD</option>
                          <option value="CAD">CAD</option>
                          <option value="CHF">CHF</option>
                          <option value="CNY">CNY</option>
                          <option value="INR">INR</option>
                          <option value="SGD">SGD</option>
                        </select>
                        <input
                          type="number"
                          name="budget"
                          value={newTrip.budget}
                          onChange={handleInputChange}
                          className="flex-1 px-4 py-2 border border-[#d1c7b7] rounded-lg focus:ring-1 focus:ring-[#f8a95d] focus:border-[#f8a95d] focus:outline-none hover:border-[#f8a95d] text-[#5E5854]"
                          placeholder="Enter amount"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[#5E5854] font-medium mb-2">
                        Current Number of People
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="numberOfPeople"
                        value={
                          newTrip.numberOfPeople === 0
                            ? ""
                            : newTrip.numberOfPeople
                        }
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-[#d1c7b7] rounded-lg focus:ring-1 focus:ring-[#f8a95d] focus:border-[#f8a95d] focus:outline-none hover:border-[#f8a95d] text-[#5E5854]"
                        placeholder="e.g. 2"
                        min="1"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[#5E5854] font-medium mb-2">
                        Max People<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="maxPeople"
                        value={newTrip.maxPeople === 0 ? "" : newTrip.maxPeople}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-[#d1c7b7] rounded-lg focus:ring-1 focus:ring-[#f8a95d] focus:border-[#f8a95d] focus:outline-none hover:border-[#f8a95d] text-[#5E5854]"
                        placeholder="e.g. 6"
                        min="1"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#5E5854] font-medium mb-2">
                      Comfortable with
                    </label>
                    <div className="flex flex-wrap gap-3">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="genderPreference"
                          value="anyone"
                          checked={newTrip.genderPreference === "anyone"}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            newTrip.genderPreference === "anyone"
                              ? "bg-[#2c5e4a] text-white"
                              : "bg-[#f8f4e3] text-[#5E5854] hover:bg-[#f0d9b5]"
                          }`}
                        >
                          Male
                        </span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="genderPreference"
                          value="menOnly"
                          checked={newTrip.genderPreference === "menOnly"}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            newTrip.genderPreference === "menOnly"
                              ? "bg-[#2c5e4a] text-white"
                              : "bg-[#f8f4e3] text-[#5E5854] hover:bg-[#f0d9b5]"
                          }`}
                        >
                          Female
                        </span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="genderPreference"
                          value="womenOnly"
                          checked={newTrip.genderPreference === "womenOnly"}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            newTrip.genderPreference === "womenOnly"
                              ? "bg-[#2c5e4a] text-white"
                              : "bg-[#f8f4e3] text-[#5E5854] hover:bg-[#f0d9b5]"
                          }`}
                        >
                          Couple
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#5E5854] font-medium mb-2">
                      Trip Category<span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={newTrip.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[#d1c7b7] rounded-lg focus:ring-1 focus:ring-[#f8a95d] focus:border-[#f8a95d] focus:outline-none hover:border-[#f8a95d] text-[#5E5854]"
                      required
                    >
                      <option value="">Select category</option>
                      <option value="Adventure">Adventure</option>
                      <option value="Beach">Beach</option>
                      <option value="City">City</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Mountain">Mountain</option>
                      <option value="Road Trip">Road Trip</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#5E5854] font-medium mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={newTrip.description}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[#d1c7b7] rounded-lg focus:ring-1 focus:ring-[#f8a95d] focus:border-[#f8a95d] focus:outline-none hover:border-[#f8a95d] text-[#5E5854] min-h-[100px]"
                      placeholder="Describe your trip..."
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#5E5854] font-medium mb-2">
                      Trip Cover Image
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          id="trip-cover-image"
                        />
                        <label
                          htmlFor="trip-cover-image"
                          className="flex items-center justify-center w-full px-4 py-2 border border-[#d1c7b7] rounded-lg bg-white hover:bg-[#f8f4e3] text-[#5E5854] cursor-pointer transition-colors"
                        >
                          <FiCamera className="mr-2" />
                          {newTrip.coverImage ? "Change Image" : "Upload Image"}
                        </label>
                      </div>
                      {newTrip.coverImage && (
                        <div className="w-24 h-24 relative">
                          <img
                            src={newTrip.coverImage}
                            alt="Trip cover preview"
                            className="w-full h-full object-cover rounded-lg border border-[#d1c7b7]"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setNewTrip((prev) => ({
                                ...prev,
                                coverImage: null,
                              }))
                            }
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                          >
                            <FiX className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-[#5E5854] mt-1">
                      Recommended: landscape orientation, at least 800x600px
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowPostTrip(false)}
                      className="bg-[#5E5854] hover:bg-[#2c5e4a] text-white px-6 py-2 rounded-full transition-colors font-cinzel"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-[#f8a95d] to-[#f87c6d] hover:from-[#f87c6d] hover:to-[#f8a95d] text-white px-6 py-2 rounded-full transition-colors font-cinzel"
                    >
                      Post Trip
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {/* Group Chat Modal */}
          {showGroupChat && (
            <Group
              trip={selectedTrip}
              currentUser={currentUser}
              onClose={() => setShowGroupChat(false)}
            />
          )}

          {/* Photo Modal */}
          {showPhotoModal && (
            <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="relative max-w-5xl w-full max-h-[90vh]">
                <button
                  onClick={() => setShowPhotoModal(false)}
                  className="absolute top-4 right-4 text-white text-4xl z-10 hover:text-[#f87c6d]"
                >
                  <FiX />
                </button>
                <img
                  src={selectedPhoto}
                  alt="Enlarged view"
                  className="w-full h-full object-contain max-h-[90vh]"
                />
              </div>
            </div>
          )}

          {/* Member Profile Modal */}
          {showMemberProfile && selectedMember && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-8 max-w-4xl w-full border border-[#d1c7b7] shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-3xl font-bold text-[#2c5e4a]">Profile</h3>
                  <button
                    onClick={() => setShowMemberProfile(false)}
                    className="text-[#5E5854] hover:text-[#f87c6d] text-3xl font-bold"
                  >
                    <FiX />
                  </button>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src={selectedMember.avatar}
                    alt={selectedMember.name}
                    className="w-32 h-32 rounded-full border-4 border-[#f8d56b] object-cover mb-4"
                  />
                  <h4 className="text-2xl font-bold text-[#2c5e4a]">
                    {selectedMember.fullName || selectedMember.name}
                  </h4>
                  <p className="text-[#5E5854]">{selectedMember.location}</p>
                </div>
                <Profile
                  user={selectedMember}
                  onClose={() => setShowMemberProfile(false)}
                  onMessage={() => handleProfileMessage()}
                  onPhotoClick={handlePhotoClick}
                />
              </div>
            </div>
          )}

          {/* Member Profiles Modal */}
          {showMemberProfiles && selectedTripForMembers && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b border-[#d1c7b7]">
                  <h3 className="text-xl font-bold text-[#2c5e4a]">
                    Trip Members
                  </h3>
                  <button
                    onClick={() => setShowMemberProfiles(false)}
                    className="text-[#5E5854] hover:text-[#2c5e4a] p-2 rounded-full"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4">
                  <MemberProfiles
                    trip={selectedTripForMembers}
                    onStartChat={handleStartChatWithMember}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Join Notification Modal */}
          {showJoinModal && joinedTripInfo && (
            <div className="fixed inset-0 z-[200] bg-black/70 flex items-center justify-center">
              <div className="bg-gradient-to-br from-[#f8f4e3] to-[#f0d9b5] rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center">
                <h2 className="text-2xl font-bold text-[#2c5e4a] mb-4">
                  Trip Joined!
                </h2>
                <p className="text-[#5E5854] mb-6 text-center">
                  You have successfully joined{" "}
                  <span className="font-bold">{joinedTripInfo.title}</span>.
                  <br />
                  What would you like to do next?
                </p>
                <img
                  src={joinedTripInfo.image}
                  alt={joinedTripInfo.title}
                  className="w-32 h-32 object-cover rounded-xl mb-6 border border-[#d1c7b7]"
                />
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <button
                    className="flex-1 bg-gradient-to-r from-[#f8a95d] to-[#f87c6d] hover:from-[#f87c6d] hover:to-[#f8a95d] text-white py-3 rounded-xl font-cinzel text-lg"
                    onClick={() => {
                      setShowJoinModal(false);
                      setShowTripDetails(true);
                      setSelectedTrip(joinedTripInfo);
                    }}
                  >
                    Know More About This Trip
                  </button>
                  <button
                    className="flex-1 bg-[#2c5e4a] hover:bg-[#5E5854] text-white py-3 rounded-xl font-cinzel text-lg"
                    onClick={() => {
                      setShowJoinModal(false);
                      setShowGroupChat(true);
                      setSelectedTrip(joinedTripInfo);
                    }}
                  >
                    Go to Group Chat
                  </button>
                </div>
                <button
                  className="mt-6 text-[#f87c6d] hover:text-[#f8a95d] text-sm underline"
                  onClick={() => setShowJoinModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Leaderboard Modal */}
          {showLeaderboard && (
            <div className="fixed inset-0 min-h-screen w-screen z-[9999] bg-gradient-to-br from-[#f8f4e3] to-[#f0d9b5] flex items-center justify-center">
              <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
                <button
                  onClick={() => setShowLeaderboard(false)}
                  className="absolute top-4 right-4 text-[#5E5854] hover:text-[#f87c6d] text-2xl font-bold"
                >
                  <FiX />
                </button>
                <div className="flex items-center mb-6">
                  <GiTrophy className="text-yellow-400 mr-2" size={32} />
                  <h2 className="text-2xl font-bold text-[#2c5e4a]">
                    Traveler Leaderboard
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-[#d1c7b7] rounded-xl overflow-hidden">
                    <thead className="bg-[#f8f4e3]">
                      <tr>
                        <th className="px-4 py-2 text-left text-[#2c5e4a] font-bold">
                          Rank
                        </th>
                        <th className="px-4 py-2 text-left text-[#2c5e4a] font-bold">
                          Profile Pic
                        </th>
                        <th className="px-4 py-2 text-left text-[#2c5e4a] font-bold">
                          Traveler Name
                        </th>
                        <th className="px-4 py-2 text-left text-[#2c5e4a] font-bold">
                          Trips Completed
                        </th>
                        <th className="px-4 py-2 text-left text-[#2c5e4a] font-bold">
                          Title / Badge
                        </th>
                        <th className="px-4 py-2 text-left text-[#2c5e4a] font-bold">
                          Top Destination
                        </th>
                        <th className="px-4 py-2 text-left text-[#2c5e4a] font-bold">
                          Points / XP
                        </th>
                        <th className="px-4 py-2 text-left text-[#2c5e4a] font-bold">
                          Member Since
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboardData.map((user, idx) => (
                        <tr
                          key={user.rank}
                          className={user.name === "You" ? "bg-yellow-100" : ""}
                        >
                          <td className="px-4 py-2 font-bold text-lg text-[#f8a95d]">
                            #{user.rank}
                          </td>
                          <td className="px-4 py-2">
                            <img
                              src={user.profilePic}
                              alt={user.name}
                              className="w-10 h-10 rounded-full border-2 border-[#f8d56b] object-cover"
                            />
                          </td>
                          <td className="px-4 py-2 font-semibold text-[#2c5e4a]">
                            {user.name}
                          </td>
                          <td className="px-4 py-2">{user.tripsCompleted}</td>
                          <td className="px-4 py-2">
                            <span className="bg-[#f8d56b] text-[#2c5e4a] px-2 py-1 rounded-full text-xs font-bold">
                              {user.badge}
                            </span>
                          </td>
                          <td className="px-4 py-2">{user.topDestination}</td>
                          <td className="px-4 py-2 font-bold text-[#f87c6d]">
                            {user.points}
                          </td>
                          <td className="px-4 py-2">{user.memberSince}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <footer className="bg-[#2c5e4a] text-white py-12 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4 text-[#f8d56b]">
                NomadNova
              </h4>
              <p className="text-[#a8c4b8]">
                Connecting travelers worldwide for unforgettable shared
                experiences.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Explore</h5>
              <ul className="space-y-2 text-[#a8c4b8]">
                <li>
                  <a
                    href="#trips"
                    className="hover:text-[#f8d56b] transition-colors"
                  >
                    Available Trips
                  </a>
                </li>
                <li>
                  <a
                    href="#completed"
                    className="hover:text-[#f8d56b] transition-colors"
                  >
                    The road so far
                  </a>
                </li>
                <li>
                  <a
                    href="#destinations"
                    className="hover:text-[#f8d56b] transition-colors"
                  >
                    Popular Destinations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Contact</h5>
              <ul className="space-y-2 text-[#a8c4b8]">
                <li>
                  Email:{" "}
                  <a
                    href="mailto:info@nomadnova.com"
                    className="hover:text-[#f8d56b]"
                  >
                    info@nomadnova.com
                  </a>
                </li>
                <li>
                  Support:{" "}
                  <a
                    href="mailto:support@nomadnova.com"
                    className="hover:text-[#f8d56b]"
                  >
                    support@nomadnova.com
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Follow Us</h5>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-[#f8d56b] transition-colors">
                  Instagram
                </a>
                <a href="#" className="hover:text-[#f8d56b] transition-colors">
                  Twitter
                </a>
                <a href="#" className="hover:text-[#f8d56b] transition-colors">
                  Facebook
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-[#a8c4b8] text-sm">
            &copy; {new Date().getFullYear()} NomadNova. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}

export default Dashboard;
