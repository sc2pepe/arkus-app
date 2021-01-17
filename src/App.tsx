import React from 'react';
import './styles/css/App.css';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ContactsList from './components/ContactsList';
import ContactForm from './components/ContactForm';

interface AppProps {
  dispatch: Dispatch,
  contacts: Contact[]
}

const App = ({ dispatch, contacts }: AppProps) => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/:id?' component={ContactsList} />
        </Switch>
      </Router>
    </div >
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    dispatch
  };
};

const mapStateToProps = (state: AppState) => {
  const { contacts } = state;

  return {
    contacts
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
