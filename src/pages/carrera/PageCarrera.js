import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid, Form, Button, Card, Icon, Input, Message } from 'semantic-ui-react'

export default function PageCarrera() {

    const [carrera, setCarrera] = useState([]);
    const [nombre, setNombre] = useState('');
    const [valuesEdit, setValuesEdit] = useState({
        edit: false,
        idEdit: '',
        nombreEdit: ''
    });
    const [message, setMessage] = useState({
        error: '',
        success: ''
    });
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        getCarreras();
    }, []);

    const onSubmit = async e => {
        e.preventDefault();
        const res = await axios.post('http://localhost:4000/carreras/', {
            nombre: nombre
        })
        getMessage(res.data);
        setNombre('')
        getCarreras();
    }

    const onActivateUpdate = async (id, nombre) => {
        if (!valuesEdit.edit) {
            setValuesEdit({ edit: true, idEdit: id, nombreEdit: nombre })
        } else {
            setValuesEdit({ edit: false, idEdit: '', nombreEdit: '' })
        }
    }

    const onUpdate = async (id) => {
        const res = await axios.put('http://localhost:4000/carreras/' + id, {
            nombre: valuesEdit.nombreEdit
        });
        getMessage(res.data);
        getCarreras();
        setValuesEdit({ edit: false, nombreEdit: '', idEdit: '' })
    }

    const onDelete = async (id) => {
        const res = await axios.delete('http://localhost:4000/carreras/' + id);
        getMessage(res.data);
        getCarreras();
        setValuesEdit({ edit: false, nombreEdit: '', idEdit: '' });
    }


    const getCarreras = async () => {
        const res = await axios.get('http://localhost:4000/carreras/');
        if(res.data.error){
            setMessage({success: '', error: res.data.error});
        } else {
            setCarrera(res.data);
        }
    }

    const getMessage = (message) => {
        if(message.error){
            setMessage({success: '', error: message.error});
        } else {
            setMessage({error: '', success: message.success});
        }
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
            <h1 style={{ textAlign: "center" }} >Lista de Carreras</h1>
            <br />
            <Grid columns={3} divided>
                <Grid.Row>
                    <Grid.Column style={{ marginBottom: 20 }}>
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
                        <Card style={{ width: "25em", height: "13em" }}>
                            <Card.Content>
                                <Card.Header>Crear Carrera</Card.Header>
                                <br />
                                <Form onSubmit={onSubmit} noValidate>
                                    <Form.Input
                                        label="Nombre"
                                        placeholder="Nombre..."
                                        name="nombre"
                                        type="text"
                                        value={nombre}
                                        onChange={e => setNombre(e.target.value)}
                                    />
                                    <Button type="submit"
                                        primary
                                        disabled={nombre === '' ? true : false}
                                    >
                                        Crear
                                    </Button>
                                </Form>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    {carrera.map((carrera) => (
                        <Grid.Column key={carrera.idCarrera} style={{ marginBottom: 20 }} >
                            <Card style={{ width: "25em", height: "13em", textAlign: "center" }}>
                                <Card.Content style={{ paddingTop: "20%" }}>
                                    <Card.Header>{(!valuesEdit.edit && valuesEdit.idEdit === '') ? carrera.nombre : valuesEdit.idEdit === carrera.idCarrera ?
                                        <Input
                                            icon={
                                                <Icon name='save' inverted circular link onClick={() => onUpdate(carrera.idCarrera)} />
                                            }
                                            placeholder='Nuevo Nombre'
                                            value={valuesEdit.nombreEdit}
                                            onChange={e => setValuesEdit({ ...valuesEdit, nombreEdit: e.target.value })} /> : carrera.nombre
                                    }</Card.Header>
                                </Card.Content>
                                <Card.Content extra>
                                    <div className='ui two buttons'>
                                        <Button color='green' onClick={() => onActivateUpdate(carrera.idCarrera, carrera.nombre)}>
                                            <Icon name="edit" /> Editar
                                            </Button>
                                        <Button color='red' onClick={() => onDelete(carrera.idCarrera)}>
                                            <Icon name="trash" /> Eliminar
                                            </Button>
                                    </div>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    ))}
                </Grid.Row>
            </Grid>
        </div>
    )
}
