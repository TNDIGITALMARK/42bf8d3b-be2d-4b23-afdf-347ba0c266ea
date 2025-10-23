'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, FileText, Plane, Building2, Car } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-purple">
      <div className="max-w-[1000px] mx-auto px-6 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Main Container */}
        <div className="bg-container-dark rounded-[20px] shadow-container p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Image
              src="/generated/pros-smp-seal.png"
              alt="Pro's SMP"
              width={48}
              height={48}
              className="opacity-90"
            />
            <div>
              <h2 className="text-white">Available Services</h2>
              <p className="text-white/70 text-sm">Select a service to get started</p>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Passport Application */}
            <Link
              href="/services/passport"
              className="bg-card-light rounded-[16px] p-8 shadow-card hover:shadow-md transition-all hover:scale-105 group"
            >
              <div className="flex items-start gap-4">
                <div className="bg-card-dark/10 p-3 rounded-lg group-hover:bg-card-dark/20 transition-all">
                  <FileText className="w-8 h-8 text-card-dark" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h3 className="text-card-dark text-xl font-semibold mb-2">Passport Application</h3>
                  <p className="text-small text-card-dark/80 mb-4">
                    Apply for a new Pro&apos;s SMP passport with your Minecraft and Discord information
                  </p>
                  <div className="text-card-dark text-sm font-medium">Start Application →</div>
                </div>
              </div>
            </Link>

            {/* Airline Tickets */}
            <Link
              href="/services/airline-ticket"
              className="bg-card-light rounded-[16px] p-8 shadow-card hover:shadow-md transition-all hover:scale-105 group"
            >
              <div className="flex items-start gap-4">
                <div className="bg-card-dark/10 p-3 rounded-lg group-hover:bg-card-dark/20 transition-all">
                  <Plane className="w-8 h-8 text-card-dark" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h3 className="text-card-dark text-xl font-semibold mb-2">Airline Tickets</h3>
                  <p className="text-small text-card-dark/80 mb-4">
                    Book flights to Pro&apos;s SMP or Rizaan with scheduled departure times
                  </p>
                  <div className="text-card-dark text-sm font-medium">Book Flight →</div>
                </div>
              </div>
            </Link>

            {/* Building Registration */}
            <Link
              href="/services/building-registration"
              className="bg-card-light rounded-[16px] p-8 shadow-card hover:shadow-md transition-all hover:scale-105 group"
            >
              <div className="flex items-start gap-4">
                <div className="bg-card-dark/10 p-3 rounded-lg group-hover:bg-card-dark/20 transition-all">
                  <Building2 className="w-8 h-8 text-card-dark" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h3 className="text-card-dark text-xl font-semibold mb-2">Building Registration</h3>
                  <p className="text-small text-card-dark/80 mb-4">
                    Register your building: Store, Skyscraper, House, Mall, Restaurant, or Cafe
                  </p>
                  <div className="text-card-dark text-sm font-medium">Register Building →</div>
                </div>
              </div>
            </Link>

            {/* Car Registration */}
            <Link
              href="/services/car-registration"
              className="bg-card-light rounded-[16px] p-8 shadow-card hover:shadow-md transition-all hover:scale-105 group"
            >
              <div className="flex items-start gap-4">
                <div className="bg-card-dark/10 p-3 rounded-lg group-hover:bg-card-dark/20 transition-all">
                  <Car className="w-8 h-8 text-card-dark" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h3 className="text-card-dark text-xl font-semibold mb-2">Car Registration</h3>
                  <p className="text-small text-card-dark/80 mb-4">
                    Register your vehicle with name, model, year, and type information
                  </p>
                  <div className="text-card-dark text-sm font-medium">Register Vehicle →</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
