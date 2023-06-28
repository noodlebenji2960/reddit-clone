import React, { useState, useEffect, useImperativeHandle, useRef, forwardRef } from "react";

import "../components/css/feedPost.css"

import {RxThickArrowUp, RxThickArrowDown} from "react-icons/rx"
import {FaRegCommentAlt} from "react-icons/fa"
import {GoGift} from "react-icons/go"
import {TbShare3} from "react-icons/tb"
import {BsThreeDots} from "react-icons/bs"
import ProfilePictureIcon from "./customIcons/profilePictureIcon";

const FeedPost = (props) => {
    const openMenuRef = useRef()
    const menuEnter = useRef(false)

    const toggleMenu = (e, menuRef) => {
        e.stopPropagation();
        closeMenu()
        menuRef.current.style.display = "flex"
        openMenuRef.current = menuRef.current
        menuRef.current.addEventListener("mouseenter", handleMenuEnter)
        openMenuRef.current.addEventListener("mouseleave", handleMenuLeave)
    };

    const handleMenuEnter = (e) => { menuEnter.current = true }
    const handleMenuLeave = (e) => { menuEnter.current = false }

    const closeMenu = (e) => {
        if (openMenuRef.current !== undefined && menuEnter.current == false) {
            if (openMenuRef.current.style.display == "flex") {
                openMenuRef.current.style.display = "none"
                document.getElementById("header-search-bar").classList.remove("focused")
                openMenuRef.current.removeEventListener("mouseenter", handleMenuEnter)
                openMenuRef.current.removeEventListener("mouseenter", handleMenuEnter)
            }
        }
    };

    const timePassed=(timestamp)=>{
        const milliseconds = timestamp * 1000 
        const dateObject = new Date(milliseconds)
        const hours = Math.floor((((Date.now()-dateObject)/1000)/60)/60)
        if(hours<1){
            let minutes = Math.floor(((Date.now()-dateObject)/1000)/60)
            if(minutes<1){
                return `${Math.floor((Date.now()-dateObject)/1000)} seconds ago`
            }else{
                return `${minutes} minutes ago`
            }
        }else{
            return  `${hours} hours ago`
        }
    }

    

    useEffect(() => {
        window.addEventListener('mousedown', closeMenu);
    }, [])

    return (
        <div className="feedPost feedItem">
            <div>
                <RxThickArrowUp/>
                {props.apiData.ups>1000 ? Math.floor(props.apiData.ups/100)* 100/1000+"k" : props.apiData.ups}
                <RxThickArrowDown/>
            </div>
            <div>
                <div><span>
                    <ProfilePictureIcon/>
                        {props.apiData.subreddit_name_prefixed}
                        <i>Posted by u/{props.apiData.author}</i>
                        <i>{timePassed(props.apiData.created)}</i>
                    </span>
                    <button>
                        Join
                    </button>
                </div>
                <a href={`https://www.reddit.com/${props.apiData.permalink}`}>
                    <div>
                        <h1>{props.apiData.title}</h1>
                    </div>
                    <div>
                        {props.apiData.post_hint=="image" && <img style={{width:props.apiData.thumbnail_width+"px", height:props.apiData.thumbnail_height+"px"}} src={props.apiData.thumbnail}/>}

                        {props.apiData.post_hint=="hosted:video" && <video preload="metadata" controls><source src={props.apiData.media.reddit_video.fallback_url+"#t=0.5"}></source></video>}
                        {props.apiData.post_hint=="rich:video" && <iframe src={props.apiData.media_embed.content.match(/src\="([^\s]*)\s/)[1].slice(0,-1)}/>}

                        {props.apiData.post_hint=="link" && <img src={props.apiData.preview.images[0].url}/>}

                        {props.apiData.post_hint==undefined && props.apiData.selftext!== undefined && <p className="selfText">{props.apiData.selftext}</p>}
                    </div>
                </a>
                <div>
                    <button>
                        <FaRegCommentAlt/>
                        {props.apiData.num_comments>1000 ? Math.floor(props.apiData.num_comments/100)* 100/1000+"k" : props.apiData.num_comments}
                    </button>
                    <button>
                        <GoGift/>
                        Award
                    </button>
                    <button>
                        <TbShare3/>
                        Share
                    </button>
                    <button>
                        <BsThreeDots/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FeedPost;