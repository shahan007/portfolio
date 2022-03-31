import React, { useState } from 'react';

import { images } from '../../constants';
import { motion,AnimatePresence } from 'framer-motion';
import ReactTooltip from 'react-tooltip';
import { SocialMedia } from '../../components';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';
import './Footer.scss';

const Footer = () => {

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });  
  const { name, email, message } = formData;
  const [textAreaError,setTextAreaError] = useState(false)  
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
    
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = event => {
    
    event.preventDefault()
  
    if (
      (name.trim().length >= 3)
      &&
      (email.trim().length >= 3)
      &&
      (message.trim().length >= 10)
    ) {
      setLoading(true);

      const contact = {
        _type: 'contact',
        name: name,
        email: email,
        message: message,
      };

      client.create(contact)
        .then(() => {
          setLoading(false);
          setIsFormSubmitted(true);
        })
        .catch((err) => console.log(err));
    } else{
      if (message.trim().length <10){
        setTextAreaError(true)
        setTimeout(() => setTextAreaError(false),5000)
      }      
    }
  };

  return (
    <>
      <h2 className="head-text">Take a coffee & chat with me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card ">
          <img src={images.email} alt="email" />
          <a href="mailto:shahan989+portfolio@micael.com" className="p-text">hello@shahan</a>
        </div>
        <div className="app__footer-card" data-event='click focus' data-tip data-for="socials-links">
          <img src={images.mobile} alt="phone" />
          <p className="p-text">
            contact@socials 😊
          </p>
          <ReactTooltip
            id="socials-links"
            effect="solid"
            arrowColor="#fff"
            className="skills-tooltip react-tooltip-clickable-link"                        
            globalEventOff='click'                  
            getContent={() => {
              return <SocialMedia />
            }}            
          />          
        </div>
      </div>
      {!isFormSubmitted ? (
        <form onSubmit={handleSubmit} className="app__footer-form app__flex">
          <div className="app__flex">
            <input minLength={3} required className="p-text" type="text" placeholder="Your Name" name="name" value={name} onChange={handleChangeInput} />
          </div>          
          <div className="app__flex">
            <input 
              minLength={3} 
              required 
              className="p-text" 
              type="email" 
              placeholder="Your Email" 
              name="email" 
              value={email} 
              onChange={handleChangeInput} 
              pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"             
            />
          </div>          
          <div>
            <textarea
              className="p-text"
              placeholder="Your Message"
              value={message}
              name="message"
              onChange={handleChangeInput}
              required                     
            />
          </div>       
          <AnimatePresence>
            {textAreaError && (
              <motion.p           
                whileInView={{x:["-10vw","0vw"] ,scale:[0.8,1],  opacity: [0, 1]}} 
                initial={{x:"-10vw",scale:0.8,opacity:0}}                                    
                exit={{opacity:[1,0]}}
                className="error-message"
              >
                😔 Message must be at least 10 chars long !
              </motion.p>
            )}
          </AnimatePresence>
          <button type="submit" className="p-text">{!loading ? 'Send Message' : 'Sending...'}</button>
        </form>
      ) : (        
          <motion.div
            whileInView={{ y: ["10vh", "0vh"], scale: [0.8, 1], opacity: [0, 1] }}
            initial={{ y: "-10vh", scale: 0.8, opacity: 0 }}                                    
            transition={{ duration: 0.5, type: "tween" }}
          >
            <h3 className="thank-you-msg" style={{margin:"1.5rem auto"}}>
              <img src={images.waveGif} alt="wave gif"/>
              <span className="head-text" >Thank you for getting in touch!</span>
            </h3>
          </motion.div>        
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg',
);