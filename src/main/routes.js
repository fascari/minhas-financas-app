import React from 'react';

import Login from '../views/login';
import Home from '../views/home';
import CadastroUsuario from '../views/cadastroUsuario';

import { Route, Switch, HashRouter } from 'react-router-dom'

function Routes() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/home" component={Home}/>
                <Route path="/cadastro-usuarios" component={CadastroUsuario}/>
            </Switch>
        </HashRouter>   
    )
}
export default Routes;