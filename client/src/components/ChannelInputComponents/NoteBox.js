import {useEffect, useState} from 'react'
import Request from '../../services/helper';


const NoteBox = ({makeBookmark, onBookmarkSave, episodeDBReady}) => {

    const [textUpdate, setTextUpdate] = useState("");
    const [episodeFromDB, setEpisodeFromDB] = useState([]);

    useEffect(() => {
        if (episodeDBReady){
        const request = new Request();
        request.get("/api/episodes/" + episodeDBReady.episodeTitle)
        .then((data) => {setEpisodeFromDB(data)})}
    }, [])
    
    const handleChange = (event) => {
        setTextUpdate(event.target.value)
    }

// bookmark info sent up to ChannelFeed, where it is then posted to the DB
    const handleBookmarkSave = (event) => {
        event.preventDefault();
        console.log(episodeFromDB.id)
        const bookmarkDBReady = {
            timestamp: makeBookmark.time,
            note: textUpdate,
            episode: {
                id: episodeFromDB.id,
                episodeURL: episodeDBReady.episodeURL,
                episodeTitle: episodeDBReady.episodeTitle
            }
            }
        onBookmarkSave(bookmarkDBReady);
        setTextUpdate("");
        
    }


    return (
        <div id="note-box">
            <form onSubmit={handleBookmarkSave}>
            <p value={makeBookmark}>Timestamp: {makeBookmark.time}</p>
            <label htmlFor="writeNote" ></label>
            <textarea value={textUpdate} onChange={handleChange} id="note" name="note" rows="5" cols="100" placeholder="add note here">
            </textarea>
            <button type="submit">Save bookmark</button>
            </form>
        </div>
        
    )

}

export default NoteBox;