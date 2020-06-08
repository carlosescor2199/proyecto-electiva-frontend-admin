import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon } from 'semantic-ui-react'
import {logout} from '../helpers/logout'

export default function SlideBar() {

    return (
        <nav style={{padding: '1%', textAlign: 'center'}}>
            <Link to="/"><Button style={{float: "left"}} color="blue" basic><Icon name="home" />Home</Button></Link>
            <Link to="/asignaturas"><Button color="google plus">Asignatura</Button></Link>
            <Link to="/carreras"><Button color="facebook">Carreras</Button></Link>
            <Link to="/profesores"><Button color="twitter">Profesores</Button></Link>
            <Link to="/proyectos"><Button color="brown">Proyectos</Button></Link>
            <Button onClick={logout} style={{float: "right"}} color="red" basic><Icon name="frown outline" />Salir</Button>
        </nav>
    )
}
