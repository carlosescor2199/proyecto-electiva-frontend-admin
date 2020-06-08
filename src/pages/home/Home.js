import React from 'react'
import { Card, Image, Grid } from 'semantic-ui-react'

export default function Home() {
    return (
        <div>
        <br/>
        <br/>
        <br/>
        <Card centered style={{width: '50%', height: '200%'}}>
            <Card.Content>
                <Card.Header style={{textAlign: 'center', marginBottom: "10%"}}>
                <Image floated="left" circular size='tiny' src="logocecar.png" />
                    Bienvenido al Gestor de Proyectos institucionales de CECAR
                </Card.Header>
                <Card.Meta style={{textAlign: 'justify', marginBottom: "5%", paddingLeft: "25%", paddingRight: "5%"}} >
                    Aplicación WEB para la gestión de proyectos institucionales,
                    que se crean en las asignaturas dadas en la Coorporación.
                </Card.Meta>
            </Card.Content>
        </Card>
        <br/>
        <h1 style={{textAlign: 'center'}}>Creadores</h1>
        <Grid columns={2}>
            <Grid.Column>
                <Card centered style={{width: '100%', height: '100%'}}>
                    <Card.Content>
                        <Image floated="left" circular size='tiny' src="carlos.jpg" />
                        <Card.Header style={{textAlign: 'center', marginBottom: "10%"}}>Carlos Daniel Escudero Corpas</Card.Header>
                        <Card.Meta style={{textAlign: 'justify', marginBottom: "5%", paddingLeft: "25%", paddingRight: "5%"}}>
                        Es un Jovén de 21 años de edad, nació y creció en la Ciudad de Sincelejo, Sucre, Colombia,
                        actualmente es estudiante de Noveno semestre de Ingeniería en Sistemas en la Corporación Universitaria del Caribe - CECAR
                        </Card.Meta>
                    </Card.Content>
                </Card>
            </Grid.Column>
            <Grid.Column>
                <Card centered style={{width: '100%', height: '100%'}}>
                    <Card.Content>
                        <Image floated="left" circular size='tiny' src="eduard.jpg" />
                        <Card.Header style={{textAlign: 'center', marginBottom: "10%"}}>Eduard Enrique García Pérez</Card.Header>
                        <Card.Meta style={{textAlign: 'justify', marginBottom: "5%", paddingLeft: "25%", paddingRight: "5%"}}>
                        Residente en Sincelejo - Sucre. Teniene 21 años, nacido y crecido en la Ciudad de Sincelejo, Sucre, Colombia,
                        actualmente es estudiante de Octavo semestre de Ingeniería en Sistemas en la Corporación Universitaria del Caribe - CECAR
                        </Card.Meta>
                    </Card.Content>
                </Card>
            </Grid.Column>
        </Grid>
        </div>
    )
}
