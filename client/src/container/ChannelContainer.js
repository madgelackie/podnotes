import ChannelInput from "../components/ChannelInputComponents/ChannelInput";
import ChannelList from "../components/ChannelInputComponents/ChannelList";
import { useEffect, useState } from 'react';
import Request from "../services/helper"

const ChannelContainer = () => {

    const [allUrl, setAllUrl] = useState([]);
    const [savedFeeds, setSavedFeeds] = useState([]);

    // const onUrlSubmit = (url) => {
    //     const addingToList = [...allUrl, url];
    //     setAllUrl(addingToList);
    // }

// this function is making a request to the api, and the resposne is held in channelPromise
// and then this is used to set the state savedFeeds 
    useEffect(() => {
        const request = new Request();
        const channelPromise = request.get("/api/channels")
        .then((data) => {setSavedFeeds(data)})
    }, []);

    const onUrlSubmit = function(feedUrl){
        const request = new Request();
        request.post("/api/channels", feedUrl)
        }
    // .then(() => window.location = "/channels")


    return (
        <>
            <ChannelInput onUrlSubmit={onUrlSubmit} />
            <br></br>
            <ChannelList />
        </>
    )


}

export default ChannelContainer;