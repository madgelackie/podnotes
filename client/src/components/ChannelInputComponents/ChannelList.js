const ChannelList = ({savedFeeds}) => {

    const showList = savedFeeds.map((feed, index) => {
        return (
            <li key={index}>
                {feed.channelUrl}
            </li>
        )

    })

    return (
        <>
        <ul>
           {showList}
        </ul>
        </>
    )

}

export default ChannelList;