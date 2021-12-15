import {useState, useEffect} from 'react';
import Request from '../../services/helper';

const AllEpisodeNotes = ({episodeDBReady, singleBookmark}) => {

    const [episodeFromDB, setEpisodeFromDB] = useState(null);
    const [epBookmarks, setEpBookmarks] = useState([]);
    
    useEffect(() => {
        if (episodeDBReady){
        const request = new Request();
        request.get("/api/episodes/" + episodeDBReady.episodeTitle)
        .then((data) => {setEpisodeFromDB(data)})}
    }, [])

    useEffect(() => {
        if (episodeDBReady){
        const request = new Request();
        request.get("/api/episodes/" + episodeDBReady.episodeTitle)
        .then((data) => {setEpisodeFromDB(data)})}
    }, [])

    console.log("What comes from ChannelFeed: ", episodeDBReady)
    console.log("This is the returned ep from DB: ", episodeFromDB)
    // console.log("Ep title ", episodeFromDB.episodeTitle)

    // const bookmarkList = episodeFromDB.map((ep, index) => {
    //     return <div id="bookmark" key={index}>
    //             <li value={index}>{episodeFromDB.episodeTitle}</li>
    //     </div>
    // })
    

    return (
        <div class="all-notes">
        <p> </p>
        </div>
    )
}

export default AllEpisodeNotes;