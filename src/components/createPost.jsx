import React, { useState, useEffect, useImperativeHandle, useRef, forwardRef } from "react";
import "./css/createPost.css"

import { CiImageOn } from "react-icons/ci"
import { BsLink45Deg } from "react-icons/bs"
import { TbHelp } from "react-icons/tb"
import { RiFileList2Fill } from "react-icons/ri"
import { FiChevronDown } from "react-icons/fi"
import { BiGridVertical } from "react-icons/bi"

import RSlashIcon from "./customIcons/rSlashIcon"

import ProfilePictureIcon from "./customIcons/profilePictureIcon"

import redditMouse1 from "../../public/assets/redditMouse1.png"
import redditMouse2 from "../../public/assets/redditMouse2.png"

import TextEditor from "./textEditor"

const CreatePost = () => {
    const [menuStateCollapsed, setMenuStateCollapsed] = useState(true)
    const [TitleCharCount, setTitleCharCount] = useState(0)
    const [activeTab, setActiveTab] = useState("Post")
    const [dragActive, setDragActive] = useState(false);
    const [dragFilesInHand, setDragFilesInHand] = useState()
    const openMenuRef = useRef()
    const menuEnter = useRef(false)
    const inputRef = useRef();
    const chooseCommunityDropdownRef = useRef()

    const toggleMenu = () => {
        setMenuStateCollapsed(false)
    }

    const switchTab = (e, tab) => {
        e.preventDefault()
        setActiveTab(tab)
    }

    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // handleFiles(e.dataTransfer.files);
        }
    };

    const handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            // handleFiles(e.target.files);
        }
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };

    const toggleDropdown = (e, menuRef) => {
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
        document.addEventListener("dragover", () => { setDragFilesInHand(true); })
    }, [])

    useEffect(() => {
        window.addEventListener('mousedown', closeMenu);
    }, [])

    return (
        <div id="createPost" className="feedItem">
            {menuStateCollapsed == false ?
                <div className="upper">
                    <div>
                        <span>
                            Create a Post
                            <button>
                                Drafts
                                <i>0</i>
                            </button>
                        </span>
                        <div>
                            <button onMouseDown={(e) => toggleDropdown(e, chooseCommunityDropdownRef)}>
                                Choose a community
                                <FiChevronDown />
                            </button>
                            <div ref={chooseCommunityDropdownRef} role="menu">
                                <div role="heading">Your Profile</div>
                                <button>
                                    <ProfilePictureIcon />
                                    u/noodlebenji
                                </button>
                                <div role="heading">Your Communities</div>
                                <button>
                                    <RSlashIcon />
                                    r/examplecommunity
                                </button>
                            </div>
                        </div>
                    </div>
                    <span>
                        <button
                            onClick={(e) => switchTab(e, "Post")}
                            className={activeTab == "Post" ? "activeTab" : ""}>
                            <RiFileList2Fill />
                            Post
                        </button>
                        <button
                            onClick={(e) => switchTab(e, "Image & Video")}
                            className={activeTab == "Image & Video" ? "activeTab" : ""}>
                            <CiImageOn />
                            Image & Video
                        </button>
                        <button
                            onClick={(e) => switchTab(e, "Link")}
                            className={activeTab == "Link" ? "activeTab" : ""}>
                            <BsLink45Deg />
                            Link
                        </button>
                        <button
                            onClick={(e) => switchTab(e, "Poll")}
                            className={activeTab == "Poll" ? "activeTab" : ""}>
                            Poll
                        </button>
                    </span>
                </div>
                : <></>}
            <div className="main">
                <div>
                    <ProfilePictureIcon />
                </div>
                <input
                    type="text"
                    maxLength="300"
                    placeholder={menuStateCollapsed == true ? "Create Post" : "Title"}
                    onMouseDown={() => toggleMenu()}
                    onChange={e => setTitleCharCount(e.target.value.length)} />
                {menuStateCollapsed == false ?
                    <div>
                        {TitleCharCount}/300
                    </div>
                    : <></>}
                {menuStateCollapsed == true ?
                    <span>
                        <button onClick={(e) => { toggleMenu(); switchTab(e, "Image & Video") }}>
                            <CiImageOn />
                        </button>
                        <button>
                            <BsLink45Deg onClick={(e) => { toggleMenu(); switchTab(e, "Link") }} />
                        </button>
                    </span>
                    : <></>}
            </div>
            {menuStateCollapsed == false && activeTab == "Post" ?
                <div className="post">
                    <TextEditor />
                </div>
                : <></>}
            {menuStateCollapsed == false && activeTab == "Image & Video" ?
                <div className="imageVideo">
                    <form
                        id="form-file-upload"
                        onDragEnter={handleDrag}
                        onSubmit={(e) => e.preventDefault()}>
                        <input
                            ref={inputRef}
                            type="file"
                            id="input-file-upload"
                            multiple={true}
                            onChange={handleChange} />
                        <label
                            id="label-file-upload"
                            htmlFor="input-file-upload"
                            style={dragActive ? { borderColor: "var(--newCommunityTheme-button)" } : {}}>
                            <div>
                                {dragFilesInHand == true && dragActive == false && <img src={redditMouse2} />}
                                {dragActive == true && <img src={redditMouse1} />}
                                {dragFilesInHand == true ?
                                    "Drop file here!" : "Drag and drop or"}
                                <button
                                    className="upload-button"
                                    onClick={onButtonClick}>
                                    Upload
                                </button>
                            </div>
                        </label>
                        {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
                    </form>
                </div>
                : <></>}
            {menuStateCollapsed == false && activeTab == "Link" ?
                <div className="link">
                    <input type="text" placeholder="URL" />
                </div>
                : <></>}
            {menuStateCollapsed == false && activeTab == "Poll" ?
                <div className="poll">
                    <TextEditor />
                    <div>
                        <span>
                            <span>
                                <span>
                                    <button>
                                        <BiGridVertical />
                                    </button>
                                    <input type="text" placeholder="Option 1" />
                                </span>
                                <span>
                                    <button>
                                        <BiGridVertical />
                                    </button>
                                    <input type="text" placeholder="Option 2" />
                                </span>
                            </span>
                            <span>
                                <button>
                                    Add Option
                                </button>
                                <span>
                                    <label htmlFor="voteLengthInput">Voting length:</label>
                                    <select id="voteLengthInput">
                                        <option value="1">1 Day</option>
                                        <option value="2">2 Days</option>
                                        <option value="3">3 Days</option>
                                        <option value="4">4 Days</option>
                                        <option value="5">5 Days</option>
                                        <option value="6">6 Days</option>
                                        <option value="7">7 Days</option>
                                    </select>
                                </span>
                            </span>
                        </span>
                        <div>
                            <TbHelp />
                            Tips on Better Polls
                            <ol>
                                <li>Suggest short clear options</li>
                                <li>The more options, the better</li>
                                <li>Choose the poll duration</li>
                                <li>Options can be edited after post creation</li>
                            </ol>
                        </div>
                    </div>
                </div>
                : <></>}
            {menuStateCollapsed == false ?
                <div className="lower confirm">
                    <span>
                        <button>
                            OC
                        </button>
                        <button>
                            Spoiler
                        </button>
                        <button>
                            NSFW
                        </button>
                        <button>
                            Flair
                        </button>
                    </span>
                    <span>
                        <button>Save Draft</button>
                        <button>Post</button>
                    </span>
                    <div>
                        <span>
                            <input id="notificationsCheckbox" type="checkbox" />
                            <label htmlFor="notificationsCheckbox">
                                Send me post reply Notifications
                            </label>
                        </span>
                        <span>
                            <a>Connect accounts to share your post</a>
                            <TbHelp />
                        </span>
                    </div>
                </div>
                : <></>}
        </div>
    )
}

export default CreatePost;