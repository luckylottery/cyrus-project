import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/user.js';
import { Chart } from 'react-google-charts';

export default function IncomeGraph (props) {

    const user = useSelector(selectUser);
    const [days, setDays] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {

        axios.get(`${props.api}/analytics/income/activity/hourly`, {'headers': {'Authorization': `Bearer ${user.token}`}})
        .then(function (response) {
    
            setDays(response.data);
        })
        .catch(function (error) {
            
            console.log(JSON.stringify(error));
        });
    }, []);

    const options = {
        legend: { position: 'none' },
        hAxis: {
            title: '',
            textPosition: 'none',
            baselineColor: 'transparent'
        },
        vAxis: {
            title: '',
            textPosition: 'none',
            gridlines: {
                color: 'transparent'
            },
            baselineColor: 'transparent'
        },
    chartArea: {top: 40, left: 0, width: '100%', height: '100%'},
        curveType: 'function',
        axisFontSize : 0,
        isStacked: true,
        colors: ['#5885EE']
    };


    let formatted = days.map(day => {

            return Array.from(Object.values({
                day: new Intl.DateTimeFormat('en-US', { weekday: 'long'}).format(new Date(day.hour)),
                count: parseInt(day.count)
            }));
    });

    formatted.unshift([
        "Day",
        "Count"
    ])

    return (
        <div className={`card panel ${props.className}`}>
            <h4>
                Coin earnings over time
            </h4>
            {
                (error) ? 
                    <>
                        <h4>
                            Failed to load data
                        </h4>
                        <p>
                            If you have an AdBlocker, try whitelisting this website
                        </p>
                    </>
                :
                    null
            }
            <Chart
                chartType={'AreaChart'}
                width="100%"
                height="100%"
                data={formatted}
                options={options}
            />
        </div>
    )
}
