import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = 'Physic Project'
  },[])
  return (
    <h1>My physic project</h1>
  );
}

export default App;
