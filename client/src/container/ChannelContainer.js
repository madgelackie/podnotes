import ChannelInput from "../components/ChannelInputComponents/ChannelInput";
import ChannelList from "../components/ChannelInputComponents/ChannelList";
import { useEffect, useState } from 'react';
import Request from "../services/ChannelFeedsService"

const ChannelContainer = () => {

    const [allUrl, setAllUrl] = useState([]);

    const onUrlSubmit = (url) => {
        const addingToList = [...allUrl, url];
        setAllUrl(addingToList);
    }

    return (
        <>
            <ChannelInput onUrlSubmit={onUrlSubmit} />
            <br></br>
            <ChannelList />
        </>
    )


}

export default ChannelContainer;