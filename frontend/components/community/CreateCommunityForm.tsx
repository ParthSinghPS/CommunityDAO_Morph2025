'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { GradientButton } from '@/components/ui/GradientButton';
import { Users, FileText, Clock, CheckCircle } from 'lucide-react';

interface FormData {
  name: string;
  description: string;
  minVotingPeriod: string;
}

interface FormErrors {
  name?: string;
  description?: string;
  minVotingPeriod?: string;
}

export function CreateCommunityForm() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    minVotingPeriod: '7'
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const steps = [
    { id: 1, name: 'Basic Info', icon: Users },
    { id: 2, name: 'Details', icon: FileText },
    { id: 3, name: 'Settings', icon: Clock },
    { id: 4, name: 'Review', icon: CheckCircle }
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    
    if (step >= 1) {
      if (!formData.name) newErrors.name = 'Community name is required';
      else if (formData.name.length < 3) newErrors.name = 'Name must be at least 3 characters';
    }
    
    if (step >= 2) {
      if (!formData.description) newErrors.description = 'Description is required';
      else if (formData.description.length < 10) newErrors.description = 'Description must be at least 10 characters';
    }
    
    if (step >= 3) {
      const period = parseInt(formData.minVotingPeriod);
      if (!period || period < 1) newErrors.minVotingPeriod = 'Minimum voting period must be at least 1 day';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate contract interaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Replace with actual contract call
      // const { writeContract } = useWriteContract();
      // await writeContract({
      //   address: CONTRACT_ADDRESSES.DAO_FACTORY,
      //   abi: DAO_FACTORY_ABI,
      //   functionName: 'createCommunity',
      //   args: [formData.name, formData.description, BigInt(formData.minVotingPeriod)]
      // });
      
      router.push('/communities');
    } catch (error) {
      console.error('Error creating community:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect Your Wallet</h3>
          <p className="text-gray-600 mb-6">You need to connect your wallet to create a new community.</p>
          <w3m-button />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                  isCompleted
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : isActive
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'border-gray-300 text-gray-400'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`ml-3 ${isActive ? 'text-blue-600' : isCompleted ? 'text-emerald-600' : 'text-gray-400'}`}>
                  <p className="text-sm font-medium">{step.name}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${isCompleted ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Community Name</h2>
              <p className="text-gray-600 mb-6">Choose a name that represents your community's mission.</p>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Community Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., DeFi Innovators"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Community Description</h2>
              <p className="text-gray-600 mb-6">Describe your community's purpose and goals.</p>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe what your community is about, its goals, and how members can contribute..."
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                <p className="mt-2 text-sm text-gray-500">
                  {formData.description.length}/500 characters
                </p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Governance Settings</h2>
              <p className="text-gray-600 mb-6">Configure how proposals and voting will work in your community.</p>
              
              <div>
                <label htmlFor="votingPeriod" className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Voting Period (days) *
                </label>
                <input
                  type="number"
                  id="votingPeriod"
                  min="1"
                  max="30"
                  value={formData.minVotingPeriod}
                  onChange={(e) => setFormData(prev => ({ ...prev, minVotingPeriod: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.minVotingPeriod ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.minVotingPeriod && <p className="mt-1 text-sm text-red-600">{errors.minVotingPeriod}</p>}
                <p className="mt-2 text-sm text-gray-500">
                  How long should voting be open for each proposal?
                </p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Create</h2>
              <p className="text-gray-600 mb-6">Please review your community details before creating.</p>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Community Name</label>
                  <p className="text-lg font-semibold text-gray-900">{formData.name}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Description</label>
                  <p className="text-gray-700">{formData.description}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Minimum Voting Period</label>
                  <p className="text-gray-700">{formData.minVotingPeriod} days</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <div>
            {currentStep > 1 && (
              <button
                onClick={handlePrevious}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Previous
              </button>
            )}
          </div>
          
          <div>
            {currentStep < 4 ? (
              <GradientButton onClick={handleNext} variant="primary">
                Next Step
              </GradientButton>
            ) : (
              <GradientButton
                onClick={handleSubmit}
                variant="success"
                isLoading={isSubmitting}
              >
                Create Community
              </GradientButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}