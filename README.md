# Cafe — Where Ideas Brew ☕


[![React Version](https://img.shields.io/badge/React-18.x-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.x-purple.svg)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Database-Supabase-brightgreen.svg)](https://supabase.com/)

**🌟 Live Demo:** [https://web1-self-two.vercel.app/](https://web1-self-two.vercel.app/)
<p align="center">
  <img src="public/hero.png" alt="Cafe Preview" width="100%" style="border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);" />
</p>

**Cafe** is a modern, responsive web application designed for coffee shops and restaurants. Built with React and Vite, it provides a stunning user interface for customers to explore the menu, book reservations, and contact the team, while offering a secret Admin Dashboard for owners to manage operations seamlessly.

---

## Why This Project?

Managing a cafe online often requires stitching together multiple third-party tools (reservation systems, contact forms, admin panels). 
* **Expensive Subscriptions** for simple table booking systems.
* **Disconnected Data** spread across emails and spreadsheets.
* **Poor User Experience** with outdated, slow-loading websites.

**This Cafe app solves this by unifying everything.** It features a custom-built, real-time Supabase backend, beautiful UX with loading states, and instant email notifications—all in one lightweight repository.

---

## Key Features

* **Beautiful, Responsive UI**: A modern design system featuring smooth scrolling (Lenis), CSS grid layouts, and fully responsive mobile views.
* **Secret Admin Dashboard**: A hidden `/admin` portal secured by a passcode. Owners can log in to view real-time table reservations and customer messages in a clean, tabular format.
* **Supabase Integration**: Direct, serverless connection to a PostgreSQL database for securely storing `contacts` and `reservations`.
* **Automated Email Notifications**: Integrated with EmailJS to instantly alert the cafe staff whenever a new reservation or message is submitted.
* **Optimized Form UX**: Submit buttons feature elegant spinning loading states (via Lucide React) and disable themselves to prevent duplicate database entries.
* **Dynamic Configuration**: Easy-to-update environment variables for the cafe's physical location, WhatsApp number, and secret keys.

---

## Security & Architecture

This project is built with modern security and deployment best practices:
* **Environment Variables**: All API keys, database URLs, and admin passcodes are securely stored in a `.env` file that is ignored by Git (`.gitignore`), preventing secrets from leaking publicly.
* **Serverless Backend**: Relies entirely on Supabase and EmailJS, meaning no bulky Node.js backend servers are required to host or maintain.
* **Row Level Security (RLS)**: Designed to work with Supabase RLS policies to ensure only authorized users can read or write data.

---

## Installation Guide

### Prerequisites
* Node.js (v18 or higher)
* A Supabase Account
* An EmailJS Account (Optional, for email alerts)

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mubashir18305/cafe.git
   cd cafe
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the following keys:
   ```env
   VITE_LOCATION="Your Cafe Address"
   VITE_WHATSAPP_NUMBER="+1234567890"
   VITE_SUPABASE_URL="https://your-project.supabase.co"
   VITE_SUPABASE_ANON_KEY="your-anon-key"
   VITE_ADMIN_PASSCODE="your-secret-passcode"
   
   # Optional: For email notifications
   VITE_EMAILJS_SERVICE_ID="your-service-id"
   VITE_EMAILJS_TEMPLATE_ID="your-template-id"
   VITE_EMAILJS_PUBLIC_KEY="your-public-key"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`.

---

## Database Setup

To make the forms work, you must create two tables in your Supabase SQL Editor:

```sql
-- Create the contacts table
create table public.contacts (
  id uuid default gen_random_uuid() primary key,
  name text,
  email text,
  subject text,
  message text,
  createdAt timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create the reservations table
create table public.reservations (
  id uuid default gen_random_uuid() primary key,
  name text,
  phone text,
  email text,
  date date,
  time text,
  guests text,
  requests text,
  createdAt timestamp with time zone default timezone('utc'::text, now()) not null
);
```

---

## Deployment

This project is optimized for deployment on Vercel or Netlify.

### Deploying to Vercel:
1. Push your code to GitHub.
2. Log into Vercel and click **Add New Project**.
3. Import your GitHub repository.
4. Add all the variables from your `.env` file into the **Environment Variables** section in Vercel.
5. Click **Deploy**.

---

