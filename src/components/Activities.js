import React, { useState, useEffect } from 'react';
import { groupBy, sumBy } from 'lodash';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { API_URL_TRAININGS } from '../constants';

export default function Activities() {

const [chartData, setChartData] = useState([])

    const getActivites = () => {
        fetch(API_URL_TRAININGS)
        .then((response) => response.json())
        .then((data) => calculateDuration(data))
        .then((data) => setChartData(data))
        .catch((err) => console.error(err));
    }

    useEffect(() => getActivites(), [])
    

    const calculateDuration = (trainings) => {
    const trainingByActivity = groupBy(trainings, 'activity')
    console.log(trainingByActivity);
    const activityObj = {}
    for (const key in trainingByActivity) {
        activityObj[key] = sumBy(trainingByActivity[key], 'duration')
    }
    console.log(activityObj);

    const data = [];
    for (const key in activityObj) {
        const obj = {name: key, value: activityObj[key]}
        data.push(obj)
    }
    
    console.log(data)
    return data; 
    }
  
    return (
        <div>
             <ResponsiveContainer width="100%" aspect={3}>
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 80,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={50}
        >
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip/>
          <Legend />
          <Bar dataKey="value" fill="#113CFC"/>
        </BarChart>
        </ResponsiveContainer>
        </div>

    )

     }