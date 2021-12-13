import React from 'react';

const EpisodePlayer = ({episode, onBookmarkClicked}) => {

    const makeBookmark = () => {
        const bookmark = document.getElementById("episode")
        bookmark.pause()
        onBookmarkClicked({title: episode.title, time: bookmark.currentTime})
        return console.log(bookmark.currentTime)
    }

    return (
        <div id="container-grid">
            <div id="player">
            <p>{episode.episodeTitle}</p>
            <audio id="episode" controls controlsList="nodownload" src={episode.episodeURL} autoPlay></audio>
            <button onClick={makeBookmark}>Add bookmark</button>
            </div>
        </div>

    )
}

export default EpisodePlayer;
