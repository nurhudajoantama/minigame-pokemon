# Mini Game Pokemon

A simple Pokémon-themed mini-game built with React, TypeScript, Vite, React Query, and Tailwind CSS. Catch Pokémon, view details, and manage your personal Pokédex.

## Features
- Browse a list of Pokémon with sprites and basic info
- View detailed stats and abilities in a modal
- Attempt to catch Pokémon and handle success or failure
- Rename or release caught Pokémon in your Pokédex
- Responsive UI styled with Tailwind CSS
- Client-side state management via React Context and localStorage

## Tech Stack
- React 18 + TypeScript
- Vite for development and build
- React Router DOM for client-side routing
- @tanstack/react-query for data fetching
- Tailwind CSS for styling

## Prerequisites
- Node.js >= 14.x
- npm or pnpm installed globally

## Installation
1. Clone the repo:

   ```bash
   git clone https://github.com/nurhudajoantama/minigame-pokemon
   cd minigame-pokemon
   ```

2. Install dependencies (using npm):

   ```bash
   npm install
   ```

   Or with pnpm:

   ```bash
   pnpm install
   ```

## Running the Project

- Start development server with hot reload:

  ```bash
  npm run dev
  ```

- Build for production:

  ```bash
  npm run build
  ```

- Preview the production build:

  ```bash
  npm run preview
  ```

## Project Structure
```
src/
├─ api/           # API calls to PokéAPI
├─ components/    # UI components (Navbar, Footer, Loader)
├─ hooks/         # Custom React hooks
├─ Layout/        # Main layout with navbar and footer
├─ Pages/         # Route pages: Home (Index), Pokedex
├─ providers/     # React Context for Pokémon state
├─ services/      # Business logic for catching/releasing
├─ types/         # TypeScript types
├─ App.tsx        # Root component with routing
└─ main.tsx       # App entry point
```
