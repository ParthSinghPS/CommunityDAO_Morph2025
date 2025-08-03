'use client';

import { useState } from 'react';
import { CommunityCard } from '@/components/community/CommunityCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { mockCommunities } from '@/lib/mockData';
import { Search, Filter, Plus, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function CommunitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'members' | 'funds'>('newest');

  const filteredCommunities = mockCommunities
    .filter(community =>
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'members':
          return b.memberCount - a.memberCount;
        case 'funds':
          return parseFloat(b.totalFunds) - parseFloat(a.totalFunds);
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-6">
            Discover Communities
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join vibrant communities working together to fund innovative projects and make collective decisions.
          </p>
          
          <Link href="/communities/create">
            <GradientButton variant="primary" size="lg" className="group">
              <Plus className="w-5 h-5 mr-2" />
              <span>Create New Community</span>
            </GradientButton>
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search communities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Sort Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="pl-12 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="members">Most Members</option>
                <option value="funds">Highest Funding</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Communities</p>
                <p className="text-3xl font-bold">{mockCommunities.length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Total Members</p>
                <p className="text-3xl font-bold">
                  {mockCommunities.reduce((sum, c) => sum + c.memberCount, 0).toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-100 text-sm">Total Funds</p>
                <p className="text-3xl font-bold">
                  {mockCommunities.reduce((sum, c) => sum + parseFloat(c.totalFunds), 0).toFixed(1)} ETH
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-teal-200" />
            </div>
          </div>
        </div>

        {/* Communities Grid */}
        {filteredCommunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCommunities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Communities Found</h3>
            <p className="text-gray-600 mb-8">
              Try adjusting your search terms or create a new community.
            </p>
            <Link href="/communities/create">
              <GradientButton variant="primary">
                <Plus className="w-5 h-5 mr-2" />
                Create Community
              </GradientButton>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}