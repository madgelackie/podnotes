import {useEffect, useState } from 'react';
import EpisodePlayer from './EpisodePlayer';
import NoteBox from './NoteBox';
import Request from '../../services/helper';


const ChannelFeed = ({selectedFeed}) => {

    const [selectedFeedUrl, setSelectedFeedUrl] = useState(null);
    const [feed, setFeed] = useState([]);
    const [episodeToPlay, setEpisodeToPlay] = useState(null);
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


    const handleEpisodeSelect = (event) => {
        const chosenEpisode = feed[event.target.value];
        setEpisodeToPlay(chosenEpisode);
        // const request = new Request();
        // request.post("/api/episodes", chosenEpisode)
    }

    // const onUrlSubmit = function(feedUrl){
    //     const request = new Request();
    //     request.post("/api/channels", feedUrl)  
    //     .then(() => window.location = "/channels")
    // };

    const titleList = feed.map((feedItem, index) => {
        return <div id="feed-items" key={index}>
                <li value={index}>{feedItem.episodeTitle} </li>
                <button value={index} onClick={handleEpisodeSelect}>Listen</button>
        </div>
    })

// hook for retreiving bookmark details from NoteBox component
    const onBookmarkClicked = (bookmark) => {
        const episodeBookmarkList = [...episodeBookmarks, bookmark];
        setEpisodeBookmarks(episodeBookmarkList)
    }       
    // <div>
    // {/* {episodeToPlay ? <EpisodePlayer episode={episodeToPlay} onBookmarkClicked={onBookmarkClicked}/>:null} */}
    // {/* {episodeToPlay ? <NoteBox episodeBookmarks={episodeBookmarks}/>:null} */}
    // </div>   

    return(
        <>
        <div>
            <ul>{titleList}</ul>
        </div>
        {episodeToPlay ? <EpisodePlayer episode={episodeToPlay} onBookmarkClicked={onBookmarkClicked}/>:null}
        {episodeBookmarks ? <NoteBox episodeBookmarks={episodeBookmarks}/>:null}
        </>
    )
    

}

export default ChannelFeed;
