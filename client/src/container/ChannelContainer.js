import ChannelInput from "../components/ChannelInputComponents/ChannelInput";
import ChannelList from "../components/ChannelInputComponents/ChannelList";
import { useEffect, useState } from 'react';
import Request from "../services/helper"
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';



const ChannelContainer = () => {

    const [feedUrl, setFeedUrl] = useState([]);
    const [channelTitle, setChannelTitle] = useState([]);
    const [savedFeeds, setSavedFeeds] = useState([]);


// this function is making a request to the api, and the resposne is used to set the state savedFeeds 
    useEffect(() => {
        const request = new Request();
        request.get("/api/channels")
        .then((data) => {setSavedFeeds(data)});
        }, []);

// function to post a new channel feed to the database. Gets feedUrl from ChannelInput component.
// Goes to /channels which renders the ChannelList component, which does a GET request to the DB to retreive all saved channel feed URLs.
    // const onUrlSubmit = function(feedUrl){
    //     const request = new Request();
    //     request.post("/api/channels", feedUrl)  
    //     .then(() => window.location = "/channels")
    // };

    const onUrlSubmit = (feedUrl)=>{
        setFeedUrl(feedUrl)
        // const request = new Request();
        // request.post("/api/channels", feedUrl)  
        // .then(() => window.location = "/channels")
    }

    useEffect(()=>{
        fetch(feedUrl)
        .then(res => res.text())
        .then(str => {
            const parser = new window.DOMParser();
            const data = parser.parseFromString(str, 'text/xml');
            const getTitle = data.querySelectorAll('channel');
            const channelTitle = [];
            getTitle.forEach(item => {
                channelTitle.push({
                    title: item.querySelector('title').innerHTML
                })
            })
            setChannelTitle(channelTitle)
            })
            }, [feedUrl])

    // useEffect(() => {
        // fetch(selectedFeedUrl)
        // .then(res => res.text())
        // .then(str => {
        // const parser = new window.DOMParser();
        // const data = parser.parseFromString(str, 'text/xml');
        // console.log(data);
        // const getTitle = data.querySelector('title');
        // console.log(getTitle);
        // const itemNodeList = data.querySelectorAll('item');
        // console.log(itemNodeList);
        // const items=[];
        // itemNodeList.forEach(item => {
        // items.push({
        // episodeTitle: item.querySelector('title').innerHTML,
        // episodeURL: item.querySelector('enclosure').getAttribute('url'),
        //             })
        //         })
        // setFeed(items);
        //     }) 
        // }, [selectedFeedUrl])

    if(!savedFeeds){
        return null
    }
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