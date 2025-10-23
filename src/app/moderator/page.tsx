'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Shield } from 'lucide-react';

export const dynamic = 'force-dynamic';

const MODERATOR_CREDENTIALS = {
  username: 'Itz_Jojoseawat',
  password: 'Ahad@13072012',
};

export default function ModeratorLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simple credential check
    if (username === MODERATOR_CREDENTIALS.username && password === MODERATOR_CREDENTIALS.password) {
      // Store moderator session
      sessionStorage.setItem('moderator_logged_in', 'true');
      // Redirect to moderator dashboard
      router.push('/moderator/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-purple">
      <div className="max-w-[500px] mx-auto px-6 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Login Container */}
        <div className="bg-container-dark rounded-[20px] shadow-container p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-white mb-2">Moderator Access</h2>
            <p className="text-white/70 text-sm">Authorized personnel only</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-center">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-white text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter moderator username"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter moderator password"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-white rounded-lg text-card-dark font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? 'Logging in...' : 'Login as Moderator'}
            </button>
          </form>

          {/* Footer Note */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-white/60 text-xs text-center">
              This area is restricted to authorized moderators only. All access is logged and monitored.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
