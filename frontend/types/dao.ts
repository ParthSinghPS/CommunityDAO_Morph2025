export interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  totalFunds: string;
  image: string;
  creator: string;
  createdAt: string;
  isActive: boolean;
}

export interface Proposal {
  id: string;
  communityId: string;
  title: string;
  description: string;
  fundingGoal: string;
  currentFunding: string;
  votes: {
    for: number;
    against: number;
    abstain: number;
  };
  votingDeadline: string;
  status: 'active' | 'funded' | 'executed' | 'failed';
  creator: string;
  createdAt: string;
}

export interface Vote {
  proposalId: string;
  voter: string;
  choice: 'for' | 'against' | 'abstain';
  timestamp: string;
}

export interface FundingContribution {
  proposalId: string;
  contributor: string;
  amount: string;
  timestamp: string;
}