import ChannelInput from "../components/ChannelInputComponents/ChannelInput";
import ChannelList from "../components/ChannelInputComponents/ChannelList";
import { useEffect, useState } from 'react';
import Request from "../services/helper"
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const ChannelContainer = () => {

    const [savedFeeds, setSavedFeeds] = useState([]);
    const [feedDetails, setFeedDetails] = useState([]);
    const [selectedFeed, setSelectedFeed] = useState([]);

// this function is making a request to the api, and the resposne is used to set the state savedFeeds 
    useEffect(() => {
        const request = new Request();
        request.get("/api/channels")
        .then((data) => {setSavedFeeds(data)});
        }, []);

        // this starts causing an error if we add .channelUrl or other property of feed object, once we refresh the page. Works before refreshing the page though. 
        const tryingLoop = function () {
            if(savedFeeds){
            var prepForFeedLoop = [...savedFeeds];
            console.log(prepForFeedLoop[0])
        }}
        console.log(tryingLoop())

    // const tryingLoop = function () {
    //     if(savedFeeds){
    //     var prepForFeedLoop = [...savedFeeds];
    //     for (const feed of prepForFeedLoop){
    //                         fetch(feed.channelUrl)
    //                         .then(res => res.text())
    //                         .then(str => {
    //                         const parser = new window.DOMParser();
    //                         const data = parser.parseFromString(str, 'text/xml');
    //                         console.log(data);
    //                         const itemNodeList = data.querySelectorAll('item');
    //                         const feedURL = data.querySelector('channel');
    //                         console.log(feedURL);
    //                         const image = feedURL.getAttribute('url');
    //                         console.log(image);
    //                         console.log(itemNodeList);
    //                         const items=[];
    //                         itemNodeList.forEach(item => {
    //                         items.push({
    //                         title: item.querySelector('title').innerHTML,
    //                         mp3: item.querySelector('enclosure').getAttribute('url'),
    //                         })
    //                         })
    //                         setFeedDetails(items);
    //                     }) 
    //                     }

    // }}

    // useEffect(() => {
    //     requestAll()
    // }, [])

    const onUrlSubmit = function(feedUrl){
        const request = new Request();
        request.post("/api/channels", feedUrl)  
        .then(() => window.location = "/channels")
    };

    return (
        <>
            <Route exact path= "/channels" render={() => {
                return <ChannelList savedFeeds={savedFeeds}/> 
            }}/>
            <Route exact path= "/channels/new" render={() => {
                return <ChannelInput onUrlSubmit={onUrlSubmit}/>
            }}/>
            
        </>
    )
}

export default ChannelContainer;