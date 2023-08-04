import React, {useState} from 'react';
import './App.css';
import Login from './components/login/login';
import Signup from './components/signup/signup';


function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {
        currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> : <Signup onFormSwitch={toggleForm} />
      }
      
    </div>
  );
  
}

export default App;
