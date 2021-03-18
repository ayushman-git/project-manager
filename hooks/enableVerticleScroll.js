import { useEffect } from "react";

const enableVerticleScroll = (projectRef) => {
  useEffect(() => {
    (function () {
      function scrollHorizontally(e) {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
        projectRef.current.scrollLeft -= delta * 40; // Multiplied by 40
        e.preventDefault();
      }
      // IE9, Chrome, Safari, Opera
      projectRef.current.addEventListener(
        "mousewheel",
        scrollHorizontally,
        false
      );
      // Firefox
      projectRef.current.addEventListener(
        "DOMMouseScroll",
        scrollHorizontally,
        false
      );
    })();
  }, []);
};

export default enableVerticleScroll;
