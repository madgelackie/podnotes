import './App.css';
import MainContainer from './container/MainContainer';
import ChannelContainer from './container/ChannelContainer';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './components/NavBar';



function App() {

  return (
    <Router>
    
    <NavBar/>
      <Switch>
        <Route path="/channels" component={ChannelContainer}/>
        <Route path='*' component={NotFound} />
      </Switch>
    
    </Router>  
    
  );

}

function NotFound(){
  return <p>Nothing to see here...</p>;
}

export default App;
