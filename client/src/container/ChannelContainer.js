import ChannelInput from "../components/ChannelInputComponents/ChannelInput";
import ChannelList from "../components/ChannelInputComponents/ChannelList";
import { useEffect, useState } from 'react';
import Request from "../services/helper"
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ChannelFeed from "../components/MainPageComponents/ChannelFeed";


const ChannelContainer = () => {

    const [savedFeeds, setSavedFeeds] = useState([]);
    const [feedDetails, setFeedDetails] = useState([]);
    const [selectedFeed, setSelectedFeed] = useState(null);
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
                const feedURL = data.querySelector('channel');
                console.log(feedURL);
                console.log(itemNodeList);
                const items=[];
                itemNodeList.forEach(item => {
                items.push({
                    title: item.querySelector('title').innerHTML,
                    mp3: item.querySelector('enclosure').getAttribute('url'),
                    // description: item.querySelector('itunes\\:summary.innerHTML')
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

    const onFeedSelected = (feedUrl) => {
        const urlOnly = feedUrl.channelUrl
        setSelectedFeed(urlOnly);
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
            <Route exact path= "/feed/selected" render={() => {
                return <ChannelFeed selectedFeed={selectedFeed} />
            }}/>
            
        </>
    )
}

export default ChannelContainer;