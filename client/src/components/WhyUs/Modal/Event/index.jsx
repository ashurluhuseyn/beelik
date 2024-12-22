import React, { useState } from "react";
import "../modal.scss";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { createApply } from "../../../api/Apply/eventApply";
import successImg from '../../../assets/images/success.png'
import toast from "react-hot-toast";

const EventModal = ({ active, setIsActive, eventID }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    fullname: "",
    phone: "",
    email: "",
    categoryID: eventID
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.fullname || !data.phone || !data.email) {
      toast.error('Zəhmət olmasa bütün məlumatları doldurun!');
      return;
    }

    const phoneRegex = /^0(10|50|51|55|70|77|99)\d{7}$/
    if (!phoneRegex.test(data.phone)) {
      toast.error('Telefon nömrəsi düzgün formatda deyil!');
      return; 
    }

    try {
      await createApply(data);
      setIsSuccess(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('Siz artıq bu tədbir üçün müraciət etmisiniz');
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className={`cv-modal ${active ? "active" : ""}`}>
      <div className="modal-content">
        <div className="modal-header" style={isSuccess ? {justifyContent: "flex-end"} : {justifyContent: "space-between"}}>
          {isSuccess ? null : <h1>Qeydiyyat</h1>}
          <IoMdClose onClick={() => setIsActive(false)} />
        </div>
        <div className="modal-body">
          {isSuccess ? ( 
            <div className="success-container">
              <img src={successImg} alt="" />
              <h2>Müraciətiniz qeydə alındı</h2>
              <p>Qısa zaman ərzində sizə geri dönüş edəcəyik!</p>
            </div>
          ) : (
            <div className="form-container">
              <div className="input-container">
                <label htmlFor="name">Ad</label>
                <input
                  onChange={(e) => setData({ ...data, fullname: e.target.value })}
                  id="name"
                  type="text"
                  placeholder="Adınızı daxil edin"
                />
              </div>
              <div className="input-container">
                <label htmlFor="phone">Telefon nömrəsi</label>
                <input
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  id="phone"
                  type="tel"
                  placeholder="+994 xx xxx xx xx"
                />
              </div>
              <div className="input-container">
                <label htmlFor="email">Email</label>
                <input
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                />
              </div>
              <div className="input-container">
                <button onClick={handleSubmit}>Qeydiyyatdan keç</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventModal;
