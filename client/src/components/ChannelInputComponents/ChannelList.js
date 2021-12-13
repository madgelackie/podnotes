import { useEffect, useState } from 'react';
import ChannelFeed from './ChannelFeed';

const ChannelList = ({savedFeeds}) => {

    const [selectedFeed, setSelectedFeed] = useState(null);

    const handleSelect = (event) => {
        const chosenFeed = savedFeeds[event.target.value];
        setSelectedFeed(chosenFeed)
    } 

    const showList = savedFeeds.map((feed, index) => {
        return <div key={index}>
            <li>{feed.channelUrl}</li>
            <button value={index} onClick={handleSelect}>Select</button>
            </div>
        
    })


    return (
        <>
        <div>
        <ul>{showList}</ul>
        </div>
        {selectedFeed ? <ChannelFeed selectedFeed={selectedFeed}/>:null}
        </>
    )

}

export default ChannelList;