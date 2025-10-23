-- Pro's SMP Government Portal Database Schema

-- Passports table
CREATE TABLE IF NOT EXISTS passports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  real_name TEXT,
  minecraft_username TEXT NOT NULL,
  discord_username TEXT NOT NULL,
  age INTEGER NOT NULL,
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cars table
CREATE TABLE IF NOT EXISTS cars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  minecraft_username TEXT NOT NULL,
  car_name TEXT NOT NULL,
  model TEXT NOT NULL,
  year TEXT NOT NULL,
  vehicle_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Buildings table
CREATE TABLE IF NOT EXISTS buildings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  minecraft_username TEXT NOT NULL,
  building_name TEXT NOT NULL,
  building_category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Airline Tickets table
CREATE TABLE IF NOT EXISTS airline_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  minecraft_username TEXT NOT NULL,
  age INTEGER NOT NULL,
  destination TEXT NOT NULL,
  flight_date DATE NOT NULL,
  flight_time TEXT NOT NULL,
  gate TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_passports_minecraft ON passports(minecraft_username);
CREATE INDEX IF NOT EXISTS idx_passports_discord ON passports(discord_username);
CREATE INDEX IF NOT EXISTS idx_cars_minecraft ON cars(minecraft_username);
CREATE INDEX IF NOT EXISTS idx_buildings_minecraft ON buildings(minecraft_username);
CREATE INDEX IF NOT EXISTS idx_tickets_minecraft ON airline_tickets(minecraft_username);
CREATE INDEX IF NOT EXISTS idx_tickets_flight_date ON airline_tickets(flight_date);

-- Enable Row Level Security (RLS)
ALTER TABLE passports ENABLE ROW LEVEL SECURITY;
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE buildings ENABLE ROW LEVEL SECURITY;
ALTER TABLE airline_tickets ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read/write (for simplicity)
-- In production, you'd want more restrictive policies
CREATE POLICY "Allow public read access on passports" ON passports FOR SELECT USING (true);
CREATE POLICY "Allow public insert on passports" ON passports FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access on cars" ON cars FOR SELECT USING (true);
CREATE POLICY "Allow public insert on cars" ON cars FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access on buildings" ON buildings FOR SELECT USING (true);
CREATE POLICY "Allow public insert on buildings" ON buildings FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access on tickets" ON airline_tickets FOR SELECT USING (true);
CREATE POLICY "Allow public insert on tickets" ON airline_tickets FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete on tickets" ON airline_tickets FOR DELETE USING (true);
