import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import NavBar from '../Components/Navigation/NavBar.js'
import Footer from '../Components/Navigation/Footer.js'
import Content from '../Components/Layouts/Content.js'
import 'katex/dist/katex.css';
import axios from 'axios';
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/user.js'
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

export default function Gold (props) {

    const user = useSelector(selectUser);

    function checkoutProduct (event, priceID) {
        
        event.preventDefault();

        axios.post(props.pay + '/checkout', { priceID }).then(function (res) {

            if ([204, 200].includes(res.status)) {
                
                window.location = res.data.session
            }
        }).catch(function (error) {

            console.log(error);
        });
    }

    const pageSidebar = (
        <>
        </>
    )
    
    const pageContent = (
        <div class="w-full">
            <div class="illustration card">
                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" width="654.23657" height="682.11354" viewBox="0 0 654.23657 682.11354"><title>mathematics</title><path d="M892.88171,744.55677c0,25.68-138.79,46.5-310,46.5s-310-20.82-310-46.5c0-18.18,69.57-33.93,170.96-41.57,41.81-3.16,89.05-4.93,139.04-4.93,20.55,0,40.63.3,60.05.87C785.40173,703.12678,892.88171,721.95673,892.88171,744.55677Z" transform="translate(-272.88171 -108.94323)" fill="#3f3d56"/><ellipse cx="270" cy="630.61354" rx="119" ry="14.5" opacity="0.1"/><ellipse cx="269.5" cy="521.11354" rx="112.5" ry="120" fill="#3f3d56"/><rect x="235" y="592.11354" width="70" height="64" fill="#ffe500"/><polygon points="396.5 607.614 392.5 629.614 418.5 633.614 435.5 623.614 434.5 607.614 396.5 607.614" fill="#575a89"/><path d="M538.38171,303.55677s-2,23-7,24,11,41,11,41h24l19-5-9-22s-12-16-3-29S538.38171,303.55677,538.38171,303.55677Z" transform="translate(-272.88171 -108.94323)" fill="#a0616a"/><path d="M538.38171,303.55677s-2,23-7,24,11,41,11,41h24l19-5-9-22s-12-16-3-29S538.38171,303.55677,538.38171,303.55677Z" transform="translate(-272.88171 -108.94323)" opacity="0.1"/><path d="M488.38171,479.55677s-26,50-5,60,26,9,26,12-4,2-2,7-4,25,2,37,4,21,4,21,0,1,2,5,3,7,2,9-7,15-1,18,37,5,40,0-3-8,0-11,5-4,3-6-4-27-4-27,5-29,3-33-5-8-3-11,4-2,5-6,3-13,3-13l11-1,26,5s29,32,61,42c0,0,9,9,12,9s3,0,2,2-4,2-2,4,5-1,3,2-4,3-2,5-1,13-1,14-9,95-6,97,45,8,48,0-2-18-2-18,15-120,11-128-18-44-93-67c0,0-21-4-21-7s-2-22-6-23-27-2-27-2l-29,9-40-7Z" transform="translate(-272.88171 -108.94323)" fill="#2f2e41"/><path d="M523.38171,647.55677l-5,18s-4,29,1,36c3.92739,5.49834,10.93965,12.23063,23.94449,13.4122a16.07115,16.07115,0,0,0,16.77855-11.11774,5.00653,5.00653,0,0,0,.277-1.29446c0-2-3-26-3-26l-5-25-1-7Z" transform="translate(-272.88171 -108.94323)" fill="#2f2e41"/><path d="M669.38171,733.55677s-5-5-6,0-5,26,2,27,74,11,81,7,20-10,12-13-31-12-31-12-13-17-15-18-13,1-18,5S669.38171,733.55677,669.38171,733.55677Z" transform="translate(-272.88171 -108.94323)" fill="#2f2e41"/><circle cx="289.5" cy="184.61354" r="31" fill="#a0616a"/><path d="M559.38171,363.55677l-12-13-13.30147-26s-9.69853-3-11.69853,2-38,21-38,21,9,84,5,92-11,40-5,43,34,0,43,4,35,4,42-1,9-9,16-6c5.95926,2.554,19.89075-84.761,23.90164-110.781a11.844,11.844,0,0,0-4.90807-11.50971c-8.97276-6.29384-25.13277-17.13965-27.99357-15.70925C572.38171,343.55677,559.38171,363.55677,559.38171,363.55677Z" transform="translate(-272.88171 -108.94323)" fill="#575a89"/><path d="M602.38171,359.55677h0a11.85952,11.85952,0,0,1,8.91063,10.19577l8.08936,72.80423s-20,43-30,14S602.38171,359.55677,602.38171,359.55677Z" transform="translate(-272.88171 -108.94323)" fill="#575a89"/><path d="M600.38171,449.55677l22-6s4,28,8,28-14,16-23,14-22-9-23-14,9-26,9-26Z" transform="translate(-272.88171 -108.94323)" fill="#575a89"/><path d="M538.98,306.92974c2.10792-4.648,1.74193-10.06966,3.48463-14.86653a17.72716,17.72716,0,0,1,26.95315-8.38071c2.24178,1.59841,4.48928,3.84417,7.22559,3.539,2.94671-.32859,5.575-3.61593,8.2842-2.41116,3.00277,1.33533,2.19174,6.71676,5.23391,7.95972,1.6013.65426,3.49355-.35311,4.41715-1.8157a11.2246,11.2246,0,0,0,1.28583-4.97622c.41976-4.26508.79909-8.779-1.05062-12.64493a30.28893,30.28893,0,0,1-2.02829-4.08992,13.99385,13.99385,0,0,1-.38561-4.03439c-.01689-5.01309-.38281-10.24215-2.90568-14.57417-2.79955-4.80711-7.97447-7.881-13.37326-9.22227s-11.055-1.13561-16.59807-.66635c-9.16324.77574-18.71927,2.43858-25.93856,8.135a10.14728,10.14728,0,0,0-2.49336,2.61953,13.525,13.525,0,0,0-1.32811,3.84148,79.44958,79.44958,0,0,1-6.96764,18.27716,39.65627,39.65627,0,0,0-3.59543,7.76544c-.76559,2.75442-.71387,5.89343.8887,8.26085,1.30475,1.92745,3.39065,2.95463,5.02945,4.53044,1.62387,1.56146,2.38368,4.56438,4.18252,5.74673,1.57033,1.03215,3.4513.30356,5.0529,1.39752C536.40966,302.72479,536.55818,305.80443,538.98,306.92974Z" transform="translate(-272.88171 -108.94323)" fill="#2f2e41"/><path d="M564.38171,378.55677l3-6s44,13,53,25c0,0,22-14,34-12l12,2-37,33-47-4Z" transform="translate(-272.88171 -108.94323)" fill="#f2f2f2"/><path d="M562.38171,372.55677l-41,57,59,29s5.51572,3,9.75786,0l39.24214-18,37-53-37,19s-4-8-12-4Z" transform="translate(-272.88171 -108.94323)" fill="#ffe500"/><path d="M625.38171,473.55677l8-21s18-23,8-34-21,32-21,32Z" transform="translate(-272.88171 -108.94323)" fill="#a0616a"/><path d="M533.07939,470.20556l17.45624-14.152s27.11-10.865,23.97851-25.39746-34.22053,17.14513-34.22053,17.14513Z" transform="translate(-272.88171 -108.94323)" fill="#a0616a"/><path d="M489.88171,369.05677h-1s-15.5-18.5-18.5,6.5-13,108,13,111,44.5-12.5,44.5-12.5,19-29,12-29c-3.38691,0-12.59835-1.52116-21-1-8.96272.556-17.01615,3.08078-16.5.5C503.38171,439.55677,517.88171,376.05677,489.88171,369.05677Z" transform="translate(-272.88171 -108.94323)" opacity="0.1"/><path d="M488.38171,349.55677l-4-2s-16,3-19,28-13,108,13,111,61-4,61-4,7-38,0-38-43,5-42,0S516.38171,356.55677,488.38171,349.55677Z" transform="translate(-272.88171 -108.94323)" fill="#575a89"/><polygon points="338 353.114 349.027 336.213 356 364.114 338 372.114 338 353.114" fill="#575a89"/><circle cx="111.47314" cy="85.11354" r="27" fill="#f2f2f2"/><rect x="79.47314" y="286.11354" width="64" height="64" fill="#f2f2f2"/><polygon points="372 0 388.199 28.057 404.397 56.114 372 56.114 339.603 56.114 355.801 28.057 372 0" fill="#f2f2f2"/><path d="M927.11829,277.17226q-.58078,17.95539-8.74513,28.78352-8.16571,10.82931-19.40145,10.83029-9.15176,0-16.04242-10.59861-6.89283-10.5984-6.892-32.60592,0-4.8648.23169-9.26642.23089-4.40064.57921-8.33968l4.05409-38.108H854.14538Q847.196,290.14515,842.73627,303.871q-4.46013,13.72556-15.11568,13.726a12.78019,12.78019,0,0,1-8.57155-3.59073,12.06434,12.06434,0,0,1-4.0541-9.4983q0-5.326,8.3976-14.884,8.39721-9.55611,9.32434-17.43233l6.94976-54.32423H828.43149a19.9108,19.9108,0,0,0-9.09265,2.25854,17.15586,17.15586,0,0,0-6.54451,5.27024l-4.98084,7.41313H803.7594q5.67412-17.6052,13.95764-26.46706,8.28-8.86106,19.05393-8.861H925.2652v20.38611H895.381q-1.39011,13.89963-2.14289,27.799-.75455,13.89963-.75278,27.9151,0,9.499,4.40162,15.40548,4.40064,5.90738,11.00386,5.90718,4.05312,0,8.51344-3.30132a11.97,11.97,0,0,0,5.03856-8.62908q.34754-2.54667.52109-3.99618.17377-1.44695.174-1.79536Z" transform="translate(-272.88171 -108.94323)" fill="#ffe500"/><path d="M927.11829,277.17226q-.58078,17.95539-8.74513,28.78352-8.16571,10.82931-19.40145,10.83029-9.15176,0-16.04242-10.59861-6.89283-10.5984-6.892-32.60592,0-4.8648.23169-9.26642.23089-4.40064.57921-8.33968l4.05409-38.108H854.14538Q847.196,290.14515,842.73627,303.871q-4.46013,13.72556-15.11568,13.726a12.78019,12.78019,0,0,1-8.57155-3.59073,12.06434,12.06434,0,0,1-4.0541-9.4983q0-5.326,8.3976-14.884,8.39721-9.55611,9.32434-17.43233l6.94976-54.32423H828.43149a19.9108,19.9108,0,0,0-9.09265,2.25854,17.15586,17.15586,0,0,0-6.54451,5.27024l-4.98084,7.41313H803.7594q5.67412-17.6052,13.95764-26.46706,8.28-8.86106,19.05393-8.861H925.2652v20.38611H895.381q-1.39011,13.89963-2.14289,27.799-.75455,13.89963-.75278,27.9151,0,9.499,4.40162,15.40548,4.40064,5.90738,11.00386,5.90718,4.05312,0,8.51344-3.30132a11.97,11.97,0,0,0,5.03856-8.62908q.34754-2.54667.52109-3.99618.17377-1.44695.174-1.79536Z" transform="translate(-272.88171 -108.94323)" opacity="0.1"/><path d="M927.11829,273.55326q-.58078,17.95539-8.74513,28.78352-8.16571,10.82931-19.40145,10.83029-9.15176,0-16.04242-10.5986-6.89283-10.59841-6.892-32.60593,0-4.8648.23169-9.26642.23089-4.40064.57921-8.33967l4.05409-38.10806H854.14538Q847.196,286.52615,842.73627,300.252q-4.46013,13.72557-15.11568,13.726a12.78019,12.78019,0,0,1-8.57155-3.59073,12.06432,12.06432,0,0,1-4.0541-9.49829q0-5.326,8.3976-14.884,8.39721-9.55612,9.32434-17.43233l6.94976-54.32424H828.43149a19.9108,19.9108,0,0,0-9.09265,2.25854,17.15586,17.15586,0,0,0-6.54451,5.27024l-4.98084,7.41314H803.7594q5.67412-17.60522,13.95764-26.46706,8.28-8.86107,19.05393-8.861H925.2652v20.38611H895.381q-1.39011,13.89963-2.14289,27.79906-.75455,13.89962-.75278,27.91509,0,9.499,4.40162,15.40548,4.40064,5.90738,11.00386,5.90718,4.05312,0,8.51344-3.30132a11.97,11.97,0,0,0,5.03856-8.62908q.34754-2.54667.52109-3.99617.17377-1.447.174-1.79537Z" transform="translate(-272.88171 -108.94323)" fill="#ffe500"/></svg>
                <h3 className="text-white text-3xl font-bold">
                    <span className="text-golden-yellow text-5xl">
                        𝜋
                    </span>
                    &nbsp;
                    Club
                </h3>
                <p className="text-royal-blue-dark-lighter font-medium" style={{'filter': 'brightness(175%)'}}>
                    Upgrade your account to get 2,000 coins every month and to unlock exclusive perks to superpower your learning
                </p>
                <a href="https://checkout.stripe.com/mathbanana/pay" class="btn btn-yellow" onClick={(e) => { checkoutProduct(e, 'price_1KDMKDGi5Tu5mGHHdpOOa4Gf') }}>
                    <p>$14.99/mo</p>
                </a>
                <div class="pattern"></div>
                <div class="shine"></div>
            </div>
            <div class="perks">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zM3 12c0-2.39 1.4-4.46 3.43-5.42.34-.16.57-.47.57-.84v-.19c0-.68-.71-1.11-1.32-.82C2.92 5.99 1 8.77 1 12s1.92 6.01 4.68 7.27c.61.28 1.32-.14 1.32-.82v-.18c0-.37-.23-.69-.57-.85C4.4 16.46 3 14.39 3 12z"/></svg>
                    <h4>
                        <span>
                            2,000 coins /mo
                        </span>
                    </h4>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/><rect fill="none" height="24" width="24"/></g><g><path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M13.56,6.53L13.56,6.53 c0.29-0.29,0.77-0.29,1.06,0l0.88,0.88l0.88-0.88c0.29-0.29,0.77-0.29,1.06,0l0,0c0.29,0.29,0.29,0.77,0,1.06l-0.88,0.88l0.88,0.88 c0.29,0.29,0.29,0.77,0,1.06v0c-0.29,0.29-0.77,0.29-1.06,0L15.5,9.54l-0.88,0.88c-0.29,0.29-0.77,0.29-1.06,0l0,0 c-0.29-0.29-0.29-0.77,0-1.06l0.88-0.88l-0.88-0.88C13.26,7.3,13.26,6.82,13.56,6.53z M7,7.72h3.5c0.41,0,0.75,0.34,0.75,0.75v0 c0,0.41-0.34,0.75-0.75,0.75H7c-0.41,0-0.75-0.34-0.75-0.75v0C6.25,8.06,6.59,7.72,7,7.72z M10.75,16H9.5v1.25 C9.5,17.66,9.16,18,8.75,18h0C8.34,18,8,17.66,8,17.25V16H6.75C6.34,16,6,15.66,6,15.25v0c0-0.41,0.34-0.75,0.75-0.75H8v-1.25 c0-0.41,0.34-0.75,0.75-0.75h0c0.41,0,0.75,0.34,0.75,0.75v1.25h1.25c0.41,0,0.75,0.34,0.75,0.75v0C11.5,15.66,11.16,16,10.75,16z M17.25,17.25h-3.5c-0.41,0-0.75-0.34-0.75-0.75l0,0c0-0.41,0.34-0.75,0.75-0.75h3.5c0.41,0,0.75,0.34,0.75,0.75l0,0 C18,16.91,17.66,17.25,17.25,17.25z M17.25,14.75h-3.5C13.34,14.75,13,14.41,13,14v0c0-0.41,0.34-0.75,0.75-0.75h3.5 c0.41,0,0.75,0.34,0.75,0.75v0C18,14.41,17.66,14.75,17.25,14.75z"/></g></svg>
                    <h4>
                        <span>
                            Unlimited calculations
                        </span>
                    </h4>   
                </div>             
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/><rect fill="none" height="24" width="24"/></g><g><g><path d="M20,3H4C2.9,3,2,3.9,2,5v14c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V5 C22,3.9,21.1,3,20,3z M9,17H6c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1h3c0.55,0,1,0.45,1,1C10,16.55,9.55,17,9,17z M9,13H6 c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1h3c0.55,0,1,0.45,1,1C10,12.55,9.55,13,9,13z M9,9H6C5.45,9,5,8.55,5,8c0-0.55,0.45-1,1-1h3 c0.55,0,1,0.45,1,1C10,8.55,9.55,9,9,9z M18.7,11.12l-3.17,3.17c-0.39,0.39-1.03,0.39-1.42,0l-1.41-1.42 c-0.39-0.39-0.39-1.02,0-1.41c0.39-0.39,1.02-0.39,1.41,0l0.71,0.71l2.47-2.47c0.39-0.39,1.02-0.39,1.41,0l0.01,0.01 C19.09,10.1,19.09,10.74,18.7,11.12z" fill-rule="evenodd"/></g></g></svg>
                    <h4>
                        <span>
                            Detailed steps
                        </span>
                    </h4>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 14H6v-2h2v2zm0-3H6V9h2v2zm0-3H6V6h2v2zm6 6h-3c-.55 0-1-.45-1-1s.45-1 1-1h3c.55 0 1 .45 1 1s-.45 1-1 1zm3-3h-6c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1s-.45 1-1 1zm0-3h-6c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg>
                    <h4>
                        <span>
                            Unlimited answer unlocks
                        </span>
                    </h4>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18px" height="18px">
                        <text className="font-bold" x="50%" y="50%" fontSize="1.75em" dominantBaseline="middle" textAnchor="middle">
                            𝜋
                        </text>
                    </svg>
                    <h4>
                        <span>
                            Exclusive profile badge
                        </span>
                    </h4>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18px" height="18px">
                        <text className="font-bold" x="50%" y="50%" fontSize="1.75em" dominantBaseline="middle" textAnchor="middle">
                            𝜋
                        </text>
                    </svg>
                    <h4>
                        <span>
                            No more ads
                        </span>
                    </h4>
                </div>
            </div>
            <p className="section-title mt-5">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/><path d="M18,3h-3.18C14.4,1.84,13.3,1,12,1S9.6,1.84,9.18,3H6C4.9,3,4,3.9,4,5v15c0,1.1,0.9,2,2,2h6.11 c-0.59-0.57-1.07-1.25-1.42-2H6V5h2v1c0,1.1,0.9,2,2,2h4c1.1,0,2-0.9,2-2V5h2v5.08c0.71,0.1,1.38,0.31,2,0.6V5C20,3.9,19.1,3,18,3z M12,5c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1c0.55,0,1,0.45,1,1C13,4.55,12.55,5,12,5z M17,12c-2.76,0-5,2.24-5,5s2.24,5,5,5 c2.76,0,5-2.24,5-5S19.76,12,17,12z M18.29,19l-1.65-1.65c-0.09-0.09-0.15-0.22-0.15-0.35l0-2.49c0-0.28,0.22-0.5,0.5-0.5h0 c0.28,0,0.5,0.22,0.5,0.5l0,2.29l1.5,1.5c0.2,0.2,0.2,0.51,0,0.71v0C18.8,19.2,18.49,19.2,18.29,19z"/></g></svg>
                    Subscribe
                </span>
            </p>
            <table className="w-full purchase-options mb-2">
                <tr style={{'borderBottom': 'none'}}>
                    <td>
                        <h3>Month to month</h3>
                    </td>
                    <td>
                        <a href="https://checkout.stripe.com/mathbanana/pay" onClick={(e) => { checkoutProduct(e, 'price_1KDMKDGi5Tu5mGHHdpOOa4Gf') }} class="btn btn-gray float-right">
                            <p>$19.99/mo</p>
                        </a>
                    </td>
                </tr>
                <tr className="bordered-table-row-gray rounded-lg bg-royal-blue-dark-lightest">
                    <td>
                        <h3 className="inline-block text-royal-blue-dark">3 month commitment</h3>
                        <p className="ml-2 pill pill-green">
                            25% off
                        </p>
                    </td>
                    <td>
                        <a href="https://checkout.stripe.com/mathbanana/pay" onClick={(e) => { checkoutProduct(e, 'price_1KDMKDGi5Tu5mGHHdpOOa4Gf') }} class="btn btn-royal-blue-dark float-right">
                            <p>$14.99/mo</p>
                        </a>
                    </td>
                </tr>
            </table>
            <p className="section-title mt-7">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M14 9.5h3c.55 0 1-.45 1-1s-.45-1-1-1h-3c-.55 0-1 .45-1 1s.45 1 1 1zm0 7h3c.55 0 1-.45 1-1s-.45-1-1-1h-3c-.55 0-1 .45-1 1s.45 1 1 1zm5 4.5H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2zM7 11h3c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1zm0-4h3v3H7V7zm0 11h3c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1zm0-4h3v3H7v-3z"/></svg>
                    Or, just buy coins directly
                </span>
            </p>
            <table className="w-full purchase-options">
                <tr>
                    <td>
                        <h3>
                            500 coins
                        </h3>
                    </td>
                    <td>
                        <a href="https://checkout.stripe.com/mathbanana/pay" onClick={(e) => { checkoutProduct(e, 'price_1KDMEwGi5Tu5mGHH6kePKQMZ') }} class="btn btn-gray float-right">
                            <p>$4.99</p>
                        </a>
                    </td>
                </tr>
                <tr className="rounded-lg">
                    <td>
                        <h3 className="inline-block">
                            2,000 coins
                        </h3>
                    </td>
                    <td>
                        <a href="https://checkout.stripe.com/mathbanana/pay" onClick={(e) => { checkoutProduct(e, 'price_1KDMGPGi5Tu5mGHHcgV3eV6I') }} class="btn btn-gray float-right">
                            <p>$19.99</p>
                        </a>
                    </td>
                </tr>
                <tr className="rounded-lg">
                    <td>
                        <h3 className="inline-block">
                            10,000 coins
                        </h3>
                        <p className="ml-2 pill pill-green">
                            10% off
                        </p>
                    </td>
                    <td>
                        <a href="https://checkout.stripe.com/mathbanana/pay" onClick={(e) => { checkoutProduct(e, 'price_1KDMKDGi5Tu5mGHHdpOOa4Gf') }} class="btn btn-gray float-right">
                            <p>$89.99</p>
                        </a>
                    </td>
                </tr>
            </table>
            <p className="section-title mt-7 mb-7">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 14.5h-2v-2h2v2zm.4-4.78c-.01.01-.02.03-.03.05-.05.08-.1.16-.14.24-.02.03-.03.07-.04.11-.03.07-.06.14-.08.21-.07.21-.1.43-.1.68H10.5c0-.51.08-.94.2-1.3 0-.01 0-.02.01-.03.01-.04.04-.06.05-.1.06-.16.13-.3.22-.44.03-.05.07-.1.1-.15.03-.04.05-.09.08-.12l.01.01c.84-1.1 2.21-1.44 2.32-2.68.09-.98-.61-1.93-1.57-2.13-1.04-.22-1.98.39-2.3 1.28-.14.36-.47.65-.88.65h-.2c-.6 0-1.04-.59-.87-1.17.55-1.82 2.37-3.09 4.43-2.79 1.69.25 3.04 1.64 3.33 3.33.44 2.44-1.63 3.03-2.53 4.35z"/></svg>
                    Frequently asked questions
                </span>
            </p>
            <Accordion
                preExpanded={['pre-expand']}
            >
                <AccordionItem
                    uuid="pre-expand"
                >
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            What if I don't use all my credits?
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <p>
                            Credits are rolled forward at the end of the month for at least 4 years, or until your wallet reaches it's 
                            <a>
                                &nbsp;balance limit
                            </a>
                            .
                        </p>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            What if I want to cancel?
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <p>
                            In ad velit in ex nostrud dolore cupidatat consectetur
                            ea in ut nostrud velit in irure cillum tempor laboris
                            sed adipisicing eu esse duis nulla non.
                        </p>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            Can I buy credits with crypto?
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <p>
                            We're working on cryptocurrency integration right now. For now, you can use a xxxxxx crypto card in the normal credit card checkout.
                        </p>
                    </AccordionItemPanel>
                </AccordionItem>
            </Accordion>
        </div>
    )

    const pageTitle = (
        <>
        </>
    )

    /*
                <p class="section-title mb-3">
                <span> 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18px" height="18px">
                        <text className="font-bold" x="50%" y="50%" fontSize="1.75em" dominantBaseline="middle" textAnchor="middle">
                            𝜋
                        </text>
                    </svg>
                    Subscribe to the Pi Club!
                </span>
            </p>
    */

    return (
        <div>
            <NavBar here={props.here} user={props.user} />
            <Content ads={props.ads} content={pageContent} sidebar={pageSidebar} />
            <div className="w-full h-20"></div>
        </div>
    )
}
