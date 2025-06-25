import React, { useEffect, useState } from 'react';
import { 
  FiUser, FiMapPin, FiCalendar, FiStar, FiGlobe, FiEdit2, FiMessageSquare, 
  FiShare, FiX, FiPlus, FiCheck, FiAward, FiCamera, FiHeart, FiFlag, 
  FiClock, FiBookmark, FiUsers, FiNavigation, FiMail, FiPhone, FiVideo, FiMap
} from 'react-icons/fi';
import { FaPlaneDeparture } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ProfileEdit from './ProfileEdit';
import TripMemories from './TripMemories';
import OTPVerification from './OTPVerification';

export default function Profile({ currentUser, onClose, onMessage }) {
  const location = useLocation();
  const [activeTab, setActiveTab] = React.useState('overview');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showTripMemories, setShowTripMemories] = useState(false);
  const [selectedTripType, setSelectedTripType] = useState('');
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [otpType, setOTPType] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const [joinedTripsData, setJoinedTripsData] = useState([]); // <-- fetched joined trips
  const navigate = useNavigate();

  // Fetch joined trips from backend
  useEffect(() => {
    if (currentUser && currentUser.id) {
      const token = localStorage.getItem('authToken');
      axios.get(`/api/joined-trips/${currentUser.id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
        .then(res => setJoinedTripsData(Array.isArray(res.data) ? res.data : []))
        .catch(err => {
          setJoinedTripsData([]);
          console.error('Failed to fetch joined trips', err);
        });
    }
  }, [currentUser]);

  // Fix the close button functionality
  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose();
    } else {
      // If onClose is not provided, navigate back
      if (typeof navigate === 'function') {
        navigate('/dashboard');
      } else {
        window.location.href = '/dashboard';
      }
    }
  };

  // User profile data
  const profileData = {
    ...currentUser,
    fullName: currentUser?.fullName || "Alex Rivera",
    bio: currentUser?.bio || "Passionate traveler and adventure seeker. Love exploring new cultures, meeting amazing people, and creating unforgettable memories around the world!",
    location: currentUser?.location || "San Francisco, CA",
    joinedDate: currentUser?.joinedDate || "January 2023",
    phone: currentUser?.phone || "+1 (555) 123-4567",
    connections: currentUser?.connections || 247,
    followers: currentUser?.followers || 189,
    following: currentUser?.following || 156,
    tripsPosted: currentUser?.tripsPosted || 8,
    tripsJoined: currentUser?.tripsJoined || 15,
    upcomingTrips: currentUser?.upcomingTrips || 3,
    totalCountries: currentUser?.totalCountries || 23,
    totalCities: currentUser?.totalCities || 67,
    travelCategories: currentUser?.travelCategories || ["Adventure", "Culture", "Food", "Photography", "Nature"],
    languages: currentUser?.languages || ["English", "Spanish", "French"],
    verified: currentUser?.verified !== undefined ? currentUser.verified : true,
    responseRate: currentUser?.responseRate || "95%",
    responseTime: currentUser?.responseTime || "Within 2 hours",
    avatar: currentUser?.avatar || "/assets/images/Alexrivera.jpeg",
    rating: currentUser?.rating || 4.8
  };

  // Ensure we have a valid avatar URL
  useEffect(() => {
    // Check if profileData exists and has an avatar property
    if (profileData && !profileData.avatar) {
      // If currentUser has an avatar, use that
      if (currentUser && currentUser.avatar) {
        profileData.avatar = currentUser.avatar;
      } else {
        // Otherwise use a default avatar
        profileData.avatar = "/assets/images/Alexrivera.jpeg";
      }
    }
  }, [profileData, currentUser]);

  // Debug the avatar URL
  useEffect(() => {
    console.log("Avatar URL:", profileData?.avatar);
  }, [profileData]);

  const handleEditProfile = () => {
    setShowEditProfile(true);
  };

  const handleViewTripMemories = (type) => {
    setSelectedTripType(type);
    setShowTripMemories(true);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${profileData.fullName}'s Profile - NomadNova`,
        text: `Check out ${profileData.fullName}'s travel profile on NomadNova!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Profile link copied to clipboard!');
    }
  };

  const handleUploadMemories = (e) => {
    const files = Array.from(e.target.files);
    // For demo: just show an alert, or you can upload/store them as needed
    files.forEach(file => {
      alert(`Selected: ${file.name}`);
      // You can add logic to preview or upload the image here
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <FiUser className="w-5 h-5" /> },
    { id: 'trips', label: 'Trips', icon: <FaPlaneDeparture className="w-5 h-5" /> },
    { id: 'memories', label: 'Memories', icon: <FiCamera className="w-5 h-5" /> },
    { id: 'reviews', label: 'Reviews', icon: <FiStar className="w-5 h-5" /> }
  ];

  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100] flex items-center justify-center p-2 sm:p-4">
      {/* Main container with dashboard-matching background */}
      <div className="bg-gradient-to-br from-[#f8f4e3] to-[#f0d9b5] rounded-xl w-full max-w-4xl h-[90vh] shadow-2xl flex flex-col overflow-hidden">
        {/* Header with Instagram-like layout */}
        <div className="bg-gradient-to-r from-[#2c5e4a] to-[#1a3a2a] p-2">
          <div className="flex justify-between items-center">
            {/* Title instead of close button on left */}
            <h3 className="text-white font-semibold text-sm">Profile</h3>
            
            <div className="flex items-center gap-3">
              {/* Share button */}
              <button
                onClick={handleShare}
                className="text-gray-300 hover:text-white transition-colors flex flex-col items-center"
                title="Share Profile"
              >
                <FiShare className="w-4 h-4 mb-0.5" />
                <span className="text-xs">Share</span>
              </button>
              
              {/* Close button */}
              <button
                onClick={handleClose}
                className="text-white bg-yellow-500/30 hover:bg-yellow-500/60 transition-colors -mt-2 p-1 rounded-full"
                title="Close"
              >
                <FiX className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          {/* Profile info in Instagram-like layout */}
          <div className="flex items-center mt-2">
            {/* Profile Picture */}
            <div className="relative mr-4">
              <img
                src={profileData?.avatar || "/assets/images/Alexrivera.jpeg"}
                alt={profileData?.fullName || "User"}
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/images/Alexrivera.jpeg";
                }}
              />
              {currentUser?.id === profileData?.id && (
                <button
                  onClick={handleEditProfile}
                  className="absolute -bottom-1 -right-1 bg-white hover:bg-gray-100 rounded-full p-1 shadow-md transition-colors"
                  title="Edit Profile"
                >
                  <FiEdit2 className="w-3 h-3 text-gray-700" />
                </button>
              )}
            </div>
            
            {/* Stats in Instagram-like layout - using opacity for lighter appearance */}
            <div className="flex-1 grid grid-cols-3 gap-1 text-center">
              <div className="flex flex-col items-center">
                <span className="bg-yellow-500/60 rounded-full w-14 h-14 flex flex-col items-center justify-center mb-0.5 shadow-md stat-circle stat-circle-travelers">
                  <span className="text-white font-bold text-sm">{profileData.connections}</span>
                  <span className="text-white text-[10px] font-medium">Travelers</span>
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="bg-yellow-500/60 rounded-full w-14 h-14 flex flex-col items-center justify-center mb-0.5 shadow-md stat-circle stat-circle-countries">
                  <span className="text-white font-bold text-sm">{profileData.totalCountries}</span>
                  <span className="text-white text-[10px] font-medium">Countries</span>
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="bg-yellow-500/60 rounded-full w-14 h-14 flex flex-col items-center justify-center mb-0.5 shadow-md stat-circle stat-circle-trips">
                  <span className="text-white font-bold text-sm">{profileData.tripsPosted}</span>
                  <span className="text-white text-[10px] font-medium">Trips</span>
                </span>
              </div>
            </div>
          </div>
          
          {/* Name and bio */}
          <div className="mt-2">
            <h2 className="text-base font-cinzel font-bold text-white mb-1">{profileData.fullName}</h2>
            <div className="flex items-center text-gray-200 text-xs mb-2">
              <FiMapPin className="mr-1 w-3 h-3" />
              <span>{profileData.location}</span>
            </div>
            
            {/* Travel stats - with opacity adjustments */}
            <div className="flex space-x-3 mt-0.5 mb-1">
              <div className="bg-gradient-to-r from-yellow-300/30 to-yellow-500/20 backdrop-blur-sm px-2 py-0.5 rounded-lg flex items-center border border-yellow-300/20">
                <FiUsers className="mr-1 w-3 h-3 text-yellow-300" />
                <span className="text-white text-xs font-semibold">{profileData.connections} travelers</span>
              </div>
              <div className="bg-gradient-to-r from-yellow-300/30 to-yellow-500/20 backdrop-blur-sm px-2 py-0.5 rounded-lg flex items-center border border-yellow-300/20">
                <FiGlobe className="mr-1 w-3 h-3 text-yellow-300" />
                <span className="text-white text-xs font-semibold">{profileData.totalCountries} countries</span>
              </div>
            </div>
            {/* Legendary Explorer Title */}
            <div className="flex items-center justify-center mt-2 mb-2">
              <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-[#f8d56b] via-[#f87c6d] to-[#2c5e4a] shadow-lg border-2 border-[#f8d56b] animate-pulse-slow">
                <span className="text-2xl">🏅</span>
                <span className="font-cinzel font-bold text-lg sm:text-xl text-white drop-shadow-lg tracking-wide">
                  Legendary&nbsp;<span className="text-[#f8d56b]">Explorer</span>
                </span>
              </span>
            </div>
            <style>{`
              .animate-pulse-slow {
                animation: pulseLegendary 2.5s infinite;
              }
              @keyframes pulseLegendary {
                0%, 100% { box-shadow: 0 0 0 0 #f8d56b66; }
                50% { box-shadow: 0 0 16px 6px #f8d56b99; }
              }
            `}</style>
          </div>
          
          {/* Follow/Message buttons - more compact */}
          <div className="flex mt-3 space-x-2">
            {currentUser.id === profileData.id ? (
              <div className="text-gray-200 text-xs flex items-center">
                <FiCalendar className="mr-1 w-3 h-3" />
                <span>Member since {profileData.joinedDate}</span>
              </div>
            ) : (
              <>
                <button
                  onClick={handleFollow}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors flex items-center shadow-sm text-sm ${
                    isFollowing
                      ? 'bg-gray-100 text-gray-800 border border-gray-300'
                      : 'bg-yellow-500 text-white'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <FiCheck className="mr-1 w-3 h-3" />
                      Following
                    </>
                  ) : (
                    <>
                      <FiPlus className="mr-1 w-3 h-3" />
                      Follow
                    </>
                  )}
                </button>
                <button
                  onClick={onMessage}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-xs font-medium flex items-center"
                >
                  <FiMessageSquare className="mr-1 w-3 h-3" />
                  Message
                </button>
              </>
            )}
          </div>
        </div>

        {/* Main action buttons */}
        <div className="flex flex-wrap justify-between px-3 sm:px-4 py-2 bg-gradient-to-r from-[#2c5e4a] to-[#1a3a2a]">
          <div className="flex flex-wrap gap-2 mb-2 sm:mb-0">
            {currentUser.id !== profileData.id && (
              <>
                <button
                  onClick={handleFollow}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors flex items-center shadow-sm text-sm ${
                    isFollowing
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300'
                      : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <FiCheck className="mr-2" />
                      Following
                    </>
                  ) : (
                    <>
                      <FiPlus className="mr-2" />
                      Follow
                    </>
                  )}
                </button>
                <button
                  onClick={onMessage}
                  className="bg-white hover:bg-gray-50 text-gray-800 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors flex items-center border border-gray-300 shadow-sm text-sm"
                >
                  <FiMessageSquare className="mr-2" />
                  Message
                </button>
              </>
            )}
          </div>
        </div>

        {/* Navigation Tabs - Instagram style */}
        <div className="bg-gradient-to-r from-[#2c5e4a] to-[#1a3a2a] border-t border-gray-700/30">
          <div className="flex justify-around">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-3 font-medium text-xs transition-colors relative flex-1 ${
                  activeTab === tab.id
                    ? 'text-[#f8d56b]'
                    : 'text-gray-200 hover:text-[#f8d56b]'
                }`}
              >
                <div className="flex flex-col items-center">
                  {tab.icon}
                  <span className="mt-1">{tab.label}</span>
                </div>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f8d56b]"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gradient-to-br from-[#f8f4e3] to-[#f0d9b5]">
          {activeTab === 'overview' && (
            <div className="space-y-4 sm:space-y-6">
              {/* About Section */}
              <div className="bg-yellow-50 p-4 sm:p-6 rounded-lg border border-[#204231]">
                <h3 className="text-base sm:text-lg font-cinzel font-semibold text-[#204231] mb-2 sm:mb-3">About</h3>
                <p className="text-green-900 leading-relaxed text-sm sm:text-base">{profileData.bio}</p>
              </div>

              {/* About Section with Travel Interests and Pinned Memories side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Travel Categories */}
                <div className="bg-yellow-50 p-4 sm:p-6 rounded-lg border border-[#204231]">
                  <h3 className="text-base sm:text-lg font-cinzel font-semibold text-[#204231] mb-2 sm:mb-3">Travel Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.travelCategories.map((category, index) => (
                      <span
                        key={index}
                        className="px-2 sm:px-3 py-1 bg-yellow-100 text-[#204231] rounded-full text-xs sm:text-sm font-medium border border-[#204231]"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pinned Memories */}
                <div className="bg-yellow-50 p-4 sm:p-6 rounded-lg border border-[#204231]">
                  <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-lg font-cinzel font-semibold text-[#204231]">Pinned Memories</h3>
                    <button 
                      onClick={() => handleViewTripMemories('photos')}
                      className="text-[#204231] text-xs sm:text-sm font-medium"
                    >
                      View All
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { url: "/assets/images/paris.webp", location: "Paris, France", date: "Dec 2024" },
                      { url: "/assets/images/london.jpeg", location: "London, UK", date: "Nov 2024" },
                      { url: "/assets/images/swissalps.jpeg", location: "Swiss Alps", date: "Oct 2024" },
                    ].map((memory, index) => (
                      <div key={index} className="relative group cursor-pointer rounded-lg overflow-hidden">
                        <img
                          src={memory.url}
                          alt={memory.location}
                          className="w-full h-24 sm:h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-white font-medium text-xs sm:text-sm">{memory.location}</p>
                            <p className="text-white/80 text-xs">{memory.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trips' && (
            <div className="space-y-4 sm:space-y-6">
              {/* Trip Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div
                  onClick={() => handleViewTripMemories('posted')}
                  className="bg-yellow-50 p-4 sm:p-6 rounded-lg border border-[#204231] cursor-pointer hover:border-[#204231] transition-colors"
                >
                  <h3 className="text-base sm:text-lg font-cinzel font-semibold text-[#204231] mb-2">Trips Posted</h3>
                  <p className="text-xl sm:text-2xl font-cinzel font-bold text-yellow-500 mb-2">{profileData.tripsPosted}</p>
                  <p className="text-[#204231] text-xs sm:text-sm">Click to view details and memories</p>
                </div>

                <div
                  onClick={() => handleViewTripMemories('joined')}
                  className="bg-yellow-50 p-4 sm:p-6 rounded-lg border border-[#204231] cursor-pointer hover:border-[#204231] transition-colors"
                >
                  <h3 className="text-base sm:text-lg font-cinzel font-semibold text-[#204231] mb-2">Trips Joined</h3>
                  <p className="text-xl sm:text-2xl font-cinzel font-bold text-yellow-500 mb-2">{profileData.tripsJoined}</p>
                  <p className="text-gray-500 text-xs sm:text-sm mb-1 sm:mb-2">Click to view details and memories</p>
                </div>
              </div>

              {/* Upcoming Trips - fetched from backend */}
              <div className="bg-yellow-50 p-4 sm:p-6 rounded-lg border border-[#204231]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base sm:text-lg font-cinzel font-semibold text-gray-800">Upcoming Trips</h3>
                  <button className="text-yellow-500 text-xs sm:text-sm font-medium">View All</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {(Array.isArray(joinedTripsData) && joinedTripsData.length > 0) ? joinedTripsData.map((trip) => (
                    <div key={trip._id} className="bg-yellow-100 rounded-lg p-3 sm:p-4 border border-[#204231] hover:shadow-md transition-shadow">
                      <img
                        src={trip.image}
                        alt={trip.tripTitle}
                        className="w-full h-24 sm:h-32 object-cover rounded-lg mb-2 sm:mb-3"
                      />
                      <h4 className="font-cinzel font-semibold text-gray-800 mb-1 text-sm sm:text-base">{trip.tripTitle}</h4>
                      <p className="text-gray-500 text-xs sm:text-sm mb-1 sm:mb-2">{trip.destination}</p>
                      <p className="text-gray-500 text-xs sm:text-sm mb-1 sm:mb-2">{trip.date}</p>
                      <div className="flex justify-between items-center">
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                          Member
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          Confirmed
                        </span>
                      </div>
                    </div>
                  )) : (
                    <p className="text-gray-500 text-sm col-span-3">No upcoming trips yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'memories' && (
            <div className="space-y-4 sm:space-y-6">
              {/* Recent Memories */}
              <div className="bg-yellow-50 p-4 sm:p-6 rounded-lg border border-[#204231]">
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-[#204231]">Recent Travel Memories</h3>
                  <div className="flex gap-2">
                    <button className="text-yellow-500 text-xs sm:text-sm font-medium">View All</button>
                    <label className="bg-gradient-to-r from-[#f8a95d] to-[#f87c6d] hover:from-[#f87c6d] hover:to-[#f8a95d] text-white px-3 py-1 rounded-full cursor-pointer text-xs sm:text-sm font-medium">
                      Upload Your Memories
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        style={{ display: "none" }}
                        onChange={handleUploadMemories}
                      />
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                  {[
                    { url: "/assets/images/paris.webp", location: "Paris, France", date: "Dec 2024" },
                    { url: "/assets/images/london.jpeg", location: "London, UK", date: "Nov 2024" },
                    { url: "/assets/images/swissalps.jpeg", location: "Swiss Alps", date: "Oct 2024" },
                    { url: "/assets/images/baliadventure.jpeg", location: "Bali, Indonesia", date: "Sep 2024" },
                    { url: "/assets/images/Tokyo.jpeg", location: "Tokyo, Japan", date: "Aug 2024" },
                    { url: "/assets/images/icelandnorthernlights.jpeg", location: "Iceland", date: "Jul 2024" },
                    { url: "/assets/images/santorinisunset.jpeg", location: "Santorini, Greece", date: "Jun 2024" },
                    { url: "/assets/images/swissmount.jpeg", location: "Swiss Alps", date: "May 2024" }
                  ].map((memory, index) => (
                    <div key={index} className="relative group cursor-pointer">
                      <img
                        src={memory.url}
                        alt={memory.location}
                        className="w-full h-24 sm:h-32 object-cover rounded-lg border border-[#204231] group-hover:shadow-md transition-all"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-white font-medium text-sm">{memory.location}</p>
                          <p className="text-white/80 text-xs">{memory.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Memory Stats - Shuffling cards with popping animations */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div 
                  onClick={() => handleViewTripMemories('photos')}
                  className="relative h-32 rounded-lg overflow-hidden cursor-pointer perspective-500 memory-card"
                >
                  {/* Shuffling cards background */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {["/assets/images/paris.webp", "/assets/images/london.jpeg", "/assets/images/swissalps.jpeg"].map((img, i) => (
                      <div 
                        key={i} 
                        className={`absolute w-full h-full rounded-lg border-2 border-white shadow-md overflow-hidden transform transition-all duration-500 card-${i+1}`}
                        style={{ 
                          transform: `rotate(${(i-1) * 5}deg) translateY(${i * 5}px)`,
                          zIndex: 3-i,
                          transformOrigin: 'center 120%',
                        }}
                      >
                        <img src={img} alt="Photo" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  
                  {/* Overlay and content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 flex flex-col items-center justify-center z-30">
                    <p className="text-4xl font-bold text-white mb-1 count-number">156</p>
                    <p className="text-white text-sm bg-yellow-500/80 px-3 py-1 rounded-full category-label">Photos</p>
                  </div>
                </div>
                
                <div 
                  onClick={() => handleViewTripMemories('videos')}
                  className="relative h-32 rounded-lg overflow-hidden cursor-pointer perspective-500 memory-card"
                >
                  {/* Shuffling cards background */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {["/assets/images/Tokyo.jpeg", "/assets/images/icelandnorthernlights.jpeg", "/assets/images/santorinisunset.jpeg"].map((img, i) => (
                      <div 
                        key={i} 
                        className={`absolute w-full h-full rounded-lg border-2 border-white shadow-md overflow-hidden transform transition-all duration-500 card-${i+1}`}
                        style={{ 
                          transform: `rotate(${(i-1) * 5}deg) translateY(${i * 5}px)`,
                          zIndex: 3-i,
                          transformOrigin: 'center 120%',
                        }}
                      >
                        <img src={img} alt="Video" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center play-icon">
                            <div className="w-0 h-0 border-l-4 border-l-white border-t-3 border-t-transparent border-b-3 border-b-transparent ml-0.5"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Overlay and content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 flex flex-col items-center justify-center z-30">
                    <p className="text-4xl font-bold text-white mb-1 count-number">42</p>
                    <p className="text-white text-sm bg-yellow-500/80 px-3 py-1 rounded-full category-label">Videos</p>
                  </div>
                </div>
                
                <div 
                  onClick={() => handleViewTripMemories('countries')}
                  className="relative h-32 rounded-lg overflow-hidden cursor-pointer perspective-500 memory-card"
                >
                  {/* Shuffling cards background */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {["/assets/images/paris.webp", "/assets/images/Tokyo.jpeg", "/assets/images/baliadventure.jpeg"].map((img, i) => (
                      <div 
                        key={i} 
                        className={`absolute w-full h-full rounded-lg border-2 border-white shadow-md overflow-hidden transform transition-all duration-500 card-${i+1}`}
                        style={{ 
                          transform: `rotate(${(i-1) * 5}deg) translateY(${i * 5}px)`,
                          zIndex: 3-i,
                          transformOrigin: 'center 120%',
                        }}
                      >
                        <img src={img} alt="Country" className="w-full h-full object-cover" />
                        <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-bold location-label">
                          {i === 0 ? "France" : i === 1 ? "Japan" : "Indonesia"}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Overlay and content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 flex flex-col items-center justify-center z-30">
                    <p className="text-4xl font-bold text-white mb-1 count-number">23</p>
                    <p className="text-white text-sm bg-yellow-500/80 px-3 py-1 rounded-full category-label">Countries</p>
                  </div>
                </div>
                
                <div 
                  onClick={() => handleViewTripMemories('cities')}
                  className="relative h-32 rounded-lg overflow-hidden cursor-pointer perspective-500 memory-card"
                >
                  {/* Shuffling cards background */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {["/assets/images/london.jpeg", "/assets/images/swissmount.jpeg", "/assets/images/santorinisunset.jpeg"].map((img, i) => (
                      <div 
                        key={i} 
                        className={`absolute w-full h-full rounded-lg border-2 border-white shadow-md overflow-hidden transform transition-all duration-500 card-${i+1}`}
                        style={{ 
                          transform: `rotate(${(i-1) * 5}deg) translateY(${i * 5}px)`,
                          zIndex: 3-i,
                          transformOrigin: 'center 120%',
                        }}
                      >
                        <img src={img} alt="City" className="w-full h-full object-cover" />
                        <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-bold location-label">
                          {i === 0 ? "London" : i === 1 ? "Zurich" : "Santorini"}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Overlay and content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 flex flex-col items-center justify-center z-30">
                    <p className="text-4xl font-bold text-white mb-1 count-number">67</p>
                    <p className="text-white text-sm bg-yellow-500/80 px-3 py-1 rounded-full category-label">Cities</p>
                  </div>
                </div>
              </div>

              {/* Add the CSS for animations */}
              <style jsx>{`
                /* Card shuffle and pop animations */
                .memory-card {
                  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                
                .memory-card:hover {
                  transform: translateY(-5px);
                }
                
                .memory-card:hover .card-1 {
                  animation: popAndShuffle1 0.5s forwards cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
                
                .memory-card:hover .card-2 {
                  animation: popAndShuffle2 0.5s forwards cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
                
                .memory-card:hover .card-3 {
                  animation: popAndShuffle3 0.5s forwards cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
                
                .memory-card:hover .count-number {
                  animation: popNumber 0.5s forwards cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                
                .memory-card:hover .category-label {
                  animation: popLabel 0.4s forwards cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                
                .memory-card:hover .play-icon {
                  animation: pulse 1.5s infinite;
                }
                
                .memory-card:hover .location-label {
                  animation: slideIn 0.4s forwards;
                }
                
                @keyframes popAndShuffle1 {
                  0% { transform: rotate(-5deg) translateY(5px); }
                  30% { transform: rotate(-5deg) translateY(-10px) scale(1.05); }
                  100% { transform: rotate(-15deg) translateX(-20px) translateY(5px); }
                }
                
                @keyframes popAndShuffle2 {
                  0% { transform: rotate(0deg) translateY(0px); }
                  30% { transform: rotate(0deg) translateY(-15px) scale(1.05); }
                  100% { transform: rotate(0deg) translateY(0px); }
                }
                
                @keyframes popAndShuffle3 {
                  0% { transform: rotate(5deg) translateY(-5px); }
                  30% { transform: rotate(5deg) translateY(-20px) scale(1.05); }
                  100% { transform: rotate(15deg) translateX(20px) translateY(5px); }
                }
                
                @keyframes popNumber {
                  0% { transform: scale(1); }
                  50% { transform: scale(1.3); }
                  100% { transform: scale(1.1); }
                }
                
                @keyframes popLabel {
                  0% { transform: scale(1); opacity: 0.8; }
                  50% { transform: scale(1.2); opacity: 1; }
                  100% { transform: scale(1); opacity: 1; }
                }
                
                @keyframes pulse {
                  0% { transform: scale(1); opacity: 0.7; }
                  50% { transform: scale(1.2); opacity: 1; }
                  100% { transform: scale(1); opacity: 0.7; }
                }
                
                @keyframes slideIn {
                  0% { transform: translateX(-100%); opacity: 0; }
                  100% { transform: translateX(0); opacity: 1; }
                }
              `}</style>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Reviews Received */}
              <div className="bg-yellow-50 p-6 rounded-lg border border-[#204231]">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#204231]">Reviews Received</h3>
                    <div className="flex items-center mt-1">
                      <FiStar className="text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="text-gray-600 font-medium">4.8</span>
                      <span className="text-gray-500 text-sm ml-1">({profileData.followers} reviews)</span>
                    </div>
                  </div>
                  <button className="text-yellow-500 text-sm font-medium">View All</button>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      reviewer: "Sarah Chen",
                      avatar: "/assets/images/sarachen.jpeg",
                      rating: 5,
                      comment: "Alex was an amazing travel companion! Very organized and always positive. Would definitely travel with again!",
                      trip: "European Backpacking",
                      date: "December 2024"
                    },
                    {
                      id: 2,
                      reviewer: "Mike Johnson",
                      avatar: "/assets/images/mikejohnson.jpeg",
                      rating: 5,
                      comment: "Great organizer and very knowledgeable about local cultures. Made our trip unforgettable!",
                      trip: "Southeast Asia Food Tour",
                      date: "November 2024"
                    },
                    {
                      id: 3,
                      reviewer: "Emma Wilson",
                      avatar: "/assets/images/emmawilson.jpeg",
                      rating: 4,
                      comment: "Friendly and reliable. Good communication throughout the trip planning process.",
                      trip: "Swiss Alps Trek",
                      date: "October 2024"
                    }
                  ].map((review) => (
                    <div key={review.id} className="bg-[#f8f4e3] p-4 rounded-lg border border-[#d1c7b7]">
                      <div className="flex items-start space-x-3">
                        <img
                          src={review.avatar}
                          alt={review.reviewer}
                          className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-800">{review.reviewer}</h4>
                              <p className="text-gray-500 text-xs">{review.trip} • {review.date}</p>
                            </div>
                            <div className="flex">
                              {[...Array(review.rating)].map((_, i) => (
                                <FiStar key={i} className="text-yellow-400 fill-yellow-400 w-4 h-4" />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 mt-2 text-sm">"{review.comment}"</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showEditProfile && (
        <ProfileEdit
          profileData={profileData}
          onClose={() => setShowEditProfile(false)}
          onOTPVerification={(type) => {
            setOTPType(type);
            setShowOTPVerification(true);
          }}
        />
      )}

      {showTripMemories && (
        <TripMemories
          tripType={selectedTripType}
          onClose={() => setShowTripMemories(false)}
        />
      )}

      {showOTPVerification && (
        <OTPVerification
          type={otpType}
          onClose={() => setShowOTPVerification(false)}
          onVerified={() => {
            setShowOTPVerification(false);
            alert('Verification successful!');
          }}
        />
      )}
    </div>
  );
}
