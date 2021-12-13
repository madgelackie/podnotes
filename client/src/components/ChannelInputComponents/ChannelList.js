import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ChannelFeed from './ChannelFeed';

const ChannelList = ({savedFeeds}) => {

    const [selectedFeed, setSelectedFeed] = useState(null);

    const handleSelect = (event) => {
        const chosenFeed = savedFeeds[event.target.value];
        setSelectedFeed(chosenFeed)
        // window.location = "/channels/" + chosenFeed.id;
    } 

    const showList = savedFeeds.map((feed, index) => {
        return <div key={index}>
            <li>{feed.channelUrl}</li>
            <button value={index} onClick={handleSelect}>Select</button>
            </div>
        
    })

    // window.location = "/channels/" + selectedFeedId;
    // <Route exact path= "/channels/:id" render={() => {
    //     return <ChannelFeed selectedFeedObject={selectedFeedObject} />
    // }}/>
    // <Route exact path="/channels/:id" render={() => {
    //     return <ChannelFeed selectedFeed={selectedFeed} />
    // }}/>



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