import Modal from "../../Modal/Modal";

const DelModal = ({ closeModal, confirmDel, message }) => {
  return (
    <Modal closeModal={closeModal} headerMessage={message}>
      <button onClick={confirmDel}>Yes</button>
      <button onClick={closeModal}>No</button>
    </Modal>
  );
};

export default DelModal;
