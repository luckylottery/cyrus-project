import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import 'katex/dist/katex.css';
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/user.js'
import ProfileImageGenerator from './ProfileImageGenerator.js';
import CommentBox from './CommentBox.js';
import moment from 'moment';
import Modal from 'react-modal';

export default function Comment (props) {

    const user = useSelector(selectUser);
    const [state, setState] = useState({
        commentBox: false,
        edit: false,
        delete: false,
        save: false,
        flag: false
    });

    const modalStyles = {
        content: {
          top: '50%',
          left: '50%',
          width: '400px',
          height: '250px',
          backgroundColor: '#fff',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
    };

    Modal.setAppElement('#root');

    return (
        <>
            <Modal
                isOpen={state.delete}
                onRequestClose={() => { setState({ delete: false })}}
                style={modalStyles}
                contentLabel="Example Modal"
            ></Modal>
            <div className="comment-rendered text-left mt-6 block">
                <ProfileImageGenerator username={props.data.user.username} uuid={props.data.user.uuid} size={30} />
                <Link to={`/users/@${props.data.user.username}#${props.data.user.tag}`} className="text-base font-bold text-blue-light mt-0.5 ml-2.5 relative inline-block" style={{'verticalAlign': 'top', 'paddingTop': '1px'}}>
                    @
                    {
                        props.data.user.username
                    }
                    <span className="text-gray-dark opacity-75 text-xs font-normal" style={{'verticalAlign': 'top'}}>
                        #
                        {
                            props.data.user.tag
                        }
                    </span>
                </Link>
                <p className="text-sm inline-block ml-3 text-gray-dark mt-0.5 pt-0.5 opacity-75" style={{'verticalAlign': 'top', 'paddingTop': '1px'}}>
                    •&nbsp;	&nbsp;
                    <span className="inline-block">
                        {`${moment(new Date(props.data.updatedAt)).fromNow()}`}
                        {(props.data.edits > 0) ? <span className="text-gray-dark"> (edited)</span> : ''}
                    </span>
                </p>
                <div className="comment-content border-l-2 border-gray-light pl-4 ml-3.5 mt-1 text-base">
                    <p className="mb-4">
                        {
                            (props.data.content) ?
                            props.data.content :
                            '[deleted]'
                        }
                    </p>
                    <hr/>
                    <ul className="actions select-none w-full">
                        <li onClick={ () => { setState(prevState => ({ commentBox: !prevState.commentBox })) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 9V7.41c0-.89-1.08-1.34-1.71-.71L3.7 11.29c-.39.39-.39 1.02 0 1.41l4.59 4.59c.63.63 1.71.19 1.71-.7V14.9c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/></svg>
                            Reply
                        </li>
                        {
                            (user.uuid === props.data.user.uuid) ?
                                <>
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
                                </>
                            :
                            null
                        }
                        <li className="pointer-events-none">
                            •
                        </li>
                        <li onClick={ () => { setState(prevState => ({ delete: true })) }}>
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
                    {
                        (state.commentBox) ?
                            <div className="w-full mt-5">
                                <CommentBox api={props.api} parent={props.data.slug} />
                            </div>
                        :
                            null
                    }
                    {
                        (props.data.children ?? []).map(function (child, i){

                            return <Comment key={i} api={props.api} data={child} parent={child.slug} />;
                        })
                    }
                </div>
            </div>
        </>
    )
}
