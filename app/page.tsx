import React from 'react';
import Card from '@/components/Card'; // Import Card component

// Sample data for cards
const sampleCards = [
  {
    title: '카드 뉴스 제목 1',
    description: '카드 뉴스 설명 1입니다. 여기에 간단한 내용이 들어갑니다.',
    imageUrl: '/sample-image-1.jpg', // Assumes image is in public folder
  },
  {
    title: '카드 뉴스 제목 2',
    description: '카드 뉴스 설명 2입니다. 흥미로운 정보를 담고 있습니다.',
    imageUrl: '/sample-image-2.jpg', // Assumes image is in public folder
  },
  {
    title: '카드 뉴스 제목 3',
    description: '카드 뉴스 설명 3입니다. 시각적인 요소가 중요합니다.',
    imageUrl: '/sample-image-3.jpg', // Assumes image is in public folder
  },
];

export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>카드 뉴스 목록</h2>
      {/* Replace placeholder with actual card list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sampleCards.map((card, index) => (
          <Card 
            key={index} 
            title={card.title} 
            description={card.description} 
            imageUrl={card.imageUrl} 
          />
        ))}
      </div>
    </div>
  );
}
