'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FileText, Globe, Users, CheckCircle, Clock, AlertCircle, Upload, MessageCircle, LogOut } from 'lucide-react';

export const dynamic = 'force-dynamic';

// Mock data for applications
const mockApplications = [
  {
    id: 'APP-2024-001',
    service: 'Passport Application',
    status: 'pending',
    date: '2024-10-20',
    progress: 40,
  },
  {
    id: 'APP-2024-002',
    service: 'Business License',
    status: 'in-review',
    date: '2024-10-18',
    progress: 70,
  },
  {
    id: 'APP-2024-003',
    service: 'Professional Certification',
    status: 'approved',
    date: '2024-10-15',
    progress: 100,
  },
];

// Mock user data
const mockUser = {
  name: 'John Professional',
  email: 'john.pro@example.com',
  memberSince: '2024',
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-purple">
      {/* Main Container */}
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Top Navigation Bar */}
        <nav className="bg-container-dark rounded-[20px] shadow-container mb-6 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/generated/pros-smp-seal.png"
              alt="Pro's SMP"
              width={48}
              height={48}
              className="opacity-90"
            />
            <div>
              <div className="text-white font-semibold text-lg">Pro&apos;s SMP</div>
              <div className="text-white/70 text-xs">Government Portal</div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" className="text-white text-sm hover:opacity-80 transition-opacity">
              Home
            </Link>
            <Link href="/dashboard" className="text-white text-sm font-semibold border-b-2 border-white pb-1">
              Dashboard
            </Link>
            <Link href="#services" className="text-white text-sm hover:opacity-80 transition-opacity">
              Services
            </Link>
            <Link href="#profile" className="text-white text-sm hover:opacity-80 transition-opacity">
              Profile
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 border border-white/30 rounded-lg text-white text-sm hover:bg-white/10 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Link>
          </div>
        </nav>

        {/* Welcome Section */}
        <div className="bg-container-dark rounded-[20px] shadow-container p-8 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white mb-2">Welcome back, {mockUser.name}</h2>
              <p className="text-white/70">Member since {mockUser.memberSince}</p>
            </div>
            <div className="text-right">
              <div className="text-white/70 text-sm">Active Applications</div>
              <div className="text-white text-3xl font-bold">{mockApplications.filter(app => app.status !== 'approved').length}</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Available Services */}
          <div className="col-span-2">
            <div className="bg-container-dark rounded-[20px] shadow-container p-8">
              <h3 className="text-white text-xl font-semibold mb-6">Available Services</h3>

              <div className="grid grid-cols-3 gap-4">
                {/* Passport Service */}
                <Link
                  href="/services/passport"
                  className="bg-card-light rounded-[16px] p-6 text-center shadow-card hover:shadow-md transition-all hover:scale-105"
                >
                  <div className="flex justify-center mb-3">
                    <FileText className="w-10 h-10 text-card-dark" strokeWidth={2} />
                  </div>
                  <h5 className="text-card-dark mb-2">Passport Application</h5>
                  <p className="text-small text-card-dark/80">Get your SMP passport</p>
                </Link>

                {/* Airline Tickets */}
                <Link
                  href="/services/airline-ticket"
                  className="bg-card-light rounded-[16px] p-6 text-center shadow-card hover:shadow-md transition-all hover:scale-105"
                >
                  <div className="flex justify-center mb-3">
                    <Globe className="w-10 h-10 text-card-dark" strokeWidth={2} />
                  </div>
                  <h5 className="text-card-dark mb-2">Airline Tickets</h5>
                  <p className="text-small text-card-dark/80">Book your flight</p>
                </Link>

                {/* Citizen Services */}
                <Link
                  href="/services"
                  className="bg-card-light rounded-[16px] p-6 text-center shadow-card hover:shadow-md transition-all hover:scale-105"
                >
                  <div className="flex justify-center mb-3">
                    <CheckCircle className="w-10 h-10 text-card-dark" strokeWidth={2} />
                  </div>
                  <h5 className="text-card-dark mb-2">Citizen Services</h5>
                  <p className="text-small text-card-dark/80">Cars & buildings</p>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="col-span-1">
            <div className="bg-container-dark rounded-[20px] shadow-container p-8">
              <h3 className="text-white text-xl font-semibold mb-6">Quick Actions</h3>

              <div className="space-y-4">
                <Link
                  href="/services"
                  className="flex items-center gap-3 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
                >
                  <FileText className="w-5 h-5 text-white" />
                  <span className="text-white text-sm font-medium">New Application</span>
                </Link>

                <button className="w-full flex items-center gap-3 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
                  <Upload className="w-5 h-5 text-white" />
                  <span className="text-white text-sm font-medium">Upload Documents</span>
                </button>

                <button className="w-full flex items-center gap-3 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span className="text-white text-sm font-medium">Support Chat</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Application Status Section */}
        <div className="bg-container-dark rounded-[20px] shadow-container p-8">
          <h3 className="text-white text-xl font-semibold mb-6">Your Applications</h3>

          <div className="space-y-4">
            {mockApplications.map((application) => (
              <div
                key={application.id}
                className="bg-white/5 rounded-[12px] p-6 border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h5 className="text-white font-semibold">{application.service}</h5>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          application.status === 'approved'
                            ? 'bg-green-500/20 text-green-300'
                            : application.status === 'in-review'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-yellow-500/20 text-yellow-300'
                        }`}
                      >
                        {application.status === 'approved'
                          ? 'Approved - Ready for Pickup'
                          : application.status === 'in-review'
                          ? 'Review in Progress'
                          : 'Application Pending'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-white/70 text-sm">
                      <span>Application ID: {application.id}</span>
                      <span>•</span>
                      <span>Submitted: {application.date}</span>
                    </div>
                  </div>

                  {application.status === 'approved' ? (
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  ) : application.status === 'in-review' ? (
                    <Clock className="w-8 h-8 text-blue-400" />
                  ) : (
                    <AlertCircle className="w-8 h-8 text-yellow-400" />
                  )}
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-white/70 text-xs mb-2">
                    <span>Progress</span>
                    <span>{application.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all"
                      style={{ width: `${application.progress}%` }}
                    />
                  </div>
                </div>

                {/* Estimated Time */}
                <div className="text-white/70 text-xs">
                  Estimated processing time:{' '}
                  {application.status === 'approved'
                    ? 'Complete'
                    : application.status === 'in-review'
                    ? '5-7 business days'
                    : '10-14 business days'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
