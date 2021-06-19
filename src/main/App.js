import React from "react";
import Routes from './routes'
import Navbar from '../components/navbar'

import AuthenticationProvider from "./authenticationProvider";

import 'toastr/build/toastr.min'

import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.css'

class App extends React.Component {
  render() {
    return (
      <AuthenticationProvider>
        <Navbar />
        <div>
          <div className="container">
            <Routes />
          </div>
        </div>
      </AuthenticationProvider>
    )
  };
}

export default App;
