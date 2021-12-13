
// import { useEffect, useState } from 'react';
// import EpisodePlayer from '../components/MainPageComponents/EpisodePlayer';
// import ChannelFeed from '../components/MainPageComponents/ChannelFeed';
// import NoteBox from '../components/MainPageComponents/NoteBox';
// import ChannelContainer from './ChannelContainer';
// import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// const MainContainer = ({selectedFeed}) => {

// // const [feedURL, setFeedURL] = useState([]);
// const [feed, setFeed] = useState([]);
// const [episodeToPlay, setEpisodeToPlay] = useState(null);
// const [episodeBookmarks, setEpisodeBookmarks] = useState([]);

// // this will eventually be replaced by state for selectedFeed, where user selects from their list of channels
// const rssFeed = "https://outrageandoptimism.libsyn.com/rss"

// useEffect(() => {
// fetch(selectedFeed)
// .then(res => res.text())
// .then(str => {
//     const parser = new window.DOMParser();
//     const data = parser.parseFromString(str, 'text/xml');
//     console.log(data);
//     const itemNodeList = data.querySelectorAll('item');
//     const feedURL = data.querySelector('channel');
//     console.log(feedURL);
//     console.log(itemNodeList);
//     const items=[];
//     itemNodeList.forEach(item => {
//     items.push({
//         title: item.querySelector('title').innerHTML,
//         mp3: item.querySelector('enclosure').getAttribute('url'),
//         // description: item.querySelector('itunes\\:summary.innerHTML')
//     })
//     })
//     setFeed(items);
//     }) 
// }, [selectedFeed])

// const onEpisodeSelect = (episode) => {
//     setEpisodeToPlay(episode)
// }

// const onBookmarkClicked = (bookmark) => {
//     const episodeBookmarkList = [...episodeBookmarks, bookmark];
//     setEpisodeBookmarks(episodeBookmarkList)
// }

// return (
//     <div>
//     <div id="container-grid">
//     <div id="feed">
//         <ChannelFeed feed={feed} onEpisodeSelect={onEpisodeSelect}/>
//     </div>
//         {episodeToPlay ? <EpisodePlayer episode={episodeToPlay} onBookmarkClicked={onBookmarkClicked}/>:null}
//         {episodeToPlay ? <NoteBox episodeBookmarks={episodeBookmarks}/>:null}
//     </div>    
//     </div>
// );

// }

// export default MainContainer;