import React from 'react';
import Avatar from "boring-avatars";

export default function ProfileImageGenerator (props) {
    
    ProfileImageGenerator.defaultProps = {
        size: 38,
        username: '',
        uuid: 'e9557252-ca03-4232-9694-a57b3311c4f3'
    };

    // Color from UUID generator
    /*
    const uuid = props.uuid;
    const parts = uuid.split('-');
    const ints = parts.map(function(d) { return parseInt(d,16) });

    let code = ints[0]
    
    let blue = (code >> 16) & 31;
    let green = (code >> 21) & 31;
    let red = (code >> 27) & 31;
    let background = "rgba(" + (red << 3) + "," + (green << 3) + "," + (blue << 3) + ", .33)";
    let foreground = "rgba(" + (red << 3) + "," + (green << 3) + "," + (blue << 3) + ", .66)";
    */

    let activityIndicatorColor = '#4CBF99';

    return (
        <div className="generated-profile-image" onClick={props.onClick} style={{'width': props.size + 'px', 'height': props.size + 'px'}} >
            <Avatar
                size={props.size}
                name={props.uuid}
                variant="beam"
                colors={["#0A2463", "#336AEE", "#1BE7FF", "#FFEF5C", "#FFE500"]}
            />
            <div className="activity-indicator w-3 h-3 border-2 absolute bottom-0 right-0 rounded-full" style={{'backgroundColor': activityIndicatorColor, 'borderColor': '#fff'}}>

            </div>
        </div>
    )
}
