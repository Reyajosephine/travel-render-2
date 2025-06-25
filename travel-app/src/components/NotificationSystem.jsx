import { useState } from 'react';

export default function NotificationSystem({ 
  notifications, 
  showNotifications, 
  onToggleNotifications, 
  onMarkAsRead,
  onClearAll 
}) {
  const unreadCount = notifications.filter(n => !n.read).length;

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="relative w-full md:w-auto">
      {/* Notification Bell - more compact for mobile */}
      <button
        onClick={onToggleNotifications}
        className="relative p-2 rounded-full bg-[#6F93AD] hover:bg-[#5E5854] transition-colors text-white flex items-center justify-center"
        aria-label="Notifications"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#EC8E3D] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown - adjust position for mobile */}
      {showNotifications && (
        <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-gradient-to-br from-[#f8f4e3] to-[#f0d9b5] rounded-xl border-2 border-[#5E5854] shadow-2xl z-50 max-h-[80vh] sm:max-h-96 overflow-hidden">
          {/* Header */}
          <div className="p-3 sm:p-4 border-b border-[#5E5854] bg-gradient-to-r from-[#2c5e4a] to-[#1a3a2a]">
            <div className="flex justify-between items-center">
              <h3 className="text-base sm:text-lg font-bold text-white">Notifications</h3>
              <div className="flex items-center space-x-2">
                {notifications.length > 0 && (
                  <button
                    onClick={onClearAll}
                    className="text-xs sm:text-sm text-white hover:text-[#EC8E3D] font-medium transition-colors"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={onToggleNotifications}
                  className="text-white hover:text-[#EC8E3D] transition-colors"
                  aria-label="Close notifications"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            {unreadCount > 0 && (
              <p className="text-xs sm:text-sm text-white/70 mt-1">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-[60vh] sm:max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 sm:p-6 text-center">
                <div className="text-[#204231]/50 mb-2">
                  <svg className="w-8 h-8 sm:w-12 sm:h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <p className="text-sm sm:text-base text-[#204231]/70 font-medium">No notifications yet</p>
                <p className="text-xs sm:text-sm text-[#204231]/50 mt-1">You'll see trip updates here</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 sm:p-4 border-b border-[#5E5854]/30 hover:bg-[#EE9C8F]/20 transition-colors cursor-pointer ${
                    !notification.read ? 'bg-[#EE9C8F]/10' : ''
                  }`}
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  {notification.type === 'joined' && notification.trip ? (
                    <div className="flex items-start space-x-3">
                      <img
                        src={notification.trip.image}
                        alt={notification.trip.title}
                        className="w-12 h-12 rounded-xl border-2 border-[#f8d56b] object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-bold text-[#2c5e4a] truncate">{notification.trip.title}</h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-[#EC8E3D] rounded-full flex-shrink-0"></div>
                          )}
                        </div>
                        <p className="text-xs text-[#5E5854] mt-1">{notification.trip.destination}</p>
                        <p className="text-xs text-[#5E5854]">{notification.trip.date}</p>
                        <p className="text-xs text-[#5E5854] mt-1">You joined this trip!</p>
                        <p className="text-xs text-[#204231]/60 mt-1">{formatTimeAgo(notification.date)}</p>
                        <div className="flex gap-2 mt-2">
                          <button
                            className="bg-gradient-to-r from-[#f8a95d] to-[#f87c6d] hover:from-[#f87c6d] hover:to-[#f8a95d] text-white px-3 py-1 rounded-full text-xs font-cinzel shadow"
                            onClick={e => {
                              e.stopPropagation();
                              if (typeof window !== 'undefined' && window.dispatchEvent) {
                                window.dispatchEvent(new CustomEvent('openGroupChat', { detail: notification.trip }));
                              }
                            }}
                          >
                            Go to Group Chat
                          </button>
                          <button
                            className="bg-[#2c5e4a] hover:bg-[#5E5854] text-white px-3 py-1 rounded-full text-xs font-cinzel shadow"
                            onClick={e => {
                              e.stopPropagation();
                              if (typeof window !== 'undefined' && window.dispatchEvent) {
                                window.dispatchEvent(new CustomEvent('openTripDetails', { detail: notification.trip }));
                              }
                            }}
                          >
                            Know More
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // fallback for other notification types
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <img
                        src={notification.userAvatar || '/assets/images/default-avatar.jpg'}
                        alt={notification.userName || 'User'}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#EC8E3D] flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs sm:text-sm font-semibold text-[#204231] truncate">
                            {notification.userName}
                          </p>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-[#EC8E3D] rounded-full flex-shrink-0"></div>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-[#204231] mt-1">
                          {notification.type === 'join_request' && (
                            <>joined your trip <span className="font-semibold">"{notification.tripTitle}"</span></>
                          )}
                        </p>
                        <p className="text-xs text-[#204231]/60 mt-1">
                          {formatTimeAgo(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
