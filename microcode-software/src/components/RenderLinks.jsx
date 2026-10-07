import React, { useEffect, useRef } from 'react';

function RenderLinks() {
  const wrapperRef = useRef();

  useEffect(() => {
    const wrapperEl = wrapperRef.current; // ✅ Cache the ref value
    const script1 = document.createElement('script');
    script1.src = 'static/js/main.js';
    script1.async = true;

    if (wrapperEl) {
      wrapperEl.appendChild(script1);
    }

    return () => {
      if (wrapperEl && script1.parentNode === wrapperEl) {
        wrapperEl.removeChild(script1);
      }
    };
  }, []); // No deps needed, wrapperEl is stable inside useEffect

  return <div ref={wrapperRef} className="wrapper"></div>;
}

export default RenderLinks;
