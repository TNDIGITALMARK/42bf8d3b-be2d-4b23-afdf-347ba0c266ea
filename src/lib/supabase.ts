import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Passport {
  id: string;
  real_name?: string;
  minecraft_username: string;
  discord_username: string;
  age: number;
  created_at: string;
  pdf_url?: string;
}

export interface Car {
  id: string;
  minecraft_username: string;
  car_name: string;
  model: string;
  year: string;
  vehicle_type: string;
  created_at: string;
}

export interface Building {
  id: string;
  minecraft_username: string;
  building_name: string;
  building_category: string;
  created_at: string;
}

export interface AirlineTicket {
  id: string;
  name?: string;
  minecraft_username: string;
  age: number;
  destination: string;
  flight_date: string;
  flight_time: string;
  gate: string;
  created_at: string;
}

// Database functions
export async function createPassport(passport: Omit<Passport, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('passports')
    .insert([passport])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getAllPassports() {
  const { data, error } = await supabase
    .from('passports')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createCar(car: Omit<Car, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('cars')
    .insert([car])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getAllCars() {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createBuilding(building: Omit<Building, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('buildings')
    .insert([building])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getAllBuildings() {
  const { data, error } = await supabase
    .from('buildings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createAirlineTicket(ticket: Omit<AirlineTicket, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('airline_tickets')
    .insert([ticket])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getAllAirlineTickets() {
  const { data, error } = await supabase
    .from('airline_tickets')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function deleteExpiredTickets() {
  const today = new Date().toISOString().split('T')[0];

  const { error } = await supabase
    .from('airline_tickets')
    .delete()
    .lt('flight_date', today);

  if (error) throw error;
}

export async function searchPassports(query: string) {
  const { data, error } = await supabase
    .from('passports')
    .select('*')
    .or(`minecraft_username.ilike.%${query}%,discord_username.ilike.%${query}%,real_name.ilike.%${query}%`)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}
