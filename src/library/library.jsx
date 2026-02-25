import React from 'react';

class MovieData {
    constructor(name, posterLink, genres, year, status) {
        this.name = name;
        this.posterLink = posterLink;
        this.genres = genres;
        this.year = year;
        this.status = status;
    }
};

function displayMovie( { movie }) {
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

    return (
        <main>

            <div className="library-header">
                <h1 id="userTitle">{localStorage.getItem("userName")}'s Library</h1>
                <button type="button" className="add-movie">Add Movie</button>
            </div>

            <div className="library-content">

                <div className="item-list">
                    
                    <div className="item">
                        <img src="/placeholder_movie_poster.png" alt="Movie Poster"/>
                        <div className="item-details">
                            <h2>Movie Title</h2>
                            <p>Genre: Action, Adventure<br/>
                            Year: 2023<br/>
                            Status: Watched</p>
                        </div>
                    </div>

                    <div className="item">
                        <img src="/placeholder_movie_poster.png" alt="Movie Poster"/>
                        <div className="item-details">
                            <h2>Another Movie</h2>
                            <p>Genre: Comedy <br/>
                            Year: 2022 <br/>
                            Status: Watched</p>
                        </div>
                    </div>

                    <div className="item">
                        <img src="/placeholder_movie_poster.png" alt="Movie Poster"/>
                        <div className="item-details">
                            <h2>A Third Movie</h2>
                            <p>Genre: Horror<br/>
                            Year: 1987<br/>
                            Status: To Watch</p>
                        </div>
                    </div>

                    <div className="item">
                        <img src="/placeholder_movie_poster.png" alt="Movie Poster"/>
                        <div className="item-details">
                            <h2>Movie #4</h2>
                            <p>Genre: Action<br/>
                            Year: 2026<br/>
                            Status: To Watch</p>
                        </div>
                    </div>

                </div>

            </div>
        
        </main>
    );
}