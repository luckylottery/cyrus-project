import React, { useState, useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom'
import NavBar from '../../Components/Navigation/NavBar.js'
import Footer from '../../Components/Navigation/Footer.js'
import Content from '../../Components/Layouts/Content.js'
import 'katex/dist/katex.css';
import axios from 'axios';
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/user.js'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import Button from '../../Components/Widgets/Button.js'
import CommentBox from '../../Components/Widgets/CommentBox.js'
import Comment from '../../Components/Widgets/Comment.js'
import Message from '../../Components/Widgets/Message.js'
import MDEditor, { ICommand, TextState, TextAreaTextApi } from '@uiw/react-md-editor';
import ProfileImageGenerator from '../../Components/Widgets/ProfileImageGenerator.js';
import ContentLoader from "react-content-loader"
import 'animate.css';
import ReactTooltip from 'react-tooltip';

export default function Question (props, { match }) {

    const user = useSelector(selectUser);
    const [question, setQuestion] = useState({});
    const [children, setChildren] = useState([]);
    const [vote, setVote] = useState(null);
    const [errors, setErrors] = useState([]);
    let location = useLocation();
    const [state, setState] = useState({
        commentBox: false,
        edit: false,
        delete: false,
        save: false,
        flag: false
    });

    useEffect(async () => {

        try {

            const parent = await axios.get(`${props.api}/posts/${location.pathname.split('/').at(-1)}`, {'headers': {'Authorization': `Bearer ${user.token}`}});
            setQuestion(parent.data);
    
            const children = await axios.get(`${props.api}/posts?parent=${parent.data.slug}`, {'headers': {'Authorization': `Bearer ${user.token}`}});
            setChildren(children.data);

            const myVote = await axios.get(`${props.api}/posts/${parent.data.slug}/votes/me`, {'headers': {'Authorization': `Bearer ${user.token}`}});
            setVote(myVote.data.type);
        } catch (err) {

            console.log(err);
        }
    }, []);
    

    const waitings = [
        'https://giphy.com/embed/ZXKZWB13D6gFO',
        'https://giphy.com/embed/PWfHC8ogZpWcE',
        'https://giphy.com/embed/wbXkGmM7YMgpCggnPB',
        'https://giphy.com/embed/l0HlBO7eyXzSZkJri',
        'https://giphy.com/embed/lP4jmO461gq9uLzzYc',
        'https://giphy.com/embed/26BRuo6sLetdllPAQ',
        
        // Searching
        'https://giphy.com/embed/26n6WywJyh39n1pBu',
        'https://giphy.com/embed/PibODdY9C5xiKzmRhW'
    ]

    const math: ICommand = {
        name: 'math',
        keyCommand: 'math',
        buttonProps: { 'aria-label': 'Insert 1 equation' },
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="3 3 20 20" width="14"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,19H5V5h14V19z"/><rect height="1.5" width="5" x="6.25" y="7.72"/><rect height="1.5" width="5" x="13" y="15.75"/><rect height="1.5" width="5" x="13" y="13.25"/><polygon points="8,18 9.5,18 9.5,16 11.5,16 11.5,14.5 9.5,14.5 9.5,12.5 8,12.5 8,14.5 6,14.5 6,16 8,16"/><polygon points="14.09,10.95 15.5,9.54 16.91,10.95 17.97,9.89 16.56,8.47 17.97,7.06 16.91,6 15.5,7.41 14.09,6 13.03,7.06 14.44,8.47 13.03,9.89"/></g></g></svg>
        ),
        execute: (state: TextState, api: TextAreaTextApi) => {
            
            if (!document.getElementById('math-modal')) {

                let modal = document.createElement('DIV');
                modal.id = 'math-modal';

                let field = document.createElement('math-field');
                field.id = 'math-field';
                modal.appendChild(field);

                let keyboard = document.createElement('DIV');
                keyboard.classList.add('math-keyboard');
                modal.appendChild(keyboard);

                document.activeElement.blur()

                document.body.appendChild(modal);

                document.getElementById('math-field').setOptions({
                    virtualKeyboardMode: "onfocus",
                    virtualKeyboards: 'numeric symbols'
                });

                document.getElementById('math-field').setOptions({
                    onKeystroke: (mathfield, keystroke, ev) => {

                        if (keystroke === '[Enter]') {

                            let output = mathfield.getValue('latex-expanded');
                            console.log(output);
                            api.replaceSelection(`\$\$${output}\$\$`);
                            document.getElementById('math-modal').remove();

                            return false;
                        }
                        // Keystroke not handled, return true for default handling to proceed.
                        return true;
                    }
                });                
            } else {

                document.getElementById('math-modal').remove();
            }
        }
    };

    function validate () {

        if (question.content.length <= 36) {
            
            setErrors(prev => [...prev, {
                'type': 'question',
                'text': 'Question must be at least 36 characters'
            }]);
        }

        if (question.content.length > 2048) {
            setErrors(prev => [...prev, {
                'type': 'question',
                'text': 'Question must be less than 2048 characters'    
            }]);
        }

        if (errors.length) {

            return false;
        }

        return true;
    };

    const onSubmitForm = (event) => {

        event.preventDefault();

        setErrors([]);
        const isValid = validate();
        
        if (!isValid) {

            return;
        }

        axios.post(`${props.api}/posts/edit`, question, {'headers': {'Authorization': `Bearer ${user.token}`}}).then(function (response) {

            setState(prevState => ({ edit: !prevState.edit }));
        }).catch(function (error) {

            console.log(error);
        });
    };

    let pageContent = (
        <div className="w-full animate__fadeInUp">
            <div className="w-full question-rendered">
                {state.edit ? (
                    <div className="w-full">
                        <div className={((errors.length) ? 'mb-4' : '')} style={{color: 'red'}}>
                            {errors.map(error => {
            
                                return (
                                    <Message className='mb-2.5' text={error.text} key={error.text} color="#F07171" />
                                )
                            })}
                        </div>
                        <form onSubmit={onSubmitForm} className="editor-block-form">
                            <div className={'editor-block border border-gray editor bg-gray-light rounded-md'}>
                                <MDEditor
                                    value={question.content}
                                    textareaProps={{
                                        placeholder: 'Format your question here'
                                    }}
                                    extraCommands={[math]}
                                    previewOptions={{
                                    }}
                                    onChange={(val) => {
            
                                        // Limit length of field to 1.5x of maxLength
                                        if (val.length > 1024 * 1.5) {
            
                                            return;
                                        }
                                        
                                        setQuestion({ ...question, 'question': val });
                                    }}
                                    visiableDragbar={false}
                                    fullscreen={false}
                                    preview={'edit'}
                                    tabSize={4}
                                    height={250}
                                />
                                <p className={((question.content.length > 1024) ? 'text-red-400' : 'text-gray-dark') + ' length-tracker'}>
                                    {question.content.length} / {1024}
                                </p>
                            </div>
            
                            <input type="submit" className="btn btn-blue float-right" value="Submit" />
                        </form>
                    </div>
                    ): (
                        
                        (Object.keys(question)) ? 

                            <ReactMarkdown
                                remarkPlugins={[remarkMath]}
                                rehypePlugins={[rehypeKatex]}
                            >
                                {question.content}
                            </ReactMarkdown>
                        :

                            <ContentLoader 
                                className="delay-content-loader-boxes"
                                speed={.5}
                                width={665}
                                height={220}
                                viewBox="0 0 665 220"
                                backgroundColor="#f2f5f7"
                                foregroundColor="#ECEFF1"
                                {...props}
                            >
                                <rect x="0" y="0" rx="6" ry="6" width="665" height="20" />
                                <rect x="0" y="30" rx="6" ry="6" width="665" height="20" />
                                <rect x="0" y="60" rx="6" ry="6" width="250" height="20" />
                                <rect x="0" y="90" rx="6" ry="6" width="120" height="40" />
                                <rect x="0" y="140" rx="6" ry="6" width="665" height="20" />
                                <rect x="0" y="170" rx="6" ry="6" width="665" height="20" />
                                <rect x="0" y="200" rx="6" ry="6" width="200" height="20" />
                            </ContentLoader>
                    )
                }
            </div>
            {
                (Object.keys(user).length) ?
                    <ul className="actions w-full select-none">
                        <li onClick={ () => { setState(prevState => ({ commentBox: !prevState.commentBox })) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 9V7.41c0-.89-1.08-1.34-1.71-.71L3.7 11.29c-.39.39-.39 1.02 0 1.41l4.59 4.59c.63.63 1.71.19 1.71-.7V14.9c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/></svg>
                            Reply
                        </li>
                        <li className="pointer-events-none">
                            •
                        </li>
                        <li onClick={ () => { setState(prevState => ({ edit: !prevState.edit })) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                            {
                                (state.edit) ?
                                'Discard edits'
                                :
                                'Edit'
                            }
                        </li>
                        <li className="pointer-events-none">
                            •
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z"/></svg>
                            Delete
                        </li>
                        <li className="pointer-events-none">
                            •
                        </li>
                        <li>
                            {
                                (state.save) ?
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V6c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v12z"/></svg>
                            }
                            Save
                        </li>
                        <li className="pointer-events-none">
                            •
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M14 6l-.72-1.45c-.17-.34-.52-.55-.9-.55H6c-.55 0-1 .45-1 1v15c0 .55.45 1 1 1s1-.45 1-1v-6h5l.72 1.45c.17.34.52.55.89.55H19c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1h-5zm4 8h-4l-1-2H7V6h5l1 2h5v6z"/></svg>
                            Flag
                        </li>
                    </ul>
                :
                null
            }
            {
                (Object.keys(user).length) ? (
                    <>
                        <h2 className="font-medium mt-4 mb-4">
                            Your answer:
                        </h2>
                        <div className="w-full">
                            <CommentBox parent={question} api={props.api} />
                        </div>
                        <hr className="w-full block mt-5"/>
                    </>
                )
                :
                ''
            }
            <h2 className="font-medium mt-4 mb-4">
                Replies:
            </h2>
            <div className="w-full pb-2 text-center">
                {
                    (!children.length && Object.keys(question).length) ?
                        <div className="mt-10 mb-6 py-4 mx-auto border border-gray-light rounded-md" style={{'width': '200px'}}>  
                            <h6 className="font-bold text-gray-darkest text-lg">
                                No comments yet 😕
                            </h6>
                            <div className="pointer-events-none inline-block">
                                <iframe className="rounded-sm opacity-85 inline-block pointer-events-none" src={waitings[Math.floor(Math.random() * waitings.length)]} width="164" height="auto" frameBorder="0" className="giphy-embed" allowFullScreen>
                                </iframe>
                            </div>
                            <p>
                                <a className="text-gray-dark opacity-80 font-medium text-xs" href="https://giphy.com/gifs">
                                    via GIPHY
                                    <svg className="fill-current inline-block h-4 w-4 mt-1 ml-1" style={{'verticalAlign': 'top'}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h5c.55 0 1-.45 1-1s-.45-1-1-1H5c-1.11 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6c0-.55-.45-1-1-1s-1 .45-1 1v5c0 .55-.45 1-1 1zM14 4c0 .55.45 1 1 1h2.59l-9.13 9.13c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L19 6.41V9c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1h-5c-.55 0-1 .45-1 1z"/></svg>
                                </a>
                            </p>
                        </div>
                    :
                    (children ?? []).map(function (child, i){

                        return <Comment key={i} api={props.api} data={child} parent={question.slug} />;
                    })
                }
            </div>
            {
                (!children.length && !Object.keys(question).length) ?
                    <>
                        <ContentLoader 
                            className="delay-content-loader-boxes"
                            speed={.5}
                            width={631}
                            height={220}
                            viewBox="0 0 631 220"
                            backgroundColor="#f2f5f7"
                            foregroundColor="#ECEFF1"
                            {...props}
                        >
                            <circle cx="16" cy="16" r="16" />

                            <rect x="46" y="7" rx="10" ry="10" width="100" height="20" />
                            <rect x="160" y="7" rx="10" ry="10" width="75" height="20" />
                            <rect x="613" y="7" rx="10" ry="10" width="50" height="20" />

                            <rect x="32" y="50" rx="6" ry="6" width="631" height="20" />
                            <rect x="32" y="80" rx="6" ry="6" width="631" height="20" />
                            <rect x="32" y="110" rx="6" ry="6" width="250" height="20" />
                            <rect x="32" y="140" rx="6" ry="6" width="120" height="40" />
                            <rect x="32" y="190" rx="6" ry="6" width="150" height="20" />
                        </ContentLoader>
                    </>
                :
                    null
            }
            <hr className="mt-6"/>
            <div className="w-full py-6 text-gray-darkest">
                <p>
                    Know someone who can answer? Share a link via 
                    <a href={`https://wa.me/5579XXXXXXXXX?text=${question.title}`}>
                        &nbsp;WhatsApp
                    </a>
                    ,
                    <a href={`https://wa.me/5579XXXXXXXXX?text=${question.title}`}>
                        &nbsp;Messenger
                    </a>
                    ,
                    or
                    <a href={`https://wa.me/5579XXXXXXXXX?text=${question.title}`}>
                        &nbsp;SMS text
                    </a>
                </p>
            </div>
        </div>
    )

    const pageTitle = (
        <>
            <span>
                {
                    (Object.keys(question).length) ?
                        <>
                            <ReactMarkdown
                                remarkPlugins={[remarkMath]}
                                rehypePlugins={[rehypeKatex]}
                            >
                                {question.title}
                            </ReactMarkdown>
                        </>
                    :
                        <>
                            <ContentLoader 
                                className="delay-content-loader-boxes"
                                speed={.5}
                                width={663}
                                height={39 * 2}
                                viewBox="0 0 663 78"
                                backgroundColor="#f2f5f7"
                                foregroundColor="#ECEFF1"
                                {...props}
                            >
                                <rect x="0" y="0" rx="6" ry="6" width="663" height="32" />
                                <rect x="0" y="44" rx="6" ry="6" width="550" height="32" />
                            </ContentLoader>
                        </>
                }
            </span>
            <Button link={'/questions/ask'} label={"Ask a question"} solid={true} background="#EDF2FD"/>
        </>
    )

    function castVote (state) {

        // Don't cast votes unless there's an object to cast on
        if (!Object.keys(question)) {

            return
        }

        if (state) {
            
            axios.post(`${props.api}/posts/${question.slug}/votes/${state}`, null, {'headers': {'Authorization': `Bearer ${user.token}`}})
            .then(function (res) {
                
                setVote(res.data.type);
            })
            .catch(function (error) {
        
                console.log(error);
            });

            return
        }

        axios.delete(`${props.api}/posts/${question.slug}/votes/me`, {'headers': {'Authorization': `Bearer ${user.token}`}})
        .then(function (res) {
            
            setVote(state);
        })
        .catch(function (error) {
    
            console.log(error);
        });
    }
    
    let pageSidebar = '';
    if ('user' in question) {
        pageSidebar = (
            <div className="question-sidebar">
                <div className="card px-3 py-4 pt-5">
                    <Link to={`/users/@${question.user.username}#${question.user.tag}`} className="font-medium">
                        <ProfileImageGenerator {...question.user} size={39} />
                        <div className="inline-block ml-2.5" style={{'verticalAlign': 'top', 'marginTop': '-2px'}}>
                            <p className="text-sm font-bold text-blue-light mt-0.5">
                                {`@${question.user.username}`}
                                <span className="text-gray-dark opacity-75 text-xs font-normal" style={{'verticalAlign': 'top'}}>
                                    {`#${question.user.tag}`}
                                </span>
                            </p>
                            <p className="text-xs text-gray-darkest font-normal mt-0.5">
                                {`${new Date(question.updatedAt).toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })}`}
                                {(question.edits > 0) ? <span className="text-gray-dark"> (edited)</span> : ''}
                            </p>
                        </div>
                    </Link>
                    <hr className="mt-3"/>
                    <p className="text-xs mt-3.5 text-gray-dark">
                        <svg className="inline-block w-3.5 h-3.5 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none"/><path d="M10.06 5H5.82l.66-3.18c.08-.37-.04-.75-.3-1.02C5.74.36 5.03.36 4.6.8l-4 4c-.39.37-.6.88-.6 1.41V12c0 1.1.9 2 2 2h5.92c.8 0 1.52-.48 1.84-1.21l2.14-5C12.46 6.47 11.49 5 10.06 5zM22 10h-5.92c-.8 0-1.52.48-1.84 1.21l-2.14 5c-.56 1.32.4 2.79 1.84 2.79h4.24l-.66 3.18c-.08.37.04.75.3 1.02.44.44 1.15.44 1.58 0l4-4c.38-.38.59-.88.59-1.41V12c.01-1.1-.89-2-1.99-2z"/></svg>
                        {
                            ((question.upvotes + question.downvotes) !== 0) ?
                            Math.round((question.upvotes / ( question.upvotes + question.downvotes)) * 100).toFixed(1) : '0'
                        }%
                        upvoted
                    </p>
                </div>
                <ul className="voting-controls select-none bg-white w-12 mt-4 border border-gray-light text-gray-dark" style={{'borderRadius': '1.5rem'}}>
                    <li>
                        {
                            (vote !== 1) ? 
                                <svg onClick={() => { castVote('upvote') }} className="fill-current" data-tip="Upvote" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none"/><path d="M9 21h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2zM9 9l4.34-4.34L12 10h9v2l-3 7H9V9zM1 9h4v12H1z"/></svg>
                            :
                                null
                        }
                        {
                            (vote === 1) ? 
                                <svg onClick={() => { castVote(null) }} className="fill-blue" data-tip="Remove update" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#5885EE"><path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none"/><path d="M13.12 2.06L7.58 7.6c-.37.37-.58.88-.58 1.41V19c0 1.1.9 2 2 2h9c.8 0 1.52-.48 1.84-1.21l3.26-7.61C23.94 10.2 22.49 8 20.34 8h-5.65l.95-4.58c.1-.5-.05-1.01-.41-1.37-.59-.58-1.53-.58-2.11.01zM3 21c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2s-2 .9-2 2v8c0 1.1.9 2 2 2z"/></svg>
                            :
                                null
                        }
                    </li>
                    <li>
                        •
                    </li>
                    <li>
                        {
                            (vote !== 0) ? 
                                <svg onClick={() => { castVote('downvote') }}  className="fill-current" data-tip="Downvote" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M14.99,3H6C5.2,3,4.48,3.48,4.17,4.21l-3.26,7.61C0.06,13.8,1.51,16,3.66,16h5.65l-0.95,4.58 c-0.1,0.5,0.05,1.01,0.41,1.37c0.29,0.29,0.67,0.43,1.05,0.43c0.38,0,0.77-0.15,1.06-0.44l5.53-5.54 c0.37-0.37,0.58-0.88,0.58-1.41V5C16.99,3.9,16.09,3,14.99,3z M10.66,19.33l0.61-2.92l0.5-2.41H9.31H3.66 c-0.47,0-0.72-0.28-0.83-0.45c-0.11-0.17-0.27-0.51-0.08-0.95L6,5h8.99l0,9.99L10.66,19.33z"/><path d="M21,3c-1.1,0-2,0.9-2,2v8c0,1.1,0.9,2,2,2s2-0.9,2-2V5C23,3.9,22.1,3,21,3z"/></g></g></svg>
                            :
                                null
                        }
                        {
                            (vote === 0) ? 
                                <svg onClick={() => { castVote(null) }} data-tip="Remove downvote" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#5885EE"><path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none"/><path d="M10.88 21.94l5.53-5.54c.37-.37.58-.88.58-1.41V5c0-1.1-.9-2-2-2H6c-.8 0-1.52.48-1.83 1.21L.91 11.82C.06 13.8 1.51 16 3.66 16h5.65l-.95 4.58c-.1.5.05 1.01.41 1.37.59.58 1.53.58 2.11-.01zM21 3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
                            :
                                null
                        }
                    </li>
                </ul>
            </div>
        )
    }
    
    return (
        <div>
            <ReactTooltip effect="solid" place="right" backgroundColor="#8A9199" />
            <NavBar here={props.here} user={props.user} />
            <Content ads={props.ads} title={pageTitle} content={pageContent} sidebar={pageSidebar} />
            <Footer />
        </div>
    )
}
