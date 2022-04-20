import './App.css';
import {Route} from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import CreateRecipe from './components/CreateRecipe';
import Details from './components/Details';


function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route path="/home" component={Home}/>
      <Route path="/recipe" component={CreateRecipe}/>
      <Route path="/recipes/:id" component={Details}/>
    </div>
  );
}

export default App;
