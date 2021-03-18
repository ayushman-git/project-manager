const makeEditable = (ref) => {
  ref.current.contentEditable = true;
  ref.current.focus();
};

export default makeEditable;
