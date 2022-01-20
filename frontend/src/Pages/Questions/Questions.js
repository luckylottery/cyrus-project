import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import NavBar from '../../Components/Navigation/NavBar.js'
import Footer from '../../Components/Navigation/Footer.js'
import Content from '../../Components/Layouts/Content.js'
import 'katex/dist/katex.css';
import axios from 'axios';
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/user.js'
import Button from '../../Components/Widgets/Button.js'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

export default function Questions (props) {

    const user = useSelector(selectUser);
    const [questionList, setQuestionList] = useState([]);

    useEffect(() => {

        axios.get(`${props.api}/posts?count=${8}`, {'headers': {'Authorization': `Bearer ${user.token}`}})
        .then(function (response) {
    
            setQuestionList(response.data);
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

    let questions = (
        <div className="w-full questions-list">
            { questionList.map(question =>

                <Link key={question.slug} className="question-summary rounded-lg w-full" to={`/questions/${question.slug}`}>
                    <div>
                        <p className="float-left h-16 text-center font-bold text-royal-blue-dark-light bg-royal-blue-dark-base rounded-md px-4 mx-4" >                   
                            <span className="inline-block text-sm">
                                <svg className="mt-3.5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 9V7.41c0-.89-1.08-1.34-1.71-.71L3.7 11.29c-.39.39-.39 1.02 0 1.41l4.59 4.59c.63.63 1.71.19 1.71-.7V14.9c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/></svg>
                                {question.replyCount}
                            </span>
                        </p>
                        <div className="inline-block float-right text">
                            <h3 className="font-bold text-md">
                                <ReactMarkdown
                                    remarkPlugins={[remarkMath]}
                                    rehypePlugins={[rehypeKatex]}
                                >
                                    {question.title}
                                </ReactMarkdown>
                            </h3>
                            <div className="text-gray-darkest text-sm">
                                <ReactMarkdown
                                    remarkPlugins={[remarkMath]}
                                    rehypePlugins={[rehypeKatex]}
                                >
                                    {truncateString(question.content.replace(/(\r\n|\n|\r)/gm, ' '), 156)}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                    <div className="question-meta">
                        <span className="stat text-gray-darkest bg-gray-lightest">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none"/><path d="M10.06 5H5.82l.66-3.18c.08-.37-.04-.75-.3-1.02C5.74.36 5.03.36 4.6.8l-4 4c-.39.37-.6.88-.6 1.41V12c0 1.1.9 2 2 2h5.92c.8 0 1.52-.48 1.84-1.21l2.14-5C12.46 6.47 11.49 5 10.06 5zM22 10h-5.92c-.8 0-1.52.48-1.84 1.21l-2.14 5c-.56 1.32.4 2.79 1.84 2.79h4.24l-.66 3.18c-.08.37.04.75.3 1.02.44.44 1.15.44 1.58 0l4-4c.38-.38.59-.88.59-1.41V12c.01-1.1-.89-2-1.99-2z"/></svg>
                            Votes: {question.score}
                        </span>
                        <span className="stat text-green-dark bg-green-lightest">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/></g><g><path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12.88,17.76v0.36c0,0.48-0.39,0.88-0.88,0.88h0 c-0.48,0-0.88-0.39-0.88-0.88v-0.42c-0.63-0.15-1.93-0.61-2.69-2.1c-0.23-0.44-0.01-0.99,0.45-1.18l0.07-0.03 c0.41-0.17,0.87,0,1.08,0.39c0.32,0.61,0.95,1.37,2.12,1.37c0.93,0,1.98-0.48,1.98-1.61c0-0.96-0.7-1.46-2.28-2.03 c-1.1-0.39-3.35-1.03-3.35-3.31c0-0.1,0.01-2.4,2.62-2.96V5.88C11.12,5.39,11.52,5,12,5h0c0.48,0,0.88,0.39,0.88,0.88v0.37 c1.07,0.19,1.75,0.76,2.16,1.3c0.34,0.44,0.16,1.08-0.36,1.3l0,0C14.32,9,13.9,8.88,13.66,8.57c-0.28-0.38-0.78-0.77-1.6-0.77 c-0.7,0-1.81,0.37-1.81,1.39c0,0.95,0.86,1.31,2.64,1.9c2.4,0.83,3.01,2.05,3.01,3.45C15.9,17.17,13.4,17.67,12.88,17.76z"/></g></svg>
                            Bounty: $0
                        </span>
                        <ul className="tags float-right">

                        </ul>
                    </div>
                </Link>
            )} 
        </div>
    )

    const pageTitle = (
        <p>
            <span className="highlight-yellow">
                Recommended questions
            </span>
            <Button link={'/questions/ask'} label={"Ask a question"} solid={true} background="#EDF2FD"/>
        </p>
    )

    return (
        <div>
            <NavBar here={props.here} user={props.user} />
            <Content ads={props.ads} title={pageTitle} content={questions} />
            <Footer />
        </div>
    )
}
