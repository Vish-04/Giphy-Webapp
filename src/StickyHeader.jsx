import React, { useState, useEffect } from 'react';
import './StickyHeader.css'

function StickyHeader() {
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 100) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`sticky-header ${isSticky ? 'sticky' : ''}`}>
      <button className='btntop' onClick={scrollToTop}>Top</button>
    </header>
  );
}

export default StickyHeader;
