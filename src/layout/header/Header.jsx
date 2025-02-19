import { NavLink } from "react-router";
import "./Header.css";


const Header = () => {
  return (
    <header>
        <nav>
        <img src="./public/nobackground.png" alt="eye" className="logo"/>
            <NavLink to="/" end>
            Inicio
            </NavLink>
            <NavLink to="diseases" end>
            Enfermedades
            </NavLink>
            <NavLink to="quiz" end>
            Quiz
            </NavLink>
            <NavLink to="about us" end>
            Sobre nosotros
            </NavLink>
        </nav>  
    </header>
  )
}

export default Header


