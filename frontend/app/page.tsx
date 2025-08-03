'use client';

import Link from 'next/link';
import { GradientButton } from '@/components/ui/GradientButton';
import { Users, Vote, Coins, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Users,
      title: 'Create Communities',
      description: 'Build and manage decentralized communities with shared governance and funding goals.'
    },
    {
      icon: Vote,
      title: 'Democratic Voting',
      description: 'Participate in transparent voting processes with time-based constraints and clear outcomes.'
    },
    {
      icon: Coins,
      title: 'Collective Funding',
      description: 'Pool resources together to fund proposals that benefit the entire community.'
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor funding progress, voting results, and community growth in real-time.'
    }
  ];

  const stats = [
    { label: 'Active Communities', value: '150+' },
    { label: 'Total Funds Raised', value: '2.4K ETH' },
    { label: 'Proposals Funded', value: '430+' },
    { label: 'Community Members', value: '12K+' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-teal-600/10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-6 leading-tight">
              Decentralized
              <br />
              Community Governance
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              Create, fund, and govern communities through transparent voting and collective decision-making. 
              Join the future of decentralized collaboration.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link href="/communities">
                <GradientButton variant="primary" size="lg" className="group">
                  <span className="flex items-center space-x-2">
                    <span>Explore Communities</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </GradientButton>
              </Link>
              
              <Link href="/communities/create">
                <GradientButton variant="secondary" size="lg">
                  Create Community
                </GradientButton>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform makes it easy to create, participate in, and govern decentralized communities
              through transparent processes and collective decision-making.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Process */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these easy steps to participate in decentralized governance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Connect & Join',
                description: 'Connect your Web3 wallet and join communities that align with your interests and values.'
              },
              {
                step: '2',
                title: 'Propose & Fund',
                description: 'Submit proposals for community initiatives and contribute funds to support projects you believe in.'
              },
              {
                step: '3',
                title: 'Vote & Govern',
                description: 'Participate in transparent voting processes to collectively decide which proposals receive funding.'
              }
            ].map((process, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {process.step}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{process.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {process.description}
                  </p>
                </div>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-16 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Governing?
          </h2>
          
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Join thousands of community members who are already participating in 
            decentralized governance and collective decision-making.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/communities">
              <GradientButton variant="secondary" size="lg">
                Browse Communities
              </GradientButton>
            </Link>
            
            <Link href="/communities/create">
              <button className="px-8 py-4 text-lg font-semibold text-white border-2 border-white rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:scale-105">
                Start Your Community
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}