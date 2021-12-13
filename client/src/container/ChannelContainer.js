import ChannelInput from "../components/ChannelInputComponents/ChannelInput";
import ChannelList from "../components/ChannelInputComponents/ChannelList";
import { useEffect, useState } from 'react';
import Request from "../services/helper"
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ChannelFeed from "../components/ChannelInputComponents/ChannelFeed";


const ChannelContainer = () => {

    const [savedFeeds, setSavedFeeds] = useState([]);
    const [selectedFeed, setSelectedFeed] = useState(null);
    const [selectedFeedId, setSelectedFeedId] = useState(null);
    const [feed, setFeed] = useState([]);

// this function is making a request to the api, and the resposne is used to set the state savedFeeds 
    useEffect(() => {
        const request = new Request();
        request.get("/api/channels")
        .then((data) => {setSavedFeeds(data)});
        }, []);

        useEffect(() => {
            fetch(selectedFeed)
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
            }, [selectedFeed])

// this starts causing an error if we add .channelUrl or other property of feed object, once we refresh the page. Worksbefore refreshing the page though. 
    const tryingLoop = function () {
        if(savedFeeds){
        var prepForFeedLoop = [...savedFeeds];
        console.log(prepForFeedLoop[0])
    }}
    // console.log(tryingLoop())


    const onUrlSubmit = function(feedUrl){
        const request = new Request();
        request.post("/api/channels", feedUrl)  
        .then(() => window.location = "/channels")
    };

// function to create state of what channel has been selected, to extract only the (url property as this is required for the fetch in the useEffect) and save the channel id so that episodes can be saved with this detail in DB.
    const onFeedSelected = (feedUrl) => {
        const urlOnly = feedUrl.channelUrl;
        const selectedFeedId = feedUrl.id;
        setSelectedFeed(urlOnly);
        setSelectedFeedId(selectedFeedId);
        window.location = "/channel/feed"
        // also want to pass through the savedFeeds element that was selected as this will have the episodes and bookmarks saved
    }

    if(!savedFeeds){
        return null
    }
    return (
        <>
            <Route exact path= "/channels" render={() => {
                return <ChannelList savedFeeds={savedFeeds} onFeedSelected={onFeedSelected}/> 
            }}/>
            <Route exact path= "/channels/new" render={() => {
                return <ChannelInput onUrlSubmit={onUrlSubmit}/>
            }}/>
            <Route exact path= "/channel/feed" render={() => {
                // props = {selectedFeedId};
                return <ChannelFeed feed={feed} />
            }}/>
            
        </>
    )
}

export default ChannelContainer;