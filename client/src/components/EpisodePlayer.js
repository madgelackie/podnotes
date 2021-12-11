import React from 'react';

const EpisodePlayer = ({episode, onBookmarkClicked}) => {

    const makeBookmark = () => {
        const bookmark = document.getElementById("episode")
        bookmark.pause()
        onBookmarkClicked({title: episode.title, time: bookmark.currentTime})
        return console.log(bookmark.currentTime)
    }

// additional div included between "main" div below, in order to make a flex child element
    return (
        <div>
            <div>
                <p>{episode.title}</p>
                <audio id="episode" controls controlsList="nodownload" src={episode.mp3} autoPlay></audio>
                <button onClick={makeBookmark}>Add bookmark</button>
            </div>
        </div>
    )
}

export default EpisodePlayer;