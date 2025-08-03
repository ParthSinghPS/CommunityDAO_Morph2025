import { CreateCommunityForm } from '@/components/community/CreateCommunityForm';

export default function CreateCommunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-6">
            Create Your Community
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start building a decentralized community where members can propose, fund, and vote on initiatives together.
          </p>
        </div>

        {/* Form */}
        <CreateCommunityForm />
      </div>
    </div>
  );
}