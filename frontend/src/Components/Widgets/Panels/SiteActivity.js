import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/user.js';
import { Chart } from 'react-google-charts';
import Select from 'react-select';

export default function HourlyBreakdown (props) {

    const user = useSelector(selectUser);
    const [days, setDays] = useState([]);
    const [error, setError] = useState(null);
    const [selection, setSelection] = useState(null);

    function handleChange (selectedOption) {

        console.log('BRUHHH')
        setSelection(selectedOption, () => {

            console.log(`Option selected: `, selection);
            return
        });
    };

    const selectOptions = [
        { value: 'hourly', label: 'Hourly' },
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' }
    ];


    useEffect(() => {

        handleChange(selectOptions[0]);
        axios.get(`${props.api}/analytics/questions/activity/hourly`, {'headers': {'Authorization': `Bearer ${user.token}`}})
        .then(function (response) {
    
            setDays(response.data);
        })
        .catch(function (error) {
            
            console.log(JSON.stringify(error));
        });
    }, []);

    const chartOptions = {
        legend: { position: 'none', alignment: 'end' },
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
        chartArea: {bottom: 0, left: 0, width: '100%', height: 'calc(100% - 30px)'},
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
                Site activity ( % )
            </h4>
            <Select
                className="select w-24"
                value={selection}
                onChange={handleChange}
                options={selectOptions}
                menuPlacement={'bottom'}
                menuPosition={'absolute'}
                isSearchable={false}
            />
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
                options={chartOptions}
            />
        </div>
    )
}
