import React, { useState, useEffect, useImperativeHandle, useRef, forwardRef } from "react";

import "../components/css/header2.css"

import {
    AiOutlineCloseCircle,
    AiOutlineInfoCircle
} from "react-icons/ai"
import {
    BsSearch,
    BsArrowUpRightCircle
} from "react-icons/bs"
import {
    IoChatbubbleEllipsesOutline,
    IoNotificationsOutline,
    IoMegaphoneOutline,
    IoAddSharp,
    IoLogOutOutline,
    IoShirtOutline,
} from "react-icons/io5"
import { TbTelescope, TbHelp } from "react-icons/tb"
import { CgProfile } from "react-icons/cg"
import { BiShieldQuarter } from "react-icons/bi"
import { HiHome } from "react-icons/hi"
import { FiChevronDown } from "react-icons/fi"
import { TiStarFullOutline} from "react-icons/ti"

import ProfilePictureIcon from "./customIcons/profilePictureIcon";
import CoinIcon from "./customIcons/coinIcon";
import LogoIcon from "./customIcons/logoIcon";
import ViewOptionsIcon from "./customIcons/viewOptionsIcon"
import RSlashIcon from "./customIcons/rSlashIcon"
import TermsAndConditionsIcon from "./customIcons/termsAndConditionsIcon";
import KarmaIcon from "./customIcons/karmaIcon";

const Header = () => {
    const mainNavDropdownRef = useRef()
    const searchDropdownRef = useRef()
    const coinDropdownRef = useRef()
    const userDropdownRef = useRef()

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

    const toggleSubMenu =(e)=>{
        const svgNodes = e.target.querySelectorAll("svg")
        if(svgNodes[svgNodes.length-1].style.transform=="rotate(180deg)"){
            svgNodes[svgNodes.length-1].style.transform="rotate(0deg)"
        }else{
            svgNodes[svgNodes.length-1].style.transform="rotate(180deg)"
        }
        if(e.target.nextSibling.style.display=="flex"){
            e.target.nextSibling.style.display="none"
        }else{
            e.target.nextSibling.style.display="flex"
        }
    }

    const toggleFavorite =(e)=>{
        const svgNodes = e.target.querySelectorAll("svg")
        if(svgNodes[svgNodes.length-1].style.fill=="rgb(0, 121, 211)"){
            svgNodes[svgNodes.length-1].style.fill="rgb(0, 0, 0)"
        }else{
            svgNodes[svgNodes.length-1].style.fill="rgb(0, 121, 211)"
        }
        //other backend stuff that happens
    }

    useEffect(() => {
        window.addEventListener('mousedown', closeMenu);
    }, [])

    return (
        <header>
            <button href="/">
                <LogoIcon style={{ width: "32px", height: "32px" }}/>
                <div className="redditLogoText"/>
            </button>
            <span id="mainNav">
                <button
                    onMouseDown={(e) => {
                        toggleMenu(e, mainNavDropdownRef);
                        document.getElementById("header-search-bar").classList.remove("focused");
                    }}
                    onFocus={(e) => {
                        document.getElementById("header-subreddit-filter").focus()
                    }}>
                    <HiHome/>
                    <i>Home</i>
                    <FiChevronDown />
                </button>
                <div ref={mainNavDropdownRef} role="menu">
                    <input id="header-subreddit-filter" placeholder="Filter" />
                    <div role="heading">Favorites</div>
                    <div role="heading">Your Communities</div>
                    <button>
                        <IoAddSharp />
                        Create Community
                    </button>
                    {/*
                                COMMUNITIES.MAP(()=>{
                                    RETURN <BUTTON>
                                        <img>community group image</img>
                                        r/communityName
                                        <svg>starIcon</svg>
                                    </BUTTON>
                                })
                            */}
                    <button onClick={(e)=>toggleFavorite(e)}>
                        <span>
                            <RSlashIcon/>
                            r/examplecommunity
                        </span>
                        <TiStarFullOutline/>
                    </button>
                    <div role="heading">Following</div>
                    {/*
                                FOLLOWING.MAP(()=>{
                                    RETURN <BUTTON>
                                        <img>followed group image</img>
                                        u/followedName
                                        <svg>starIcon</svg>
                                    </BUTTON>
                                })
                            */}
                    <button onClick={(e)=>toggleFavorite(e)}>
                        <span>
                            <RSlashIcon />
                            r/examplefollow
                        </span>
                        <TiStarFullOutline/>
                    </button>
                    <div role="heading">Feeds</div>
                    <button>
                        <HiHome />
                        Home
                    </button>
                    <button>
                        <BsArrowUpRightCircle />
                        Popular
                    </button>
                    <button>
                        <IoAddSharp />
                        All
                    </button>
                    <div role="heading">Other</div>
                    <button>
                        <ProfilePictureIcon />
                        User Settings
                    </button>
                    <button>
                        <ProfilePictureIcon />
                        Messages
                    </button>
                    <button>
                        <IoAddSharp />
                        Create Post
                    </button>
                    <button>
                        <IoNotificationsOutline />
                        Notifications
                    </button>
                    <button>
                        <CoinIcon />
                        Coins
                    </button>
                    <button>
                        <BiShieldQuarter />
                        Premium
                    </button>
                    <button>
                        <IoShirtOutline />
                        Avatar
                    </button>
                </div>
            </span>
            <div id="search-container">
                <form autoComplete="off" role="search" method="get">
                    <label htmlFor="header-search-bar">
                        <BsSearch />
                    </label>
                    <input
                        type="search"
                        id="header-search-bar"
                        placeholder="Search Reddit"
                        onMouseDown={(e) => {
                            toggleMenu(e, searchDropdownRef)
                            document.getElementById("header-search-bar").classList.add("focused")
                        }}>
                    </input>
                    <button>
                        <AiOutlineCloseCircle />
                    </button>
                </form>
                <div ref={searchDropdownRef} role="menu">
                    {/*
                            SEARCHHISTORY.MAP(()=>{
                                RETURN <BUTTON>
                                    <BsSearch/>
                                    search history item
                                    <AiOutlineCloseCircle/>
                                </BUTTON>
                            })
                        */}
                    <div role="heading">Trending Today</div>
                    {/*
                            TRENDINGTODAY.MAP(()=>{
                                RETURN <A>
                                    <div>
                                        <BsArrowUpRightCircle/>
                                        trendingItemTitle
                                        trendingItemTagline
                                    </div>
                                    <div>
                                        <img src={SUBREDDITCOMMUNITYICON}/>
                                        r/subredditCommunityName
                                    </div>
                                    <img src={TRENDINGITEMATTACHED}/>
                                </A>
                            })
                        */}
                </div>
            </div>
            <div>
                <span>
                    <button>
                        <BsArrowUpRightCircle />
                    </button>
                    <div id="coinDropdown">
                        <button
                            onMouseDown={(e) => {
                                toggleMenu(e, coinDropdownRef)
                            }}>
                            <CoinIcon />
                        </button>
                        <div ref={coinDropdownRef} role="menu">
                            <div>
                                Give Gold, Silver, Platinum, and more with Coins
                                <a>What are Coins?</a>
                            </div>
                            <div>
                                500 Coins
                                <button>
                                    $1.99
                                </button>
                            </div>
                            <div>
                                1,100 Coins
                                <span>
                                    <button>
                                        $3.99
                                    </button>
                                    <i>10% Bonus</i>
                                </span>
                            </div>
                            <div>
                                1,800 Coins
                                <span>
                                    <button>
                                        $5.99
                                    </button>
                                    <i>20% Bonus</i>
                                </span>
                            </div>
                            <div>
                                3,100 Coins
                                <span>
                                    <button>
                                        $9.99
                                    </button>
                                    <i>24% Bonus</i>
                                </span>
                            </div>
                            <div>
                                7,200 Coins
                                <span>
                                    <button>
                                        $19.99
                                    </button>
                                    <i>43% Bonus</i>
                                </span>
                            </div>
                            <div>
                                40,000 Coins
                                <span>
                                    <button>
                                        $99.99
                                    </button>
                                    <i>59% Bonus</i>
                                </span>
                            </div>
                            <div>
                                82,000 Coins
                                <span>
                                    <button>
                                        $199.99
                                    </button>
                                    <i>63% Bonus</i>
                                </span>
                            </div>
                            <div>
                                <span>
                                    Premium
                                    <i>700 Coins/mo</i>
                                    <i>Ads free & more</i>
                                </span>
                                <button>
                                    Upgrade
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="verticalNavDivider"></div>
                </span>
                <button>
                    <IoChatbubbleEllipsesOutline />
                </button>
                <button>
                    <IoNotificationsOutline />
                </button>
                <button>
                    <IoAddSharp />
                </button>
                <button>
                    <IoMegaphoneOutline />
                </button>
                <div id="userDropdown">
                    <button
                        onMouseDown={(e) => {
                            toggleMenu(e, userDropdownRef);
                            document.getElementById("header-search-bar").blur()
                            document.getElementById("header-search-bar").classList.remove("focused")
                        }}>
                        <ProfilePictureIcon />
                        <div className="user">
                            <i>noodlebenji</i>
                            <span>
                                <KarmaIcon/>
                                <i>1.2k karma</i>
                            </span>
                        </div>
                        <FiChevronDown />
                    </button>
                    <div ref={userDropdownRef} role="menu">
                        <span>
                            <div role="heading">
                                <CgProfile />
                                My Stuff
                            </div>
                            <button>
                                Online Status
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider round"></span>
                                </label>
                            </button>
                            <button>
                                Profile
                            </button>
                            <button>
                                Create Avatar
                            </button>
                            <button>
                                User Settings
                            </button>
                        </span>
                        <span>
                            <div role="heading">
                                <ViewOptionsIcon />
                                View Options
                            </div>
                            <button>
                                Dark Mode
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider round"></span>
                                </label>
                            </button>
                        </span>
                        <button>
                            <RSlashIcon />
                            Create a Community
                        </button>
                        <button>
                            <IoMegaphoneOutline />
                            Adverise on Reddit
                        </button>
                        <button>
                            <CoinIcon />
                            Coins
                        </button>
                        <button>
                            <BiShieldQuarter />
                            Premium
                        </button>
                        <button onClick={(e)=>toggleSubMenu(e)}>
                            <span>
                                <TbTelescope />
                                Explore
                            </span>
                            <FiChevronDown />
                        </button>
                        <div className="subMenu">
                            <button onClick={(e)=>toggleSubMenu(e)}>
                                Gaming
                                <FiChevronDown/>
                            </button>
                            <div className="subMenu">
                                {/*map function*/}
                                <button>Valheim</button>
                                <button>Genshin Impact</button>
                                <button>Minecraft</button>
                                <button>Pokimane</button>
                                <button>Halo Infinite</button>
                                <button>Call of Duty:Warzone</button>
                                <button>Path of Exile</button>
                                <button>Hollow Knight Silks...</button>
                                <button>Escape from Tarkov</button>
                                <button>Watch Dogs:Legion</button>
                            </div>
                            <button onClick={(e)=>toggleSubMenu(e)}>
                                Sports
                                <FiChevronDown />
                            </button>
                            <div className="subMenu">
                                {/*map function*/}
                                <button>NFL</button>
                                <button>NBA</button>
                                <button>Megan Anderson</button>
                                <button>Atlanta Hawks</button>
                                <button>Los Angeles Lakers</button>
                                <button>Boston Celtics</button>
                                <button>Arsenal F.C.</button>
                                <button>Philadelphia 79ers</button>
                                <button>Premier League</button>
                                <button>UFC</button>
                            </div>
                            <button onClick={(e)=>toggleSubMenu(e)}>
                                Business, Economic...
                                <FiChevronDown />
                            </button>
                            <div className="subMenu">
                                {/*map function*/}
                                <button>GameStop</button>
                                <button>Moderna</button>
                                <button>Pfizer</button>
                                <button>Johnson & Johnson</button>
                                <button>AstraZeneca</button>
                                <button>Walgreens</button>
                                <button>Best Buy</button>
                                <button>Novavax</button>
                                <button>SpaceX</button>
                                <button>Tesla</button>
                            </div>
                            <button onClick={(e)=>toggleSubMenu(e)}>
                                Crypto
                                <FiChevronDown />
                            </button>
                            <div className="subMenu">
                                {/*map function*/}
                                <button>Cardano</button>
                                <button>Dogecoin</button>
                                <button>Algorand</button>
                                <button>Bitcoin</button>
                                <button>Litecoin</button>
                                <button>Basic Attention Token</button>
                                <button>Bitcoin Cash</button>
                            </div>
                            <button onClick={(e)=>toggleSubMenu(e)}>
                                Television
                                <FiChevronDown/>
                            </button>
                            <div className="subMenu">
                                {/*map function*/}
                                <button>The Real Housewive...</button>
                                <button>The Bachelor</button>
                                <button>Sister Wives</button>
                                <button>90 Day Fiance</button>
                                <button>Wife Swap</button>
                                <button>The Amazing Race...</button>
                                <button>Married at First Sight</button>
                                <button>The Real Housewive...</button>
                                <button>My 600-lb Life</button>
                                <button>Last Week Tonight ...</button>
                            </div>
                            <button onClick={(e)=>toggleSubMenu(e)}>
                                Celebrity
                                <FiChevronDown />
                            </button>
                            <div className="subMenu">
                                {/*map function*/}
                                <button>Kim Kardashian</button>
                                <button>Doja Cat</button>
                                <button>Iggy Azalea</button>
                                <button>Anya Taylor-Joy</button>
                                <button>Jamie Lee Curtis</button>
                                <button>Natalie Portman</button>
                                <button>Henry Cavill</button>
                                <button>Millie Bobby Brown</button>
                                <button>Tom Hiddleston</button>
                                <button>Keanu Reeves</button>
                            </div>
                            <button onClick={(e)=>toggleSubMenu(e)}>
                                More Topics
                                <FiChevronDown />
                            </button>
                            <div className="subMenu">
                                {/*map function*/}
                                <button>Animals and Pets</button>
                                <button>Art</button>
                                <button>Cars and Motor Vehi...</button>
                                <button>Crafts and DIY</button>
                                <button>Culture, Race and E...</button>
                                <button>Ethics and Philosophy</button>
                                <button>Fashion</button>
                                <button>Food and Drink</button>
                                <button>History</button>
                                <button>Hobbies</button>
                                <button>Law</button>
                                <button>Learning and Educa...</button>
                                <button>Military</button>
                                <button>Movies</button>
                                <button>Music</button>
                                <button>Place</button>
                                <button>Podcasts and Strea...</button>
                                <button>Politics</button>
                                <button>Programming</button>
                                <button>Reading, Writing, a...</button>
                                <button>Religon and Spiritu...</button>
                                <button>Science</button>
                                <button>Science</button>
                                <button>Tabletop Games</button>
                                <button>Technology</button>
                                <button>Travel</button>
                            </div>
                        </div>
                        <button>
                            <TbHelp />
                            Help Center
                        </button>
                        <button onClick={(e)=>toggleSubMenu(e)}>
                            <span>
                                <AiOutlineInfoCircle />
                                More
                            </span>
                            <FiChevronDown />
                        </button>
                        <div className="subMenu">
                            <button>Reddit iOS</button>
                            <button>Reddit Android</button>
                            <button>Rereddit</button>
                            <button>Best Communities</button>
                            <button>Communities</button>
                            <button>About Reddit</button>
                            <button>Blog</button>
                            <button>Careers</button>
                            <button>Press</button>
                            <button>Visit Old Reddit</button>
                        </div>
                        <button onClick={(e)=>toggleSubMenu(e)}>
                            <span>
                                <TermsAndConditionsIcon />
                                Terms & Policies
                            </span>
                            <FiChevronDown />
                        </button>
                        <div className="subMenu">
                            <button>User Agreement</button>
                            <button>Privacy Policy</button>
                            <button>Content Policy</button>
                            <button>Moderator Code of Conduct</button>
                        </div>
                        <span>
                            <button>
                                <IoLogOutOutline />
                                Log Out
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;