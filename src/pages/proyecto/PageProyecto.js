import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Grid, Form, Button, Card, Icon, Message } from 'semantic-ui-react'


export default function PageProyecto() {

    const [proyecto, setProyecto] = useState([]);
    const [asignatura, setAsignatura] = useState([]);
    const [profesor, setProfesor] = useState([]);
    const [values, setValues] = useState({
        nombre: '',
        descripcion: '',
        idAsignatura: '',
        idProfesor: ''
    });
    const [valuesEdit, setValuesEdit] = useState({
        edit: false,
        idEdit: '',
        nombreEdit: '',
        descripcionEdit: '',
        idAsignaturaEdit: '',
        idProfesorEdit: ''
    });
    const [message, setMessage] = useState({
        error: '',
        success: ''
    });
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        getProyectos();
        getAsignaturas();
        getProfesores();
    }, []);

    const onSubmit = async e => {
        e.preventDefault();
        const res = await axios.post('http://localhost:4000/proyectos/', {
            nombre: values.nombre,
            descripcion: values.descripcion,
            idAsignatura: values.idAsignatura,
            idProfesor: values.idProfesor
        })
        getMessage(res.data);
        setValues({ ...values, nombre: '', descripcion: '' });
        getProyectos();

    }

    const onActivateUpdate = async (id, nombre, descripcion, idAsignatura, idProfesor) => {
        if (!valuesEdit.edit) {
            setValuesEdit({
                edit: true,
                idEdit: id,
                nombreEdit: nombre,
                descripcionEdit: descripcion,
                idAsignaturaEdit: idAsignatura,
                idProfesorEdit: idProfesor
            })
        } else {
            setValuesEdit({
                edit: false,
                idEdit: '',
                nombreEdit: '',
                descripcionEdit: '',
                idAsignaturaEdit: '',
                idProfesorEdit: ''
            })
        }
    }

    const onUpdate = async (id) => {
        const res = await axios.put('http://localhost:4000/proyectos/' + id, {
            nombre: valuesEdit.nombreEdit,
            descripcion: valuesEdit.descripcionEdit,
            idAsignatura: valuesEdit.idAsignaturaEdit,
            idProfesor: valuesEdit.idProfesorEdit
        });
        getMessage(res.data);
        getProyectos();
        setValuesEdit({
            edit: false,
            idEdit: '',
            nombreEdit: '',
            descripcionEdit: '',
            idAsignaturaEdit: '',
            idProfesorEdit: ''
        })
    }

    const onDelete = async (id) => {
        const res = await axios.delete('http://localhost:4000/proyectos/' + id);
        getMessage(res.data);
        getProyectos();
        setValuesEdit({
            edit: false,
            idEdit: '',
            nombreEdit: '',
            descripcionEdit: '',
            idAsignaturaEdit: '',
            idProfesorEdit: ''
        })
    }


    const getProyectos = async () => {
        const res = await axios.get('http://localhost:4000/proyectos/')
        if (res.data.error) {
            setMessage({ success: '', error: res.data.error });
        } else {
            setProyecto(res.data);
        }

    }

    const getAsignaturas = async () => {
        const res = await axios.get('http://localhost:4000/asignaturas/');
        if (res.data.error) {
            setMessage({ success: '', error: res.data.error });
        } else {
            setAsignatura(res.data);
        }

    }

    const getProfesores = async () => {
        const res = await axios.get('http://localhost:4000/profesores/');
        if (res.data.error) {
            setMessage({ success: '', error: res.data.error });
        } else {
            setProfesor(res.data);
        }

    }

    const getMessage = (message) => {
        if (message.error) {
            setMessage({ success: '', error: message.error });
        } else {
            setMessage({ error: '', success: message.success });
        }
    }

    const handleDismiss = () => {
        if (visible) {
            setVisible(false)
            setMessage({ error: '', success: '' })
        } else {
            setVisible(false)
            setMessage({ error: '', success: '' })
        }
    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }} >Lista de Proyectos</h1>
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
                        <Card>
                            <Card.Content>
                                <Card.Header>Crear Proyecto</Card.Header>
                                <br />
                                <Form onSubmit={onSubmit} noValidate>
                                    <Form.Input
                                        label="Nombre"
                                        placeholder="Nombre..."
                                        name="nombre"
                                        type="text"
                                        value={values.nombre}
                                        onChange={e => setValues({ ...values, nombre: e.target.value })}
                                    />

                                    <Form.TextArea
                                        label="Descripción"
                                        placeholder="Descripción..."
                                        name="descripcion"
                                        type="text"
                                        value={values.descripcion
                                        }
                                        onChange={e => setValues({ ...values, descripcion: e.target.value })}
                                    />

                                    <label><b>Asignatura</b></label>
                                    <select name="asignatura" onChange={e => setValues({ ...values, idAsignatura: e.target.value })}>
                                        <option value="" defaultValue>Seleccione una Asignatura</option>
                                        {asignatura && asignatura.map((asignatura) => (
                                            <option
                                                key={asignatura.idAsignatura}
                                                value={asignatura.idAsignatura}
                                            >
                                                {asignatura.nombreasignatura}
                                            </option>
                                        ))}
                                    </select>

                                    <br />
                                    <label><b>Profesor</b></label>
                                    <select name="profesor" onChange={e => setValues({ ...values, idProfesor: e.target.value })}>
                                        <option value="" defaultValue>Seleccione un Profesor</option>
                                        {profesor && profesor.map((profesor) => (
                                            <option
                                                key={profesor.idProfesor}
                                                value={profesor.idProfesor}
                                            >
                                                {`${profesor.apellido} ${profesor.nombre}`}
                                            </option>
                                        ))}
                                    </select>

                                    <br />
                                    <Button type="submit"
                                        primary
                                        disabled={((values.nombre !== '') && (values.descripcion !== '') &&
                                            (values.idAsignatura !== '') && (values.idProfesor !== '')) ? false : true}
                                    >
                                        Crear
                                    </Button>
                                </Form>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    {proyecto.map((proyecto) => (
                        <Grid.Column style={{ marginBottom: 20 }} key={proyecto.idProyecto} >
                            <Card style={{ textAlign: "center" }}>
                                <Card.Content>
                                    <Card.Header>
                                        {(!valuesEdit.edit && valuesEdit.idEdit === '') ? proyecto.nombreproyecto : valuesEdit.idEdit === proyecto.idProyecto ?
                                            <Form>
                                                <Form.Input
                                                    style={{ marginBottom: "5%" }}
                                                    placeholder='Nuevo Nombre'
                                                    value={valuesEdit.nombreEdit}
                                                    onChange={e => setValuesEdit({ ...valuesEdit, nombreEdit: e.target.value })}
                                                />
                                                <Form.TextArea
                                                    style={{ marginBottom: "5%" }}
                                                    placeholder='Nueva descripción'
                                                    value={valuesEdit.descripcionEdit}
                                                    onChange={e => setValuesEdit({ ...valuesEdit, descripcionEdit: e.target.value })}
                                                />
                                                <select
                                                    value={valuesEdit.idAsignaturaEdit}
                                                    style={{ marginBottom: "5%" }}
                                                    onChange={e => setValuesEdit({ ...valuesEdit, idAsignaturaEdit: e.target.value })}
                                                >
                                                    {asignatura && asignatura.map((asignatura) => (
                                                        <option
                                                            key={asignatura.idAsignatura}
                                                            value={asignatura.idAsignatura}
                                                            selected={asignatura.idAsignatura === proyecto.idAsignatura ? true : false}
                                                        >
                                                            {asignatura.nombreasignatura}
                                                        </option>
                                                    ))}
                                                </select>
                                                <select
                                                    value={valuesEdit.idProfesorEdit}
                                                    style={{ marginBottom: "5%" }}
                                                    onChange={e => setValuesEdit({ ...valuesEdit, idProfesorEdit: e.target.value })}
                                                >
                                                    {profesor && profesor.map((profesor) => (
                                                        <option
                                                            key={profesor.idProfesor}
                                                            value={profesor.idProfesor}
                                                            selected={profesor.idProfesor === proyecto.idProfesor ? true : false}
                                                        >
                                                            {`${profesor.apellido} ${profesor.nombre}`}
                                                        </option>
                                                    ))}
                                                </select>
                                                <Button
                                                    type="submit"
                                                    onClick={() => onUpdate(proyecto.idProyecto)}
                                                    color="black"
                                                >
                                                    <Icon name="save" />Actualizar
                                        </Button>
                                            </Form>
                                            : proyecto.nombreproyecto
                                        }</Card.Header>

                                    {(!valuesEdit.edit && valuesEdit.idEdit === '') ?
                                        <>
                                            <Card.Meta>{proyecto.descripcion}</Card.Meta>
                                            <Card.Meta> <b>Asignatura: </b> {proyecto.nombreasignatura}</Card.Meta>
                                            <Card.Meta> <b>Profesor: </b> {proyecto.nombreprofesor}</Card.Meta>
                                        </>
                                        :
                                        valuesEdit.idEdit === proyecto.idProyecto ?
                                            null
                                            :
                                            <>
                                                <Card.Meta>{proyecto.descripcion}</Card.Meta>
                                                <Card.Meta> <b>Asignatura: </b> {proyecto.nombreasignatura}</Card.Meta>
                                                <Card.Meta> <b>Profesor: </b> {proyecto.nombreprofesor}</Card.Meta>
                                            </>
                                    }

                                </Card.Content>
                                <Card.Content extra>
                                    <div className='ui two buttons'>
                                        <Button color='green'
                                            onClick={() => onActivateUpdate(proyecto.idProyecto, proyecto.nombreproyecto, proyecto.descripcion, proyecto.idAsignatura, proyecto.idProfesor)}>
                                            <Icon name="edit" /> Editar
                                            </Button>
                                        <Button color='red' onClick={() => onDelete(proyecto.idProyecto)}>
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
