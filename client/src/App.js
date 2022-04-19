import './App.css';
import {Route} from 'react-router-dom';
import Landing from './components/Landing.jsx';
import Home from './components/Home.jsx';
import CreateRecipe from './components/CreateRecipe';


function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route path="/home" component={Home}/>
      <Route path="/recipe" component={CreateRecipe}/>
    </div>
  );
}

export default App;
