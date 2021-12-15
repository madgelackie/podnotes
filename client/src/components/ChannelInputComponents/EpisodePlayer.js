import React from 'react';

const EpisodePlayer = ({episode, onAddBookmarkClicked}) => {

// passes bookmark detail up to ChannelFeed
    const makeBookmark = () => {
        const bookmark = document.getElementById("episode")
        bookmark.pause()
        onAddBookmarkClicked({time: bookmark.currentTime})
        return console.log(typeof bookmark.currentTime)

    }

    return (
        <div class="player">
            <div>
            <p>{episode.episodeTitle}</p>
            <audio id="episode" controls controlsList="nodownload" src={episode.episodeURL} autoPlay></audio>
            <button onClick={makeBookmark}>Add bookmark</button>
            </div>
        </div>

    )
}

export default EpisodePlayer;
