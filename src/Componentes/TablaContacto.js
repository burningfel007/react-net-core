import { Button, Table } from "reactstrap";

const TablaContacto = ({contactos, setEditar, mostrarModal, setMostrarModal, eliminarContacto}) => {

    const enviarDatos = contacto => {
        setEditar(contacto)
        setMostrarModal(!mostrarModal)
    }
    
    return(
        <Table striped responsive>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Telefono</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    (contactos.length < 1) ? (<tr><td colSpan="4">Sin Registros</td></tr>):(
                        contactos.map(item =>{
                            return (
                                <tr key={item.idContacto}>
                                    <td>{item.nombre}</td>
                                    <td>{item.correo}</td>
                                    <td>{item.telefono}</td>
                                    <td>
                                        <Button color="primary" size="sm" className="me-2" onClick={()=>enviarDatos(item)}>Editar</Button>
                                        <Button color="danger" size="sm" onClick={()=>{eliminarContacto(item.idContacto)}} >Eliminar</Button>
                                    </td>
                                </tr>
                            )
                        })
                    )
                }
            </tbody>
        </Table>
    );
}

export default TablaContacto;