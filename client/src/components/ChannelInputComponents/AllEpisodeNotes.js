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

    // console.log("What comes from ChannelFeed: ", episodeDBReady)
    // console.log("This is the returned ep from DB: ", episodeFromDB)

   
// not doing as intended! Currently, allnotes box is rendering but with no notes. Had to put in the if statement as otherwise was getting error in browser as bookmark was empty. But component render isn't happy with calling on a function - would usually just be a variable being passed in.  
    const makeBookmarkList = (episodeFromDB) => {
        if (episodeFromDB != null) {
            episodeFromDB.bookmarks.map((bookmark, index) => {
            var bookmarkList = <div id="bookmark-items" key={index}>
            <li value={index}>{bookmark.note}</li>
            </div>})
    }
    return null
}
        

    // const handleClick = () => {
    //     const goToTime = document.getElementById("episode")
    //     goToTime.currentTime = singleBookmark.timestamp
    //     console.log("click hit")
    // }
    // <button onClick={handleClick}>{singleBookmark.timestamp}</button>

    // button is being used to go back to the timestamp of the displayed bookmark.
    return (
        <div >
        <p>Bookmarks:</p>
        {episodeFromDB ? <ul class="all-notes">{bookmarkList} </ul> :null}
        </div>
    )
}

export default AllEpisodeNotes;