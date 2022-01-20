import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import NavBar from '../Components/Navigation/NavBar.js'
import Footer from '../Components/Navigation/Footer.js'
import Content from '../Components/Layouts/Content.js'
import 'katex/dist/katex.css';
import axios from 'axios';
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/user.js'
import Button from '../Components/Widgets/Button.js'

export default function Tags (props) {

    const user = useSelector(selectUser);
    const [tags, setTags] = useState([]);

    useEffect(() => {

        axios.get(`${props.api}/posts?count=${8}`, {'headers': {'Authorization': `Bearer ${user.token}`}})
        .then(function (response) {
    
            setTags(response.data);
        })
        .catch(function (error) {
    
            console.log(error);
        });
    
    }, []);

    function truncateString(str, num) {

        if (str.length > num) {

            return str.slice(0, num) + "...";
        } else {

            return str;
        }
    }

    let pageContent = (
        <div className="w-full">
            <ul>
                { tags.map(tag =>
                    <li>
                        <Link key={tag.slug} className="rounded-lg font-medium" to={`/tags/${tags.slug}`}>
                            • test
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    )

    const pageTitle = (
        <p>
            <span className="highlight-yellow">
                Tags
            </span>
            {
                (user.roleId === 1) ? 
                    <Button link={'/tags/create'} label={"Create a tag"} solid={true} background="#EDF2FD"/>
                :
                    null
            }
        </p>
    )

    return (
        <div>
            <NavBar here={props.here} user={props.user} />
            <Content ads={props.ads} title={pageTitle} content={pageContent} />
            <Footer />
        </div>
    )
}
