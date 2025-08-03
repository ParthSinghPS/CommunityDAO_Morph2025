import { Community, Proposal } from '@/types/dao';

export const mockCommunities: Community[] = [
  {
    id: '1',
    name: 'DeFi Innovators',
    description: 'Building the future of decentralized finance through community-driven innovation and funding.',
    memberCount: 1247,
    totalFunds: '125.5',
    image: 'https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=800',
    creator: '0x1234...5678',
    createdAt: '2024-01-15T10:30:00Z',
    isActive: true
  },
  {
    id: '2',
    name: 'NFT Artists Collective',
    description: 'Supporting digital artists and creators through collaborative funding and governance.',
    memberCount: 892,
    totalFunds: '78.2',
    image: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=800',
    creator: '0x2345...6789',
    createdAt: '2024-01-10T14:20:00Z',
    isActive: true
  },
  {
    id: '3',
    name: 'Green Tech DAO',
    description: 'Funding sustainable technology projects that benefit the environment and society.',
    memberCount: 1586,
    totalFunds: '203.7',
    image: 'https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=800',
    creator: '0x3456...7890',
    createdAt: '2024-01-05T09:15:00Z',
    isActive: true
  }
];

export const mockProposals: Proposal[] = [
  {
    id: '1',
    communityId: '1',
    title: 'Develop Cross-Chain Bridge Protocol',
    description: 'Create a secure and efficient bridge to connect Ethereum and Polygon networks for seamless asset transfers.',
    fundingGoal: '50.0',
    currentFunding: '32.5',
    votes: { for: 156, against: 23, abstain: 12 },
    votingDeadline: '2024-02-15T23:59:59Z',
    status: 'active',
    creator: '0x4567...8901',
    createdAt: '2024-01-20T16:45:00Z'
  },
  {
    id: '2',
    communityId: '1',
    title: 'DeFi Yield Optimization Tool',
    description: 'Build an automated tool to help users maximize yields across multiple DeFi protocols.',
    fundingGoal: '35.0',
    currentFunding: '28.9',
    votes: { for: 134, against: 45, abstain: 8 },
    votingDeadline: '2024-02-10T23:59:59Z',
    status: 'active',
    creator: '0x5678...9012',
    createdAt: '2024-01-18T11:30:00Z'
  }
];