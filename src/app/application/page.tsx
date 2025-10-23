'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Check, Upload, CreditCard } from 'lucide-react';

export const dynamic = 'force-dynamic';

const steps = [
  { id: 1, name: 'Personal Information', icon: '1' },
  { id: 2, name: 'Document Upload', icon: '2' },
  { id: 3, name: 'Review & Payment', icon: '3' },
  { id: 4, name: 'Confirmation', icon: '4' },
];

export default function ApplicationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    zipCode: '',
    passportType: 'new',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-purple">
      {/* Main Container */}
      <div className="max-w-[900px] mx-auto px-6 py-8">
        {/* Top Navigation */}
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Main Application Container */}
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
              <h2 className="text-white">Passport Application</h2>
              <p className="text-white/70 text-sm">Complete the application process step by step</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="text-white text-sm font-medium">Application Progress</div>
              <div className="text-white text-sm">{Math.round(progress)}% Complete</div>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between mb-12 relative">
            {/* Connection Line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-white/10" style={{ zIndex: 0 }} />
            <div
              className="absolute top-6 left-0 h-0.5 bg-white transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`, zIndex: 0 }}
            />

            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg mb-2 transition-all ${
                    currentStep > step.id
                      ? 'bg-white text-card-dark'
                      : currentStep === step.id
                      ? 'bg-white text-card-dark ring-4 ring-white/30'
                      : 'bg-white/20 text-white/60'
                  }`}
                >
                  {currentStep > step.id ? <Check className="w-6 h-6" /> : step.icon}
                </div>
                <div className={`text-sm text-center max-w-[100px] ${currentStep >= step.id ? 'text-white font-medium' : 'text-white/60'}`}>
                  {step.name}
                </div>
              </div>
            ))}
          </div>

          {/* Form Content */}
          <div className="mb-8">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-white text-xl font-semibold mb-6">Personal Information</h3>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Passport Type</label>
                    <select
                      name="passportType"
                      value={formData.passportType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
                    >
                      <option value="new" className="bg-[#2D1F3D]">New Passport</option>
                      <option value="renewal" className="bg-[#2D1F3D]">Passport Renewal</option>
                      <option value="replacement" className="bg-[#2D1F3D]">Lost/Damaged Replacement</option>
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-white text-sm font-medium mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street address"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="ZIP Code"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Document Upload */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-white text-xl font-semibold mb-6">Upload Required Documents</h3>

                <div className="space-y-4">
                  {/* Photo Upload */}
                  <div className="bg-white/5 border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-white/40 transition-all cursor-pointer">
                    <Upload className="w-12 h-12 text-white/60 mx-auto mb-4" />
                    <div className="text-white font-medium mb-2">Passport Photo</div>
                    <div className="text-white/60 text-sm mb-4">
                      Upload a recent passport-sized photo (JPEG or PNG, max 5MB)
                    </div>
                    <button className="px-6 py-2 bg-white/10 rounded-lg text-white text-sm hover:bg-white/20 transition-all">
                      Choose File
                    </button>
                  </div>

                  {/* ID Document Upload */}
                  <div className="bg-white/5 border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-white/40 transition-all cursor-pointer">
                    <Upload className="w-12 h-12 text-white/60 mx-auto mb-4" />
                    <div className="text-white font-medium mb-2">Proof of Identity</div>
                    <div className="text-white/60 text-sm mb-4">
                      Upload a government-issued ID (Driver&apos;s License, Birth Certificate, etc.)
                    </div>
                    <button className="px-6 py-2 bg-white/10 rounded-lg text-white text-sm hover:bg-white/20 transition-all">
                      Choose File
                    </button>
                  </div>

                  {/* Additional Documents */}
                  <div className="bg-white/5 border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-white/40 transition-all cursor-pointer">
                    <Upload className="w-12 h-12 text-white/60 mx-auto mb-4" />
                    <div className="text-white font-medium mb-2">Supporting Documents (Optional)</div>
                    <div className="text-white/60 text-sm mb-4">
                      Upload any additional supporting documents
                    </div>
                    <button className="px-6 py-2 bg-white/10 rounded-lg text-white text-sm hover:bg-white/20 transition-all">
                      Choose File
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review & Payment */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-white text-xl font-semibold mb-6">Review & Payment</h3>

                {/* Application Summary */}
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h4 className="text-white font-semibold mb-4">Application Summary</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">Name:</span>
                      <span className="text-white">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Email:</span>
                      <span className="text-white">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Service:</span>
                      <span className="text-white">
                        {formData.passportType === 'new' ? 'New Passport' : formData.passportType === 'renewal' ? 'Passport Renewal' : 'Lost/Damaged Replacement'}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-white/10 pt-3 mt-3">
                      <span className="text-white/70">Processing Fee:</span>
                      <span className="text-white font-semibold">$145.00</span>
                    </div>
                  </div>
                </div>

                {/* Payment Form */}
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <CreditCard className="w-5 h-5 text-white" />
                    <h4 className="text-white font-semibold">Payment Information</h4>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-white text-2xl font-bold mb-4">Application Submitted Successfully!</h3>
                <p className="text-white/70 mb-6 max-w-md mx-auto">
                  Your application has been received and is being processed. You will receive email notifications about your application status.
                </p>

                <div className="bg-white/5 rounded-lg p-6 border border-white/10 max-w-md mx-auto mb-8">
                  <div className="text-white/70 text-sm mb-2">Application Reference Number</div>
                  <div className="text-white text-2xl font-mono font-bold">APP-2024-{Math.floor(Math.random() * 1000)}</div>
                </div>

                <div className="text-white/70 text-sm mb-8">
                  Estimated processing time: <span className="text-white font-medium">10-14 business days</span>
                </div>

                <Link
                  href="/dashboard"
                  className="inline-block px-8 py-3 bg-white rounded-lg text-card-dark font-semibold hover:shadow-lg transition-all hover:scale-105"
                >
                  Go to Dashboard
                </Link>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex justify-between items-center pt-6 border-t border-white/10">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  currentStep === 1
                    ? 'bg-white/5 text-white/30 cursor-not-allowed'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Previous
              </button>

              <button
                onClick={handleNextStep}
                className="px-8 py-3 bg-white rounded-lg text-card-dark font-semibold hover:shadow-lg transition-all hover:scale-105"
              >
                {currentStep === 3 ? 'Submit Application' : 'Continue'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
