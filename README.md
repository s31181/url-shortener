# URL Shortener

This is a URL shortener application built with Next.js, TypeScript, and SQLite. It allows users to shorten URLs and view metadata associated with them.

## Features

- Shorten URLs
- View metadata (OG tags) for URLs
- Dashboard to view all shortened URLs

## Prerequisites

- Node.js (version 14 or later)
- npm (version 6 or later)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/s31181/url-shortener.git
   cd url-shortener
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up the database:**

   Ensure SQLite is installed on your system. The project uses SQLite for storing URLs and metadata.

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   This will start the Next.js development server. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

5. **Run tests:**

   To run the test suite, use:

   ```bash
   npm test
   ```

   This will execute the Jest test suite.

## Project Structure

- **`app/`**: Contains the main application pages and API routes.
- **`components/`**: Contains React components used throughout the application.
- **`lib/`**: Contains utility functions and database setup.

