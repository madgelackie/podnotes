import ChannelInput from "../components/ChannelInputComponents/ChannelInput";
import ChannelList from "../components/ChannelInputComponents/ChannelList";
import { useEffect, useState } from 'react';
import Request from "../services/helper"
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const ChannelContainer = () => {

    const [savedFeeds, setSavedFeeds] = useState([]);
    // const [feedDetails, setFeedDetails] = useState([]);

// this function is making a request to the api, and the resposne is held in channelPromise
// and then this is used to set the state savedFeeds 
    useEffect(() => {
        const request = new Request();
        const channelPromise = request.get("/api/channels")
        .then((data) => {setSavedFeeds(data)})
        }, []);


    const prepForFeedLoop = [...savedFeeds];
    const feedDetails = [];
    console.log(prepForFeedLoop[2].channelUrl)
    const extractUrlTest = prepForFeedLoop.forEach(object => feedDetails.push(object.channelUrl));
    console.log(feedDetails)


    // const extractUrlTest = prepForFeedLoop.forEach(object => console.log(channelUrl));
    // console.log(extractUrlTest);
    

// the following function will make a network call to each of the saved RSS Feeds, to access the xml document, extract the required information and hold that in an object that we will then interact with. 
    // const requestAll = (savedFeeds) => {
    //     for (const feed of savedFeeds){
    //         fetch(feed)
    //         .then(res => res.text())
    //         .then(str => {
    //         const parser = new window.DOMParser();
    //         const data = parser.parseFromString(str, 'text/xml');
    //         console.log(data);
    //         const itemNodeList = data.querySelectorAll('item');
    //         const feedURL = data.querySelector('channel');
    //         console.log(feedURL);
    //         const image = feedURL.getAttribute('url');
    //         console.log(image);
    //         console.log(itemNodeList);
    //         const items=[];
    //         itemNodeList.forEach(item => {
    //         items.push({
    //         title: item.querySelector('title').innerHTML,
    //         mp3: item.querySelector('enclosure').getAttribute('url'),
    //         })
    //         })
    //         setFeedDetails(items);
    //     }) 
    //     }
    // }

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