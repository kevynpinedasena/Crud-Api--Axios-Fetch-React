import React, { useState } from "react";
import Eliminar from "../../../Images/eliminar.png";
import axios from "axios";
import Swal from "sweetalert2";
import { ModalActualizarAxios } from "../ModalActualizarAxios/ModalActualizarAxios";

export const UsuariosAxios = ( {usuario = [], listaUsuarios} ) => {

    async function eliminarUsuarios(documento){
        try {
            console.log(documento);
            const respuesta = await axios.delete("http://localhost:8080/api/usuarios/"+documento)
            if (respuesta.status === 200) {
                Swal.fire("Bien Hecho¡","Eliminado Correctamente","success")
                listaUsuarios();
            }
            else{
                if (respuesta.status === 404) {
                    Swal.fire("Error", "Usuario " + documento + " no Existe", "warning");
                }
                else{
                    Swal.fire("Error","Error","error")
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
            <div className="contsUsuarios">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Documento</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Actualizar</th>
                        <th scope="col">Eliminar</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        usuario.map( (item) => (
                         <tr>
                            <th scope="row">{item.documento}</th>
                            <th scope="row">{item.nombre}</th>
                            <th scope="row">{item.apellido}</th>
                            <th scope="row">{item.telefono}</th>
                            <th scope="row">{item.correo}</th>
                            <th><ModalActualizarAxios documento={item.documento} nombre={item.nombre} apellido={item.apellido} telefono={item.telefono} correo={item.correo} funcionListaUsuarios={listaUsuarios}/></th>
                            <th><button id={item.documento} className="btnEliminar" onClick={() => eliminarUsuarios(item.documento)}>
                            <img className="imgEliminar" src={Eliminar} alt="eliminar" />    
                            </button></th>
                         </tr>   
                        ))
                    }
                </tbody>
            </table>
        </div>
        
        </>
    )
}