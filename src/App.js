import { Card, Container, Col, Row, CardBody, CardHeader, Button } from 'reactstrap';
import { useEffect, useState } from 'react';
import './App.css';
import TablaContacto from './Componentes/TablaContacto';

function App() {
  const [contactos, setContactos] = useState([]);
  const mostrarContactos = async()=>{
    const response = await fetch("https://localhost:7232/api/Contacto/Lista");
    if(response.ok){
      const data = await response.json();
      setContactos(data);
    }else{
      console.log("Error en la respuesta");
    }
  }
  useEffect(()=>{
    mostrarContactos();
  },[])
    return (
        <Container>
            <Row className="mt-5">
                <Col>
                    <Card>
                        <CardHeader>
                            <h5>Lista de contactos</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success">Nuevo Contacto</Button>
                            <hr />
                            <TablaContacto data={contactos}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
