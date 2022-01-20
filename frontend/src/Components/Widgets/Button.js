import React from 'react'
import {Link} from 'react-router-dom'

export default function Button (props) {

    function shadeColor(color, percent) {

        var R = parseInt(color.substring(1,3),16);
        var G = parseInt(color.substring(3,5),16);
        var B = parseInt(color.substring(5,7),16);
    
        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);
    
        R = (R<255)?R:255;  
        G = (G<255)?G:255;  
        B = (B<255)?B:255;  
    
        var RR = ((R.toString(16).length === 1) ? "0" + R.toString(16):R.toString(16));
        var GG = ((G.toString(16).length === 1) ? "0" + G.toString(16):G.toString(16));
        var BB = ((B.toString(16).length === 1) ? "0" + B.toString(16):B.toString(16));
    
        return "#"+RR+GG+BB;
    }

    if (props.background) {

        return (
            <Link className="btn rounded-md" to={props.link} style={{'backgroundColor': props.background, 'color': props.color, 'width': props.maxwidth ? '100%' : 'auto'}}>
                {props.label}
            </Link>
        )
    }

    if (props.color) {

        return (
            <Link className="btn rounded-md" to={props.link} style={{'color': props.color, 'border': '1px solid ' + shadeColor(props.color, 20), 'width': props.maxwidth ? '100%' : 'auto'}}>
                {props.label}
            </Link>
        )
    }

    return (
        <Link className="btn rounded-md" style={{'width': props.maxwidth ? '100%' : 'auto'}} to={props.link}>
            {props.label}
        </Link>
    )   
}
