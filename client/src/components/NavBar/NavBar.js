import { Link } from "react-router-dom"
import style from "./NavBar.module.css"

import linkedin from "../../imagenes/linkedinn.png"
import github from "../../imagenes/githubn.png"
import icono from "../../imagenes/pokeapp2.png"

export default function NavBar(){
    return(
        <div className={style.all}>
            <div className={style.icono}>
                <Link to="/home">
                <img src={icono} alt="logo" width="100px" height="80px"/>
                </Link>
            </div>

            <div className={style.button}>
                <Link to="/home">
                <button className={style.links}>HOME</button>
                </Link>

                <Link to="/create">
                <button className={style.links}>CREATE POKEMON</button>
                </Link>
            </div>

            <div className={style.redes}>
              <a href="https://www.linkedin.com/in/ramiro-monllor/"><img src={linkedin} alt="logo linkedin" width="60" height="40"/></a>
              <a href="https://github.com/ramiro-monllor"><img src={github} alt="logo git" width="40" height="40"/></a>
            </div>

        </div>
    )
}