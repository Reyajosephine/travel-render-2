import React from "react";
import { GiTrophy } from "react-icons/gi";

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
    profilePic: "/assets/images/default-avatar.jpg",
    memberSince: "Sep 2023",
  },
];

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f8f4e3] to-[#f0d9b5] flex flex-col items-center py-12 px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-8">
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
              {leaderboardData.map((user) => (
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
  );
}
