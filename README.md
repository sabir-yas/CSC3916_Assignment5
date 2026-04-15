# CSC3916 Assignment 5 — React Movie App

## Deployed Links

| Service | URL |
|---------|-----|
| React Frontend (Assignment 5) | https://csc3916-assignment5-xher.onrender.com |
| Backend API (Assignment 4) | https://csc3916-assignment4-5qd5.onrender.com |

---

## Purpose

A React Single Page Application built over the Assignment 4 REST API. Users can browse top-rated movies, view movie details with reviews, submit their own reviews, and search for movies by title or actor name.

---

## Features Implemented

### Authentication
- User Sign Up (name, username, password)
- User Login — returns JWT token stored in localStorage
- All API endpoints protected by JWT authentication
- Logout clears token from localStorage

### Main Screen
- Displays top-rated movies in an auto-advancing carousel
- Movies sorted by average rating descending (server-side)
- Shows movie poster image, title, genre, release year, and average rating

### Movie Detail Screen
- Movie poster image
- Full cast list (actor name + character name)
- Aggregated average rating (calculated via MongoDB `$avg`)
- Reviews grid showing username, star rating, and review text

### Review Submission
- Logged-in users can submit a rating (1–5) and review comment
- Username is captured from the JWT token (not from the form)
- Page auto-refreshes with updated reviews and new average rating after submission

### Movie Search (Extra Credit — 7 points)
- Search by partial movie title or partial actor name (case-insensitive)
- Results displayed in a sortable grid with title, year, genre, and average rating
- Clicking a result navigates to the movie detail page
- Backend: `POST /movies/search` with MongoDB `$regex` matching

---

## Tech Stack

### Frontend
- React 19
- Redux Toolkit + redux-thunk (state management)
- React Router DOM v7 with HashRouter
- React Bootstrap (UI components)
- React Icons (star ratings)

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication (passport-jwt)
- bcrypt password hashing

---

## API Endpoints

All endpoints require `Authorization: JWT <token>` header except `/signup` and `/signin`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | Register new user |
| POST | `/signin` | Login, returns JWT token |
| GET | `/movies` | Get all movies |
| GET | `/movies?reviews=true` | Get all movies with reviews, sorted by avgRating desc |
| GET | `/movies/:id?reviews=true` | Get single movie with reviews and avgRating |
| POST | `/movies` | Create a movie |
| PUT | `/movies/:id` | Update a movie |
| DELETE | `/movies/:id` | Delete a movie |
| POST | `/reviews` | Submit a review (username from JWT) |
| POST | `/movies/search` | Search movies by partial title or actor name |

---

## Running Locally

### Backend (Assignment 4)
```bash
cd CSC3916_Assignment4
npm install
npm start
```
Requires a `.env` file with:
```
DB=<mongodb connection string>
SECRET_KEY=<jwt secret>
```

### Frontend (Assignment 5)
```bash
cd frontend
npm install
npm start
```
Requires a `.env` file with:
```
REACT_APP_API_URL=https://csc3916-assignment4-5qd5.onrender.com
```

---

## Postman Tests

A Postman collection is included in the Assignment 4 repository: `CSC3916_Assignment4.postman_collection.json`

Tests cover:
- Sign up and sign in (JWT token auto-saved)
- Invalid credentials (401 response)
- GET all movies with imageUrl present
- GET movies sorted by avgRating descending
- GET movie by ID with reviews
- POST review (valid and invalid)
- POST search by title and actor name
- Protected endpoint rejection without token (401)
