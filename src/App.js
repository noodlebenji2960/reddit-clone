import React, { useState, useEffect, useImperativeHandle, useRef, forwardRef } from "react";
import "./App.css"

import Header from "./components/header";
import CreatePost from "./components/createPost";
import FeedFilter from "./components/feedFilter"
import FeedPost from "./components/feedPost"

const App =()=>{
    const [feedData, setFeedData] =useState()
    const [feed, setFeed] = useState([])

    useEffect(()=>{
        fetchPopular()
    },[])

    const fetchPopular =(after)=>{
        fetch(
            `https://www.reddit.com/r/popular.json?&limit=10&t=day${after&&`&after=${after}`}`
          )
          .then((res) => res.json())
          .then((data) => {
              setFeedData(data.data)
              setFeed(feed.concat(data.data.children.map((data) => data.data)))
          })
    }

    const handleScroll=(e)=>{
        if(document.documentElement.scrollHeight-document.documentElement.scrollTop-document.documentElement.clientHeight==0){
            fetchPopular(feedData.after)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return ()=>window.removeEventListener("scroll", handleScroll)
    })

    useEffect(()=>{
        {feed!==undefined && feed.map((e, i)=>{console.log(e.name); console.log(i)})}
        console.log(feedData)
    },[feed, feedData])

    return (
        <div className="App">
            <Header/>
            <button/>
            <main>
                <CreatePost/>
                <FeedFilter/>
                {feed!==undefined && feed.map(e =>{
                    return <FeedPost apiData={e}/>
                })}
            </main>
        </div>
    )
}

export default App;

//{feed!=undefined && feed.filter((e, i)=>i>(0*scrollPos)&&i<(10*scrollPos)).map(e =>{
//    return <FeedPost apiData={e}/>
//})}