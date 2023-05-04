import React, { useEffect, useState } from 'react'
import { Usuarios } from '../../UI/Usuarios/Usuarios'
import "bootstrap/dist/css/bootstrap.min.css";
import { Input } from '../../UI/Input/Input';
import { Modal } from '../../UI/Modal/Modal';
import axios from 'axios';

export const Principal = () => {

  const URL = 'http://localhost:8080/api/usuarios'
  
  const [user, setUser] = useState([]);
  const [tamanio, setTamanio] = useState([]);
  

  const ListaUsuarios = () => {
    fetch(URL)
    .then(respuesta => respuesta.json())
    .then(data => setUser(data))
    .catch(error => console.log(error))
  }

  useEffect( () => {
    ListaUsuarios();
  },[])

  return (
    <> 
      <Modal titulo={"Registro Usuarios"} funListaUsuarios={ListaUsuarios}/>

      <div className="gestionUsuario">
          <div className="contTabla">
            <Usuarios usuario={user} listaUsuarios={ListaUsuarios} />
          </div>
      </div>
    </>
      
  )
}
