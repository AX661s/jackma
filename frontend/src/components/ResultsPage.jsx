import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, Filter, Shield, AlertTriangle, CheckCircle2, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
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
  const [filteredResults, setFilteredResults] = useState(results);
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading animation
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

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
              <Badge variant="outline" className="border-primary/30 text-primary">
                {results.length} Found
              </Badge>
              <Button variant="outline" size="sm" className="gap-2">
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
          <Card className="p-6 border-border/50 bg-gradient-to-br from-card via-card to-primary/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Profiles</span>
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div className="text-3xl font-bold text-foreground">{results.length}</div>
          </Card>
          
          <Card className="p-6 border-border/50 bg-gradient-to-br from-card via-card to-accent/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Low Risk</span>
              <CheckCircle2 className="w-5 h-5 text-accent" />
            </div>
            <div className="text-3xl font-bold text-accent">{riskStats.low}</div>
          </Card>
          
          <Card className="p-6 border-border/50 bg-gradient-to-br from-card via-card to-warning/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Medium Risk</span>
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <div className="text-3xl font-bold text-warning">{riskStats.medium}</div>
          </Card>
          
          <Card className="p-6 border-border/50 bg-gradient-to-br from-card via-card to-destructive/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">High Risk</span>
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div className="text-3xl font-bold text-destructive">{riskStats.high}</div>
          </Card>
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
            />
            <Select value={filterPlatform} onValueChange={setFilterPlatform}>
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
            <Select value={filterRisk} onValueChange={setFilterRisk}>
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
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, idx) => (
              <Card key={idx} className="p-6 border-border/50 animate-pulse">
                <div className="w-16 h-16 bg-muted rounded-full mb-4"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded w-3/4"></div>
              </Card>
            ))}
          </div>
        ) : filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResults.map((result, idx) => (
              <SocialCard key={idx} data={result} index={idx} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center border-border/50">
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
