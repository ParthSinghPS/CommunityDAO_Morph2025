'use client';

import { Proposal } from '@/types/dao';
import { Calendar, Coins, TrendingUp, Users } from 'lucide-react';
import { GradientButton } from '@/components/ui/GradientButton';

interface ProposalCardProps {
  proposal: Proposal;
  onFund?: (proposalId: string) => void;
  onVote?: (proposalId: string, choice: 'for' | 'against' | 'abstain') => void;
}

export function ProposalCard({ proposal, onFund, onVote }: ProposalCardProps) {
  const totalVotes = proposal.votes.for + proposal.votes.against + proposal.votes.abstain;
  const forPercentage = totalVotes > 0 ? (proposal.votes.for / totalVotes) * 100 : 0;
  const fundingPercentage = (parseFloat(proposal.currentFunding) / parseFloat(proposal.fundingGoal)) * 100;
  
  const isVotingActive = new Date(proposal.votingDeadline) > new Date();
  const daysRemaining = Math.ceil((new Date(proposal.votingDeadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{proposal.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{proposal.description}</p>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-semibold ml-4 ${
          proposal.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
          proposal.status === 'funded' ? 'bg-blue-100 text-blue-700' :
          proposal.status === 'executed' ? 'bg-purple-100 text-purple-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
        </div>
      </div>

      {/* Funding Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Funding Progress</span>
          <span className="text-sm text-gray-500">
            {proposal.currentFunding} / {proposal.fundingGoal} ETH
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
          />
        </div>
        
        <div className="mt-1 text-right">
          <span className="text-xs text-gray-500">{fundingPercentage.toFixed(1)}% funded</span>
        </div>
      </div>

      {/* Voting Stats */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Voting Results</span>
          <span className="text-sm text-gray-500">{totalVotes} votes</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-emerald-600 font-medium">For ({proposal.votes.for})</span>
            <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${forPercentage}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">{forPercentage.toFixed(1)}%</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-red-600 font-medium">Against ({proposal.votes.against})</span>
            <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-red-500 rounded-full transition-all duration-500"
                style={{ width: `${totalVotes > 0 ? (proposal.votes.against / totalVotes) * 100 : 0}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">
              {totalVotes > 0 ? ((proposal.votes.against / totalVotes) * 100).toFixed(1) : 0}%
            </span>
          </div>
        </div>
      </div>

      {/* Time Remaining */}
      <div className="flex items-center space-x-4 mb-6 text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>
            {isVotingActive 
              ? `${daysRemaining} days remaining`
              : 'Voting ended'
            }
          </span>
        </div>
        
        <div className="flex items-center space-x-1">
          <Users className="w-4 h-4" />
          <span>Created by {proposal.creator.slice(0, 6)}...{proposal.creator.slice(-4)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <GradientButton
          variant="primary"
          size="sm"
          onClick={() => onFund?.(proposal.id)}
          className="flex-1"
        >
          <Coins className="w-4 h-4 mr-2" />
          Fund
        </GradientButton>
        
        {isVotingActive && (
          <>
            <GradientButton
              variant="success"
              size="sm"
              onClick={() => onVote?.(proposal.id, 'for')}
              className="flex-1"
            >
              Vote For
            </GradientButton>
            
            <GradientButton
              variant="warning"
              size="sm"
              onClick={() => onVote?.(proposal.id, 'against')}
              className="flex-1"
            >
              Vote Against
            </GradientButton>
          </>
        )}
      </div>
    </div>
  );
}