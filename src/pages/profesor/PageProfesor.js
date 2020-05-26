import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Grid, Form, Button, Card, Icon, Table, Message, Search } from 'semantic-ui-react'

export default function PageProfesor() {
    const [profesores, setProfesores] = useState([]);
    const [edit, setEdit] = useState({
        edit: false,
        idEdit: ''
    })
    const [values, setValues] = useState({
        idProfesor: '',
        nombre: '',
        apellido: '',
        password: ''
    })
    const [editValues, setEditValues] = useState({
        nombre: '',
        apellido: '',
    })
    const [message, setMessage] = useState({
        success: '',
        error: '',
    });
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        getProfesores();
    }, [])

    const onSubmit = async e => {
        e.preventDefault();
        const res = await axios.post('http://localhost:4000/profesores/', {
            idProfesor: values.idProfesor,
            nombre: values.nombre,
            apellido: values.apellido,
            password: values.password
        })
        setValues({
            idProfesor: '',
            nombre: '',
            apellido: '',
            password: ''
        })
        if (res.data.error) {
            setMessage({ error: res.data.error, success: '' })
        } else {
            setMessage({ success: res.data.success, error: '' })
        }
        getProfesores();
    }


    const onActivateUpdate = async (id, nombre, apellido) => {
        if (!edit.edit) {
            setEdit({ edit: true, idEdit: id })
            setEditValues({
                nombre: nombre,
                apellido: apellido
            })
        } else {
            setEdit({ edit: false, idEdit: '' })
            setEditValues({
                nombre: '',
                apellido: '',
            })
        }
    }

    const onUpdate = async (id) => {
        const res = await axios.put('http://localhost:4000/profesores/' + id, {
            nombre: editValues.nombre,
            apellido: editValues.apellido
        });
        if(res.data.success){
            getProfesores();
            setMessage({success: res.data.success, error: ''})
            setEdit({ edit: false, idEdit: '' })
            setEditValues({
                nombre: '',
                apellido: ''
            })
        } else {
            setMessage({success: '', error: res.data.error})
            setEdit({ edit: false, idEdit: '' })
            setEditValues({
            nombre: '',
            apellido: ''
        })
        }
        
    }

    const onDelete = async (id) => {
        const res = await axios.delete('http://localhost:4000/profesores/' + id);
        getProfesores();
        setEdit({ edit: false, nombreEdit: '', idEdit: '' })
        setMessage({success: res.data.success, error: ''})
    }


    const getProfesores = async () => {
        const res = await axios.get('http://localhost:4000/profesores/');
        setProfesores(res.data)
    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const onChangeEdit = (e) => {
        setEditValues({ ...editValues, [e.target.name]: e.target.value });
    }

    const onChangeSearch = async (e) => {
        const res = await axios.post('http://localhost:4000/profesores/search', {
            search: e.target.value.toLowerCase()
        })
        setProfesores(res.data);
    }

    const handleDismiss = () => {
            if(visible){
                setVisible(false)
                setMessage({ error: '', success: '' })
            } else {
                setVisible(false)
                setMessage({ error: '', success: '' })
            }
    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }} >Profesores</h1>
            <br />
            <Grid columns={2} divided>
                <Grid.Row>
                    <Grid.Column style={{ marginBottom: 20, width: "25%" }}>
                        {message.error !== '' ?
                            <Message
                                onDismiss={handleDismiss}
                                header='Error'
                                content={message.error}
                                color="red"
                            />
                            : message.success !== '' ?
                                <Message
                                    onDismiss={handleDismiss}
                                    header='Success'
                                    content={message.success}
                                    color="green"
                                />
                                : null
                        }
                        <Card>
                            <Card.Content>
                                <Card.Header>Crear Profesor</Card.Header>
                                <br />
                                <Form onSubmit={onSubmit} noValidate>
                                    <Form.Input
                                        label="Cédula"
                                        placeholder="Ingrese su número de cédula"
                                        name="idProfesor"
                                        type="number"
                                        value={values.idProfesor}
                                        onChange={onChange}
                                    />
                                    <Form.Input
                                        label="Nombre"
                                        placeholder="Nombre..."
                                        name="nombre"
                                        type="text"
                                        value={values.nombre}
                                        onChange={onChange}
                                    />
                                    <Form.Input
                                        label="Apellido"
                                        placeholder="Apellidos..."
                                        name="apellido"
                                        type="text"
                                        value={values.apellido}
                                        onChange={onChange}
                                    />
                                    <Form.Input
                                        label="Password"
                                        placeholder="Password..."
                                        name="password"
                                        type="password"
                                        value={values.password}
                                        onChange={onChange}
                                    />
                                    <Button type="submit"
                                        primary
                                        disabled={
                                            values.idProfesor === '' ||
                                                values.nombre === '' ||
                                                values.apellido === '' ||
                                                values.password === ''
                                                ? true : false
                                        }
                                    >
                                        Registrar
                                    </Button>
                                </Form>
                            </Card.Content>
                        </Card>
                    </Grid.Column>

                    <Grid.Column style={{textAlign: "center"}}>
                        <Form.Input type="text" placeholder="Buscar..." onChange={onChangeSearch} />
                        <br/>
                        <Table basic='very' celled collapsing style={{ textAlign: "center" }}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Cédula</Table.HeaderCell>
                                    <Table.HeaderCell>Nombre</Table.HeaderCell>
                                    <Table.HeaderCell>Apellido</Table.HeaderCell>
                                    <Table.HeaderCell>Acción 1</Table.HeaderCell>
                                    <Table.HeaderCell>Acción 2</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {profesores && profesores.map((profesor) => (
                                    <Table.Row key={profesor.idProfesor}>
                                        {!edit.edit && edit.idEdit === '' ?
                                            <>
                                                <Table.Cell>{profesor.idProfesor}</Table.Cell>
                                                <Table.Cell>{profesor.nombre}</Table.Cell>
                                                <Table.Cell>{profesor.apellido}</Table.Cell>
                                                <Table.Cell>
                                                    <Button color='green' onClick={() => onActivateUpdate(profesor.idProfesor, profesor.nombre, profesor.apellido)}>
                                                        <Icon name="edit" /> Editar
                                                </Button>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Button color='red' onClick={() => onDelete(profesor.idProfesor)}>
                                                        <Icon name="trash" /> Eliminar
                                                </Button>
                                                </Table.Cell>
                                            </>
                                    : edit.idEdit === profesor.idProfesor ?
                                    <>
                                        <Table.Cell>{profesor.idProfesor}</Table.Cell>
                                        <Table.Cell>
                                            <Form.Input 
                                                type="text"
                                                placeholder="Nombre"
                                                name="nombre"
                                                value={editValues.nombre}
                                                onChange={onChangeEdit}
                                            />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Form.Input 
                                                type="text"
                                                placeholder="Apellido"
                                                name="apellido"
                                                value={editValues.apellido}
                                                onChange={onChangeEdit}
                                            />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Button color='black' onClick={() => onUpdate(profesor.idProfesor)}>
                                                <Icon name="save" /> Actualizar
                                            </Button>
                                        </Table.Cell>
                                        <Table.Cell>
                                        <   Button color='grey' onClick={() => onActivateUpdate(profesor.idProfesor, profesor.nombre, profesor.apellido)}>
                                                <Icon name="cancel"
                                                 /> Cancelar
                                            </Button>
                                        </Table.Cell>
                                    </>
                                    : 
                                    
                                    <>
                                        <Table.Cell>{profesor.idProfesor}</Table.Cell>
                                        <Table.Cell>{profesor.nombre}</Table.Cell>
                                        <Table.Cell>{profesor.apellido}</Table.Cell>
                                        <Table.Cell>
                                            <Button color='green' onClick={() => onActivateUpdate(profesor.idProfesor, profesor.nombre, profesor.apellido)}>
                                                <Icon name="edit" /> Editar
                                            </Button>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Button color='red' onClick={() => onDelete(profesor.idProfesor)}>
                                                <Icon name="trash" /> Eliminar
                                            </Button>
                                        </Table.Cell>
                                    </>
                                }

                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )

}