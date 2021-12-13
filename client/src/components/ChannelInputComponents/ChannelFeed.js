import {useEffect, useState } from 'react';
import EpisodePlayer from './EpisodePlayer';
import NoteBox from './NoteBox';
import Request from '../../services/helper';


const ChannelFeed = ({selectedFeed}) => {

    const [selectedFeedUrl, setSelectedFeedUrl] = useState(null);
    const [feed, setFeed] = useState([]);
    const [episodeToPlay, setEpisodeToPlay] = useState(null);
    const [makeEpisodeBookmark, setMakeEpisodeBookmark] = useState([]);
    const [episodeDBReady, setEpisodeDBReady] = useState(
        {
            episodeTitle: "",
            episodeURL: "",
            channel: null 
        }
    )

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

// episode selection occurs in this (ChannelFeed) component. This function also creates an Episode object ready for posting to database.
    const handleEpisodeSelect = (event) => {
        const chosenEpisode = feed[event.target.value];
        setEpisodeToPlay(chosenEpisode);
        const newObject = {episodeTitle: chosenEpisode.episodeTitle,
        episodeURL: chosenEpisode.episodeURL,
        channel: selectedFeed };
        setEpisodeDBReady(newObject);
        // onEpisodeSelect();
        }

    useEffect(() => {
        const request = new Request();
        request.post("/api/episodes", episodeDBReady);  
    }, [episodeDBReady])

// rendering instructions for this (ChannelFeed) component.
    const titleList = feed.map((feedItem, index) => {
        return <div id="feed-items" key={index}>
                <li value={index}>{feedItem.episodeTitle} </li>
                <button value={index} onClick={handleEpisodeSelect}>Listen</button>
        </div>
    })

// hook for retreiving bookmark details from EpisodePlayer component
    // const onBookmarkClicked = (bookmark) => {
    //     const episodeBookmarkList = [...episodeBookmarks, bookmark];
    //     setEpisodeBookmarks(episodeBookmarkList)
    // }       

    const onBookmarkClicked = (bookmark) => {
        setMakeEpisodeBookmark(bookmark)
    }    

    
    return(
        <>
        <div>
            <ul>{titleList}</ul>
        </div>
        {episodeToPlay ? <EpisodePlayer episode={episodeToPlay} onBookmarkClicked={onBookmarkClicked}/>:null}

        {makeEpisodeBookmark ? <NoteBox makeEpisodeBookmark={makeEpisodeBookmark}/>:null}
        </>
    )
    

}

export default ChannelFeed;
