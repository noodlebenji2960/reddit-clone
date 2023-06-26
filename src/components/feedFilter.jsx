import React, { useState, useEffect, useImperativeHandle, useRef, forwardRef } from "react";

import "../components/css/feedFilter.css"

import { IoRocketOutline } from "react-icons/io5"
import { BsFire } from "react-icons/bs"
import { TiStarburstOutline } from "react-icons/ti"
import { MdBarChart } from "react-icons/md"
import { RiLayoutRowLine } from "react-icons/ri"
import { FiChevronDown } from "react-icons/fi"
import {AiOutlineRise} from "react-icons/ai"

import CardIcon from "./customIcons/cardIcon";
import ClassicIcon from "./customIcons/classicIcon";
import CompactIcon from "./customIcons/compactIcon";


const FeedFilter = () => {
    const [activeButton, setActiveButton] = useState()
    const [topRange, setTopRange] = useState("Today")
    const [view, setView] = useState("Card")
    const topRangeRef = useRef()
    const viewRef = useRef()
    const openMenuRef = useRef()
    const menuEnter = useRef(false)

    const style = {
        fill: "var(--newCommunityTheme-button)",
        color: "var(--newCommunityTheme-button)",
        backgroundColor: "var(--newCommunityTheme-field)"
    }

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
        <div id="feedFilter" className="feedItem">
            <span>
                <button
                    onClick={() => setActiveButton("Best")}
                    style={activeButton == "Best" ? style : {}}>
                    <IoRocketOutline />
                    Best
                </button>
                <button
                    onClick={() => setActiveButton("Hot")}
                    style={activeButton == "Hot" ? style : {}}>
                    <BsFire />
                    Hot
                </button>
                <button
                    onClick={() => setActiveButton("New")}
                    style={activeButton == "New" ? style : {}}>
                    <TiStarburstOutline />
                    New
                </button>
                <button
                    onClick={(e) => setActiveButton("Top")}
                    style={activeButton == "Top" ? style : {}}>
                    <MdBarChart />
                    Top
                </button>
                {activeButton=="Top" &&
                    <button onMouseDown={(e)=>toggleMenu(e, topRangeRef)}>
                        Today
                        <FiChevronDown/>
                    </button>
                }
                <div ref={topRangeRef} role="menu">
                    <button
                        onClick={()=>setTopRange("Now")}
                        style={topRange == "Now" ? style : {}}>
                        Now
                    </button>
                    <button
                        onClick={()=>setTopRange("Today")}
                        style={topRange == "Today" ? style : {}}>
                        Today
                    </button>
                    <button
                        onClick={()=>setTopRange("This Week")}
                        style={topRange == "This Week" ? style : {}}>
                        This Week
                    </button>
                    <button
                        onClick={()=>setTopRange("This Month")}
                        style={topRange == "This Month" ? style : {}}>
                        This Month
                    </button>
                    <button
                        onClick={()=>setTopRange("This Year")}
                        style={topRange == "This Year" ? style : {}}>
                        This Year
                    </button>
                    <button
                        onClick={()=>setTopRange("All Time")}
                        style={topRange == "All Time" ? style : {}}>
                        All Time
                    </button>
                </div>
                <button
                    onClick={(e) => setActiveButton("Rising")}
                    style={activeButton == "Rising" ? style : {}}>
                    <AiOutlineRise/>
                    Rising
                </button>
            </span>
            <span>
                <button onMouseDown={(e)=>toggleMenu(e, viewRef)}>
                    {view=="Card" && <RiLayoutRowLine/>}
                    {view=="Classic" && <ClassicIcon />}
                    {view=="Compact" && <CompactIcon />}
                    <FiChevronDown />
                </button>
                <div ref={viewRef} role="menu">
                    <button 
                        onClick={()=>setView("Card")}
                        style={view == "Card" ? style : {}}>
                        <CardIcon/>
                        Card
                    </button>
                    <button 
                        onClick={()=>setView("Classic")}
                        style={view == "Classic" ? style : {}}>
                        <ClassicIcon/>
                        Classic
                    </button>
                    <button 
                        onClick={()=>setView("Compact")}
                        style={view == "Compact" ? style : {}}>
                        <CompactIcon/>
                        Compact
                    </button>
                </div>
            </span>
        </div>
    )
}

export default FeedFilter;