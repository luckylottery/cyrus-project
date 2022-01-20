import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import NavBar from '../../../Components/Navigation/NavBar.js'
import Footer from '../../../Components/Navigation/Footer.js'
import Content from '../../../Components/Layouts/Content.js'
import 'katex/dist/katex.css';
import { useSelector } from 'react-redux'
import { selectUser } from '../../../redux/user.js'

export default function Index (props, { match }) {

    const user = useSelector(selectUser);
    let location = useLocation();

    useEffect(() => {

        console.log(location.pathname)
        /*
        axios.get(`${props.api}/posts/${location.pathname.split('/').at(-1)}`, {'headers': {'Authorization': `Bearer ${user.token}`}})
        .then(function (parent) {
            
            setQuestion(parent.data);
            axios.get(`${props.api}/posts?parent=${parent.data.slug}`, {'headers': {'Authorization': `Bearer ${user.token}`}})
            .then(function (children) {
                
                setChildren(children.data);
            })
            .catch(function (error) {
        
                console.log(error);
            });
        })
        .catch(function (error) {
    
            console.log(error);
        });
        */
    }, []);


    let questions = (
        <div className="w-full">
        </div>
    )

    const pageTitle = (
        <p>
        </p>
    )
    
    let pageSidebar = '';
    
    return (
        <div>
            <NavBar here={props.here} user={props.user} />
            <Content ads={props.ads} title={pageTitle} content={questions} sidebar={pageSidebar} />
            <Footer />
        </div>
    )
}
