import * as React from 'react';
import NavBar from '@components/NavBar/NavBar';
import Footer from '@components/Footer/Footer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import routes from '@src/routes';

class App extends React.Component {
  render() {
    return (
    <div>
      <BrowserRouter>
      <NavBar />
      <h2>Mr Title</h2>
      {routes()}
      <Footer />
      </BrowserRouter>
    </div>
    );
  }
}

export default App;