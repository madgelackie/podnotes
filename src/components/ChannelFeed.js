
const ChannelFeed = ({feed, onEpisodeSelect}) => {

    const handleEpisodeSelect = (event) => {
        const chosenEpisode = feed[event.target.value];
        onEpisodeSelect(chosenEpisode)
    }

    const titleList = feed.map((feedItem, index) => {
        return <div id="feed-items" key={index}>
                <li value={index} onClick={handleEpisodeSelect}>{feedItem.title} </li>
        </div>
    })

    return(
        <div id="feed-box">
            <ul>{titleList}</ul>
        </div>
        
    )

}

export default ChannelFeed;
