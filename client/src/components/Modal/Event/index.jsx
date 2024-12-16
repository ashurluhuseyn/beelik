import React, { useState } from 'react'
import '../modal.scss'

import closeIcon from '../../../assets/images/close.svg'
import warningIcon from '../../../assets/images/warning.svg'
import { createApply } from '../../../api/Apply/eventApply'
import { maskPhone } from '../../../utils/mask';

const EventModal = ({ active, setIsActive, eventID }) => {
    const [data, setData] = useState({
      fullname: '',
      phone: '',
      email: '',
      eventID: eventID  
    });
    const [error, setError] = useState('');
  
    if (!active) return null;
  
    const handleClose = () => {
      setIsActive(false);
      setError(''); 
    };
  
    const submitHandler = async () => {
      if (!data.fullname || !data.phone || !data.email) {
        setError('Bütün boşluqları doldurun.');
        return;
      }
  
      try {
        await createApply(data);
        handleClose(); 
      } catch (error) {
        console.error('Error submitting the form:', error);
      }
    };
  
    return (
      <div className="event-modal-overlay">
        <div className="event-modal-content">
          <div className="modal-header">
            <h1>Qeydiyyat!</h1>
            <button onClick={handleClose}>
              <img src={closeIcon} alt='Icon for close modal' />
            </button>
          </div>
          <div className="modal-body">
            <div className="event-modal-form">
              {error && <div className="error-message">
                  <img src={warningIcon} alt="Warning icon for modal" />
                  <p>{error}</p>
                </div>}
              <div className="form-container">
                <label htmlFor="fullname">Ad</label>
                <input
                  onChange={(e) => setData({ ...data, fullname: e.target.value })}
                  id="fullname"
                  type="text"
                  placeholder="Adınızı daxil edin"
                />
              </div>
              <div className="form-container">
                <label htmlFor="phone">Telefon nömrəsi</label>
                <input
                  id="phone"
                  type="text"
                  placeholder="(+994) xx-xxx-xx-xx"
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: maskPhone(e.target.value) })}
                />
              </div>
              <div className="form-container">
                <label htmlFor="email">Email</label>
                <input
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  id="email"
                  type="email"
                  placeholder="email@mail.com"
                />
              </div>
              <div className="form-container">
                <button onClick={submitHandler}>Qeydiyyatdan keç</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default EventModal;