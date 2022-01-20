import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../../Components/Navigation/NavBar.js';
import Footer from '../../Components/Navigation/Footer.js';
import Content from '../../Components/Layouts/Content.js';
import Message from '../../Components/Widgets/Message.js';
import 'mathlive';
import MDEditor, { ICommand, TextState, TextAreaTextApi } from '@uiw/react-md-editor';
import 'katex/dist/katex.css';
import katex from 'katex';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/user.js';
import ReactTags from 'react-tag-autocomplete';
import Button from '../../Components/Widgets/Button.js';
import CommentBox from '../../Components/Widgets/CommentBox.js';

export default function Ask (props) {

    const user = useSelector(selectUser);
    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [tags, setTags] = useState({
        tags: [
            { id: 1, name: "Apples" },
            { id: 2, name: "Pears" }
        ],
        suggestions: [
            { id: 3, name: "Bananas" },
            { id: 4, name: "Mangos" },
            { id: 5, name: "Lemons" },
            { id: 6, name: "Apricots" }
        ],
        focus: false
    });

    console.log('tags');
    console.log(tags);
    let reactTags = React.createRef();

    function onDelete (i) {

        setTags(prevState => {

            let temp = Object.assign({}, prevState);
            temp.tags = temp.tags.slice(0);
            temp.tags.splice(i, 1);

            return temp;
        });
    }

    function onAddition (tag) {

        setTags(prevState => {

            let temp = Object.assign({}, prevState);
            temp.tags = [].concat(tags.tags, tag);

            return temp;
        });
    }
    
    const onSubmitForm = (comment) => {

        console.log("SUBMIT FORM");
        /*
        const isValid = validate();
        
        if (!isValid) {

            return;
        }
        */
        axios.post(`${props.api}/posts/submit`, {content: comment, title: title }, {'headers': {'Authorization': `Bearer ${user.token}`}}).then(function (response) {

            console.log(response)
            if (response.status in [204, 200]) {

            }
        }).catch(function (error) {

            console.log(error);
        });
        
    };

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

    let x = `
    <div className={((errors.length) ? 'mb-4' : '')} style={{color: 'red'}}>
        {errors.map(error => {

            return (
                <Message className='mb-2.5' text={error.text} key={error.text} color="#F07171" />
            )
        })}
    </div>
    `

    let createQuestion = (
        <div className="w-full">
            <div className={`post-form-meta ${(tags.focus) ? 'border-2 border-sky-blue-crayola' : ''}`}>
                <ReactTags
                    ref={reactTags}
                    tags={tags.tags}
                    suggestions={tags.suggestions}
                    onDelete={onDelete.bind(this)}
                    onAddition={onAddition.bind(this)}
                    maxLength={4}
                />
                <div className="relative">
                    <input className="absolute bottom-0 w-full" style={{'height': '42px'}} type="text" placeholder="Question bounty" />
                </div>
            </div>
            <div className="editor-block-form mt-5">
                <div className="editor-inline mb-5 border border-none editor bg-gray-light rounded-md">
                    <MDEditor
                        value={title}
                        textareaProps={{
                            placeholder: 'Format your title here',
                            wrap: 'off'
                        }}
                        commands={[math]}
                        extraCommands={[]}
                        previewOptions={{
                            components: {

                                // KaTex fomat is no longer wrapped in code ticks.
                                // KaTex format is simply $$ KaTex code $$
                                code: ({ inline, children, className, ...props }) => {

                                    const txt = children[0] || '';
                                    if (inline) {

                                        if (typeof txt === 'string' && /^\$\$(.*)\$\$/.test(txt)) {

                                            const html = katex.renderToString(txt.replace(/^\$\$(.*)\$\$/, '$1'), {
                                                throwOnError: false,
                                            });

                                            return <code dangerouslySetInnerHTML={{ __html: html }} />;
                                        }
                                        return <code>{txt}</code>;
                                    }

                                    if (
                                        typeof txt === 'string' &&
                                        typeof className === 'string' &&
                                        /^language-katex/.test(className.toLocaleLowerCase())
                                    ) {

                                        const html = katex.renderToString(txt, {
                                            throwOnError: false,
                                        });
                                        console.log('props', txt, className, props);
                                        
                                        return <code dangerouslySetInnerHTML={{ __html: html }} />;
                                    }

                                    return <code className={String(className)}>{txt}</code>;
                                },
                            },
                        }}
                        onChange={(val) => {

                            val = val.replace(/(\r\n|\n|\r)/gm, '');

                            // Limit length of field to 1.5x of maxLength
                            if (val.length > 196 * 1.5) {

                                return;
                            }

                            setTitle(val);
                        }}
                        visiableDragbar={false}
                        fullscreen={false}
                        preview={'edit'}
                        tabSize={4}
                        height={42}
                    />
                    
                    <p className={((title.length > 196) ? 'text-red-400' : 'text-gray-dark') + ' length-tracker'}>
                        {title.length} / {196}
                    </p>
                </div>
                <CommentBox onSubmit={onSubmitForm} api={props.api} />
            </div>
            <hr className="my-5" />
            <h4 className="font-medium">Similar questions:</h4>
        </div>
    )

    const pageSidebar = (
        <div className="sticky t-20">
            <div className="border bg-white border-gray-light rounded-md px-3 py-4 mb-4 list-disc">
                <h4 className="font-medium mb-1">Tips</h4>
                <ul className="text-gray-darkest">
                    <li>
                        &nbsp; • &nbsp; Describe the goal
                    </li>
                    <li>
                        &nbsp; • &nbsp; Include relevant equations
                    </li>
                    <li>
                        &nbsp; • &nbsp; Describe what you've tried
                    </li>
                    <li>
                        &nbsp; • &nbsp; Show your work
                    </li>
                </ul>
            </div>
            <div className="border bg-white border-gray-light rounded-md px-3 py-4">
                <h4 className="font-medium mb-1">Need help?</h4>
                <p className="text-gray-darkest">
                    Check out our lessons
                </p>
            </div>
        </div>
    )

    const pageTitle = (
        <p>
            <span className="highlight-yellow">Ask your question</span>
            <Button link={'/questions'} label={"Recent questions"} solid={true} background="#EDF2FD"/>
        </p>
    )

    return (
        <div>
            <NavBar here={props.here} user={props.user} />
            <Content ads={props.ads} title={pageTitle} content={createQuestion} sidebar={pageSidebar} />
            <Footer />
        </div>
    )
}
