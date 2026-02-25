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

export function Library() {

    const [libraryDB, setLibraryDB] = useState(JSON.parse(localStorage.getItem("libraryDB")));

    return (
        <main>

            <div className="library-header">
                <h1 id="userTitle">{localStorage.getItem("userName")}'s Library</h1>
                <button type="button" className="add-movie">Add Movie</button>
            </div>

            <div className="library-content">

                <div className="item-list">

                    {[...libraryDB].reverse().map((movie, index) => {
                        return <DisplayMovie key={index} movie={movie} />;
                    })}

                </div>

            </div>
        
        </main>
    );
}