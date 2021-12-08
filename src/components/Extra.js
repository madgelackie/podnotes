return (
    <div>
      <div id="nav-area">
        <h3>Nav bar will go here</h3>
      </div>
      <div id="container-grid">
        <div id="feed-box">
          <ChannelFeed selectedChannel={feed} onEpisodeSelect={onEpisodeSelect}/>
        </div>
        <div id="main">
          <p>player and notes will go here</p>
        </div>
      </div> 
    </div>
  );

