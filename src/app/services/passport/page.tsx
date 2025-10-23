'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Download, Check } from 'lucide-react';
import jsPDF from 'jspdf';
import { createPassport } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default function PassportApplicationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [passportId, setPassportId] = useState('');

  const [formData, setFormData] = useState({
    realName: '',
    minecraftUsername: '',
    discordUsername: '',
    age: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generatePassportPDF = (data: any) => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [100, 140],
    });

    // Background gradient (purple theme)
    doc.setFillColor(107, 76, 154); // Purple
    doc.rect(0, 0, 140, 100, 'F');

    // White content area
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(10, 10, 120, 80, 3, 3, 'F');

    // Header
    doc.setTextColor(45, 31, 61); // Dark purple
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text("PRO'S SMP", 70, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('OFFICIAL PASSPORT', 70, 27, { align: 'center' });

    // Decorative line
    doc.setDrawColor(107, 76, 154);
    doc.setLineWidth(0.5);
    doc.line(20, 30, 120, 30);

    // Passport details
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 100, 100);

    let yPos = 40;

    // Real Name (if provided)
    if (data.real_name) {
      doc.text('Real Name:', 20, yPos);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(45, 31, 61);
      doc.text(data.real_name, 55, yPos);
      yPos += 8;
    }

    // Minecraft Username
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 100, 100);
    doc.text('Minecraft Username:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(45, 31, 61);
    doc.text(data.minecraft_username, 65, yPos);
    yPos += 8;

    // Discord Username
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 100, 100);
    doc.text('Discord Username:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(45, 31, 61);
    doc.text(data.discord_username, 60, yPos);
    yPos += 8;

    // Age
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 100, 100);
    doc.text('Age:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(45, 31, 61);
    doc.text(data.age.toString(), 35, yPos);
    yPos += 8;

    // Passport ID
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 100, 100);
    doc.text('Passport ID:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(45, 31, 61);
    doc.text(data.id.substring(0, 8).toUpperCase(), 50, yPos);

    // Footer
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 150);
    doc.text('Issued by Pro\'s SMP Government', 70, 85, { align: 'center' });
    doc.text(new Date().toLocaleDateString(), 70, 88, { align: 'center' });

    return doc;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.minecraftUsername || !formData.discordUsername || !formData.age) {
        alert('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      // Create passport in database
      const passport = await createPassport({
        real_name: formData.realName || undefined,
        minecraft_username: formData.minecraftUsername,
        discord_username: formData.discordUsername,
        age: parseInt(formData.age),
      });

      setPassportId(passport.id);

      // Generate PDF
      const pdf = generatePassportPDF(passport);
      pdf.save(`passport-${passport.minecraft_username}.pdf`);

      // Show success
      setIsComplete(true);
    } catch (error) {
      console.error('Error creating passport:', error);
      alert('Failed to create passport. Please try again.');
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
              <h2 className="text-white text-2xl font-bold mb-4">Passport Created Successfully!</h2>
              <p className="text-white/70 mb-6">
                Your passport has been created and saved to the database. The PDF has been downloaded automatically.
              </p>

              <div className="bg-white/5 rounded-lg p-6 border border-white/10 mb-8">
                <div className="text-white/70 text-sm mb-2">Passport ID</div>
                <div className="text-white text-xl font-mono font-bold">{passportId.substring(0, 8).toUpperCase()}</div>
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
            <Image
              src="/generated/pros-smp-seal.png"
              alt="Pro's SMP"
              width={48}
              height={48}
              className="opacity-90"
            />
            <div>
              <h2 className="text-white">Passport Application</h2>
              <p className="text-white/70 text-sm">Complete the form to get your Pro&apos;s SMP passport</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Real Name <span className="text-white/50">(Optional)</span>
              </label>
              <input
                type="text"
                name="realName"
                value={formData.realName}
                onChange={handleInputChange}
                placeholder="Enter your real name (optional)"
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
                Discord Username <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="discordUsername"
                value={formData.discordUsername}
                onChange={handleInputChange}
                placeholder="Enter your Discord username"
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

            {/* Info Box */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Download className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-blue-300 text-sm font-medium mb-1">PDF Generation</div>
                  <div className="text-blue-200/70 text-sm">
                    After submitting, your passport will be saved to the database and a PDF will be automatically downloaded.
                    Moderators can view your passport anytime.
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
              {isSubmitting ? 'Creating Passport...' : 'Create Passport'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
