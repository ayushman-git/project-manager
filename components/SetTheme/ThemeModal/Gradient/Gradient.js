const Gradient = ({ theme, selected, changeTheme }) => {
  const style = {
    background: `linear-gradient(-45deg, ${theme[0]}, ${theme[1]})`,
    width: "3rem",
    height: "3rem",
    borderRadius: "50%",
    border: selected ? "1px solid black" : "none",
    cursor: "pointer",
  };
  const newTheme = () => {
    changeTheme(theme);
  };
  return <div style={style} onClick={newTheme}></div>;
};

export default Gradient;
