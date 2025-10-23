# Pro's SMP Government Portal - Database Setup

## Overview
This application uses Supabase as the database backend to store passports, cars, buildings, and airline tickets.

## Database Tables Required

The application requires 4 tables in your Supabase database:

1. **passports** - Store passport information
2. **cars** - Store vehicle registrations
3. **buildings** - Store building registrations
4. **airline_tickets** - Store flight bookings (auto-deleted after flight date)

## Setup Instructions

### Step 1: Access Supabase SQL Editor

1. Go to your Supabase project: https://supabase.com/dashboard/project/hfndfmtxhqvubnfiwzlz
2. Click on "SQL Editor" in the left sidebar
3. Click "New query"

### Step 2: Run the Schema SQL

Copy and paste the entire contents of `supabase-schema.sql` into the SQL editor and click "Run".

This will:
- Create all 4 required tables
- Set up proper indexes for performance
- Enable Row Level Security (RLS)
- Create policies for public access (read/write for all users)

### Step 3: Verify Tables Were Created

1. Click on "Table Editor" in the left sidebar
2. You should see these tables:
   - passports
   - cars
   - buildings
   - airline_tickets

### Step 4: Test the Connection

The application is already configured with the correct Supabase credentials in `.env`:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

No additional configuration is needed.

## Table Schemas

### Passports Table
```sql
- id: UUID (primary key, auto-generated)
- real_name: TEXT (optional)
- minecraft_username: TEXT (required)
- discord_username: TEXT (required)
- age: INTEGER (required)
- pdf_url: TEXT (optional)
- created_at: TIMESTAMP (auto-generated)
```

### Cars Table
```sql
- id: UUID (primary key, auto-generated)
- minecraft_username: TEXT (required)
- car_name: TEXT (required)
- model: TEXT (required)
- year: TEXT (required)
- vehicle_type: TEXT (required) - SUV, Hatchback, Sedan, etc.
- created_at: TIMESTAMP (auto-generated)
```

### Buildings Table
```sql
- id: UUID (primary key, auto-generated)
- minecraft_username: TEXT (required)
- building_name: TEXT (required)
- building_category: TEXT (required) - Store, Skyscraper, House, Mall, Restaurant, Cafe
- created_at: TIMESTAMP (auto-generated)
```

### Airline Tickets Table
```sql
- id: UUID (primary key, auto-generated)
- name: TEXT (optional)
- minecraft_username: TEXT (required)
- age: INTEGER (required)
- destination: TEXT (required) - Pro's SMP or Rizaan
- flight_date: DATE (required)
- flight_time: TEXT (required)
- gate: TEXT (required)
- created_at: TIMESTAMP (auto-generated)
```

## Features

### Automatic Ticket Deletion
Airline tickets are automatically deleted after the flight date has passed. This happens when:
- The moderator dashboard loads
- Any ticket-related operation is performed

The deletion is handled by the `deleteExpiredTickets()` function in `src/lib/supabase.ts`.

### Moderator Access
Moderators can access all records through the moderator dashboard:
- Login credentials:
  - Username: `Itz_Jojoseawat`
  - Password: `Ahad@13072012`
- Access URL: `/moderator`
- Dashboard URL: `/moderator/dashboard`

### Search Functionality
The moderator dashboard includes search capabilities for passports by:
- Minecraft username
- Discord username
- Real name

## Security Notes

### Row Level Security (RLS)
All tables have RLS enabled with public policies that allow:
- SELECT (read) for anyone
- INSERT (create) for anyone
- DELETE (only for airline_tickets) for anyone

### Production Considerations
For a production environment, you should:
1. Restrict INSERT/SELECT policies to authenticated users only
2. Add proper user authentication
3. Limit moderator access to specific user roles
4. Add audit logging for sensitive operations
5. Implement rate limiting on API calls

## Troubleshooting

### "relation does not exist" Error
This means the tables haven't been created yet. Run the SQL from `supabase-schema.sql`.

### "permission denied for table" Error
Check that RLS policies are properly set up. Re-run the schema SQL to recreate policies.

### Connection Issues
Verify that:
1. `.env` file contains the correct Supabase URL and anon key
2. Your Supabase project is active and not paused
3. Network connectivity is working

## Development vs Production

### Development (Current Setup)
- Public read/write access to all tables
- Simple session-based moderator auth
- No user authentication required

### Production Recommendations
1. Implement proper user authentication with Supabase Auth
2. Restrict database policies to authenticated users
3. Use Supabase RLS to enforce user-level data isolation
4. Store moderator credentials securely (environment variables, secrets manager)
5. Add rate limiting and API monitoring
6. Implement proper error handling and logging
7. Set up database backups and recovery procedures

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify all tables exist in Supabase Table Editor
3. Check that RLS policies are enabled and correct
4. Ensure `.env` credentials match your Supabase project
