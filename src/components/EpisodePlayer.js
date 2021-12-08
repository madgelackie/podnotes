import React from 'react';

const EpisodePlayer = ({episode}) => {

    return (
        <div>
        <p>{episode.title}</p>
        <audio controls controlsList="nodownload" src={episode.mp3}></audio>
        </div>
    )
}

export default EpisodePlayer;