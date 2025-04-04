import React from 'react';
import Image from 'next/image'; // Import next/image for optimized images
import Swal from 'sweetalert2'; // Import SweetAlert2

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  link: string; // Add link prop for the source URL
}

// Helper function to determine border color based on category
const getCategoryBorderColor = (category: string): string => {
  // Simple example: assign colors based on category initial letter or name
  // You can expand this logic
  switch (category.toLowerCase()) {
    case 'a':
      return 'border-l-blue-500';
    case 'b':
      return 'border-l-green-500';
    case 'c':
      return 'border-l-red-500';
    case 'v':
      return 'border-l-yellow-500';
    default:
      return 'border-l-gray-500';
  }
};

const Card: React.FC<CardProps> = ({ title, description, imageUrl, category, link }) => {
  const borderColorClass = getCategoryBorderColor(category);

  // Function to handle card click
  const handleCardClick = () => {
    Swal.fire({
      title: title, // Popup title
      html: `
        <p style="text-align: left; margin-bottom: 1rem;">${description}</p>
      `, // Popup content (using description)
      confirmButtonText: '닫기', // Close button text
      showCancelButton: true, // Show cancel button
      cancelButtonText: '뉴스 기사 보기', // Text for the link button
      cancelButtonColor: '#3B82F6', // Style the link button (Tailwind blue-500)
      reverseButtons: true, // Place the link button on the left
      focusConfirm: true, // Focus the confirm button by default
    }).then((result) => {
      // Check if the modal was dismissed by clicking the cancel button
      if (result.dismiss === Swal.DismissReason.cancel) {
        // Open the link in a new tab if the cancel button was clicked
        window.open(link, '_blank', 'noopener,noreferrer');
      }
    });
  };

  return (
    <div 
      className={`
        bg-white rounded-lg shadow-md overflow-hidden mb-4 
        border-l-4 ${borderColorClass} 
        transition duration-300 ease-in-out 
        hover:shadow-xl hover:scale-105
        cursor-pointer // Add cursor pointer to indicate clickability
      `}
      onClick={handleCardClick} // Add onClick handler to the div
    >
      <div className="relative h-40 w-full">
        <Image 
          src={imageUrl} 
          alt={title} 
          layout="fill" 
          objectFit="cover"
          className="opacity-80"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-700 text-base mb-3 line-clamp-3">{description}</p> {/* Limit description lines */}
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #{category}
        </span>
      </div>
    </div>
  );
};

export default Card; 