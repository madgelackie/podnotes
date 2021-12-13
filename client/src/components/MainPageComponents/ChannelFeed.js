
const ChannelFeed = ({feed, onEpisodeSelect}) => {

    const handleEpisodeSelect = (event) => {
        const chosenEpisode = feed[event.target.value];
        onEpisodeSelect(chosenEpisode)
    }

    const titleList = feed.map((feedItem, index) => {
        return <div id="feed-items" key={index}>
                <li value={index}>{feedItem.title} </li>
                <button value={index} onClick={handleEpisodeSelect}>Listen</button>
        </div>
    })

    if(feed){
    return(
        <div>
            <ul>{titleList}</ul>
        </div>
        
    )}
    else{
        return <p>Loading...</p>
    }

}

export default ChannelFeed;
