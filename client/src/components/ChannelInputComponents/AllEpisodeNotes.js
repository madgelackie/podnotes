import {useState, useEffect} from 'react';
import Request from '../../services/helper';

const AllEpisodeNotes = ({episodeDBReady}) => {

    const [episodeFromDB, setEpisodeFromDB] = useState(null);
    
    useEffect(() => {
        if (episodeDBReady){
        const request = new Request();
        request.get("/api/episodes/" + episodeDBReady.episodeTitle)
        .then((data) => {setEpisodeFromDB(data)})}
    }, [])

    return (
        <div class="all-notes">
        <p>boop</p>
        </div>
    )
}

export default AllEpisodeNotes;