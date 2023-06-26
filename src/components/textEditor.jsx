import React, { useState, useEffect, useImperativeHandle, useRef, forwardRef } from "react";
import "./css/textEditor.css"

import { BiHeading } from "react-icons/bi"
import {
    BsLink45Deg,
    BsCodeSlash,
    BsSuperscript,
    BsExclamationDiamond,
} from "react-icons/bs"
import { ImBold, ImItalic, ImQuotesRight } from "react-icons/im"
import { AiOutlineStrikethrough } from "react-icons/ai"
import { MdFormatListBulleted, MdFormatListNumbered } from "react-icons/md"
import { VscTable } from "react-icons/vsc"
import { RxVideo } from "react-icons/rx"

const TextEditor = () => {
    return (
        <div className="textEditor">
            <div>
                <button><ImBold /></button>
                <button><ImItalic /></button>
                <button><BsLink45Deg /></button>
                <button><AiOutlineStrikethrough /></button>
                <button><BsCodeSlash /></button>
                <button><BsSuperscript /></button>
                <button><BsExclamationDiamond /></button>
                <button><BiHeading /></button>
                <button><MdFormatListBulleted /></button>
                <button><MdFormatListNumbered /></button>
                <button><ImQuotesRight /></button>
                <button></button>
                <button><VscTable /></button>
                <button><RxVideo /></button>
                <button>
                    Markdown mode
                </button>
            </div>
            <textarea
                rows={5}
                placeholder="Text (optional)" />
        </div>
    )
}

export default TextEditor;