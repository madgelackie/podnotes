import {useState} from 'react'


const NoteBox = ({makeEpisodeBookmark, onBookmarkSave}) => {

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

    const [textUpdate, setTextUpdate] = useState(null);


    
    const handleChange = (event) => {
        setTextUpdate(event.target.value)
    }


    const handleBookmarkSave = (event) => {
        event.preventDefault();
        onBookmarkSave(textUpdate, makeEpisodeBookmark.time);
        setTextUpdate("");
        
    }


    return (
        <div id="note-box">
            <form onSubmit={handleBookmarkSave}>
            <p value={makeEpisodeBookmark}>Timestamp: {makeEpisodeBookmark.time}</p>
            <label htmlFor="writeNote" ></label>
            <textarea value={textUpdate} onChange={handleChange} id="note" name="note" rows="5" cols="100" placeholder="add note here">
            </textarea>
            <button type="submit">Save bookmark</button>
            </form>
        </div>
        
    )

}

export default NoteBox;