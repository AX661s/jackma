import React, { useState } from 'react';
import { Search, Shield, Database, Globe, Filter, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from 'sonner';

export const SearchPage = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('username');
  const [platform, setPlatform] = useState('all');
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error('Please enter a search query');
      return;
    }
    setIsSearching(true);
    toast.success('Initiating deep scan...');
    setTimeout(() => {
      onSearch(query, { searchType, platform });
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Shield className="w-8 h-8 text-primary" />
                <div className="absolute inset-0 blur-lg bg-primary/30"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    OSINT
                  </span>
                  <span className="text-foreground ml-2">Tracker</span>
                </h1>
                <p className="text-xs text-muted-foreground font-mono">Digital Footprint Intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-primary/30 text-primary pulse-glow">
                <div className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></div>
                System Active
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Advanced Intelligence Platform</span>
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              Uncover Digital
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Footprints
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Deep scan across multiple platforms to discover digital traces, social profiles, and online presence with military-grade precision.
            </p>
          </div>

          {/* Search Form */}
          <Card className="relative overflow-hidden border-primary/20 glow-border scan-effect">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
            <div className="relative p-8 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Main Search Input */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Enter username, email, or identifier..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-12 h-14 text-lg bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                  />
                </div>

                {/* Filters Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Search Type
                    </label>
                    <Select value={searchType} onValueChange={setSearchType}>
                      <SelectTrigger className="bg-background/50 border-border/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="username">Username</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Phone Number</SelectItem>
                        <SelectItem value="name">Full Name</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Platform
                    </label>
                    <Select value={platform} onValueChange={setPlatform}>
                      <SelectTrigger className="bg-background/50 border-border/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Platforms</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="coding">Coding/Dev</SelectItem>
                        <SelectItem value="forum">Forums</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      Scan Depth
                    </label>
                    <Select defaultValue="deep">
                      <SelectTrigger className="bg-background/50 border-border/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quick">Quick Scan</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="deep">Deep Scan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all shadow-lg hover:shadow-primary/50"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2"></div>
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Initiate Deep Scan
                    </>
                  )}
                </Button>
              </form>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Platforms Monitored', value: '50+', icon: Globe },
              { label: 'Database Records', value: '2.5B+', icon: Database },
              { label: 'Avg. Response Time', value: '<2s', icon: Zap },
              { label: 'Success Rate', value: '99.8%', icon: Shield },
            ].map((stat, idx) => (
              <Card key={idx} className="p-4 text-center border-border/50 bg-card/50 hover:border-primary/30 transition-all">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="font-mono">Powered by Advanced Intelligence Algorithms • Secure • Encrypted • Real-time</p>
        </div>
      </footer>
    </div>
  );
};

export default SearchPage;
