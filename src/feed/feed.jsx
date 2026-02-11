import React from 'react';
import '../app.css';

export function Feed() {
  return (
    <main>
        <h1 style={{ textAlign: "center" }}>Activity</h1>

        <div className="activity-feed">

        <article>
            <header>
                <img src="/placeholder_user_profile_image.png" alt="Profile Pic" width="30" height="30"/>
                <span><strong>Sarah</strong> rated <strong>Lord of the Rings</strong> <time>2 hours ago</time></span>
            </header>
            
            <blockquote>
                "MOVIE REVIEW"
            </blockquote>
            
            <p>Rating: ⭐⭐⭐⭐⭐</p>
        </article>

        <article>
            <header>
                <img src="/placeholder_user_profile_image.png" alt="Profile Pic" width="30" height="30"/>
                <span><strong>Mike</strong> just watched <strong>A Good Movie</strong>
                <time>4 hours ago</time></span>
            </header>
            
            <figure>
                <img src="/placeholder_movie_poster.png" alt="Movie Poster" width="100"/>
            </figure>
        </article>

        <article>
            <header>
                <img src="/placeholder_user_profile_image.png" alt="Profile Pic" width="30" height="30"/>
                <span><strong>Jessica</strong> added 3 movies to their <em>"Horror Night"</em> list
                <time>yesterday</time></span>
            </header>

            <ul>
                <li>Horror Movie 1</li>
                <li>Horror Movie 2</li>
                <li>Horror Movie 3</li>
            </ul>
        </article>

        <article>
            <header>
                <img src="/placeholder_user_profile_image.png" alt="Profile Pic" width="30" height="30"/>
                <span><strong>Bob</strong> added 5 movies to their <em>"Want to watch"</em> list
                <time>2 days ago</time></span>
            </header>

            <ul>
                <li>Movie 1</li>
                <li>Movie 2</li>
                <li>Movie 3</li>
                <li>Movie 4</li>
                <li>Movie 5</li>
            </ul>
        </article>

        <article>
            <header>
                <img src="/placeholder_user_profile_image.png" alt="Profile Pic" width="30" height="30"/>
                <span><strong>David</strong> watched <strong>Cool Movie</strong>
                <time>4 days ago</time></span>
            </header>
            
            <figure>
                <img src="/placeholder_movie_poster.png" alt="Movie Poster" width="100"/>
            </figure>
        </article>


        </div>

    </main>
  );
}