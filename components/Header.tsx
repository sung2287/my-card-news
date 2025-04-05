import React from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale'; // Import Korean locale if needed

const Header = () => {
  const today = new Date();
  // Format date like "April 5" (English) or "4월 5일" (Korean)
  const formattedDate = format(today, 'MMMM d', { locale: ko });

  return (
    <header className="px-4 py-3 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">뉴스 앱</h1> {/* App Name */}
          <p className="text-lg font-semibold text-gray-600">{formattedDate}</p> {/* Formatted Date */}
        </div>
        {/* Optional: Add placeholder for subscriber badge or other elements */}
        {/* <div className="w-12 h-12 bg-gray-300 rounded-full"></div> */}
      </div>
    </header>
  );
};

export default Header; 