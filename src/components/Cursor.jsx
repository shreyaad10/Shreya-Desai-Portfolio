import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const outline = outlineRef.current;
    const glow = glowRef.current;

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    let glowX = 0, glowY = 0;
    let animId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dot) {
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
      }
    };

    const onMouseEnterLink = () => {
      if (outline) outline.classList.add('hovering');
      if (dot) dot.style.transform = 'translate(-50%, -50%) scale(1.5)';
    };
    const onMouseLeaveLink = () => {
      if (outline) outline.classList.remove('hovering');
      if (dot) dot.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    const animate = () => {
      outlineX += (mouseX - outlineX) * 0.12;
      outlineY += (mouseY - outlineY) * 0.12;
      glowX += (mouseX - glowX) * 0.06;
      glowY += (mouseY - glowY) * 0.06;

      if (outline) {
        outline.style.left = outlineX + 'px';
        outline.style.top = outlineY + 'px';
      }
      if (glow) {
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
      }
      animId = requestAnimationFrame(animate);
    };

    const interactives = document.querySelectorAll('a, button, [data-cursor]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterLink);
      el.addEventListener('mouseleave', onMouseLeaveLink);
    });

    window.addEventListener('mousemove', onMouseMove);
    animate();

    // Re-scan for new interactive elements periodically
    const scanInterval = setInterval(() => {
      const newInteractives = document.querySelectorAll('a, button, [data-cursor]');
      newInteractives.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeaveLink);
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });
    }, 2000);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
      clearInterval(scanInterval);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow" />
      <div ref={outlineRef} className="cursor-outline" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
