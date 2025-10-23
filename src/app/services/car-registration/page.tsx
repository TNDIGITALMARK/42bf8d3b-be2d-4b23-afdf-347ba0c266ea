'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Check, Car as CarIcon } from 'lucide-react';
import { createCar } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const VEHICLE_TYPES = ['SUV', 'Hatchback', 'Sedan', 'Coupe', 'Convertible', 'Truck', 'Van', 'Sports Car'];

export default function CarRegistrationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [carId, setCarId] = useState('');

  const [formData, setFormData] = useState({
    minecraftUsername: '',
    carName: '',
    model: '',
    year: '',
    vehicleType: '',
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
      if (!formData.minecraftUsername || !formData.carName || !formData.model ||
          !formData.year || !formData.vehicleType) {
        alert('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      // Create car in database
      const car = await createCar({
        minecraft_username: formData.minecraftUsername,
        car_name: formData.carName,
        model: formData.model,
        year: formData.year,
        vehicle_type: formData.vehicleType,
      });

      setCarId(car.id);
      setIsComplete(true);
    } catch (error) {
      alert('Failed to register car. Please try again.');
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
              <h2 className="text-white text-2xl font-bold mb-4">Vehicle Registered Successfully!</h2>
              <p className="text-white/70 mb-6">
                Your vehicle has been registered and saved to the database.
              </p>

              <div className="bg-white/5 rounded-lg p-6 border border-white/10 mb-4">
                <div className="text-white/70 text-sm mb-2">Vehicle ID</div>
                <div className="text-white text-xl font-mono font-bold mb-4">{carId.substring(0, 8).toUpperCase()}</div>

                <div className="grid grid-cols-2 gap-4 text-left mt-4 pt-4 border-t border-white/10">
                  <div>
                    <div className="text-white/70 text-xs mb-1">Car Name</div>
                    <div className="text-white text-sm font-medium">{formData.carName}</div>
                  </div>
                  <div>
                    <div className="text-white/70 text-xs mb-1">Model</div>
                    <div className="text-white text-sm font-medium">{formData.model}</div>
                  </div>
                  <div>
                    <div className="text-white/70 text-xs mb-1">Year</div>
                    <div className="text-white text-sm font-medium">{formData.year}</div>
                  </div>
                  <div>
                    <div className="text-white/70 text-xs mb-1">Type</div>
                    <div className="text-white text-sm font-medium">{formData.vehicleType}</div>
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
              <CarIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white">Car Registration</h2>
              <p className="text-white/70 text-sm">Register your vehicle with Pro&apos;s SMP</p>
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
                Car Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="carName"
                value={formData.carName}
                onChange={handleInputChange}
                placeholder="e.g., Lightning McQueen, Blue Thunder"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Model <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                placeholder="e.g., Toyota Camry, Ford Mustang"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Year <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                placeholder="e.g., 2023, 2024"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Vehicle Type <span className="text-red-400">*</span>
              </label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
                required
              >
                <option value="" className="bg-[#2D1F3D]">Select vehicle type</option>
                {VEHICLE_TYPES.map((type) => (
                  <option key={type} value={type} className="bg-[#2D1F3D]">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Vehicle Type Info */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-white text-sm font-medium mb-3">Vehicle Types:</div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-white/70">• SUV:</span> <span className="text-white/90">Sport Utility Vehicle</span>
                </div>
                <div>
                  <span className="text-white/70">• Hatchback:</span> <span className="text-white/90">Compact car</span>
                </div>
                <div>
                  <span className="text-white/70">• Sedan:</span> <span className="text-white/90">4-door passenger car</span>
                </div>
                <div>
                  <span className="text-white/70">• Coupe:</span> <span className="text-white/90">2-door car</span>
                </div>
                <div>
                  <span className="text-white/70">• Truck:</span> <span className="text-white/90">Pickup truck</span>
                </div>
                <div>
                  <span className="text-white/70">• Sports Car:</span> <span className="text-white/90">High-performance</span>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CarIcon className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-blue-300 text-sm font-medium mb-1">Vehicle Registry</div>
                  <div className="text-blue-200/70 text-sm">
                    Your vehicle will be registered in the official Pro&apos;s SMP database and can be viewed by moderators.
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
              {isSubmitting ? 'Registering Vehicle...' : 'Register Vehicle'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
