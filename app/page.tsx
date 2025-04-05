'use client';

import React, { useState, useEffect } from 'react';
import Card from '@/components/Card'; // Import Card component
import { formatDistanceToNow, parseISO } from 'date-fns'; // Import date-fns functions
import { ko } from 'date-fns/locale'; // Import Korean locale

// Update the Post interface to match the actual data keys
interface Post {
  '날짜': string;
  '제목': string;
  '내용': string;
  '카테고리': string;
  '이모지': string;
  '출처(링크)': string;
  '이미지': string; // Add the image URL property
  // Add other properties if needed based on the actual data
}

// Sample data for cards (will be replaced by fetched data later)
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

// Helper function to format date relative to now (e.g., '5분 전')
const formatRelativeTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true, locale: ko });
  } catch (error) {
    console.error('Error parsing date:', error);
    return dateString; // Return original string on error
  }
};

// Helper function to extract source name (simple domain extraction)
const getSourceName = (urlString: string): string => {
  try {
    const url = new URL(urlString);
    // Remove www. and get the main part (e.g., ghost.io)
    return url.hostname.replace(/^www\./, '').split('.')[0] || url.hostname;
  } catch (error) {
    console.warn('Could not parse URL for source name:', urlString);
    return '출처 정보 없음'; // Fallback source name
  }
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    // Update API_URL with the provided Google Apps Script URL
    const API_URL = 'https://script.google.com/macros/s/AKfycbzrbgq86jSIgVXjwwWWj9Lhml1Dz6F7hocN_8guxqdHLGCtMdWq-V6wl1U7Jdt5tHSn/exec';

    // Remove the environment variable check as we are hardcoding the URL now
    /*
    if (!API_URL) {
      setError("API URL이 설정되지 않았습니다. NEXT_PUBLIC_APPS_SCRIPT_URL 환경 변수를 확인하세요.");
      setLoading(false);
      return;
    }
    */

    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Reset error state
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          // Make sure the fetched data conforms to the Post interface (optional runtime check)
          setPosts(data as Post[]);
        } else {
          if (data.error) {
            throw new Error(`API Error: ${data.error}`);
          } else {
            throw new Error('Fetched data is not an array');
          }
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unknown error occurred');
        }
        console.error("Failed to fetch posts:", e); // Log error for debugging
      } finally {
        setLoading(false); // End loading regardless of success or failure
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      <h2 className="text-2xl font-bold text-red-600 px-4 mt-6 mb-3">주요 뉴스</h2>

      {/* Display loading message */}
      {loading && <p className="px-4">데이터를 불러오는 중...</p>}

      {/* Display error message */}
      {error && <p className="px-4 text-red-500">오류: {error}</p>}

      {/* Display cards only when not loading and no error */}
      {!loading && !error && (
        <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <Card
                key={index}
                title={post.제목}
                description={post.내용}
                imageUrl={post.이미지}
                sourceName={getSourceName(post['출처(링크)'])}
                date={formatRelativeTime(post.날짜)}
                link={post['출처(링크)']}
              />
            ))
          ) : (
            <p className="col-span-full px-4">표시할 카드 뉴스가 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
}
