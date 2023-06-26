import React, { useState, useEffect, useImperativeHandle, useRef, forwardRef } from "react";
import "./App.css"
import Header from "./components/header";
import CreatePost from "./components/createPost";

const App =()=>{

    return (
        <div className="App">
            <Header/>
            <main>
                <CreatePost/>
            </main>
        </div>
    )
}

export default App;