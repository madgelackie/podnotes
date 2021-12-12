const ChannelList = ({savedFeeds, onFeedSelected}) => {


    const handleSelect = (event) => {
        const chosenFeed = savedFeeds[event.target.value];
        onFeedSelected(chosenFeed)
    } 

    const showList = savedFeeds.map((feed, index) => {
        return <div>
            <li key={index}>{feed.channelUrl}</li>
            <button value={index} onClick={handleSelect}>Select</button>
            </div>
        
    })


    return (
        <>
        <ul>{showList}</ul>
        </>
    )

}

export default ChannelList;