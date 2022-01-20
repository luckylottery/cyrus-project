import React from 'react'

export default function Wrapper (props) {
    return (
        <div className="content-wrapper constrain">
            <div className="wrapper">
                {props.content}
            </div>
        </div>
    )
}
