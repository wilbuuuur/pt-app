import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function TrainingCalendar() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        getTrainings();
    }, [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    };

    const eventsList = trainings.map(tr => {
        let date = new Date(tr.date)
        
        const eventsDetails = {
            start: date,
            end: new Date(moment(date).add(tr.duration, "minutes")),
            title: tr.activity + '/' + tr.customer.firstname + ' ' + tr.customer.lastname
        }
  
        return eventsDetails
	});

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={eventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    );
}