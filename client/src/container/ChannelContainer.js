import ChannelInput from "../components/ChannelInputComponents/ChannelInput";
import ChannelList from "../components/ChannelInputComponents/ChannelList";
import { useEffect, useState } from 'react';
import Request from "../services/helper"
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';



const ChannelContainer = () => {

    const [savedFeeds, setSavedFeeds] = useState([]);

// this function is making a request to the api, and the resposne is used to set the state savedFeeds 
    useEffect(() => {
        const request = new Request();
        request.get("/api/channels")
        .then((data) => {setSavedFeeds(data)});
        }, []);

// function to post a new channel feed to the database. Gets feedUrl from ChannelInput component.
// Goes to /channels which renders the ChannelList component, which does a GET request to the DB to retreive all saved channel feed URLs.
    const onUrlSubmit = function(feedUrl){
        const request = new Request();
        request.post("/api/channels", feedUrl)  
        .then(() => window.location = "/channels")
    };



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