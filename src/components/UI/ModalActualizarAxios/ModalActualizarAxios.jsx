import React, { useState, useEffect } from "react";
import Actualizar from "../../../Images/lapiz.png";
import { Input } from "../Input/Input";
import axios from "axios";
import Swal from "sweetalert2";



export const ModalActualizarAxios = ( {documento, nombre, apellido, telefono, correo, funcionListaUsuarios} ) => {

    const [modal, setModal] = useState(false);
    const [valorNom, setValorNom] = useState("");
    const [valorApe, setValorApe] = useState("");
    const [valorTel, setValorTel] = useState("");
    const [valorCorreo, setValorCorreo] = useState("");

    async function abrirModal(){
        setModal(true);
    }

    async function cerrarModal(){
        setModal(false);
    }



    async function limpiar(){
        informacion();
        cerrarModal();
    }

    async function informacion(){
        setValorNom(nombre);
        setValorApe(apellido);
        setValorTel(telefono);
        setValorCorreo(correo);
    }

    async function actualizar(){

        try {
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
                const respuesta = await axios.put("http://localhost:8080/api/usuarios/"+documento, {
                    nombre: valorNom,
                    apellido: valorApe,
                    telefono: valorTel,
                    correo: valorCorreo
                })
                if (respuesta.status === 201) {
                    Swal.fire("Exitoso¡","Actualizado Correctamente","success");
                    limpiar();
                    funcionListaUsuarios();
                }
                else{
                    if (respuesta.status === 400) {
                        Swal.fire("Alerta", "Por Favor revise el Telefono y correo que tenga un formato correcto", "info");
                    }
                    else{
                        Swal.fire("error", "Error", "error")
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
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
    )
}