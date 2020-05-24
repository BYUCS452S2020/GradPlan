import React from 'react';
import './App.css';
import { StateProvider } from './context';
import {reducer} from './reducer'
import {Routing} from './components/smart/Routing'

const initialState = {
  isAuthenticated: false,
  groupData: [],
  plannedCourses: [],
}


function App() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Routing />
    </StateProvider>
  );
}

export default App;
