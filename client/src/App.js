import './App.css';
import { useEffect, useState } from 'react';
import EpisodePlayer from './components/EpisodePlayer';
import ChannelFeed from './components/ChannelFeed';
import NoteBox from './components/NoteBox';

function App() {

  // const [feedURL, setFeedURL] = useState([]);
  const [feed, setFeed] = useState([]);
  const [episodeToPlay, setEpisodeToPlay] = useState(null);
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
      const feedURL = data.querySelector('channel');
      console.log(feedURL);
      const image = feedURL.getAttribute('url');
      console.log(image);
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
  
// change NoteBox ternary to open notebox when bookmark button clicked ie something in Bookmark state?
  return (
    <div>
    <div id="container-grid">
      <div id="feed">
        <ChannelFeed feed={feed} onEpisodeSelect={onEpisodeSelect}/>
      </div>   
      <div id="main">
        {episodeToPlay ? <EpisodePlayer episode={episodeToPlay} onBookmarkClicked={onBookmarkClicked}/>:null}
        {episodeToPlay ? <NoteBox episodeBookmarks={episodeBookmarks}/>:null}
      </div>
    </div>
    </div>
  );

}

export default App;
