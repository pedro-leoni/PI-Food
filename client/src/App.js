import './App.css';
import {Route} from 'react-router-dom';
import Landing from './components/Landing.jsx';
import Home from './components/Home.jsx';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route path="/home" component={Home}/>
    </div>
  );
}

export default App;
