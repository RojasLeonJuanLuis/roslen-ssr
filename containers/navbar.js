import React, { Component } from 'react'
import Link from 'next/link'

import TitleRoslen from '../svgs/title-roslen.svg'

import {
  ContainerNavBar,
  Nav,
  NavBarChildren,
  NavBarLink,
  Roslen
} from '../stylesheet/styles'

export default class Navbar extends Component {
  state = {

  }

  render() {
    const logo = 'https://github.com/RojasLeonJuanLuis/images-roslen/blob/master/logo.png?raw=true';
		const links = [
			{to: "about", name: "Conócenos"},
			{to: "contact", name: "Contacto"},
			{to: "products", name: "Productos"},
		]
    return (
      <Nav>
        <ContainerNavBar>
          <NavBarChildren>

              <NavBarLink>
                <div className="logo-and-icon">
                  <Link href="/"><Roslen><TitleRoslen /></Roslen></Link>
                  <span>x</span>
                </div>
              </NavBarLink>

          </NavBarChildren>
          <div className="navbar-children">
            {links.map(link => {
              return <Link
                key={link.name}
                href={`${link.to}`}
                >
                  <NavBarLink>{link.name}</NavBarLink>
                </Link>
            })}
          </div>
        </ContainerNavBar>
        <style jsx>{`
          .icon {
            display: none;
          }
          .navbar-children {
            display: flex;
            flex-direction: row;
          }
          @media(max-width: 767px) {
            .logo-and-icon {
              display: grid;
              grid-template-columns: 50% 50%;
              justify-content: space-between;
            }
            .navbar-children {
              display: flex;
              flex-direction: column;
              text-align: left;
              width: 100%;
            }
            span {
              text-align: right;
            }
            .icon {
              display: block;
            }
          }
        `}</style>
      </Nav>
    )
  }
}
