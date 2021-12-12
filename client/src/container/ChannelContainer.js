import ChannelInput from "../components/ChannelInputComponents/ChannelInput";
import ChannelList from "../components/ChannelInputComponents/ChannelList";
import { useEffect, useState } from 'react';
import Request from "../services/helper"
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const ChannelContainer = () => {


    const [savedFeeds, setSavedFeeds] = useState([]);

// this function is making a request to the api, and the resposne is held in channelPromise
// and then this is used to set the state savedFeeds 
    useEffect(() => {
        const request = new Request();
        const channelPromise = request.get("/api/channels")
        .then((data) => {setSavedFeeds(data)})
    }, []);

// following function will make a network call to each of the saved RSS Feeds, to access the xml document, extract the required information and hold that in an object that we will then interact with. 



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