import React, {useState} from 'react'
import {HiMenuAlt4, HiX} from "react-icons/hi"
import {motion} from "framer-motion"
import { images } from '../../constants'
import "./Nav.scss"

const Nav = () => {

  const [menuToggle, setMenuToggle] = useState(false)

  return (
    <nav className='app__navbar'>
      <div className='app__navbar-logo'>
        <img src={images.logo} alt="logo" />
      </div>
      <ul className='app__navbar-links'>
        {
          ["home", "about","work","skills","testimonials","contact"].map(navItem => (
            <li className='app__flex p-text' key={`link-${navItem}`}>              
              <a href={`#${navItem}`}>{navItem}</a>                
              <div />
            </li>
          ))
        }
      </ul>
      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={()=>setMenuToggle(true)}/>        
        {
          menuToggle && (
            <motion.div
              whileInView={{x:[300,0]}}
              transition={{duration:0.85,ease:"easeInOut"}}              
            >
              <HiX onClick={() => (setMenuToggle(false))}/>
              <ul>
                {
                  ["home", "about", "work", "skills", "testimonials", "contact"].map(navItem => (
                    <li key={navItem}>
                      <a 
                        href={`#${navItem}`}
                        onClick={() => setMenuToggle(false)}
                      >
                        {navItem}
                      </a>
                      <div />
                    </li>
                  ))
                }
              </ul>
            </motion.div>
          )
        }
      </div>
    </nav>
  )
}

export default Nav;