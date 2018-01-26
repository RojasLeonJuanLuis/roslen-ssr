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
    open: false
  }

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
      icon = <div>Abierto</div>
    }
    else if(!this.state.open) {
      icon = <div>Cerrado</div>
    }
    return (
      <Nav>
        <ContainerNavBar>
          <NavBarChildren>
            <div className="logo-and-icon">
              <Link href="/"><Roslen><TitleRoslen /></Roslen></Link>
              <span onClick={this.handleOpen} className="icon-cross">{icon}</span>
            </div>
          </NavBarChildren>
          {this.state.open && (
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
          )}
        </ContainerNavBar>
        <style jsx>{`
          .logo-and-icon {
            width: 140px;
          }
          .navbar-children {
            display: flex;
            flex-direction: row;
          }
          .icon-cross {
            display: none;
          }
          @media(max-width: 767px) {
            .logo-and-icon {
              display: grid;
              grid-template-columns: 50% 50%;
              justify-content: space-between;
              width: 90%;
            }
            .navbar-children {
              display: flex;
              flex-direction: column;
              text-align: left;
              width: 90%;
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
