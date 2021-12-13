import { useEffect, useState } from 'react';


const ChannelInput = ({onUrlSubmit}) => {


    const [urlInput, setUrlInput] = useState(null);

    const handleUrlChange = (event) => {
        setUrlInput(event.target.value);
    }

// This function needs to prepare the data going up the ContainerCompenent. We will extract the channel title from a fetch to the rss feed.
    const handleUrlSubmit = (event) => {
        event.preventDefault();
        console.log(urlInput);
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