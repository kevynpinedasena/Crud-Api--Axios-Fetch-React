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

  useEffect ( () => {
    async function datosTabla(){
      const respuesta = await axios.get(URL);
      setTamanio(respuesta.data);
    }
    datosTabla();
  },[])

  const numeroTabla = tamanio.length;
  console.log(numeroTabla);

  useEffect( () => {
    ListaUsuarios();
  },[])

  return (
    <> 
      <Modal titulo={"Registro Usuarios"}/>
      <p>los numeros {numeroTabla}</p>
      <div className="gestionUsuario">
          <div className="contTabla">
            <Usuarios usuario={user} />
          </div>
      </div>
    </>
      
  )
}
