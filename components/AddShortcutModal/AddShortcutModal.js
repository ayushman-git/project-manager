import { useState } from "react";

import Modal from "../Modal/Modal";

const AddShortcutModal = ({ closeModal, updateShortcuts }) => {
  const [shortcutUrl, setShortcutUrl] = useState("");
  const [shortcutUrlErr, setShortcutUrlErr] = useState(false);
  const [platform, setPlatform] = useState("other");

  const ERR_MESSAGE = "Field cannot be left empty!";

  const handleClick = (e) => {
    e.preventDefault();
    if (!shortcutUrlErr) {
      if (!shortcutUrlErr) {
        setShortcutUrlErr(true);
      }
    } else {
      updateShortcuts(shortcutUrl, platform);
      setPlatform("other");
      setShortcutUrl("");
    }
  };
  return (
    <Modal closeModal={closeModal} headerMessage="Add Shortcut">
      <form>
        <label>
          Platform: <br />
          <select
            className="dropdown-input"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="other">Other</option>
            <option value="trello">Trello</option>
            <option value="figma">Figma</option>
            <option value="xd">Adobe XD</option>
            <option value="firebase">Firebase</option>
          </select>
          <br />
        </label>
        <label>
          URL: <br />
          <input
            type="text"
            className={shortcutUrlErr ? "error-inp" : ""}
            placeholder="Enter a url"
            value={shortcutUrl}
            onChange={(e) => {
              setShortcutUrl(e.target.value);
              setShortcutUrlErr(false);
            }}
          />
        </label>
        <button
          className="success-btn"
          style={{ float: "right" }}
          onClick={handleClick}
        >
          Submit
        </button>
        {shortcutUrlErr ? (
          <span className="input-err-msg">{ERR_MESSAGE}</span>
        ) : (
          <></>
        )}
      </form>
    </Modal>
  );
};

export default AddShortcutModal;
