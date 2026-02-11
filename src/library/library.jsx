import React from 'react';

export function Library() {
  return (
    <main>

      <div className="library-header">
            <h1 id="userTitle">User's Library</h1>
            <button type="button" clasName="add-movie">Add Movie</button>
        </div>

        <div className="library-content">

            <div className="item-list">
                
                <div className="item">
                    <img src="photos/placeholder_movie_poster.png" alt="Movie Poster"/>
                    <div className="item-details">
                        <h2>Movie Title</h2>
                        <p>Genre: Action, Adventure<br/>
                        Year: 2023<br/>
                        Status: Watched</p>
                    </div>
                </div>

                <div className="item">
                    <img src="photos/placeholder_movie_poster.png" alt="Movie Poster"/>
                    <div className="item-details">
                        <h2>Another Movie</h2>
                        <p>Genre: Comedy <br/>
                        Year: 2022 <br/>
                        Status: Watched</p>
                    </div>
                </div>

                <div className="item">
                    <img src="photos/placeholder_movie_poster.png" alt="Movie Poster"/>
                    <div className="item-details">
                        <h2>A Third Movie</h2>
                        <p>Genre: Horror<br/>
                        Year: 1987<br/>
                        Status: To Watch</p>
                    </div>
                </div>

                <div className="item">
                    <img src="photos/placeholder_movie_poster.png" alt="Movie Poster"/>
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