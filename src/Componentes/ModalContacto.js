import React, { useEffect, useState } from 'react'
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const modeloContacto = {
    idContacto : 0,
    nombre : "",
    correo : "",
    telefono : ""
}

export const ModalContacto = ({mostrarModal, setMostrarModal, guardarContacto, editar, setEditar, editarContacto}) => {

    const [contacto, setContacto] = useState(modeloContacto);

    const actualizarDato = (e) => {
        setContacto({
            ...contacto,
            [e.target.name]:e.target.value
        });
    }
    
    const enviarDatos = ()=>{
        if (contacto.idContacto === 0) {
            guardarContacto(contacto);
        }else{
            editarContacto(contacto);
        }
    }

    useEffect(()=>{
        if (editar != null) {
            setContacto(editar);
        }
        else{
            setContacto(modeloContacto);
        }
    },[editar])

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal);
        setEditar(null);
    }

  return (
    <Modal isOpen={mostrarModal}>
        <ModalHeader>
            {contacto.idContacto === 0 ?"Nuevo Contacto":"Editar Contacto"}
        </ModalHeader>
        <ModalBody>
            <Form>
                <FormGroup>
                    <Label>Nombre</Label>
                    <Input name = "nombre" value = {contacto.nombre} onChange={actualizarDato}/>
                </FormGroup>
                <FormGroup>
                    <Label>Correo</Label>
                    <Input name = "correo" value = {contacto.correo} onChange={actualizarDato}/>
                </FormGroup>
                <FormGroup>
                    <Label>Telefono</Label>
                    <Input name = "telefono" value = {contacto.telefono} onChange={actualizarDato}/>
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" size="sm" onClick={enviarDatos} >Guardar</Button>
            <Button color="danger" size="sm" onClick={cerrarModal}>Cerrar</Button>
        </ModalFooter>
    </Modal>
  )
}
