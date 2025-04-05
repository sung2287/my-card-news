import React from 'react';
import Image from 'next/image'; // Re-enable Image import
import Swal from 'sweetalert2'; // Import SweetAlert2

interface CardProps {
  title: string;
  description: string;
  imageUrl: string; // <-- Re-add this
  sourceName: string; // Add sourceName prop
  date: string;       // Add date prop (formatted string)
  link: string; // Add link prop for the source URL
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, sourceName, date, link }) => {

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
    // Update card container style: remove background, border, shadow, hover effects. Add padding and bottom border.
    <div 
      className="p-4 mb-4 border-b border-gray-200 cursor-pointer" 
      onClick={handleCardClick} 
    >
      {/* Re-add the image section */}
      <div className="relative h-52 w-full mb-3 rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      
      {/* Content section */}
      <div>
        {/* Source Name */}
        <p className="text-xs font-semibold uppercase text-gray-500 mb-1">{sourceName}</p>
        {/* Title */}
        <h3 className="text-xl font-bold mb-2 text-gray-900 leading-tight">{title}</h3>
        {/* Date/Timestamp */}
        <p className="text-sm text-gray-500">{date}</p>
        {/* Description is now shown only in the popup */}
      </div>
    </div>
  );
};

export default Card; 