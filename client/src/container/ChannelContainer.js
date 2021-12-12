import ChannelInput from "../components/ChannelInputComponents/ChannelInput";
import ChannelList from "../components/ChannelInputComponents/ChannelList";
import { useEffect, useState } from 'react';

const ChannelContainer = () => {

    const [newUrl, setNewUrl] = useState([]);

    const onUrlSubmit = (url) => {
        setNewUrl(url)
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