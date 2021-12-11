
const NoteBox = ({episodeBookmarks}) => {

    const printToNoteBox = episodeBookmarks.map((bookmark, index) => {
        return <div key={index}>
            <li value={index}>{bookmark.time}: {bookmark.title}</li>
        </div>
    })

    return (
        <div>
            <div id="note-box">
                <ul>{printToNoteBox}</ul>
            </div>
        </div>
    )

}

export default NoteBox;