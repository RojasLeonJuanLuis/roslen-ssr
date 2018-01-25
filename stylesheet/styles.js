import styled from 'styled-components'

export const Image = styled.img`
  width: 60%;
`
export const ContainerProducts = styled.div`
  display: grid;
  grid-template-columns: 24% 24% 24% 24%;
  grid-gap: 15px;
  box-sizing: border-box;
  width: 80%;
  margin: auto;
  padding-top: 20px;
  padding-bottom: 20px;
`
export const SuperContainerProducts = styled.div`
  background-color: rgb(245,244,250);
`
export const Card = styled.div`
  background-color: #fff;
  border-radius: 4px;
  padding: 3px;
  box-sizing: border-box;
  border: 1px solid rgb(246,246,246);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  box-shadow: 2px 2px 30px 2px #EBEBEB;
  font-family: 'Cabin', sans-serif;
`
export const Nav = styled.nav`
  border-bottom: 1px solid rgb(246,246,246);
`
export const ContainerNavBar = styled.div`
  display: grid;
  width: 80%;
  margin: auto;
  grid-template-columns: 50% 50%;
  padding-top: 30px;
  padding-bottom: 30px;
  justify-items: center;
  justify-content: space-between;
  font-family: 'Cabin', sans-serif;
`
export const NavBarChildren = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 10px;
  box-sizing: border-box;
`
export const NavBarLink = styled.a`
  color: #000000;
  width: 50%;
  font-size: 19px;
  &:hover {
    cursor: pointer;
  }
`
export const Roslen = styled.strong`
  font-size: 30px;
`