import './App.css';
import { useEffect, useState } from 'react';
import EpisodePlayer from './components/EpisodePlayer';
import ChannelFeed from './components/ChannelFeed';

function App() {

  // const [feedURL, setFeedURL] = useState([]);
  const [feed, setFeed] = useState([]);
  const [episodeToPlay, setEpisodeToPlay] = useState([]);

  // this will eventually be replaced by state for selectedChannel, where user selects from their list of channels
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

  const onEpisodeSelect = (episode) => {
      setEpisodeToPlay(episode)
    }
  
  return (
    <div>
      <div id="container-grid">
        <ChannelFeed feed={feed} onEpisodeSelect={onEpisodeSelect}/>    
      </div>
      <div>
        {episodeToPlay ? <EpisodePlayer episode={episodeToPlay}/>:null}
      </div>
    </div>
  );

}

export default App;
