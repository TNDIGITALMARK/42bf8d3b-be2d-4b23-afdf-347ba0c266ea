'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FileText, Globe, Users, Clock, Shield, Signal, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-purple">
      {/* Main Container */}
      <div className="max-w-[800px] mx-auto px-6 py-8">
        {/* Dark Purple Container */}
        <div className="bg-container-dark rounded-[20px] shadow-container overflow-hidden">

          {/* Navigation Bar */}
          <nav className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-6 border-b border-white/10 gap-4 md:gap-0">
            {/* Left: Login/Signup Buttons */}
            <div className="flex gap-3">
              <Link
                href="/dashboard"
                className="px-6 py-2.5 border border-white rounded-lg text-white text-sm font-normal hover:bg-white/10 transition-all"
              >
                Login
              </Link>
              <Link
                href="/dashboard"
                className="px-6 py-2.5 border border-white rounded-lg text-white text-sm font-normal hover:bg-white/10 transition-all"
              >
                Signup
              </Link>
            </div>

            {/* Right: Navigation Menu */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <Link href="#services" className="text-white text-sm hover:opacity-80 transition-opacity">
                Services
              </Link>
              <Link href="#about" className="text-white text-sm hover:opacity-80 transition-opacity">
                About Us
              </Link>
              <Link href="#citizens" className="text-white text-sm hover:opacity-80 transition-opacity">
                Citizens
              </Link>
              <Link href="#business" className="text-white text-sm hover:opacity-80 transition-opacity">
                Business
              </Link>
              <Link href="#support" className="text-white text-sm hover:opacity-80 transition-opacity">
                Support
              </Link>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="px-12 py-16 text-center relative">
            {/* Government Seal - Top Right */}
            <div className="absolute top-4 right-12">
              <Image
                src="/generated/pros-smp-seal.png"
                alt="Pro's SMP Official Seal"
                width={64}
                height={64}
                className="opacity-90"
              />
            </div>

            {/* Hero Content */}
            <div className="max-w-2xl mx-auto">
              <h1 className="text-white mb-4">
                Welcome to Pro&apos;s SMP
              </h1>
              <p className="text-subtitle text-white/90 mb-0">
                Let&apos;s get you started with a passport
              </p>
            </div>
          </section>

          {/* Service Cards Section */}
          <section className="px-6 md:px-12 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Passport Application Card */}
              <div className="bg-card-light rounded-[16px] p-7 text-center shadow-card hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-3">
                  <FileText className="w-9 h-9 text-card-dark" strokeWidth={2} />
                </div>
                <h5 className="text-card-dark mb-2">Passport Application</h5>
                <p className="text-small text-card-dark/80">
                  Apply for a new passport or renew an existing one
                </p>
              </div>

              {/* Visa Services Card */}
              <div className="bg-card-light rounded-[16px] p-7 text-center shadow-card hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-3">
                  <Globe className="w-9 h-9 text-card-dark" strokeWidth={2} />
                </div>
                <h5 className="text-card-dark mb-2">Visa Services</h5>
                <p className="text-small text-card-dark/80">
                  Explore work, family, and visit visas
                </p>
              </div>

              {/* Citizen Services Card */}
              <div className="bg-card-light rounded-[16px] p-7 text-center shadow-card hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-3">
                  <Users className="w-9 h-9 text-card-dark" strokeWidth={2} />
                </div>
                <h5 className="text-card-dark mb-2">Citizen Services</h5>
                <p className="text-small text-card-dark/80">
                  Access essential government services
                </p>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="px-12 pb-12">
            <h3 className="text-white text-xl font-semibold mb-8 text-center">Features</h3>

            {/* Feature Icons Row */}
            <div className="flex justify-center gap-16 mb-8">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <span className="text-white text-sm">Fast Processing</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <span className="text-white text-sm">Secure Data</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center">
                  <Signal className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <span className="text-white text-sm">Digital Access</span>
              </div>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mb-8">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <div className="w-2 h-2 rounded-full bg-white/30"></div>
              <div className="w-2 h-2 rounded-full bg-white/30"></div>
              <div className="w-2 h-2 rounded-full bg-white/30"></div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <Link
                href="/dashboard"
                className="px-9 py-3.5 bg-white rounded-lg text-card-dark font-semibold hover:shadow-lg transition-all hover:scale-105"
              >
                Get Started Now
              </Link>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-container-dark border-t border-white/10 px-6 md:px-12 py-8">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 md:gap-0">
              {/* Left: Logo and Tagline */}
              <div className="flex items-center gap-4">
                <Image
                  src="/generated/pros-smp-seal.png"
                  alt="Pro's SMP"
                  width={48}
                  height={48}
                  className="opacity-90"
                />
                <div>
                  <div className="text-white font-semibold text-base">Pro&apos;s SMP</div>
                  <div className="text-white/70 text-xs">Connecting you to the world</div>
                </div>
              </div>

              {/* Center: Quick Links */}
              <div className="flex flex-col gap-1">
                <h6 className="text-white text-sm font-semibold mb-1">Quick Links</h6>
                <Link href="#" className="text-white/70 text-xs hover:text-white transition-colors">
                  FAQ
                </Link>
                <Link href="#" className="text-white/70 text-xs hover:text-white transition-colors">
                  Terms & Services
                </Link>
                <Link href="#" className="text-white/70 text-xs hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </div>

              {/* Right: Contact and Social */}
              <div className="flex flex-col items-end gap-2">
                <div>
                  <h6 className="text-white text-sm font-semibold mb-1">Contact Us</h6>
                  <div className="text-white/70 text-xs">Email: support@pros-smp.gov</div>
                  <div className="text-white/70 text-xs">Phone: 1-800-SMP-GOV</div>
                </div>

                {/* Social Icons */}
                <div className="flex gap-3 mt-2">
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    <Youtube className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
}
