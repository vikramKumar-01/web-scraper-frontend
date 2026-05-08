# ScrapeDeck Frontend

Production-ready React frontend for a MERN Hacker News web scraper platform. This app consumes an existing Node.js, Express, MongoDB, and JWT-based backend to display scraped stories, manage authentication, and handle bookmarks.

## Features

- Responsive story feed with pagination
- JWT login and registration flows
- Auth persistence with Context API and `localStorage`
- Protected bookmarks route
- Optimistic bookmark toggling
- Reusable Axios client with auth interceptor
- Tailwind CSS design system with reusable buttons, cards, and forms
- Loading, error, and empty states across key pages

## Tech Stack

- React 18
- Vite
- React Router DOM
- Axios
- Context API
- Tailwind CSS

## Project Structure

```text
src/
├── components/
│   ├── common/
│   ├── layout/
│   ├── story/
│   └── ui/
├── context/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/
├── utils/
├── App.jsx
├── index.css
└── main.jsx
```

## Pages

- `/` Home page with paginated story listing
- `/login` User login form
- `/register` User registration form with auto-login
- `/bookmarks` Protected bookmark collection
- `/404` Not found page

## Environment Variables

Create a `.env` file based on `.env.example`.

```env
VITE_API_URL=http://localhost:4500/api
```

## API Integration

The frontend expects these backend endpoints:

- `POST /auth/login`
- `POST /auth/register`
- `GET /stories?page=1&limit=10`
- `POST /stories/:id/bookmark`
- `GET /bookmarks`
- `DELETE /bookmarks/:id`

The Axios client automatically injects `Authorization: Bearer <token>` when a user is logged in.

## Authentication Flow

1. User logs in or registers.
2. Backend returns a JWT token and user payload.
3. Auth context stores both in memory and `localStorage`.
4. Axios interceptor sends the token on protected requests.
5. Protected routes redirect unauthenticated users to `/login`.

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Add environment variables:

   ```bash
   cp .env.example .env
   ```

   On Windows PowerShell:

   ```powershell
   Copy-Item .env.example .env
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

## Production Build

```bash
npm run build
npm run preview
```

## Suggested Commit History

Use a progressive history similar to this:

1. `chore: initialize vite react project`
2. `setup: configure tailwind css`
3. `feat: setup react router structure`
4. `feat: create authentication context`
5. `feat: build login and register pages`
6. `feat: integrate authentication APIs`
7. `feat: create stories listing page`
8. `feat: implement pagination UI`
9. `feat: add bookmark functionality`
10. `feat: create protected routes`
11. `style: improve responsive layout`
12. `refactor: optimize api services`
13. `docs: update frontend README`

## Notes

- The code is structured to be readable during interviews and easy to extend within the assignment window.
- If your backend response shape differs slightly, adjust the response mapping in `src/pages/Home.jsx` and `src/pages/Bookmarks.jsx`.
