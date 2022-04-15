import './App.css';
import {Route} from 'react-router-dom';
import Landing from './components/Landing.jsx'


function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Landing} />
    </div>
  );
}

export default App;
