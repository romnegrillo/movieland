import { useState, useEffect } from 'react';

import Movie from './components/Movie';
import SearchIcon from './components/search.svg';
import { DebounceInput } from 'react-debounce-input';

import './App.css';

const App = () => {
  const API_KEY = `https://www.omdbapi.com/?i=tt3896198&apikey=${
    import.meta.env.VITE_API_KEY
  }`;
  console.log(API_KEY);
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('Spider Man');

  const fetchMovies = async (title) => {
    try {
      const response = await fetch(`${API_KEY}&s=${title}`);
      const data = await response.json();
      setMovies(() => data.Search);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMovies(search);
  }, [search]);

  return (
    <div className="app">
      <nav className="navbar">
        <h1>MOVIELAND</h1>

        <div className="search">
          <DebounceInput
            type="text"
            placeholder={'Search for movies...'}
            value={search}
            debounceTimeout={500}
            onChange={(e) => setSearch(() => e.target.value)}
          />

          <img
            src={SearchIcon}
            alt="Search"
            onClick={() => fetchMovies(search)}
          />
        </div>
      </nav>

      <main>
        <div className="search-result">
          {movies && (
            <p>
              Found {movies.length} results for <q>{search}.</q>
            </p>
          )}
        </div>

        <div className="container">
          {movies &&
            movies.map((movie) => {
              return <Movie movie={movie} key={movie.imdbID} />;
            })}
        </div>
      </main>
    </div>
  );
};

export default App;
