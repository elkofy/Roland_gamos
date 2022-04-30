import React, { useEffect } from "react";
// import socket from "../middleware/Socket";

export default function Selector(props) {
    let champs = (
        props.className === "duree_item"
            ? ["30s", "60s", "90s"]
            : ["1", "2", "3"]
    )
    useEffect(() => {
        localStorage.setItem(props.className.slice(0, -5), champs[0]);
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const Highlight = (target) => {
        
        const divs = document.querySelectorAll(`.${props.className}`);
        divs.forEach(div => {
            if (div !== target) {
                div.classList.remove('bc_item_selected');
            }
        });
        target.classList.add('bc_item_selected');
        localStorage.setItem(props.className.slice(0, -5), target.innerHTML);

    }
    return (
        <div id={`${props.className.slice(0, -5)}_grid`} className="bc_grid">
            <div className={`bc_item bc_item_selected ${props.className} `} onClick={(e) => Highlight(e.target)} >
                {champs[0]}
            </div>
            <div className={`bc_item ${props.className} `} onClick={(e) => Highlight(e.target)}>
                {champs[1]}
            </div>
            <div className={`bc_item ${props.className} `} onClick={(e) => Highlight(e.target)}>
                {champs[2]}
            </div>
        </div>
    )
}
