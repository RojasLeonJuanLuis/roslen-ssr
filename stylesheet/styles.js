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
  transition: .4s;
  &:hover {
    transform: scale(1.03);
  }
`
export const Nav = styled.header`
  border-bottom: 1px solid rgb(246,246,246);
`
export const ContainerNavBar = styled.nav`
  display: flex;
  width: 80%;
  margin: auto;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  justify-content: space-between;
  font-family: 'Cabin', sans-serif;
  transition: .6s;
  @media(max-width: 985px) {
    width: 100%;
  }
  @media(max-width: 767px) {
    flex-direction: column;
  }
`
export const NavBarChildren = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  justify-content: space-between;
  @media(max-width: 767px) {
    flex-direction: column;
  }
`
export const Roslen = styled.div`
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`
export const NavBarLink = styled.a`
  color: #424242;
  width: 140px;
  text-align: left;
  font-size: 17px;
  &:hover {
    cursor: pointer;
  }
  @media(max-width: 985px) {
  }
  @media(max-width: 767px) {
    width: 100%;
  }
`
export const LoadingProducts = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: auto;
`
export const Circle1 = styled.div`
  width: 30px;
  height: 30px;
  background: #FDA066;
  border-radius: 50%;
  animation-name: circle1;
  animation-duration: .4s;
  animation-iteration-count: infinite;
  @keyframes circle1 {
    0% { transform: scale(.5); }
    100% { transform: scale(1); }
  }
`
export const Circle2 = styled.div`
  width: 30px;
  height: 30px;
  background: #FDA066;
  border-radius: 50%;
  animation-name: circle2;
  animation-duration: .4s;
  animation-iteration-count: infinite;
  margin-left: 10px;
  @keyframes circle2 {
    0% { transform: scale(.5); }
    100% { transform: scale(1); }
  }
`
export const Circle3 = styled.div`
  width: 30px;
  height: 30px;
  background: #FDA066;
  border-radius: 50%;
  animation-name: circle3;
  animation-duration: .4s;
  animation-iteration-count: infinite;
  margin-left: 10px;
  @keyframes circle3 {
    0% { transform: scale(.5); }
    100% { transform: scale(1); }
  }
`
