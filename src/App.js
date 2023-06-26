import React, { useState, useEffect, useImperativeHandle, useRef, forwardRef } from "react";
import "./App.css"

import Header from "./components/header";
import CreatePost from "./components/createPost";
import FeedFilter from "./components/feedFilter"
import FeedPost from "./components/feedPost"

const App =()=>{

    return (
        <div className="App">
            <Header/>
            <main>
                <CreatePost/>
                <FeedFilter/>
                <FeedPost/>
            </main>
        </div>
    )
}

export default App;