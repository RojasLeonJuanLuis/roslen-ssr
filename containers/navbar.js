import React, { Component } from 'react'
import Link from 'next/link'

export default class Navbar extends Component {
  render() {
    const logo = 'https://github.com/RojasLeonJuanLuis/images-roslen/blob/master/logo.png?raw=true';
		const links = [
			{to: "about", name: "Conócenos"},
			{to: "contact", name: "Contacto"},
			{to: "products", name: "Productos"},
		]
    return (
      <div>
        <div>
          <Link href="/"><img src={logo} /></Link>
        </div>
        <div>
          {links.map(link => {
            return <Link
              key={link.name}
              href={`${link.to}`}
              >
                <a>{link.name}</a>
              </Link>
          })}
        </div>
      </div>
    )
  }
}
