import React, {useState} from 'react'
import {HiMenuAlt4, HiX} from "react-icons/hi"
import { motion, AnimatePresence } from "framer-motion"
import { images } from '../../constants'
import "./Nav.scss"

const Nav = () => {

  const [menuToggle, setMenuToggle] = useState(false)

  const handleOnClick = (event,state) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();    
    setMenuToggle(state);    
  };

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
        <HiMenuAlt4 onClick={(e) =>handleOnClick(e,true)}/>        
        <AnimatePresence>
        {
          menuToggle && (
            <motion.div
              exit={{ opacity: [1,0],x:180 }}
              initial={{ x: [180, 0], opacity: [0,1]}}
              whileInView={{ x: [180, 0], opacity: [0, 1]}}
              transition={{duration:0.85,ease:"easeInOut"}}              
            >
              <HiX onClick={(e) => handleOnClick(e,false)}/>
              <ul>
                {
                  ["home", "about", "work", "skills", "testimonials", "contact"].map(navItem => (
                    <li key={navItem}>
                      <a 
                        href={`#${navItem}`}
                        onClick={(e) => handleOnClick(e,false) }
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
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Nav;