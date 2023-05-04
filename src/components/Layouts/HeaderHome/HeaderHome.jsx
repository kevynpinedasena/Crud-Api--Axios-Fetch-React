import React from 'react'
import LogoReact from '../../../Images/react.png'
import { Nav } from '../../UI/Nav/Nav'


export const HeaderHome = () => {
  return (
      <>
        <div className='ContenedorHeader'>
          <div className="logoTitulo">
            <img src={LogoReact} alt="react" className='imgReact'/>
            <h1 className='titulo'>Gestion de Usuarios</h1>
          </div>

          <div className="menu">
            <Nav />
          </div>
        </div>

          <hr className='hr'/>
      </>
  )
}
