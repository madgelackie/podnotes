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
      itemNodeList.forEach(el => {
        items.push({
          title: el.querySelector('title').innerHTML
        })
      })
      console.log(items)
      }, [])
  })
    
      

      // 
      // itemNodeList.forEach(el = {

      // })
      // setFeed([...feed, itemNodeList])
      // console.log(feed);
      // items.push(itemList);
      // setFeed(items)
      // .then((itemList) => {setFeed(itemList)}
      // const items=[];
      //   itemList.forEach(el => {
      //     items.push(
      //       el.childNodes.title,
      //     )
      //   })
      // })
  //   })
  // }, [])
    
  const titleList = feed.map((feedItem, index) => {
    return <li key={index}>
      {feedItem}
    </li>
  })
  

  return (
    <>
    <p>Hello podcast fan</p>
    </>
  );

}

export default App;
