import React, { useState, useEffect, useImperativeHandle, useRef, forwardRef } from "react";

import "../components/css/feedPost.css"

import {RxThickArrowUp, RxThickArrowDown} from "react-icons/rx"
import {FaRegCommentAlt} from "react-icons/fa"
import {GoGift} from "react-icons/go"
import {TbShare3} from "react-icons/tb"
import {BsThreeDots} from "react-icons/bs"
import ProfilePictureIcon from "./customIcons/profilePictureIcon";

const FeedPost = () => {
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

    useEffect(() => {
        window.addEventListener('mousedown', closeMenu);
    }, [])

    return (
        <div className="feedPost feedItem">
            <div>
                <RxThickArrowUp/>
                1.2k
                <RxThickArrowDown/>
            </div>
            <div>
                <div>
                    <ProfilePictureIcon/>
                    r/reactjs
                    <i>Posted by u/schubert142</i>
                    <i>49 minutes ago</i>
                </div>
                <div>
                    <h1>Title</h1>
                </div>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet sollicitudin enim. Suspendisse faucibus congue nulla non tincidunt. In non diam tempus, ornare arcu non, faucibus purus. Vivamus urna lorem, imperdiet vel enim at, auctor scelerisque felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum cursus urna. Vivamus quis consequat lacus. Etiam rhoncus arcu eu finibus euismod. Fusce feugiat euismod magna eget iaculis. Vivamus pretium cursus orci in mollis. Cras vel convallis urna. Quisque faucibus odio ante, et lobortis nisl efficitur vel.
                </div>
                <div>
                    <button>
                        <FaRegCommentAlt/>
                        41 Comments
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