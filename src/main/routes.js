/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

import Login from '../views/login';
import Home from '../views/home';
import CadastroUsuario from '../views/cadastroUsuario';
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos';
import CadastroLancamentos from '../views/lancamentos/cadastro-lancamentos';
import { AuthConsumer } from '../main/authenticationProvider'

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'

function AuthRoute({ component: Component, isUsuarioAutenticado, ...props }) {
    return (
        <Route {...props} render={(componentProps) => {
            if (isUsuarioAutenticado) {
                return (
                    <Component {...componentProps} />
                )
            } else {
                return (
                    <Redirect to={{ pathname: '/login', state: { from: componentProps.location } }} />
                )
            }
        }} />
    )
}

function Routes(props) {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />

                <AuthRoute isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} />
                <AuthRoute isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <AuthRoute isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamentos/:id?" component={CadastroLancamentos} />
                
                <Redirect to="/login" />
            </Switch>
        </HashRouter>
    )
}
export default () => (
    <AuthConsumer>
        {(context) => (<Routes isUsuarioAutenticado={context.isAutenticado} />)}
    </AuthConsumer>
)