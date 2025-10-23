'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Check, Building2 } from 'lucide-react';
import { createBuilding } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const BUILDING_CATEGORIES = ['Store', 'Skyscraper', 'House', 'Mall', 'Restaurant', 'Cafe'];

export default function BuildingRegistrationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [buildingId, setBuildingId] = useState('');

  const [formData, setFormData] = useState({
    minecraftUsername: '',
    buildingName: '',
    buildingCategory: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.minecraftUsername || !formData.buildingName || !formData.buildingCategory) {
        alert('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      // Create building in database
      const building = await createBuilding({
        minecraft_username: formData.minecraftUsername,
        building_name: formData.buildingName,
        building_category: formData.buildingCategory,
      });

      setBuildingId(building.id);
      setIsComplete(true);
    } catch (error) {
      alert('Failed to register building. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-purple">
        <div className="max-w-[600px] mx-auto px-6 py-8">
          <div className="bg-container-dark rounded-[20px] shadow-container p-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-white text-2xl font-bold mb-4">Building Registered Successfully!</h2>
              <p className="text-white/70 mb-6">
                Your building has been registered and saved to the database.
              </p>

              <div className="bg-white/5 rounded-lg p-6 border border-white/10 mb-4">
                <div className="text-white/70 text-sm mb-2">Building ID</div>
                <div className="text-white text-xl font-mono font-bold mb-4">{buildingId.substring(0, 8).toUpperCase()}</div>

                <div className="grid grid-cols-2 gap-4 text-left mt-4 pt-4 border-t border-white/10">
                  <div>
                    <div className="text-white/70 text-xs mb-1">Building Name</div>
                    <div className="text-white text-sm font-medium">{formData.buildingName}</div>
                  </div>
                  <div>
                    <div className="text-white/70 text-xs mb-1">Category</div>
                    <div className="text-white text-sm font-medium">{formData.buildingCategory}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-white/70 text-xs mb-1">Owner</div>
                    <div className="text-white text-sm font-medium">{formData.minecraftUsername}</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Link
                  href="/dashboard"
                  className="px-6 py-3 bg-white rounded-lg text-card-dark font-semibold hover:shadow-lg transition-all hover:scale-105"
                >
                  Go to Dashboard
                </Link>
                <Link
                  href="/services"
                  className="px-6 py-3 bg-white/10 rounded-lg text-white font-semibold hover:bg-white/20 transition-all"
                >
                  Apply for Another Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-purple">
      <div className="max-w-[700px] mx-auto px-6 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Services</span>
          </Link>
        </div>

        {/* Main Container */}
        <div className="bg-container-dark rounded-[20px] shadow-container p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white">Building Registration</h2>
              <p className="text-white/70 text-sm">Register your building with Pro&apos;s SMP</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Minecraft Bedrock Username <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="minecraftUsername"
                value={formData.minecraftUsername}
                onChange={handleInputChange}
                placeholder="Enter your Minecraft Bedrock username"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Building Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="buildingName"
                value={formData.buildingName}
                onChange={handleInputChange}
                placeholder="Enter the building name"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Building Category <span className="text-red-400">*</span>
              </label>
              <select
                name="buildingCategory"
                value={formData.buildingCategory}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
                required
              >
                <option value="" className="bg-[#2D1F3D]">Select building category</option>
                {BUILDING_CATEGORIES.map((category) => (
                  <option key={category} value={category} className="bg-[#2D1F3D]">
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Descriptions */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-white text-sm font-medium mb-3">Building Categories:</div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-white/70">• Store:</span> <span className="text-white/90">Retail shops</span>
                </div>
                <div>
                  <span className="text-white/70">• Skyscraper:</span> <span className="text-white/90">Tall buildings</span>
                </div>
                <div>
                  <span className="text-white/70">• House:</span> <span className="text-white/90">Residential homes</span>
                </div>
                <div>
                  <span className="text-white/70">• Mall:</span> <span className="text-white/90">Shopping centers</span>
                </div>
                <div>
                  <span className="text-white/70">• Restaurant:</span> <span className="text-white/90">Dining establishments</span>
                </div>
                <div>
                  <span className="text-white/70">• Cafe:</span> <span className="text-white/90">Coffee shops</span>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-blue-300 text-sm font-medium mb-1">Building Registry</div>
                  <div className="text-blue-200/70 text-sm">
                    Your building will be registered in the official Pro&apos;s SMP database and can be viewed by moderators.
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-3 bg-white rounded-lg text-card-dark font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? 'Registering Building...' : 'Register Building'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
