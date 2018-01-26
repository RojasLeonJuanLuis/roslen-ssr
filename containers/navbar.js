import React, { Component } from 'react'
import Link from 'next/link'

import TitleRoslen from '../svgs/title-roslen.svg'
import Bars from '../svgs/bars.svg'
import Cross from '../svgs/cross.svg'

import {
  ContainerNavBar,
  Nav,
  NavBarChildren,
  NavBarLink,
  Roslen
} from '../stylesheet/styles'

export default class Navbar extends Component {
  state = { open: false }

  handleOpen = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    const logo = 'https://github.com/RojasLeonJuanLuis/images-roslen/blob/master/logo.png?raw=true';
		const links = [
			{to: "about", name: "Conócenos"},
			{to: "contact", name: "Contacto"},
			{to: "products", name: "Productos"},
		]

    let icon = ''

    if(this.state.open) {
      icon = <div className="bars"><Cross /></div>
    }
    else if(!this.state.open) {
      icon = <div className="cross"><Bars /></div>
    }
    return (
      <Nav>
        <ContainerNavBar>
          <NavBarChildren>
            <div className="logo-and-icon">
              <Link href="/"><Roslen><TitleRoslen /></Roslen></Link>
              <span onClick={this.handleOpen} className="icon">{icon}</span>
            </div>
          </NavBarChildren>
          <div className={`navbar-children-${this.state.open.toString()}`}>
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
          .logo-and-icon {
            display: flex;
            align-items: center;
            width: 140px;
          }
          .navbar-children-false {
            display: flex;
            flex-direction: row;
          }
          .icon {
            display: none;
          }
          @media(max-width: 767px) {
            .logo-and-icon {
              display: grid;
              grid-template-columns: 50% 50%;
              justify-content: space-between;
              width: 90%;
            }

            .navbar-children-false {
              display: none;
            }
            .navbar-children-true {
              display: flex;
              flex-direction: column;
              text-align: left;
              width: 90%;
            }
            .icon {
              display: block;
            }
            span {
              text-align: right;
            }
            .icon-cross {
              display: block;
            }
            .icon-cross:hover {
              cursor: pointer;
            }
          }
        `}</style>
      </Nav>
    )
  }
}
