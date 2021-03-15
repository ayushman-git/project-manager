import Modal from "../../Modal/Modal";

const DelModal = ({ closeModal, confirmDel, message }) => {
  const buttonWrapStyle = {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "2rem",
  };
  return (
    <Modal closeModal={closeModal} headerMessage={message}>
      <div style={buttonWrapStyle}>
        <button className="failure-btn" onClick={confirmDel}>
          Yes
        </button>
        <button className="secondary-btn" onClick={closeModal}>
          No
        </button>
      </div>
    </Modal>
  );
};

export default DelModal;
