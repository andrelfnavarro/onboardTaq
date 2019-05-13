import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { FormErrors } from './FormErrors';
import { gql } from 'apollo-boost';
import { Mutation, MutationFn, MutationResult, } from 'react-apollo';
import Loader from './Loader'
import { Button, Input, Label, Title } from '../styles/Taqstyles'


const CREATE_OPERATION = gql`
  mutation CreateOp($email:String!, $password:String!, $name:String!, $role:UserRoleType!, $cpf:String!, $birthDate:String!){
    UserCreate(data: { 
        email: $email
        password: $password
        name: $name
        role: $role
        cpf: $cpf
        birthDate: $birthDate
    }){
        name 
        email
    } 
  }
  `


export interface AddUserProps extends RouteComponentProps {
}

export interface AddUserState {
    formErrors: any;
    email: string;
    password: string;
    role: string;
    name: string;
    cpf: string;
    birthDate: string;
    emailValid: boolean;
    nameValid: boolean;
    passwordValid: boolean;
    cpfValid: boolean;
    roleValid: boolean;
    birthDateValid: boolean;
    formValid: boolean;
}

export default class AddUser extends React.Component<AddUserProps, AddUserState> {

    constructor(props: AddUserProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            cpf: '',
            role: '',
            birthDate: '',
            name: '',
            formErrors: { email: '', password: '', name: '', cpf: '', birthDate: '', role: '' },
            emailValid: false,
            nameValid: false,
            passwordValid: false,
            cpfValid: false,
            roleValid: false,
            birthDateValid: false,
            formValid: false
        }
    }
    render() {
        const {
            email,
            name,
            password,
            role,
            cpf,
            birthDate
        } = this.state;
        return (
            <Mutation
                mutation={CREATE_OPERATION}
                variables={{
                    email,
                    name,
                    password,
                    role,
                    cpf,
                    birthDate
                }}
                onCompleted={this.handleCreateSuccess}
            >
                {(mutation: MutationFn<any>, result: MutationResult) => {
                    if (result.loading) return (
                        Loader(result.loading)
                    )

                    return (
                        <>
                            <form className="Login" onSubmit={(event) => this.submit(mutation, event)}>
                                <Title>
                                    Preencha os dados do novo usuário
                                </Title>
                                {result.error && <div style={{ textAlign: 'center', color: 'red' }}>{"Erro!" + result.error.message}</div>}
                                <div style={{ marginLeft: '45.5%', marginRight: '46%' }}>
                                    <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}
                                    >
                                        <Label htmlFor="email">E-mail: </Label>
                                        <Input type="email" required className="form-control" name="email"
                                            value={this.state.email}
                                            onChange={this.handleUserEmail} />
                                    </div>

                                    <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                                        <Label >Senha: </Label>
                                        <Input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.handleUserPassword} /
                                        >
                                    </div>

                                    <div className={`form-group ${this.errorClass(this.state.formErrors.name)}`}
                                    >
                                        <Label >Nome: </Label>
                                        <Input
                                            className="form-control"
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.handleUserName} />
                                    </div>

                                    <div className={`form-group ${this.errorClass(this.state.formErrors.role)}`}>
                                        <Label >Role: </Label>
                                        <Input
                                            className="form-control"
                                            name="role"
                                            value={this.state.role}
                                            onChange={this.handleUserRole} />
                                    </div>

                                    <div className={`form-group ${this.errorClass(this.state.formErrors.cpf)}`}>
                                        <Label >CPF: </Label>
                                        <Input
                                            className="form-control"
                                            name="cpf"
                                            value={this.state.cpf}
                                            onChange={this.handleUserCPF} />
                                    </div>

                                    <div className={`form-group ${this.errorClass(this.state.formErrors.birthDate)}`}>
                                        <Label >Data de nascimento: </Label>
                                        <Input
                                            className="form-control"
                                            name="birth-date"
                                            value={this.state.birthDate}
                                            onChange={this.handleUserBirthDate} />
                                    </div>
                                </div>
                                <div style = {{textAlign:"center"}} className="panel panel-default">
                                    <FormErrors formErrors={this.state.formErrors} />
                                    <Button
                                        type="submit"
                                        disabled={!this.state.formValid}>
                                        Criar
                                    </Button>
                                </div>
                            </form>
                        </>
                    )
                }}
            </Mutation>
        );
    }

    private handleCreateSuccess = (data: any) => {
        this.props.history.push('/users');
    }

    private handleUserEmail = (e: any) => {
        const { value } = e.target;
        this.setState({ email: value }, () => { this.validateField("email", value) });
    }

    private handleUserName = (e: any) => {
        const { value } = e.target;
        this.setState({ name: value }, () => { this.validateField("name", value) })
    }

    private handleUserPassword = (e: any) => {
        const { value } = e.target;
        this.setState({ password: value }, () => { this.validateField("password", value) });
    }

    private handleUserBirthDate = (e: any) => {
        const { value } = e.target;
        this.setState({ birthDate: value }, () => { this.validateField("birthDate", value) });
    }

    private handleUserRole = (e: any) => {
        const { value } = e.target;
        this.setState({ role: value }, () => { this.validateField("role", value) });
    }

    private handleUserCPF = (e: any) => {
        const { value } = e.target;
        this.setState({ cpf: value }, () => { this.validateField("cpf", value) });
    }

    private validateField(fieldName: string, value: any) {
        let fieldValidationErrors = this.state.formErrors;
        let { emailValid, passwordValid, nameValid, roleValid, cpfValid, birthDateValid } = this.state;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' inválido!';
                break;
            case 'name':
                nameValid = value.match(/^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)$/i);
                fieldValidationErrors.name = nameValid ? '' : 'inválido.';
                break;
            case 'password':
                passwordValid = value.match(/^((?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,})$/i);
                fieldValidationErrors.password = passwordValid ? '' : 'inválida. Deve conter mais de 7 caracteres (um número e uma letra).';
                break;
            case 'cpf':
                cpfValid = value.match(/^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/i);
                fieldValidationErrors.cpf = cpfValid ? '' : 'inválido. Deve ser um CPF válido.';
                break;
            case 'birthDate':
                birthDateValid = value.match(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/i);
                fieldValidationErrors.birthDate = birthDateValid ? '' : 'inválida. Deve conter mais de 7 caracteres (um número e uma letra)';
                break;
            case 'role':
                roleValid = value.match(/^(admin)|(user)$/i);
                fieldValidationErrors.role = roleValid ? '' : 'inválida. Deve possuir função válida.';
                break;
            default:
                break;
        }

        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            nameValid: nameValid,
            roleValid: roleValid,
            passwordValid: passwordValid,
            cpfValid: cpfValid,
            birthDateValid: birthDateValid
        }, this.validateForm);
    }

    private validateForm() {
        this.setState({
            formValid: this.state.emailValid && this.state.passwordValid &&
                this.state.roleValid && this.state.nameValid && this.state.cpfValid
                && this.state.birthDateValid
        });
    }

    private errorClass(error: any) {
        return (error.length === 0 ? '' : 'has-error');
    }
    private submit = async (mutationFn: MutationFn, event: React.FormEvent) => {
        event.preventDefault()
        const {
            email,
            name,
            password,
            role,
            cpf,
            birthDate
        } = this.state;

        mutationFn({
            variables: {
                email,
                password,
                name,
                role,
                cpf,
                birthDate
            }
        });

    }


}

