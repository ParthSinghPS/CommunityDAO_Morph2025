import { mockCommunities, mockProposals } from '@/lib/mockData';
import CommunityClient from './community';

export async function generateStaticParams() {
  return mockCommunities.map((community) => ({
    id: community.id,
  }));
}

export default function CommunityPage({ params }: { params: { id: string } }) {
  const communityId = params.id;
  const community = mockCommunities.find(c => c.id === communityId);
  const proposals = mockProposals.filter(p => p.communityId === communityId);

  if (!community) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Community Not Found</h1>
          <p className="text-gray-600">The community you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return <CommunityClient community={community} proposals={proposals} />;
}