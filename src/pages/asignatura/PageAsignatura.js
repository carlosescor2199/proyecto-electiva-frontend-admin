import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Grid, Form, Button, Card, Icon, Input } from 'semantic-ui-react'

export default function PageAsignatura() {

    const [asignatura, setAsignatura] = useState([]);
    const [nombre, setNombre] = useState('');
    const [valuesEdit, setValuesEdit] = useState({
        edit: false,
        idEdit: '',
        nombreEdit: ''
    });

    const onSubmit = async e => {
        e.preventDefault();
        const res = await axios.post('http://localhost:4000/asignaturas/', {
            nombre: nombre
        })
        setNombre('')
    }

    const onActivateUpdate = async (id, nombre) => {
        if (!valuesEdit.edit) {
            setValuesEdit({ edit: true, idEdit: id, nombreEdit: nombre })
        } else {
            setValuesEdit({ edit: false, idEdit: '', nombreEdit: '' })
        }
    }

    const onUpdate = async (id) => {
        const res = await axios.put('http://localhost:4000/asignaturas/' + id, {
            nombre: valuesEdit.nombreEdit
        });
        getAsignaturas();
        setValuesEdit({ edit: false, nombreEdit: '', idEdit: '' })
    }

    const onDelete = async (id) => {
        const res = await axios.delete('http://localhost:4000/asignaturas/' + id);
        getAsignaturas();
        setValuesEdit({ edit: false, nombreEdit: '', idEdit: '' });
    }


    useEffect(() => {
        getAsignaturas();
    }, []);

    const getAsignaturas = async () => {
        const res = await axios.get('http://localhost:4000/asignaturas/');
        setAsignatura(res.data);
        getAsignaturas();
    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }} >Lista de Asignaturas</h1>
            <br />
            <Grid columns={3} divided>
                <Grid.Row>
                    <Grid.Column style={{ marginBottom: 20 }}>
                        <Card style={{ width: "25em", height: "13em" }}>
                            <Card.Content>
                                <Card.Header>Crear Asignatura</Card.Header>
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
                    {asignatura.map((asignatura) => (
                        <Grid.Column key={asignatura.idAsignatura} style={{ marginBottom: 20 }} >
                            <Card style={{ width: "25em", height: "13em", textAlign: "center" }}>
                                <Card.Content style={{ paddingTop: "20%" }}>
                                    <Card.Header>{(!valuesEdit.edit && valuesEdit.idEdit === '') ? asignatura.nombre : valuesEdit.idEdit === asignatura.idAsignatura ?
                                        <Input
                                            icon={
                                                <Icon name='save' inverted circular link onClick={() => onUpdate(asignatura.idAsignatura)} />
                                            }
                                            placeholder='Nuevo Nombre'
                                            value={valuesEdit.nombreEdit}
                                            onChange={e => setValuesEdit({ ...valuesEdit, nombreEdit: e.target.value })} /> : asignatura.nombre
                                    }</Card.Header>
                                </Card.Content>
                                <Card.Content extra>
                                    <div className='ui two buttons'>
                                        <Button color='green' onClick={() => onActivateUpdate(asignatura.idAsignatura, asignatura.nombre)}>
                                            <Icon name="edit" /> Editar
                                            </Button>
                                        <Button color='red' onClick={() => onDelete(asignatura.idAsignatura)}>
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