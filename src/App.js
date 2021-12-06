import './App.css';
import { useEffect, useState } from 'react';

function App() {

  // const [feedURL, setFeedURL] = useState([]);
  const [feed, setFeed] = useState([]);

  const rssFeed = "https://feed.podbean.com/deltaee/feed.xml"

  useEffect(() => {
    fetch(rssFeed)
    .then(res => res.text())
    .then(str => {setFeed(str)})
    }, [])


    // .then(str => {
    //   const parser = new window.DOMParser();
    //   var data = parser.parseFromString(str, "text/xml");
    //   const itemList = data.querySelectorAll('item');
    //   const items=[];
    //     itemList.forEach(el => {
    //       items.push(
    //         el.querySelector('title').innerHTML,
    //       )
    //     })
    //   })
    //   .then((items) => {setFeed(items)})
    // }, [])
    
  // const titleList = feed.map((feedItem, index) => {
  //   return <li key={index}>
  //     {feedItem}
  //   </li>
  // })
  

  return (
    <>
    <p>Hello podcast fan</p>
    </>
  );
}

export default App;
