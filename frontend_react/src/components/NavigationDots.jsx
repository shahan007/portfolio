import React from 'react'

const NavigationDots = ({ active }) => (
  <div className="app__navigation">
    {["home", "about", "work", "skills", "testimonials", "contact"].map((navItem, index) => (
      <a
        href={`#${navItem}`}
        key={navItem + index}
        className="app__navigation-dot"
        style={active === navItem ? { backgroundColor: '#313BAC' } : {}}
      />
    ))}
  </div>
);

export default NavigationDots;