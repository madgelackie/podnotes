import './App.css';
import { useEffect, useState } from 'react';
import EpisodePlayer from './components/EpisodePlayer';
import ChannelFeed from './components/ChannelFeed';

function App() {

  // const [feedURL, setFeedURL] = useState([]);
  const [feed, setFeed] = useState([]);
  const [episodeToPlay, setEpisodeToPlay] = useState([]);
  const [episodeBookmarks, setEpisodeBookmarks] = useState([]);

  // this will eventually be replaced by state for selectedChannel, where user selects from their list of channels
  const rssFeed = "https://outrageandoptimism.libsyn.com/rss"

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

  const onEpisodeSelect = (episode) => {
      setEpisodeToPlay(episode)
    }
  
  const onBookmarkClicked = (bookmark) => {
      const episodeBookmarkList = [...episodeBookmarks, bookmark];
      setEpisodeBookmarks(episodeBookmarkList)
  }
  

  return (
    <div>
      <div id="container-grid">
        <ChannelFeed feed={feed} onEpisodeSelect={onEpisodeSelect}/>    
      </div>
      <div>
        {episodeToPlay ? <EpisodePlayer episode={episodeToPlay} onBookmarkClicked={onBookmarkClicked}/>:null}
      </div>
    </div>
  );

}

export default App;
