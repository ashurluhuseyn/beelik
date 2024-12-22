import React from "react";
import '../modal.scss'

const SuccessModal = ({ active, setIsActive}) => {
  if (!active) return null;

  const handleClose = () => {
    setIsActive(false);
  };

  return (
    <div className="event-modal-overlay">
      <div className="event-modal-content">
        <h2>Uğurlu Qeydiyyat!</h2>
        <button onClick={handleClose}>Bağla</button>
      </div>
    </div>
  );
};

export default SuccessModal;
