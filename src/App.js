import {  Card,  Container,  Col,  Row,  CardBody,  CardHeader,  Button,} from "reactstrap";
import { useEffect, useState } from "react";
import TablaContacto from "./Componentes/TablaContacto";
import { ModalContacto } from "./Componentes/ModalContacto";
import "./App.css";
function App() {

  const [contactos, setContactos] = useState([]);

  const [mostrarModal, setMostrarModal] = useState(false);

  const [editar, setEditar] = useState(null);

  const GetContactos = async () => {
    const response = await fetch("https://localhost:7232/api/Contacto/Lista");
    if (response.ok) {
      const contactos = await response.json();
      setContactos(contactos);
    } else {
      console.log("Error en la respuesta");
    }
  };

  useEffect(() => {
    GetContactos();
  }, []);

  const guardarContacto = async (contacto) => {
    try {
      const response = await fetch("https://localhost:7232/api/Contacto/Guardar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(contacto),
      });

      if (response.ok) {
        setMostrarModal(!mostrarModal);
        GetContactos();
      } else {
        const errorData = await response.json();
        console.log("Error en la respuesta:", errorData);
      }
    } catch (error) {
      console.log("Error al guardar el contacto:", error);
    }
  };


  const editarContacto = async (contacto) => {
    const response = await fetch("https://localhost:7232/api/Contacto/Editar", {
      method: "PUT",
      headers: {
        "content-type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(contacto),
    });

    if (response.ok) {
      setMostrarModal(!mostrarModal);
      GetContactos();
    }else {
      const errorData = await response.json();
      console.log("Error en la respuesta:", errorData);
    }
  };

  const eliminarContacto = async (id) => {
    try {
      const response = await fetch(`https://localhost:7232/api/Contacto/Eliminar/${id}`, {
        method: "DELETE",
        headers : {"Content-Type":"application/json;charset=utf-8"}
      });

      if (response.ok) {
        GetContactos();
      } else {
        const errorData = await response.json();
        console.log("Error en la respuesta:", errorData);
      }
    } catch (error) {
      console.log("Error al eliminar el contacto:", error);
    }
  };


  return (
    // Notar que "Container" sirve para mostrar las filas
    <Container>
      <Row className="mt-5">
        <Col>
          <Card>
            <CardHeader>
              <h5>Lista de contactos</h5>
            </CardHeader>
            <CardBody>
              <Button
                size="sm"
                color="success"
                onClick={() => setMostrarModal(!mostrarModal)}
              >
                Nuevo Contacto
              </Button>
              <hr />
              <TablaContacto
                contactos={contactos}
                setEditar={setEditar}
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                eliminarContacto = {eliminarContacto}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <ModalContacto
        mostrarModal={mostrarModal}
        // Es necesario un método para volver a cerrar el modal.
        setMostrarModal={setMostrarModal}
        guardarContacto={guardarContacto}
        editar={editar}
        setEditar={setEditar}
        editarContacto={editarContacto}
      ></ModalContacto>
    </Container>
  );
}

export default App;