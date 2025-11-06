import React, { useState } from 'react';
import { ExternalLink, MapPin, Calendar, TrendingUp, Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

const platformColors = {
  twitter: 'hsl(203 89% 53%)',
  instagram: 'hsl(329 90% 52%)',
  facebook: 'hsl(221 44% 41%)',
  linkedin: 'hsl(201 100% 35%)',
  github: 'hsl(0 0% 15%)',
  reddit: 'hsl(16 100% 50%)',
  tiktok: 'hsl(0 0% 0%)',
  youtube: 'hsl(0 100% 50%)',
};

const platformIcons = {
  twitter: '𝕏',
  instagram: 'IG',
  facebook: 'FB',
  linkedin: 'in',
  github: 'GH',
  reddit: 'RD',
  tiktok: 'TT',
  youtube: 'YT',
};

export const SocialCard = ({ data, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const platformColor = platformColors[data.platform] || 'hsl(var(--primary))';

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'hsl(var(--accent))';
      case 'medium': return 'hsl(var(--warning))';
      case 'high': return 'hsl(var(--destructive))';
      default: return 'hsl(var(--muted))';
    }
  };

  const getRiskIcon = (risk) => {
    switch (risk) {
      case 'low': return CheckCircle;
      case 'medium': return Shield;
      case 'high': return AlertTriangle;
      default: return Shield;
    }
  };

  const RiskIcon = getRiskIcon(data.risk);

  return (
    <Card
      className="relative overflow-hidden border-border/50 transition-all duration-300 hover:border-primary/50 glow-border group"
      style={{
        animationDelay: `${index * 50}ms`,
        animation: 'fadeIn 0.5s ease-out forwards',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at top right, ${platformColor}15, transparent 70%)`
        }}
      ></div>

      <div className="relative p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-14 h-14 border-2" style={{ borderColor: platformColor }}>
                <AvatarImage src={data.avatar} alt={data.username} />
                <AvatarFallback style={{ backgroundColor: platformColor }}>
                  {data.displayName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {data.verified && (
                <div 
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-card"
                  style={{ backgroundColor: platformColor }}
                >
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm truncate text-foreground">{data.displayName}</h3>
              </div>
              <p className="text-xs text-muted-foreground font-mono truncate">@{data.username}</p>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className="shrink-0 text-xs font-mono"
            style={{ 
              borderColor: platformColor,
              color: platformColor,
            }}
          >
            {platformIcons[data.platform] || data.platform.toUpperCase()}
          </Badge>
        </div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {data.bio}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-border/50">
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{formatNumber(data.followers)}</div>
            <div className="text-xs text-muted-foreground">Followers</div>
          </div>
          <div className="text-center border-x border-border/50">
            <div className="text-lg font-bold text-foreground">{formatNumber(data.following)}</div>
            <div className="text-xs text-muted-foreground">Following</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{formatNumber(data.posts)}</div>
            <div className="text-xs text-muted-foreground">Posts</div>
          </div>
        </div>

        {/* Metadata */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{data.location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>Joined {data.joinDate}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <TrendingUp className="w-3 h-3" />
            <span>Active {data.lastActive}</span>
          </div>
        </div>

        {/* Risk Badge */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <RiskIcon className="w-4 h-4" style={{ color: getRiskColor(data.risk) }} />
            <span className="text-xs font-medium" style={{ color: getRiskColor(data.risk) }}>
              {data.risk.toUpperCase()} RISK
            </span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 gap-1 hover:bg-primary/10 hover:text-primary transition-colors"
            onClick={() => window.open(data.profileUrl, '_blank')}
          >
            <span className="text-xs">View</span>
            <ExternalLink className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

// Fade-in animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(style);
}

export default SocialCard;
