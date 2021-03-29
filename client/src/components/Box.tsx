import React from "react";
import "./scss/box.scss";

interface IBoxProps {
    id: number,
    hour: string,
    quotes: string,
    onClick: any,
    boxState: string
}

const Box = ({id, hour, quotes, onClick, boxState}: IBoxProps) => {
    return (
        <div data-id={id} data-quote={quotes} className={`box ${boxState}`} onClick={onClick}>
            <span>{quotes}</span>
            <h3>{hour}</h3>
        </div>
    )
}

export default Box;