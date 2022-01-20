import React from 'react'

export default function Advert (props) {
    return (
        <iframe
            src={`${props.ads}/serve`}
            width="200px"
            height="200px"
        />
    )
}
