# CrowdReply - Task Management Application

A full-stack MERN (MongoDB, Express, React, Next.js) application for managing tasks across Reddit, YouTube, and Trustpilot platforms.

## Project Structure

```
CrowdReply-test/
├── Client/          # Next.js frontend application
├── server/          # Node.js/Express backend API
└── README.md        # This file
```

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **MongoDB** (local or cloud instance like MongoDB Atlas)
- **npm**, **yarn**, **pnpm**, or **bun** package manager

## Getting Started

### Backend Setup

1. **Navigate to the server directory:**

   ```bash
   cd server
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the `server` directory with the following variables:

   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

   > For MongoDB Atlas, use your connection string:
   > `MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname`

4. **Run the backend in development mode:**

   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

### Frontend Setup

1. **Navigate to the Client directory:**

   ```bash
   cd Client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the `Client` directory:

   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
   ```

   **Important:** Update `NEXT_PUBLIC_API_BASE_URL` to match your backend API URL if it's running on a different port or host.

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

   The frontend will start on `http://localhost:3000` (default Next.js port).



## Important Notes

- Make sure the backend server is running before starting the frontend
- The frontend requires the backend API to be accessible at the URL specified in `NEXT_PUBLIC_API_BASE_URL`
- MongoDB must be running and accessible for the backend to function properly
