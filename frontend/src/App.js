import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import MovieHeader from './components/movieheader';
import MovieList from './components/movielist';
import Movie from './components/movie';
import Authentication from './components/authentication';
import SearchBar from './components/searchbar';
import './App.css';

function App() {
    return (
        <div className="App">
            <HashRouter>
                <MovieHeader />
                <Routes>
                    <Route path="/" element={<MovieList />} />
                    <Route path="/movielist" element={<MovieList />} />
                    <Route path="/movie/:movieId" element={<Movie />} />
                    <Route path="/signin" element={<Authentication />} />
                    <Route path="/search" element={<SearchBar />} />
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
