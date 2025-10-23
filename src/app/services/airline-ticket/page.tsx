'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Check, Plane } from 'lucide-react';
import { createAirlineTicket } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const DESTINATIONS = ['Pro\'s SMP', 'Rizaan'];

export default function AirlineTicketPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    minecraftUsername: '',
    age: '',
    destination: '',
    flightDate: '',
    flightTime: '',
    gate: '',
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
      if (!formData.minecraftUsername || !formData.age || !formData.destination ||
          !formData.flightDate || !formData.flightTime || !formData.gate) {
        alert('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      // Create ticket in database
      const ticket = await createAirlineTicket({
        name: formData.name || undefined,
        minecraft_username: formData.minecraftUsername,
        age: parseInt(formData.age),
        destination: formData.destination,
        flight_date: formData.flightDate,
        flight_time: formData.flightTime,
        gate: formData.gate,
      });

      setTicketId(ticket.id);
      setIsComplete(true);
    } catch (error) {
      alert('Failed to create ticket. Please try again.');
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
              <h2 className="text-white text-2xl font-bold mb-4">Ticket Booked Successfully!</h2>
              <p className="text-white/70 mb-6">
                Your airline ticket has been booked and saved to the database. Have a safe flight!
              </p>

              <div className="bg-white/5 rounded-lg p-6 border border-white/10 mb-4">
                <div className="text-white/70 text-sm mb-2">Ticket ID</div>
                <div className="text-white text-xl font-mono font-bold mb-4">{ticketId.substring(0, 8).toUpperCase()}</div>

                <div className="grid grid-cols-2 gap-4 text-left mt-4 pt-4 border-t border-white/10">
                  <div>
                    <div className="text-white/70 text-xs mb-1">Destination</div>
                    <div className="text-white text-sm font-medium">{formData.destination}</div>
                  </div>
                  <div>
                    <div className="text-white/70 text-xs mb-1">Flight Date</div>
                    <div className="text-white text-sm font-medium">{formData.flightDate}</div>
                  </div>
                  <div>
                    <div className="text-white/70 text-xs mb-1">Flight Time</div>
                    <div className="text-white text-sm font-medium">{formData.flightTime}</div>
                  </div>
                  <div>
                    <div className="text-white/70 text-xs mb-1">Gate</div>
                    <div className="text-white text-sm font-medium">{formData.gate}</div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-8">
                <div className="text-yellow-300 text-sm">
                  Note: This ticket will be automatically deleted after the flight date has passed.
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
              <Plane className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white">Book Airline Ticket</h2>
              <p className="text-white/70 text-sm">Complete the form to book your flight</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Name <span className="text-white/50">(Optional)</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name (optional)"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
              />
            </div>

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
                Age <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Enter your age"
                min="1"
                max="150"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Headed To <span className="text-red-400">*</span>
              </label>
              <select
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
                required
              >
                <option value="" className="bg-[#2D1F3D]">Select destination</option>
                {DESTINATIONS.map((dest) => (
                  <option key={dest} value={dest} className="bg-[#2D1F3D]">
                    {dest}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Flight Date <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  name="flightDate"
                  value={formData.flightDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Flight Time <span className="text-red-400">*</span>
                </label>
                <input
                  type="time"
                  name="flightTime"
                  value={formData.flightTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Gate <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="gate"
                value={formData.gate}
                onChange={handleInputChange}
                placeholder="e.g., Gate A3, Terminal 2"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
                required
              />
            </div>

            {/* Info Box */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Plane className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-blue-300 text-sm font-medium mb-1">Automatic Deletion</div>
                  <div className="text-blue-200/70 text-sm">
                    This ticket will be saved temporarily and will be automatically deleted after the flight date has passed.
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
              {isSubmitting ? 'Booking Ticket...' : 'Book Ticket'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
