import React, { useState } from 'react';
import Message from '../../Components/Widgets/Message.js'
import 'mathlive';
import MDEditor, { ICommand, TextState, TextAreaTextApi } from '@uiw/react-md-editor';
import 'katex/dist/katex.css';
import katex from 'katex';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/user.js';

export default function CommentBox (props) {

    /*
        Needs an onSubmit prop function
    */

    const user = useSelector(selectUser);
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState([]);
    const [focus, setFocus] = useState(false);

    function validate () {

        if (comment.length < 1) {
            
            setErrors(prev => [...prev, {
                'type': 'comment',
                'text': 'Comment must be at least 1 character'
            }]);
        }

        if (comment.length > 1024) {
            setErrors(prev => [...prev, {
                'type': 'comment',
                'text': 'Comment must not be longer than 1024 characters'    
            }]);
        }

        if (errors.length) {

            return false;
        }

        return true;
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

    return (
        <div className="w-full">
            <div className={((errors.length) ? 'mb-4' : '')} style={{color: 'red'}}>
                {errors.map(error => {

                    return (
                        <Message className='mb-2.5' text={error.text} key={error.text} color="#F07171" />
                    )
                })}
            </div>
            <form className="editor-block-form" onSubmit={
                (e) => {
                    
                    e.preventDefault();
                    console.log('prevented default');
                    props.onSubmit(comment);
            }}>
                <div className={`editor-block border-none editor ${(focus) ? 'input-focus' : 'bg-gray-light'} rounded-md`}>
                    <MDEditor
                        value={comment}
                        onFocus={() => {
                            setFocus(!focus)
                        }}
                        onBlur={() => {
                            setFocus(!focus)
                        }}
                        textareaProps={{
                            placeholder: 'Format your comment here'
                        }}
                        extraCommands={[math]}
                        previewOptions={{
                            components: {
                                code: ({ inline, children, className, ...props }) => {

                                    console.log(inline)
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

                            // Limit length of field to 1.5x of maxLength
                            if (val.length > 1024 * 1.5) {

                                return;
                            }

                            setComment(val);
                        }}
                        visiableDragbar={false}
                        fullscreen={false}
                        preview={'edit'}
                        tabSize={4}
                        height={220}
                    />
                    
                    <p className={((comment.length > 1024) ? 'text-red-400' : 'text-gray-dark') + ' length-tracker'}>
                        {comment.length} / {1024}
                    </p>
                </div>

                <input type="submit" className="btn btn-blue" value="Submit" />
            </form>
        </div>
    )
}
