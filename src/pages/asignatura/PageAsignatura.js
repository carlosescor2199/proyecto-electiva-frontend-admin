import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Grid, Form, Button, Card, Icon, Input, Message } from 'semantic-ui-react'

export default function PageAsignatura() {

    const [asignatura, setAsignatura] = useState([]);
    const [carrera, setCarrera] = useState([]);
    const [values, setValues] = useState({
        nombre: '',
        idCarrera: ''
    });
    const [valuesEdit, setValuesEdit] = useState({
        edit: false,
        idEdit: '',
        nombreEdit: '',
        idCarreraEdit: ''
    });
    const [message, setMessage] = useState({
        error: '',
        success: ''
    });
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        getAsignaturas();
        getCarreras();
    }, []);

    const onSubmit = async e => {
        e.preventDefault();
        const res = await axios.post('http://localhost:4000/asignaturas/', {
            nombre: values.nombre,
            idCarrera: values.idCarrera
        })
        getMessage(res.data);
        setValues({...values, nombre: ''});
        getAsignaturas();
        
    }

    const onActivateUpdate = async (id, nombre, idCarrera) => {
        if (!valuesEdit.edit) {
            setValuesEdit({ edit: true, idEdit: id, nombreEdit: nombre, idCarreraEdit: idCarrera })
        } else {
            setValuesEdit({ edit: false, idEdit: '', nombreEdit: '', idCarreraEdit: '' })
        }
    }

    const onUpdate = async (id) => {
        const res = await axios.put('http://localhost:4000/asignaturas/' + id, {
            nombre: valuesEdit.nombreEdit,
            idCarrera: valuesEdit.idCarreraEdit
        });
        getMessage(res.data);
        getAsignaturas();
        setValuesEdit({ edit: false, nombreEdit: '', idEdit: '', idCarreraEdit: '' })
    }

    const onDelete = async (id) => {
        const res = await axios.delete('http://localhost:4000/asignaturas/' + id);
        getMessage(res.data);
        getAsignaturas();
        setValuesEdit({ edit: false, nombreEdit: '', idEdit: '', idCarreraEdit: '' });
    }


    const getAsignaturas = async () => {
        const res = await axios.get('http://localhost:4000/asignaturas/');
        if(res.data.error){
            setMessage({success: '', error: res.data.error});
        } else {
            setAsignatura(res.data);
        }
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
            <h1 style={{ textAlign: "center" }} >Lista de Asignaturas</h1>
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
                        <Card style={{ width: "25em", height: "18em" }}>
                            <Card.Content>
                                <Card.Header>Crear Asignatura</Card.Header>
                                <br />
                                <Form onSubmit={onSubmit} noValidate>
                                    <Form.Input
                                        label="Nombre"
                                        placeholder="Nombre..."
                                        name="nombre"
                                        type="text"
                                        value={values.nombre}
                                        onChange={e => setValues({...values, nombre:e.target.value})}
                                />
                                <select name="carrera" onChange={e => setValues({...values, idCarrera: e.target.value})}>
                                    <option value="" defaultValue>Seleccione una carrera</option>
                                    {carrera && carrera.map((carrera) => (
                                        <option
                                            key={carrera.idCarrera}
                                            value={carrera.idCarrera}
                                        >
                                            {carrera.nombre}
                                        </option>
                                    ))}
                                </select>
                                <br />
                                <Button type="submit"
                                    primary
                                    disabled={((values.nombre !== '') && (values.idCarrera !== "")) ? false : true}
                                >
                                    Crear
                                </Button>
                                </Form>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    {asignatura.map((asignatura) => (
                        <Grid.Column style={{ marginBottom: 20 }} key={asignatura.idAsignatura} >
                            <Card style={{textAlign: "center"}}>
                                <Card.Content>
                                    <Card.Header>
                                    {(!valuesEdit.edit && valuesEdit.idEdit === '') ? asignatura.nombreasignatura : valuesEdit.idEdit === asignatura.idAsignatura ?
                                        <Form>
                                        <Input
                                            style={{marginBottom: "5%"}}
                                            placeholder='Nuevo Nombre'
                                            value={valuesEdit.nombreEdit}
                                            onChange={e => setValuesEdit({ ...valuesEdit, nombreEdit: e.target.value })} 
                                        />
                                        <select
                                            style={{marginBottom: "5%"}}
                                            onChange={e => setValuesEdit({...valuesEdit, idCarreraEdit: e.target.value})}
                                        >
                                            {carrera && carrera.map((carrera) => (
                                                <option
                                                    key={carrera.idCarrera}
                                                    value={carrera.idCarrera}
                                                    selected={carrera.idCarrera === asignatura.idCarrera ? true : false}
                                                >
                                                    {carrera.nombre}
                                                </option>
                                            ))}
                                        </select>
                                        <Button
                                            type="submit"
                                            onClick={() => onUpdate(asignatura.idAsignatura)}
                                            color="black"
                                        >
                                            <Icon name="save"/>Actualizar
                                        </Button>
                                        </Form>
                                        : asignatura.nombreasignatura
                                    }</Card.Header>

                                    {(!valuesEdit.edit && valuesEdit.idEdit === '') ? 
                                    <Card.Meta>{asignatura.nombrecarrera}</Card.Meta>
                                    :
                                    valuesEdit.idEdit === asignatura.idAsignatura ?
                                    null
                                    :
                                    <Card.Meta>{asignatura.nombrecarrera}</Card.Meta>
                                    }
                                    
                                </Card.Content>
                                <Card.Content extra>
                                    <div className='ui two buttons'>
                                        <Button color='green' onClick={() => onActivateUpdate(asignatura.idAsignatura, asignatura.nombreasignatura, asignatura.idCarrera)}>
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