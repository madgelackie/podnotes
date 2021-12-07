import './App.css';
import { useEffect, useState } from 'react';

function App() {

  // const [feedURL, setFeedURL] = useState([]);
  const [feed, setFeed] = useState([]);

  const rssFeed = "https://feeds.simplecast.com/tOjNXec5"

  useEffect(() => {
    fetch(rssFeed)
    .then(res => res.text())
    .then(str => {
      const parser = new window.DOMParser();
      const data = parser.parseFromString(str, 'text/xml');
      console.log(data);
      const itemNodeList = data.querySelectorAll('item');
      console.log(itemNodeList);
      const items=[];
      itemNodeList.forEach(item => {
        items.push({
          title: item.querySelector('title').innerHTML,
          mp3: item.querySelector('enclosure').getAttribute('url'),
          // description: item.querySelector('itunes\\:summary.innerHTML')
        })
      })
    setFeed(items);
    }) 
  }, [])
 
    
      

  const titleList = feed.map((feedItem, index) => {
      return <div id="feed-items" value={index} key={index} onClick={handleEpisodeSelect}>
                <li>{feedItem.title} </li>
            </div>
  })

  const handleEpisodeSelect = (event) => {
    // mount audio player component in 'main' grid-area
    const setEpisodeToPlay = feed[event.target.value];
  }

  

  return (
    <div>
      <div id="container-grid">
        <div id="nav-area">
          <h3>Nav bar will go here</h3>
        </div>
        <div id="feed-box">
          <ul>{titleList}</ul>
        </div>
        <div id="main">
          <p>player and notes will go here</p>
        </div>
        {selectedEpisode ? <EpisodePlayer episodeToPlay={episodeToPlay}/>:null}
      </div>
    </div>
  );

}

export default App;
