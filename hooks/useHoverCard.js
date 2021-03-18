const useHoverCard = () => {
  const calc = (x, y) => [
    -(y - window.innerHeight / 2) / 80,
    (x - window.innerWidth / 2) / 80,
    1.05,
  ];
  const trans = (x, y, s) => {
    return `perspective(1200px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;
  };

  return [calc, trans];
};

export default useHoverCard;
