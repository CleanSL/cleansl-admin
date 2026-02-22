# 🚛 CleanSL Admin Dashboard

The **CleanSL Admin Dashboard** is the central command hub for the CleanSL waste management ecosystem. It is designed to provide authorities with real-time visibility into waste collection logistics and citizen complaints across Colombo.

## 🚀 Key Features

* **Live Operations Map:** Interactive visualization of garbage collection routes and real-time vehicle tracking using Mapbox-GL.
* **Incident Management:** A real-time feed of citizen-reported issues (overflowing bins, missed pickups) powered by Supabase Realtime.
* **Logistics Monitoring:** Analysis of GPS logs and collection data to optimize fleet efficiency.
* **Data-Driven Insights:** Secure access to the "CleanSL" database (PostgreSQL) for operational decision-making.

## 🛠 Tech Stack

* **Framework:** React.js (Frontend)
* **Database & Auth:** Supabase (PostgreSQL)
* **Styling:** Tailwind CSS
* **Maps:** Mapbox-GL
* **Icons:** Lucide-React

## 📁 Project Structure

The project follows a modular architecture to ensure scalability and ease of maintenance during development:

* `/src/components`: Reusable UI elements (Sidebar, Stat Cards, Buttons)
* `/src/pages`: Main view layouts (Dashboard, Live Map, Complaints)
* `/src/hooks`: Custom logic for fetching and syncing real-time data from Supabase
* `/src/utils`: Helper functions for formatting and data manipulation