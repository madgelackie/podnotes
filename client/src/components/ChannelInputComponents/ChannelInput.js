import { useEffect, useState } from 'react';

const ChannelInput = ({onUrlSubmit}) => {


    const [urlInput, setUrlInput] = useState(null);

    const handleUrlSubmit = (event) => {
        event.preventDefault();
        onUrlSubmit(urlInput);
        setUrlInput("");
    }

    const handleUrlChange = (event) => {
        setUrlInput(event.target.value);
    }

    

    return (
        <>  
        <form onSubmit={handleUrlSubmit}>
            <label for="rss-url">RSS Feed URL</label>
            <input 
            type="url" 
            id="rss-url" 
            value={urlInput}
            onChange={handleUrlChange}
            required
            /><br></br>
            <button id="submit" type="submit" value="Submit">Save</button>
        </form>
        </>
    )

}

export default ChannelInput;