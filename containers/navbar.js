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
                <TitleRoslen />
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
      </Nav>
    )
  }
}
