import {useEffect, useState } from 'react';
import EpisodePlayer from './EpisodePlayer';


const ChannelFeed = ({selectedFeed}) => {

    const [selectedFeedUrl, setSelectedFeedUrl] = useState(null);
    const [feed, setFeed] = useState([]);
    const [episodeToPlay, setEpisodeToPlay] = useState(null);

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
        const itemNodeList = data.querySelectorAll('item');
        console.log(itemNodeList);
        const items=[];
        itemNodeList.forEach(item => {
        items.push({
        title: item.querySelector('title').innerHTML,
        mp3: item.querySelector('enclosure').getAttribute('url'),
                    })
                })
        setFeed(items);
            }) 
        }, [selectedFeedUrl])


    const handleEpisodeSelect = (event) => {
        const chosenEpisode = feed[event.target.value];
        setEpisodeToPlay(chosenEpisode);
    }

    const titleList = feed.map((feedItem, index) => {
        return <div id="feed-items" key={index}>
                <li value={index}>{feedItem.title} </li>
                <button value={index} onClick={handleEpisodeSelect}>Listen</button>
        </div>
    })

    // <div>
    // {/* {episodeToPlay ? <EpisodePlayer episode={episodeToPlay} onBookmarkClicked={onBookmarkClicked}/>:null} */}
    // {/* {episodeToPlay ? <NoteBox episodeBookmarks={episodeBookmarks}/>:null} */}
    // </div>   

    return(
        <>
        <div>
            <ul>{titleList}</ul>
        </div>
        {episodeToPlay ? <EpisodePlayer episode={episodeToPlay}/>:null}
        </>
    )
    

}

export default ChannelFeed;
