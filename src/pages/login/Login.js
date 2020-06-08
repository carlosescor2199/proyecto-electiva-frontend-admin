import React, { Component } from 'react'
import axios from 'axios'
import { Form, Button, Card, Message, Icon } from 'semantic-ui-react'

export default class Login extends Component {

    state = {
        id: '',
        password: '',
        visible: false,
        error: ''
    }

    onSubmit = async e => {
        e.preventDefault();
        const res = await axios.post('http://localhost:4000/admin/', {
            id: this.state.id,
            password: this.state.password,
        })
        if (!res.data.error) {
            localStorage.setItem('x-token', res.data.token);
            this.props.history.push('/');
        } else {
            this.setState({error: res.data.error})
        }
        this.setState({id: '', password: ''});
    }

    handleDismiss = () => {
        if(this.state.visible){
            this.setState({
                error: '',
                visible: false
            })
        } else {
            this.setState({
                error: '',
                visible: false
            })
        }
    }

    render() {
        return (
            <div>
            <br/><br/><br/><br/><br/><br/><br/>
            <Card centered>
            <Card.Content>
                {this.state.error !== '' ?
                    <Message
                        onDismiss={this.handleDismiss}
                        header='Error'
                        content={this.state.error}
                        color="red"
                    />
                    :  null
                }
                <Card.Header style={{textAlign: 'center'}}><Icon name="user" size="big" centered />Login</Card.Header>
                
                <br />
                <Form onSubmit={this.onSubmit} noValidate>
                    <Form.Input
                        label="Identificación"
                        placeholder="id..."
                        name="id"
                        type="number"
                        value={this.state.id}
                        onChange={e => this.setState({id: e.target.value })}
                    />

                    <Form.Input
                        label="Contraseña"
                        placeholder="Contraseña..."
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={e => this.setState({password: e.target.value })}
                    />

                    <br />
                    <Button type="submit"
                        primary
                        circular
                        fluid
                    >
                        Iniciar Sesión
                    </Button>
                </Form>
            </Card.Content>
        </Card>
        </div>
        )
    }
}