import React, {useState} from 'react';
import './App.css';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Main from './components/main/main';


function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {
        currentForm === 'main' ? <Main onFormSwitch={toggleForm} /> : currentForm === 'signup' ? <Signup onFormSwitch={toggleForm} /> : <Login onFormSwitch={toggleForm} />
      }
      
    </div>
  );
  
}

export default App;
