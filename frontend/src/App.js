import React, { useState } from 'react';
import SearchPage from './components/SearchPage';
import ResultsPage from './components/ResultsPage';
import LoadingProgress from './components/LoadingProgress';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (query, filters) => {
    setSearchQuery(query);
    setIsLoading(true);
    // Loading will auto-complete and trigger results
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setSearchResults(generateMockResults(searchQuery));
  };

  const handleBack = () => {
    setSearchResults(null);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background cyber-grid">
      {isLoading ? (
        <LoadingProgress onComplete={handleLoadingComplete} />
      ) : !searchResults ? (
        <SearchPage onSearch={handleSearch} />
      ) : (
        <ResultsPage 
          results={searchResults} 
          query={searchQuery}
          onBack={handleBack}
        />
      )}
      <Toaster />
    </div>
  );
}

function generateMockResults(query) {
  const platforms = ['twitter', 'instagram', 'facebook', 'linkedin', 'github', 'reddit', 'tiktok', 'youtube'];
  
  return platforms.map(platform => ({
    platform,
    username: `${query.toLowerCase().replace(/\s+/g, '_')}_${platform}`,
    displayName: query,
    profileUrl: `https://${platform}.com/${query}`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${platform}${query}`,
    verified: Math.random() > 0.5,
    followers: Math.floor(Math.random() * 100000),
    following: Math.floor(Math.random() * 5000),
    posts: Math.floor(Math.random() * 1000),
    bio: `${platform.charAt(0).toUpperCase() + platform.slice(1)} profile for ${query}. Digital footprint discovered.`,
    location: ['San Francisco, CA', 'New York, NY', 'London, UK', 'Tokyo, Japan', 'Berlin, Germany'][Math.floor(Math.random() * 5)],
    joinDate: new Date(2018 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toLocaleDateString(),
    lastActive: `${Math.floor(Math.random() * 24)}h ago`,
    engagement: (Math.random() * 10).toFixed(1),
    risk: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
  }));
}
