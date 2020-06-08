import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'

import Home from './pages/home/Home'
import Asignatura from './pages/asignatura/PageAsignatura';
import Profesor from './pages/profesor/PageProfesor'
import Carrera from './pages/carrera/PageCarrera'
import Proyecto from './pages/proyecto/PageProyecto'
import Login from './pages/login/Login'
import SlideBar from './components/SlideBar'
import Auth from './components/Auth'

const App = () => {
  return (
    <Router>
      <Container>
        <Switch>
        <Route exact path="/login" component={Login} />
          <Auth>
            <SlideBar />
            <Route exact path="/" component={Home} />
            <Route exact path="/proyectos" component={Proyecto} />
            <Route exact path="/profesores" component={Profesor} />
            <Route exact path="/asignaturas" component={Asignatura} />
            <Route exact path="/carreras" component={Carrera} />
          </Auth>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
