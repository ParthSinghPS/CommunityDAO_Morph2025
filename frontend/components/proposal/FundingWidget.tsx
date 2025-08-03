'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { GradientButton } from '@/components/ui/GradientButton';
import { Coins, TrendingUp, X } from 'lucide-react';

interface FundingWidgetProps {
  proposalId: string;
  proposalTitle: string;
  currentFunding: string;
  fundingGoal: string;
  onClose: () => void;
  onFund: (amount: string) => Promise<void>;
}

export function FundingWidget({
  proposalId,
  proposalTitle,
  currentFunding,
  fundingGoal,
  onClose,
  onFund
}: FundingWidgetProps) {
  const { isConnected } = useAccount();
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fundingPercentage = (parseFloat(currentFunding) / parseFloat(fundingGoal)) * 100;
  const remainingFunding = parseFloat(fundingGoal) - parseFloat(currentFunding);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    setIsSubmitting(true);
    try {
      await onFund(amount);
      setAmount('');
      onClose();
    } catch (error) {
      console.error('Funding failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickAmounts = ['0.1', '0.5', '1.0', '2.0'];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold mb-2">Fund Proposal</h3>
              <p className="text-blue-100 text-sm line-clamp-2">{proposalTitle}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Funding Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Current Progress</span>
              <span className="text-sm text-gray-500">
                {currentFunding} / {fundingGoal} ETH
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mb-2">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
              />
            </div>
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>{fundingPercentage.toFixed(1)}% funded</span>
              <span>{remainingFunding.toFixed(2)} ETH remaining</span>
            </div>
          </div>

          {!isConnected ? (
            <div className="text-center py-4">
              <Coins className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-4">Connect your wallet to fund this proposal</p>
              <w3m-button />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Funding Amount (ETH)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    max={remainingFunding.toString()}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="0.00"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    ETH
                  </div>
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quick Amounts
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {quickAmounts.map((quickAmount) => (
                    <button
                      key={quickAmount}
                      type="button"
                      onClick={() => setAmount(quickAmount)}
                      className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors"
                    >
                      {quickAmount} ETH
                    </button>
                  ))}
                </div>
              </div>

              {/* Impact Preview */}
              {amount && parseFloat(amount) > 0 && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 text-blue-700 mb-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">Impact Preview</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Your contribution: <span className="font-semibold">{amount} ETH</span></p>
                    <p>New total: <span className="font-semibold">
                      {(parseFloat(currentFunding) + parseFloat(amount)).toFixed(2)} ETH
                    </span></p>
                    <p>Progress: <span className="font-semibold">
                      {(((parseFloat(currentFunding) + parseFloat(amount)) / parseFloat(fundingGoal)) * 100).toFixed(1)}%
                    </span></p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <GradientButton
                type="submit"
                variant="primary"
                size="md"
                className="w-full"
                isLoading={isSubmitting}
                disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > remainingFunding}
              >
                <Coins className="w-5 h-5 mr-2" />
                Fund Proposal
              </GradientButton>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}