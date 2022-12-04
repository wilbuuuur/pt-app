import React, { useState, useEffect } from 'react';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import { Snackbar, Button } from '@mui/material';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import { API_URL_TRAININGS } from '../constants';
import moment from 'moment';


export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);

    const [columnDefs] = useState ([
        { field: 'activity', sortable: true, filter: true},
        { field: 'date', sortable: true, filter: true, width: 250,
        cellRenderer: params => { return moment(params.value).format('DD/MM/YYYY HH:mm')}
        },
        { field: 'duration', sortable: true, filter: true},
        {headerName: 'Firstname', field: 'customer.firstname', sortable: true, filter: true},
        {headerName: 'Lastname', field: 'customer.lastname', sortable: true, filter: true},
        {
            headerName: '',
            field: 'id',
            width: 120,
            cellRenderer: params => <Button size='small' color='error' onClick={() => deleteTraining(params.value)}>Delete</Button>
        }
    ])

    const closeSnackbar = () => {
        setOpen(false);
    }

    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = () => {

        fetch(API_URL_TRAININGS)
        .then(response => {
            if (response.ok)
                return response.json();
            else
                alert('Something went wrong')
        })
        .then(data => setTrainings(data))
        .catch(err => console.log(err))
    }

    const deleteTraining =  (id) => {
        console.log(id);
        if(window.confirm('Are you sure?')) {
            fetch('https://customerrest.herokuapp.com/api/trainings/' + id, {method: 'DELETE'})
            .then(response => {
                if(response.ok)
                    getTrainings();
                else
                    alert('Something went wrong')
            })
            .catch(err => console.log(err))
        }
    }

    return(
        <div className="App">
            <div className="ag-theme-material" style={{ height: 550, width: '100%', margin: 'auto' }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={8}
                    suppressCellSelection={true}
                />
            </div>
        </div>
    )
}
