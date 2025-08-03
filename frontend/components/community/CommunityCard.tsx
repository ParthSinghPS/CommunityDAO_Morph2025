'use client';

import { Community } from '@/types/dao';
import { Users, Coins, ArrowRight } from 'lucide-react';
import { GradientButton } from '@/components/ui/GradientButton';
import Link from 'next/link';

interface CommunityCardProps {
  community: Community;
}

export function CommunityCard({ community }: CommunityCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
      {/* Background Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={community.image}
          alt={community.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            community.isActive 
              ? 'bg-emerald-500 text-white' 
              : 'bg-gray-500 text-white'
          }`}>
            {community.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {community.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {community.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2 text-gray-500">
            <Users className="w-4 h-4" />
            <span className="text-sm">{community.memberCount.toLocaleString()} members</span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-500">
            <Coins className="w-4 h-4" />
            <span className="text-sm">{community.totalFunds} ETH</span>
          </div>
        </div>

        {/* Action Button */}
        <Link href={`/communities/${community.id}`}>
          <GradientButton
            variant="primary"
            size="sm"
            className="w-full group-hover:shadow-lg"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>View Community</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </GradientButton>
        </Link>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}