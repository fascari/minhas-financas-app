import React from 'react';
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'

import LancamentosTable from './lancamentosTable'
import LancamentoService from '../../app/service/lancamentoService'

import AuthService from '../../app/service/authService'
import * as messages from '../../components/toastr'

class ConsultaLancamentos extends React.Component {
    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
        lancamentos: []
    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    buscar = () => {
        if (!this.state.ano) {
            messages.mensagemErro('O preenchimento do campo Ano é obrigatório.')
            return false;
        }

        const usuarioLogado = AuthService.obterUsuarioAutenticado();

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service
            .consultar(lancamentoFiltro)
            .then(resposta => {
                const lista = resposta.data;

                if (lista.length < 1) {
                    messages.mensagemAlert("Nenhum resultado encontrado.");
                }
                this.setState({ lancamentos: lista })
            }).catch(error => {
                console.log(error)
            })
    }

    preparaFormularioCadastro = () => {
        this.props.history.push('/cadastro-lancamentos')
    }

    render() {
        const meses = this.service.obterListaMeses();
        const tipos = this.service.obterListaTipos();

        return (
            <Card title="Consultar Lançamentos">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="bs-component">
                            <FormGroup label="Ano: *" htmlFor="inputAno">
                                <input type="text"
                                    id="inputAno"
                                    className="form-control"
                                    name="ano"
                                    onChange={e => this.setState({ ano: e.target.value })}
                                    placeholder="Digite o Ano" />
                            </FormGroup>

                            <FormGroup htmlFor="inputMes" label="Mês: ">
                                <SelectMenu id="inputMes"
                                    value={this.state.mes}
                                    onChange={e => this.setState({ mes: e.target.value })}
                                    className="form-control"
                                    lista={meses} />
                            </FormGroup>

                            <FormGroup htmlFor="inputDesc" label="Descrição: ">
                                <input type="text"
                                    className="form-control"
                                    id="inputDesc"
                                    value={this.state.descricao}
                                    onChange={e => this.setState({ descricao: e.target.value })}
                                    placeholder="Digite a descrição" />
                            </FormGroup>

                            <FormGroup htmlFor="inputTipo" label="Tipo Lançamento: ">
                                <SelectMenu id="inputTipo"
                                    value={this.state.tipo}
                                    onChange={e => this.setState({ tipo: e.target.value })}
                                    className="form-control"
                                    lista={tipos} />
                            </FormGroup>

                            <button onClick={this.buscar}
                                type="button"
                                className="btn btn-success">
                                <i className="pi pi-search"></i> Buscar
                            </button>

                            <button onClick={this.preparaFormularioCadastro}
                                type="button"
                                className="btn btn-danger">
                                <i className="pi pi-plus"></i> Cadastrar
                            </button>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos}
                                deleteAction={this.abrirConfirmacao}
                                editAction={this.editar}
                                alterarStatus={this.alterarStatus} />
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default withRouter(ConsultaLancamentos);