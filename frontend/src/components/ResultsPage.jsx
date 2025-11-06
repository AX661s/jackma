import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, Filter, Shield, AlertTriangle, CheckCircle2, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Skeleton } from './ui/skeleton';
import SocialCard from './SocialCard';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export const ResultsPage = ({ results, query, onBack }) => {
  const [filteredResults, setFilteredResults] = useState([]);
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const [visibleCards, setVisibleCards] = useState(0);

  useEffect(() => {
    // Simulate stats loading
    setTimeout(() => setIsLoadingStats(false), 600);
    
    // Simulate cards loading with progressive reveal
    setTimeout(() => {
      setIsLoadingCards(false);
    }, 1000);
  }, []);

  // Progressive card reveal
  useEffect(() => {
    if (!isLoadingCards && filteredResults.length > 0) {
      setVisibleCards(0);
      const interval = setInterval(() => {
        setVisibleCards(prev => {
          if (prev >= filteredResults.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 80);
      return () => clearInterval(interval);
    }
  }, [isLoadingCards, filteredResults.length]);

  useEffect(() => {
    let filtered = results;

    if (filterPlatform !== 'all') {
      filtered = filtered.filter(r => r.platform === filterPlatform);
    }

    if (filterRisk !== 'all') {
      filtered = filtered.filter(r => r.risk === filterRisk);
    }

    if (searchTerm) {
      filtered = filtered.filter(r => 
        r.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.platform.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredResults(filtered);
  }, [filterPlatform, filterRisk, searchTerm, results]);

  const getRiskStats = () => {
    const stats = { low: 0, medium: 0, high: 0 };
    results.forEach(r => stats[r.risk]++);
    return stats;
  };

  const riskStats = getRiskStats();

  // Skeleton for stat cards
  const StatCardSkeleton = () => (
    <Card className="p-6 border-border/50 bg-gradient-to-br from-card via-card to-primary/5">
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-4 w-20 bg-muted/50" />
        <Skeleton className="h-5 w-5 rounded bg-muted/50" />
      </div>
      <Skeleton className="h-9 w-16 bg-muted/50" />
    </Card>
  );

  // Skeleton for social cards
  const SocialCardSkeleton = ({ delay = 0 }) => (
    <Card 
      className="relative overflow-hidden border-border/50 animate-pulse"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="w-14 h-14 rounded-full bg-muted/50" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-24 bg-muted/50" />
              <Skeleton className="h-3 w-32 bg-muted/50" />
            </div>
          </div>
          <Skeleton className="h-6 w-12 rounded-full bg-muted/50" />
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-full bg-muted/50" />
          <Skeleton className="h-3 w-3/4 bg-muted/50" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-border/50">
          {[1, 2, 3].map(i => (
            <div key={i} className="text-center space-y-1">
              <Skeleton className="h-6 w-12 mx-auto bg-muted/50" />
              <Skeleton className="h-3 w-16 mx-auto bg-muted/50" />
            </div>
          ))}
        </div>

        {/* Metadata */}
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-3 w-full bg-muted/50" />
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-4 w-20 bg-muted/50" />
          <Skeleton className="h-8 w-16 rounded bg-muted/50" />
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">Scan Results</h1>
                <p className="text-sm text-muted-foreground font-mono">Query: <span className="text-primary">{query}</span></p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isLoadingStats ? (
                <Skeleton className="h-6 w-20 rounded-full bg-muted/50" />
              ) : (
                <Badge variant="outline" className="border-primary/30 text-primary">
                  {results.length} Found
                </Badge>
              )}
              <Button variant="outline" size="sm" className="gap-2" disabled={isLoadingStats}>
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {isLoadingStats ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <Card className="p-6 border-border/50 bg-gradient-to-br from-card via-card to-primary/5 animate-fade-in">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Total Profiles</span>
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground">{results.length}</div>
              </Card>
              
              <Card className="p-6 border-border/50 bg-gradient-to-br from-card via-card to-accent/5 animate-fade-in" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Low Risk</span>
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                </div>
                <div className="text-3xl font-bold text-accent">{riskStats.low}</div>
              </Card>
              
              <Card className="p-6 border-border/50 bg-gradient-to-br from-card via-card to-warning/5 animate-fade-in" style={{ animationDelay: '200ms' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Medium Risk</span>
                  <AlertTriangle className="w-5 h-5 text-warning" />
                </div>
                <div className="text-3xl font-bold text-warning">{riskStats.medium}</div>
              </Card>
              
              <Card className="p-6 border-border/50 bg-gradient-to-br from-card via-card to-destructive/5 animate-fade-in" style={{ animationDelay: '300ms' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">High Risk</span>
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <div className="text-3xl font-bold text-destructive">{riskStats.high}</div>
              </Card>
            </>
          )}
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8 border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Filter Results</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search in results..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-background/50"
              disabled={isLoadingCards}
            />
            <Select value={filterPlatform} onValueChange={setFilterPlatform} disabled={isLoadingCards}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="All Platforms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="github">GitHub</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="reddit">Reddit</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterRisk} onValueChange={setFilterRisk} disabled={isLoadingCards}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="All Risk Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Results Grid */}
        {isLoadingCards ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, idx) => (
              <SocialCardSkeleton key={idx} delay={idx * 100} />
            ))}
          </div>
        ) : filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResults.map((result, idx) => (
              <div
                key={idx}
                className={`transition-all duration-500 ${
                  idx < visibleCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <SocialCard data={result} index={idx} />
              </div>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center border-border/50 animate-fade-in">
            <Shield className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No Results Found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search criteria</p>
          </Card>
        )}
      </main>
    </div>
  );
};

export default ResultsPage;
