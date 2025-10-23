'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, FileText, Car, Building2, Plane, Search, Eye, LogOut } from 'lucide-react';
import { getAllPassports, getAllCars, getAllBuildings, getAllAirlineTickets, searchPassports, deleteExpiredTickets, Passport, Car, Building, AirlineTicket } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

type TabType = 'passports' | 'cars' | 'buildings' | 'tickets';

export default function ModeratorDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('passports');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Data states
  const [passports, setPassports] = useState<Passport[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [tickets, setTickets] = useState<AirlineTicket[]>([]);

  // Selected record for viewing
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  useEffect(() => {
    // Check if moderator is logged in
    const isLoggedIn = sessionStorage.getItem('moderator_logged_in');
    if (!isLoggedIn) {
      router.push('/moderator');
      return;
    }

    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Delete expired tickets first
      await deleteExpiredTickets();

      // Load all data
      const [passportsData, carsData, buildingsData, ticketsData] = await Promise.all([
        getAllPassports(),
        getAllCars(),
        getAllBuildings(),
        getAllAirlineTickets(),
      ]);

      setPassports(passportsData);
      setCars(carsData);
      setBuildings(buildingsData);
      setTickets(ticketsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadData();
      return;
    }

    setIsLoading(true);
    try {
      const results = await searchPassports(searchQuery);
      setPassports(results);
      setActiveTab('passports');
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('moderator_logged_in');
    router.push('/moderator');
  };

  const filteredPassports = passports;
  const filteredCars = cars;
  const filteredBuildings = buildings;
  const filteredTickets = tickets;

  const getActiveData = () => {
    switch (activeTab) {
      case 'passports':
        return filteredPassports;
      case 'cars':
        return filteredCars;
      case 'buildings':
        return filteredBuildings;
      case 'tickets':
        return filteredTickets;
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-purple">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-container-dark rounded-[20px] shadow-container p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-white hover:opacity-80 transition-opacity"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h2 className="text-white">Moderator Dashboard</h2>
                <p className="text-white/70 text-sm">View and manage all applications</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 border border-white/30 rounded-lg text-white text-sm hover:bg-white/10 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-container-dark rounded-[16px] shadow-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-6 h-6 text-white" />
              <h5 className="text-white">Passports</h5>
            </div>
            <div className="text-3xl font-bold text-white">{passports.length}</div>
          </div>

          <div className="bg-container-dark rounded-[16px] shadow-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <Car className="w-6 h-6 text-white" />
              <h5 className="text-white">Cars</h5>
            </div>
            <div className="text-3xl font-bold text-white">{cars.length}</div>
          </div>

          <div className="bg-container-dark rounded-[16px] shadow-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <Building2 className="w-6 h-6 text-white" />
              <h5 className="text-white">Buildings</h5>
            </div>
            <div className="text-3xl font-bold text-white">{buildings.length}</div>
          </div>

          <div className="bg-container-dark rounded-[16px] shadow-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <Plane className="w-6 h-6 text-white" />
              <h5 className="text-white">Active Tickets</h5>
            </div>
            <div className="text-3xl font-bold text-white">{tickets.length}</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-container-dark rounded-[20px] shadow-container p-6 mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search by Minecraft username, Discord username, or name..."
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-white rounded-lg text-card-dark font-semibold hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-container-dark rounded-[20px] shadow-container p-6 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('passports')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'passports'
                  ? 'bg-white text-card-dark'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Passports ({passports.length})
            </button>
            <button
              onClick={() => setActiveTab('cars')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'cars'
                  ? 'bg-white text-card-dark'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Cars ({cars.length})
            </button>
            <button
              onClick={() => setActiveTab('buildings')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'buildings'
                  ? 'bg-white text-card-dark'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Buildings ({buildings.length})
            </button>
            <button
              onClick={() => setActiveTab('tickets')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'tickets'
                  ? 'bg-white text-card-dark'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Tickets ({tickets.length})
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-container-dark rounded-[20px] shadow-container p-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="text-white">Loading...</div>
            </div>
          ) : getActiveData().length === 0 ? (
            <div className="text-center py-12">
              <div className="text-white/70">No records found</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    {activeTab === 'passports' && (
                      <>
                        <th className="text-left text-white font-semibold py-3 px-4">Real Name</th>
                        <th className="text-left text-white font-semibold py-3 px-4">Minecraft Username</th>
                        <th className="text-left text-white font-semibold py-3 px-4">Discord Username</th>
                        <th className="text-left text-white font-semibold py-3 px-4">Age</th>
                        <th className="text-left text-white font-semibold py-3 px-4">Created</th>
                        <th className="text-left text-white font-semibold py-3 px-4">Actions</th>
                      </>
                    )}
                    {activeTab === 'cars' && (
                      <>
                        <th className="text-left text-white font-semibold py-3 px-4">Minecraft Username</th>
                        <th className="text-left text-white font-semibold py-3 px-4">Car Name</th>
                        <th className="text-left text-white font-semibold py-3 px-4">Model</th>
                        <th className="text-left text-white font-semibold py-3 px-4">Year</th>
                        <th className="text-left text-white font-semibold py-3 px-4">Type</th>
                        <th className="text-left text-white font-semibold py-3 px-4">Created</th>
                      </>
                    )}
                    {activeTab === 'buildings' && (
                      <>
                        <th className="text-left text-white font-semibold py-3 px-4">Minecraft Username</th>
                        <th className="text-left text-white font-semibold py-3 px-4">Building Name</th>
                        <th className="text-left text-white font-semibold py-3 px-4">Category</th>
                        <th className="text-left text-white font-semibold py-3 px-4">Created</th>
                      </>
                    )}
                    {activeTab === 'tickets' && (
                      <>
                        <th className="text-left text-white font-semibold py-3 px-4">Name</th>
                        <th className="text-left text-white font-semibold py-3 px-4">Minecraft Username</th>
                        <th className="text-left text-white font-semibold py-3 px-4">Age</th>
                        <th className="text-left text-white font-semibold py-3 px-4">Destination</th>
                        <th className="text-left text-white font-semibold py-3 px-4">Flight Date</th>
                        <th className="text-left text-white font-semibold py-3 px-4">Gate</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {activeTab === 'passports' &&
                    filteredPassports.map((passport) => (
                      <tr key={passport.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-3 px-4 text-white">{passport.real_name || '-'}</td>
                        <td className="py-3 px-4 text-white">{passport.minecraft_username}</td>
                        <td className="py-3 px-4 text-white">{passport.discord_username}</td>
                        <td className="py-3 px-4 text-white">{passport.age}</td>
                        <td className="py-3 px-4 text-white/70 text-sm">
                          {new Date(passport.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => setSelectedRecord(passport)}
                            className="text-white hover:opacity-80 transition-opacity"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  {activeTab === 'cars' &&
                    filteredCars.map((car) => (
                      <tr key={car.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-3 px-4 text-white">{car.minecraft_username}</td>
                        <td className="py-3 px-4 text-white">{car.car_name}</td>
                        <td className="py-3 px-4 text-white">{car.model}</td>
                        <td className="py-3 px-4 text-white">{car.year}</td>
                        <td className="py-3 px-4 text-white">{car.vehicle_type}</td>
                        <td className="py-3 px-4 text-white/70 text-sm">
                          {new Date(car.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  {activeTab === 'buildings' &&
                    filteredBuildings.map((building) => (
                      <tr key={building.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-3 px-4 text-white">{building.minecraft_username}</td>
                        <td className="py-3 px-4 text-white">{building.building_name}</td>
                        <td className="py-3 px-4 text-white">{building.building_category}</td>
                        <td className="py-3 px-4 text-white/70 text-sm">
                          {new Date(building.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  {activeTab === 'tickets' &&
                    filteredTickets.map((ticket) => (
                      <tr key={ticket.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-3 px-4 text-white">{ticket.name || '-'}</td>
                        <td className="py-3 px-4 text-white">{ticket.minecraft_username}</td>
                        <td className="py-3 px-4 text-white">{ticket.age}</td>
                        <td className="py-3 px-4 text-white">{ticket.destination}</td>
                        <td className="py-3 px-4 text-white">{ticket.flight_date}</td>
                        <td className="py-3 px-4 text-white">{ticket.gate}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Record Detail Modal */}
        {selectedRecord && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
            onClick={() => setSelectedRecord(null)}
          >
            <div
              className="bg-container-dark rounded-[20px] shadow-container p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-white text-xl font-semibold mb-4">Passport Details</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-white/70 text-sm">Real Name</div>
                  <div className="text-white">{selectedRecord.real_name || 'Not provided'}</div>
                </div>
                <div>
                  <div className="text-white/70 text-sm">Minecraft Username</div>
                  <div className="text-white">{selectedRecord.minecraft_username}</div>
                </div>
                <div>
                  <div className="text-white/70 text-sm">Discord Username</div>
                  <div className="text-white">{selectedRecord.discord_username}</div>
                </div>
                <div>
                  <div className="text-white/70 text-sm">Age</div>
                  <div className="text-white">{selectedRecord.age}</div>
                </div>
                <div>
                  <div className="text-white/70 text-sm">Created</div>
                  <div className="text-white">
                    {new Date(selectedRecord.created_at).toLocaleString()}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="mt-6 w-full px-6 py-3 bg-white rounded-lg text-card-dark font-semibold hover:shadow-lg transition-all"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
