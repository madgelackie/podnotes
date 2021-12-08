import React from 'react';

const EpisodePlayer = ({episode}) => {

    const getCurrentTime = () => {
        const bookmark = document.getElementById("episode")
        bookmark.pause()
        return console.log(bookmark.currentTime)
    }

    return (
        <div id="main">
        <p>{episode.title}</p>
        <audio id="episode" controls controlsList="nodownload" src={episode.mp3}></audio>
        <button onClick={getCurrentTime}>Bookmark</button>
        </div>
    )
}

export default EpisodePlayer;