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
            <Link href="/">
              <NavBarLink>
                <div className="logo-and-icon">
                  <Roslen><TitleRoslen /></Roslen>
                  <span>x</span>
                </div>
              </NavBarLink>
            </Link>
          </NavBarChildren>
          <NavBarChildren className="hide">
            {links.map(link => {
              return <Link
                key={link.name}
                href={`${link.to}`}
                >
                  <NavBarLink>{link.name}</NavBarLink>
                </Link>
            })}
          </NavBarChildren>
        </ContainerNavBar>
        <style jsx>{`
          .icon {
            display: none;
          }
          @media(max-width: 767px) {
            .logo-and-icon {
              display: grid;
              grid-template-columns: 50% 50%;
              justify-content: space-between;
            }
            span {
              background: blue;

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
