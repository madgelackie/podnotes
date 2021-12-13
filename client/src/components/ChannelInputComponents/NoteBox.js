
const NoteBox = ({makeEpisodeBookmark}) => {

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

    return (
        <div>
            <form>
            <p>Timestamp: {makeEpisodeBookmark.time}</p>
            <label htmlFor="writeNote" ></label>
            <textarea id="note" name="note" rows="5" cols="100" placeholder="add note here">
            </textarea>
            </form>
        </div>
        
    )

}

export default NoteBox;