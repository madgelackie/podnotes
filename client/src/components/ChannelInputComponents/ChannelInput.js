import { useEffect, useState } from 'react';
import Request from '../../services/ChannelFeedsService';

const ChannelInput = ({onUrlSubmit}) => {


    const [urlInput, setUrlInput] = useState(null);

    const handleUrlChange = (event) => {
        setUrlInput(event.target.value);
    }

    const handleUrlSubmit = (event) => {
        event.preventDefault();
        onUrlSubmit(urlInput);
        setUrlInput("");
    }



    

    return (
        <>  
        <form onSubmit={handleUrlSubmit}>
            <label htmlFor="rss-url">RSS Feed URL</label>
            <input 
            type="url" 
            id="rss-url" 
            
            onChange={handleUrlChange}
            /><br></br>
            <button id="submit" type="submit" value="Submit">Save</button>
        </form>
        </>
    )

}

export default ChannelInput;