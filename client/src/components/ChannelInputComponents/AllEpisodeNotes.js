import {useState, useEffect} from 'react';
import Request from '../../services/helper';

const AllEpisodeNotes = ({episodeDBReady, singleBookmark}) => {

    const [episodeFromDB, setEpisodeFromDB] = useState(null);
   
    
    useEffect(() => {
        if (episodeDBReady){
        const request = new Request();
        request.get("/api/episodes/" + episodeDBReady.episodeTitle)
        .then((data) => {setEpisodeFromDB(data)})}
    }, [episodeDBReady])

    useEffect(() => {
        if (episodeDBReady){
        const request = new Request();
        request.get("/api/episodes/" + episodeDBReady.episodeTitle)
        .then((data) => {setEpisodeFromDB(data)})}
    }, [singleBookmark])

    console.log("What comes from ChannelFeed: ", episodeDBReady)
    console.log("This is the returned ep from DB: ", episodeFromDB)
   
    const handleClick = () => {
        const goToTime = document.getElementById("episode")
        goToTime.currentTime = singleBookmark.timestamp
    }

    return (
        <div class="all-notes">
        <button onClick={handleClick}>{singleBookmark.timestamp}</button>
        <p>{singleBookmark.note} </p>
        </div>
    )
}

export default AllEpisodeNotes;