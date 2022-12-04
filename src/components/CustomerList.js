import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from'@mui/material/Button';
import { API_URL_CUSTOMERS } from '../constants';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';

export default function Customerlist() {

    const [customers, setCustomers] = useState([]);

    const[columnDefs] = useState ([
        {   
            headerName: '',
            width: 80,
            cellRenderer: params => <Button size='small' color='error' onClick={() => deleteCustomer(params.data)}>Delete</Button>
        },
        {
            headerName: '', 
            field: 'links.0.href',
            width: 90, 
            cellRenderer: params  =>
            <EditCustomer size='small' link={params.value} customer={params.data} editCustomer={editCustomer}/>
        },
        {
            headerName:'',
            field: 'links.0.href',
            width: 150,
            cellRenderer: params  =>
            <AddTraining 
                size='small'
                link={params.value} 
                training={params.data} 
                addTraining={addTraining}
                customerId={params.value}
            />
        },
        { field: 'firstname', sortable: true, filter: true, width: 150 },
        { field: 'lastname', sortable: true, filter: true, width: 170},
        { field: 'streetaddress', sortable: true, filter: true},
        { field: 'postcode', sortable: true, filter: true},
        { field: 'city', sortable: true, filter: true},
        { field: 'email', sortable: true, filter: true},
        { field: 'phone', sortable: true, filter: true},
        
    ]);

    const getCustomers = () => {

        fetch(API_URL_CUSTOMERS)
        .then(response => {
            if (response.ok)
                return response.json();
            else
                alert('Something went wrong')
        })
        .then(data => setCustomers(data.content))
        .catch(err => console.log(err))
    }

    const deleteCustomer = (data) => {
        console.log(data);
        if (window.confirm('Are you sure?')) {
            fetch(data.links[1].href, {method: 'DELETE'})
            .then(response => {
                if(response.ok)
                    getCustomers();
                else
                    alert('Something went wrong');
            })
            .catch(err => console.log(err))
        }
    };

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            body: JSON.stringify(newCustomer), 
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                getCustomers();
            }
            else
                alert('Something went wrong');
        })
        .catch(err => console.error(err));
    }

    const editCustomer = (url, updateCustomer) => {
        console.log(url)
        console.log(updateCustomer)
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(updateCustomer),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if(response.ok) {
                getCustomers();
            }
            else
                alert('Something went wrong');
        })
        .catch(err => console.log(err));
    }

    const addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            body: JSON.stringify(newTraining), 
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                
                getCustomers();
            }
            else
                alert('Something went wrong');
        })
        .catch(err => console.error(err));
    }

    useEffect(() => {
        getCustomers()
    }, []);

    return(
        <div className="Customers">
        <AddCustomer addCustomer={addCustomer}/>
        <div className="ag-theme-material" style={{ height: 550, width: '100%', margin: 'auto' }}>
            <AgGridReact
                rowData={customers}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={8}
                suppressCellSelection={true}
            />
        </div>
        
    </div>
    )

}
