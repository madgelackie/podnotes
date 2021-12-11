import './App.css';
import MainContainer from './container/MainContainer';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ChannelContainer from './container/ChannelContainer';


function App() {

  return (
    <>
    <Router>
      <Switch>
      <Route path="/feed" exact>
        <MainContainer />
      </Route>
      <Route path="/channels" exact>
        <ChannelContainer />
      </Route>
    </Switch>
    </Router>
    </>
  );

}

export default App;
