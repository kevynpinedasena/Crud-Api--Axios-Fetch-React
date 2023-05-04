import React, { useEffect, useState } from "react";
import Actualizar from "../../../Images/lapiz.png";
import { Input } from "../Input/Input";
import Swal from "sweetalert2";


export const ModalActualizar = ( {documento, nombre, apellido, telefono, correo} ) => {

    const [modal, setModal] = useState(false);
    const [valorDoc, setValorDoc] = useState("");
    const [valorNom, setValorNom] = useState("");
    const [valorApe, setValorApe] = useState("");
    const [valorTel, setValorTel] = useState("");
    const [valorCorreo, setValorCorreo] = useState("");

    const abrirModal = () => {
        setModal(true);
    };

    const cerrarModal = () => {
        setModal(false);
    };


    const limpiar = () => {
        informacion();
        cerrarModal();
    }

    const cargar = () => {
        setTimeout( () => {
            window.location.reload("http://localhost:3000/")
        })
    }

    const actualizar = () => {
        console.log(valorDoc, valorNom, valorApe, valorTel, valorCorreo);
        let URL = 'http://localhost:8080/api/usuarios/'+documento;

        if (valorNom === "") {
            Swal.fire("Alerta", "Porfavor Ingrese el Nombre", "warning")
        }
        else if (valorApe === "") {
            Swal.fire("Alerta", "Porfavor Ingrese el Apellido", "warning")
        }
        else if (valorTel == "") {
            Swal.fire("Alerta", "Porfavor Ingrese el Telefono", "warning")
        }
        else if (valorCorreo === "") {
            Swal.fire("Alerta", "Porfavor Ingrese el correo", "warning")
        }
        else{
            fetch(URL,{
                method: "PUT",
                headers: {"content-type":"application/json"},
                body:JSON.stringify({
                    nombre: valorNom,
                    apellido: valorApe,
                    telefono: valorTel,
                    correo: valorCorreo
                })
            })
            .then( (respuesta) => {
                if (respuesta.status === 201) {
                    Swal.fire("Actualizado Exitosamente", "Usuario Actualizado con exito", "success")
                    .then( (ok) => {
                        if (ok) {
                            cargar();
                        }
                    });
                    limpiar();
                }
                else if (respuesta.status === 400) {
                    Swal.fire("Alerta", "Por Favor revise el Telefono y correo que tenga un formato correcto", "info");
                }
                else{
                    Swal.fire("Error","","error")
                }
            })
            .catch(error => console.log(error))
        }
    }

    const informacion = () =>{
        setValorNom(nombre);
        setValorApe(apellido);
        setValorTel(telefono);
        setValorCorreo(correo);
    }

    useEffect(() => {
        informacion();
    },[])

    return(
        <>
        <button className="btnActualizar" onClick={abrirModal}><img className="imgActualizar" src={Actualizar} alt="actualizar" /></button>
        {modal && (
            <div className="modal-overlay">
                <div className="modal2">
                    <div className="modal-header">
                        <h2>{"Actualizar Usuario " + documento}</h2>
                        <button className="cerrarModal" onClick={cerrarModal}>X</button>
                    </div>
                    <div className="modal-body">
                        <div className='formulario'>

                            <div className="contenedorLabel">
                                <label htmlFor="nombre" className="label">Nombre: </label>
                                <Input id={"nombre"} tipo={"text"} valor={valorNom} estilo={"inputModalAct"} 
                                    evento={ (e) => setValorNom(e.target.value)}/>
                            </div>

                            <div className="contenedorLabel">
                                <label htmlFor="apellido" className="label">Apellido: </label>
                                <Input id={"apellido"} tipo={"text"} valor={valorApe} estilo={"inputModalAct"} 
                                    evento={(e) => setValorApe(e.target.value)}/>
                            </div>

                            <div className="contenedorLabel">
                                <label htmlFor="telefono" className="label">Telefono: </label>
                                <Input id={"telefono"} tipo={"text"} valor={valorTel} estilo={"inputModalAct"} 
                                    evento={(e) => setValorTel(e.target.value)}/>
                            </div>

                            <div className="contenedorLabel">
                                <label htmlFor="correo" className="label">Correo: </label>
                                <Input id={"correo"} tipo={"text"} valor={valorCorreo} estilo={"inputModalAct"} 
                                    evento={(e) => setValorCorreo(e.target.value)}/>
                            </div>

                            <div className="contBtn">
                                <button id='btnGuardar' className='btn btn-success' onClick={actualizar}>Actualizar</button>
                                <button id='btnCancelar' className='btn btn-danger' onClick={limpiar}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
};