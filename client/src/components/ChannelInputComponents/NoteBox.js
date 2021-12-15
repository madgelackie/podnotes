import {useEffect, useState} from 'react'


const NoteBox = ({makeBookmark, onBookmarkSave, episode}) => {

    // const printToNoteBox = makeEpisodeBookmark.map((bookmark, index) => {
    //     return <div key={index}>
    //         <form>
    //         <li value={index}>{bookmark.time}: {bookmark.title}</li>
    //         <label htmlFor="writeNote" ></label>
    //         <textarea id="note" name="note" rows="5" cols="100" placeholder="add note here">

    //         </textarea>
    //         </form>
    //     </div>
    // })

    const [textUpdate, setTextUpdate] = useState("");
    const [episodeFromDB, setEpisodeFromDB] = useState(null);

    // useEffect(() => {
    //     const request = new Request();
    //     request.get("/api/episode/:title")
    //     .then((data) => {setEpisodeFromDB()})
    // })

    // useEffect(() => {
    //     const request = new Request();
    //     request.get("/api/channels")
    //     .then((data) => {setSavedFeeds(data)});
    //     }, []);
    
    const handleChange = (event) => {
        setTextUpdate(event.target.value)
    }


    const handleBookmarkSave = (event) => {
        event.preventDefault();
        onBookmarkSave(textUpdate, makeBookmark.time);
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