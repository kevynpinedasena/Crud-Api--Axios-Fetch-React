import React, { useEffect, useState } from "react";
import { Input } from '../../UI/Input/Input';
import Swal from 'sweetalert2'


export const Modal = ( {titulo, funListaUsuarios} ) => {

    const URL = 'http://localhost:8080/api/usuarios'

 
    const [modal, setModal] = useState(false);
    const [valorInputDoc, setValorInputDoc] = useState("");
    const [valorInputNom, setValorInputNom] = useState("");
    const [valorInputApell, setValorInputApell] = useState("");
    const [valorInputTelef, setValorInputTelef] = useState("");
    const [valorInputCorreo, setValorInputCorreo] = useState("");

    const abrirModal = () => {
        setModal(true);
    };

    const cerrarModal = () => {
        setModal(false);
    };

    const limpiar = () => {
      setValorInputDoc("");
      setValorInputNom("");
      setValorInputApell("");
      setValorInputTelef("");
      setValorInputCorreo("");
      cerrarModal();
    }

    const cargar = () => {
      setTimeout( () => {
          window.location.reload("http://localhost:3000/")
      })
  }

    const guardarUsuario = () => {
        let documento = valorInputDoc;
        let nombre = valorInputNom;
        let apellido = valorInputApell;
        let telefono = valorInputTelef;
        let correo = valorInputCorreo;
        
        if (documento === 0 && documento === "") {
          Swal.fire("Alerta","Porfavor Ingrese el Documento", "info")
        }
        else if (nombre === "") {
          Swal.fire("Alerta","Porfavor Ingrese el Nombre", "info")
        }
        else if (apellido === "") {
          Swal.fire("Alerta","Porfavor Ingrese el Apellido", "info")
        }
        else if (telefono === "") {
          Swal.fire("Alerta","Porfavor Ingrese el Telefono", "info")
        }
        else if (correo === "") {
          Swal.fire("Alerta","Porfavor Ingrese el Correo", "info")
        }
        else{
          fetch(URL, {
            method : "POST",
            headers : {"Content-type":"application/json"},
            body:JSON.stringify({
              documento: documento,
              nombre: nombre,
              apellido: apellido,
              telefono: telefono,
              correo: correo
            })
          })
          .then( (respuesta) => {
            if (respuesta.status === 201) {
                Swal.fire("Registro Exitoso", "Usuario Guardado Exitosamente", "success")
                funListaUsuarios();
                limpiar();
            }
            else{
                if (respuesta.status === 400) {
                    Swal.fire("Error","Por Favor Verifique que el documento no este repetido \n Verifique que el Correo tenga un formato valido y el telefono", "error")
                }
            }
          })
          .catch(error => console.log(error))
        }
      };

    return(
        <>
        <button className="btn btn-success" onClick={abrirModal}>Registrar Usuarios</button>
        {modal && (
            <div className="modal-overlay">
                <div className="modal2">
                    <div className="modal-header">
                        <h2>{titulo}</h2>
                        <button className="cerrarModal" onClick={cerrarModal}>X</button>
                    </div>
                    <div className="modal-body">
                        <div className='formulario'>
                            <Input id={"documento"} tipo={"number"} valor={valorInputDoc} estilo={"input"} placeholder={"Documento"} 
                              evento={(e) => setValorInputDoc(e.target.value)}/>

                            <Input id={"nombre"} tipo={"text"} valor={valorInputNom} estilo={"input"} placeholder={"Nombre"} 
                              evento={(e) => setValorInputNom(e.target.value)}/>

                            <Input id={"apellido"} tipo={"text"} valor={valorInputApell} estilo={"input"} placeholder={"Apellido"} 
                              evento={(e) => setValorInputApell(e.target.value)}/>

                            <Input id={"telefono"} tipo={"text"} valor={valorInputTelef} estilo={"input"} placeholder={"Telefono"} 
                              evento={(e) => setValorInputTelef(e.target.value)}/>

                            <Input id={"correo"} tipo={"text"} valor={valorInputCorreo} estilo={"input"} placeholder={"Correo"} 
                              evento={(e) => setValorInputCorreo(e.target.value)}/>
                            
                            <div className="contBtn">
                                <button id='btnGuardar' className='btn btn-success' onClick={guardarUsuario}>Guardar</button>
                                <button id='btnCancelar' className='btn btn-danger' onClick={limpiar}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}