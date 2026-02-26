import React, { useState } from 'react';

class MovieData {
    constructor(name, movieID, posterLink, genres, year, status) {
        this.name = name;
        this.moveID = movieID;
        this.posterLink = posterLink;
        this.genres = genres;
        this.year = year;
        this.status = status;
    }
};

const testArray = [new MovieData("Test Movie", "1", "/placeholder_movie_poster.png", "Comedy", "2023", "To Watch"), new MovieData("Another Movie", "2", "/placeholder_movie_poster.png", "Action, Adventure", "2010", "Watched")];
localStorage.setItem("libraryDB", JSON.stringify(testArray));

function DisplayMovie( { movie }) {
    return (
        <div className="item">
            <img src={movie.posterLink} alt={movie.name} />
            <div className="item-details">
                <h2>{movie.name}</h2>
                <p>Genre: {movie.genres}<br/>
                Year: {movie.year}<br/>
                Status: {movie.status}</p>
            </div>
        </div>
    );
}

function DisplayMovieResult ( { movie } ) {
    return (
        <div className="searchItem">
            <img src={movie.posterLink} alt={`${movie.name} poster`} />
            <div className="search-item-details">
                <h3>{movie.name} ({movie.year})</h3>
                <p>{movie.genres}</p>
            </div>
            <button className="add-to-library-btn">+</button>
        </div>
    );
}

export function Library() {

    const [libraryDB, setLibraryDB] = useState(JSON.parse(localStorage.getItem("libraryDB")));
    const [movieReturn, setMovieReturn] = useState([new MovieData("Test Movie", "1", "/placeholder_movie_poster.png", "Comedy", "2023", "To Watch")]);
    const [searchText, setSearchText] = useState('');

    const getMovieResults = (e) => {
        e.preventDefault();

        setMovieReturn([])

        for (let i = 1; i < 5; i++) {
            const newItem = new MovieData(searchText + " " + i, crypto.randomUUID(), "/placeholder_movie_poster.png", "Comedy", "202" + i, "Watched")
            setMovieReturn(prevUpdates => [...prevUpdates, newItem]);
        }
    }

    return (
        <main>

            <div className="library-header">
                <h1 id="userTitle">{localStorage.getItem("userName")}'s Library</h1>
                <button type="button" className="add-movie" command="show-modal" commandfor="searchModal">Add Movie</button>
            </div>

            <div className="library-content">

                <div className="item-list">

                    {[...libraryDB].reverse().map((movie, index) => {
                        return <DisplayMovie key={index} movie={movie} />;
                    })}

                </div>

            </div>

            <dialog id="searchModal">
                <button id="closeSearchModal" commandfor="searchModal" command="close">X</button>
                <h2>Search for a Movie</h2>
                <form id="searchForm" onSubmit={ getMovieResults }>
                    <input type="search" id="movieSearchInput" placeholder="Search for a movie..." value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                    <button type="submit">Search</button>
                </form>
                <div id="searchResults">
                    {[...movieReturn].reverse().map((movie, index) => {
                        return <DisplayMovieResult key={index} movie={movie} />;
                    })}
                </div>
            </dialog>
        
        </main>
    );
}