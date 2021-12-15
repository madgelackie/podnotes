import {useEffect, useState } from 'react';
import EpisodePlayer from './EpisodePlayer';
import NoteBox from './NoteBox';
import Request from '../../services/helper';


const ChannelFeed = ({selectedFeed}) => {

// The 'selectedFeedUrl' State will trigger the useEffect to make the network call to the RSS server.
    const [selectedFeedUrl, setSelectedFeedUrl] = useState(null);
// The 'feed' State will trigger the rendering of the channel episode feed in this (ChannelFeed) container, via titleList function.
    const [feed, setFeed] = useState([]);
// The 'epsiodeToPlay' state is updated by the handleEpisodeSelect(), which is triggered in this (ChannelFeed) component. This might be an un-necessary duplicate of 'episodeDBReady'.  This state triggers the EpisodePlayer component to render.
    const [episodeToPlay, setEpisodeToPlay] = useState(null);
// This 'episodeDBReady' triggers the useEffect which posts episode data to the database.  It is set in the 'handleEpisodeSelect() used in 'episodeToPlay' State.
    const [episodeDBReady, setEpisodeDBReady] = useState({});
// This 'makeBookmark' State is set by onAddBookmarkClicked, and triggers the rendering of NoteBox.
    const [makeBookmark, setMakeBookmark] = useState(null);
    const [singleBookmark, setSingleBookmark] = useState({});
// This 'episodeBookmarks' state is set by onBookmarkSave which gets the data from the NoteBox component.   
    const [episodeBookmarks, setEpisodeBookmarks] = useState([]);

    useEffect(() => {
        const urlOnly = selectedFeed.channelUrl;
        setSelectedFeedUrl(urlOnly);
    }, [])

    useEffect(() => {
        fetch(selectedFeedUrl)
        .then(res => res.text())
        .then(str => {
        const parser = new window.DOMParser();
        const data = parser.parseFromString(str, 'text/xml');
        console.log(data);
        const getTitle = data.querySelector('title');
        console.log(getTitle);
        const itemNodeList = data.querySelectorAll('item');
        console.log(itemNodeList);
        const items=[];
        itemNodeList.forEach(item => {
        items.push({
        episodeTitle: item.querySelector('title').innerHTML,
        episodeURL: item.querySelector('enclosure').getAttribute('url'),
                    })
                })
        setFeed(items);
            }) 
        }, [selectedFeedUrl])

        useEffect(() => {
            const request = new Request();
            request.post("/api/episodes", episodeDBReady);  
        }, [episodeDBReady])

        useEffect(() => {
            console.log(singleBookmark);
            const request = new Request();
            request.post("/api/bookmarks", singleBookmark);
        }, [singleBookmark])

// episode selection occurs in this (ChannelFeed) component. This function also creates an Episode object ready for posting to database.
    const handleEpisodeSelect = (event) => {
        const chosenEpisode = feed[event.target.value];
        setEpisodeToPlay(chosenEpisode);
        const newObject = {episodeTitle: chosenEpisode.episodeTitle,
        episodeURL: chosenEpisode.episodeURL,
        channel: selectedFeed };
        setEpisodeDBReady(newObject);
        }

// rendering instructions for this (ChannelFeed) component.
    const titleList = feed.map((feedItem, index) => {
        return <div id="feed-items" key={index}>
                <li value={index}>{feedItem.episodeTitle} </li>
                <button value={index} onClick={handleEpisodeSelect}>Listen</button>
        </div>
    })

// hook for retreiving bookmark details from NoteBox component
    const onBookmarkSave = (bookmarkText, time) => {
        const audioPlayer = document.getElementById("episode")
        audioPlayer.play();
        const bookmark = {
            timestamp: time,
            note: bookmarkText,
            episode: {"id": 3,
            "episodeTitle": " Friendly federated learning 🌼 (Practical AI #160)",
            "episodeURL": "https://chtbl.com/track/A551A9/https://cdn.changelog.com/uploads/practicalai/160/practical-ai-160.mp3",
            "bookmarks": [],
            "channel": {
            "id": 3,
            "channelUrl": "https://changelog.com/master/feed"
        }}
        };
        console.log("bookmark episode = ", episodeDBReady)
        setSingleBookmark(bookmark);
        const episodeBookmarkList = [...episodeBookmarks, bookmark];
        setEpisodeBookmarks(episodeBookmarkList);
        setMakeBookmark("");
    }       

// CHECK THIS STILL GETTING USED
    const onAddBookmarkClicked = (bookmark) => {
        setMakeBookmark(bookmark)
    }    

    return(
        <>
        <div id="feed">
            <ul>{titleList}</ul>
        </div>
        <div id="wrapper">
        {episodeToPlay ? <EpisodePlayer episode={episodeToPlay} onAddBookmarkClicked={onAddBookmarkClicked}/>:null}
        {makeBookmark ? <NoteBox makeBookmark={makeBookmark} onBookmarkSave={onBookmarkSave} episode={episodeDBReady}/>:null}
        </div>
        </>
    )
    

}

export default ChannelFeed;
