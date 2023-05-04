import React, { useEffect, useState } from "react";
import { HeaderHome } from "../../Layouts/HeaderHome/HeaderHome";
import axios from "axios";
import { UsuariosAxios } from "../../UI/UsuarioAxios/UsuarioAxios";
import { Input } from "../../UI/Input/Input";
import Swal from "sweetalert2";

export const ApiRick = () => {
    
    let url = "http://localhost:8080/api/usuarios";
    
    const [user, setUser] = useState([]);
    const [modal, setModal] = useState(false);

    const [inputDoc, setInputDoc] = useState("");
    const [inputNomb, setInputNomb] = useState("");
    const [inputApell, setInputApell] = useState("");
    const [inputTele, setInputTele] = useState("");
    const [inputCorreo, setInputCorreo] = useState("");

    async function abrirModal(){
        try {
            setModal(true);
        } catch (error) {
            console.log(error);
        }
    }

    async function cerrarModal(){
        try {
            setModal(false);
        } catch (error) {
            console.log(error);
        }
    }

    async function limpiar(){
        try {
            setInputDoc("");
            setInputNomb("");
            setInputApell("");
            setInputTele("");
            setInputCorreo("");
            cerrarModal();
        } catch (error) {
            console.log(error);
        }
    }

    async function listaUsuarios(){
        try {
            const respuesta = await axios.get(url);
            setUser(respuesta.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function guardarUsuarios(){
        try {

            if (inputDoc === "") {
                Swal.fire("Alerta","Porfavor Ingrese el Documento","warning")
            }
            else if (inputNomb === "") {
                Swal.fire("Alerta","Porfavor Ingrese el Nombre","warning")
            }
            else if (inputApell === "") {
                Swal.fire("Alerta","Porfavor Ingrese el Apellido","warning")
            }
            else if (inputTele === "") {
                Swal.fire("Alerta","Porfavor Ingrese el Telefono","warning")
            }
            else if (inputCorreo === "") {
                Swal.fire("Alerta","Porfavor Ingrese el Correo","warning")
            }
            else{
                const respuesta = await axios.post(url, {
                    documento: inputDoc,
                    nombre: inputNomb,
                    apellido: inputApell,
                    telefono: inputTele,
                    correo: inputCorreo
                })
                if (respuesta.status === 201) {
                    Swal.fire("Bien Hecho¡","Registro Exitoso","success");
                    limpiar();
                    listaUsuarios();
                }
                else{
                    if (respuesta.status === 400) {
                        Swal.fire("Error","Por Favor Verifique que el documento no este repetido \n Verifique que el Correo tenga un formato valido y el telefono", "error")
                    }
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect( () => {
        listaUsuarios();
    },[])

    return(
        <>
            <button className="btn btn-success" onClick={abrirModal}>Registrar Usuarios</button>
            {modal && (
            <div className="modal-overlay">
                <div className="modal2">
                    <div className="modal-header">
                        <h2>Registro Usuarios</h2>
                        <button className="cerrarModal" onClick={cerrarModal}>X</button>
                    </div>
                    <div className="modal-body">
                        <div className='formulario'>

                            <Input id={"documento"} tipo={"number"} valor={inputDoc} estilo={"input"} placeholder={"Documento"}
                            evento={(e) => setInputDoc(e.target.value)} />
                           
                            <Input id={"nombre"} tipo={"text"} valor={inputNomb} estilo={"input"} placeholder={"Nombre"} 
                              evento={(e) => setInputNomb(e.target.value)}/>

                            <Input id={"apellido"} tipo={"text"} valor={inputApell} estilo={"input"} placeholder={"Apellido"} 
                              evento={(e) => setInputApell(e.target.value)}/>

                            <Input id={"telefono"} tipo={"text"} valor={inputTele} estilo={"input"} placeholder={"Telefono"} 
                              evento={(e) => setInputTele(e.target.value)}/>

                            <Input id={"correo"} tipo={"text"} valor={inputCorreo} estilo={"input"} placeholder={"Correo"} 
                              evento={(e) => setInputCorreo(e.target.value)}/>
                            
                            <div className="contBtn">
                                <button id='btnGuardar' className='btn btn-success' onClick={guardarUsuarios}>Guardar</button>
                                <button id='btnCancelar' className='btn btn-danger' onClick={limpiar}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}


            <div className="gestionUsuario">
                <div className="contTabla">
                    <UsuariosAxios usuario={user} listaUsuarios={listaUsuarios}/>
                </div>
            </div>

        </>
    )
}