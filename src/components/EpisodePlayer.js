import React from 'react';

const EpisodePlayer = ({episode, onBookmarkClicked}) => {

    const makeBookmark = () => {
        const bookmark = document.getElementById("episode")
        bookmark.pause()
        onBookmarkClicked(bookmark.currentTime)
        return console.log(bookmark.currentTime)
    }

    return (
        <div id="main">
        <p>{episode.title}</p>
        <audio id="episode" controls controlsList="nodownload" src={episode.mp3} autoPlay></audio>
        <button onClick={makeBookmark}>Bookmark</button>
        </div>
    )
}

export default EpisodePlayer;