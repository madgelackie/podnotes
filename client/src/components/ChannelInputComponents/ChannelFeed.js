import {useState } from 'react';


const ChannelFeed = ({selectedFeed}) => {

    const [selectedFeedUrl, setSelectedFeedUrl] = useState(null)

    const prepForEpisodes = (selectedFeed) => {
        const urlOnly = selectedFeed.channelUrl;
        setSelectedFeedUrl(urlOnly);
    }

    // const handleEpisodeSelect = (event) => {
    //     const chosenEpisode = feed[event.target.value];
    //     onEpisodeSelect(chosenEpisode)
    // }

    // const titleList = feed.map((feedItem, index) => {
    //     return <div id="feed-items" key={index}>
    //             <li value={index}>{feedItem.title} </li>
    //             <button value={index} onClick={handleEpisodeSelect}>Listen</button>
    //     </div>
    // })

    
    return(
        <div>
            <ul>boop</ul>
        </div>
        
    )
    

}

export default ChannelFeed;
