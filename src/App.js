import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'

import Asignatura from './pages/asignatura/PageAsignatura';
import Profesor from './pages/profesor/PageProfesor'

const App = () => {
  return (
    <Router>
      <Container>
        <Switch>
          <Route exact path="/asignaturas" component={Asignatura} />
          <Route exact path="/profesores" component={Profesor} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
