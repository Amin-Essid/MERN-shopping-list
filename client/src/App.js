import React, {Component} from 'react';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Provider} from 'react-redux';
import store from './store';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';
import {loadUser} from './actions/authActions';


class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar/>
          <Container>
            <ItemModal/>
            <ShoppingList/>
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
