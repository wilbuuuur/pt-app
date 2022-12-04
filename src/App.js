import './App.css';
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Customerlist from './components/CustomerList';
import Traininglist from './components/TrainingList';
import TrainingCalendar from './components/Calendar';

function App() {

  const [value, setValue] = useState('one');

  const handleChange = (event, value) => {
      setValue(value);
};
  return (
    <div className="App">
      <AppBar position='static'>
        <Toolbar> 
          <Typography variant='h6'>
            sovellus
          </Typography>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Customers" value="Customers" />
            <Tab label="Trainings" value="Trainings" />
            <Tab label="Calendar" value="Calendar" />
            </Tabs>
        </Toolbar>
      </AppBar>
      {value==='Customers' && <div><Customerlist/></div>}
      {value==='Trainings'&& <div><Traininglist/></div>}
      {value==='Calendar'&& <div><TrainingCalendar/></div>}
      
    </div>
  );
}

export default App;
