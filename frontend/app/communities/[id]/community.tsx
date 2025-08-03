'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ProposalCard } from '@/components/proposal/ProposalCard';
import { FundingWidget } from '@/components/proposal/FundingWidget';
import { GradientButton } from '@/components/ui/GradientButton';
import { Users, Coins, Calendar, Plus, Trophy, TrendingUp } from 'lucide-react';


interface CommunityClientProps {
    community: any;
    proposals: any[];
}

export default function CommunityClient({ community, proposals }: CommunityClientProps) {
    const { isConnected } = useAccount();
    const [showFundingWidget, setShowFundingWidget] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'proposals' | 'about'>('proposals');


    const handleFund = async (amount: string) => {
        // TODO: Implement actual funding logic with smart contract
        console.log('Funding proposal with amount:', amount);
        await new Promise(resolve => setTimeout(resolve, 2000));
    };

    const handleVote = async (proposalId: string, choice: 'for' | 'against' | 'abstain') => {
        // TODO: Implement actual voting logic with smart contract
        console.log('Voting on proposal:', proposalId, 'choice:', choice);
        await new Promise(resolve => setTimeout(resolve, 1000));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="h-64 md:h-80">
                    <img
                        src={community.image}
                        alt={community.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-end justify-between">
                            <div className="text-white">
                                <h1 className="text-3xl md:text-5xl font-bold mb-4">{community.name}</h1>
                                <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
                                    {community.description}
                                </p>
                            </div>

                            <div className={`px-4 py-2 rounded-full text-sm font-semibold ${community.isActive
                                ? 'bg-emerald-500 text-white'
                                : 'bg-gray-500 text-white'
                                }`}>
                                {community.isActive ? 'Active' : 'Inactive'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 -mt-20 relative z-10">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Members</p>
                                <p className="text-2xl font-bold text-gray-900">{community.memberCount.toLocaleString()}</p>
                            </div>
                            <Users className="w-8 h-8 text-blue-500" />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Total Funds</p>
                                <p className="text-2xl font-bold text-gray-900">{community.totalFunds} ETH</p>
                            </div>
                            <Coins className="w-8 h-8 text-emerald-500" />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Active Proposals</p>
                                <p className="text-2xl font-bold text-gray-900">{proposals.filter(p => p.status === 'active').length}</p>
                            </div>
                            <TrendingUp className="w-8 h-8 text-purple-500" />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Created</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {new Date(community.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                </p>
                            </div>
                            <Calendar className="w-8 h-8 text-teal-500" />
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 mb-8 max-w-md">
                    <button
                        onClick={() => setActiveTab('proposals')}
                        className={`flex-1 px-6 py-3 text-sm font-medium rounded-lg transition-all ${activeTab === 'proposals'
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-800'
                            }`}
                    >
                        Proposals ({proposals.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('about')}
                        className={`flex-1 px-6 py-3 text-sm font-medium rounded-lg transition-all ${activeTab === 'about'
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-800'
                            }`}
                    >
                        About
                    </button>
                </div>

                {/* Content */}
                {activeTab === 'proposals' && (
                    <div>
                        {/* Create Proposal Button */}
                        {isConnected && (
                            <div className="mb-8">
                                <GradientButton variant="primary" className="group">
                                    <Plus className="w-5 h-5 mr-2" />
                                    <span>Create New Proposal</span>
                                </GradientButton>
                            </div>
                        )}

                        {/* Proposals Grid */}
                        {proposals.length > 0 ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {proposals.map((proposal) => (
                                    <ProposalCard
                                        key={proposal.id}
                                        proposal={proposal}
                                        onFund={(proposalId) => setShowFundingWidget(proposalId)}
                                        onVote={handleVote}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Trophy className="w-12 h-12 text-gray-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">No Proposals Yet</h3>
                                <p className="text-gray-600 mb-8">
                                    Be the first to propose an initiative for this community.
                                </p>
                                {isConnected && (
                                    <GradientButton variant="primary">
                                        <Plus className="w-5 h-5 mr-2" />
                                        Create First Proposal
                                    </GradientButton>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'about' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Community</h2>
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    {community.description}
                                </p>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <span className="text-gray-600">Creator</span>
                                        <span className="font-medium text-gray-900">{community.creator}</span>
                                    </div>

                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <span className="text-gray-600">Created</span>
                                        <span className="font-medium text-gray-900">
                                            {new Date(community.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <span className="text-gray-600">Status</span>
                                        <span className={`font-medium ${community.isActive ? 'text-emerald-600' : 'text-gray-600'}`}>
                                            {community.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Community Rules</h2>
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Proposal Guidelines</h3>
                                        <p className="text-gray-600">
                                            All proposals must clearly outline the project goals, timeline, and budget requirements.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Voting Process</h3>
                                        <p className="text-gray-600">
                                            Voting is open for 7 days after proposal submission. A simple majority determines the outcome.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Funding Distribution</h3>
                                        <p className="text-gray-600">
                                            Funds are automatically distributed to winning proposals after voting concludes.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Funding Widget Modal */}
            {showFundingWidget && (
                <FundingWidget
                    proposalId={showFundingWidget}
                    proposalTitle={proposals.find(p => p.id === showFundingWidget)?.title || ''}
                    currentFunding={proposals.find(p => p.id === showFundingWidget)?.currentFunding || '0'}
                    fundingGoal={proposals.find(p => p.id === showFundingWidget)?.fundingGoal || '0'}
                    onClose={() => setShowFundingWidget(null)}
                    onFund={handleFund}
                />
            )}
        </div>
    );
}