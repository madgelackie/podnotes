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
    }, [episodeDBReady])

    useEffect(() => {
        if (episodeDBReady){
        const request = new Request();
        request.get("/api/episodes/" + episodeDBReady.episodeTitle)
        .then((data) => {setEpisodeFromDB(data)})}
    }, [singleBookmark])

    console.log("What comes from ChannelFeed: ", episodeDBReady)
    console.log("This is the returned ep from DB: ", episodeFromDB)
    // console.log("Ep title ", episodeFromDB.episodeTitle)

    // const bookmarkList = episodeFromDB.map((ep, index) => {
    //     return <div id="bookmark" key={index}>
    //             <li value={index}>{episodeFromDB.episodeTitle}</li>
    //     </div>
    // })

    // const exampleBookmark = singleBookmark.map(() => {

    // })
    // const titleList = feed.map((feedItem, index) => {
    //     return <div id="feed-items" key={index}>
    //             <li value={index}>{feedItem.episodeTitle} </li>
    //             <button value={index} onClick={handleEpisodeSelect}>Listen</button>
    //     </div>
    // })

    // const makeBookmark = () => {
    //     const bookmark = document.getElementById("episode")
    //     bookmark.pause()
    //     onAddBookmarkClicked({time: bookmark.currentTime})
    //     return console.log(typeof bookmark.currentTime)

    // }

    

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