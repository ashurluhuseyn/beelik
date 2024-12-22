import React, { useEffect, useState } from 'react';
import { createApply } from '../../../../../api/Apply/academicApply';
import { getCourses } from '../../../../../api/course';
import AlertMessage from '../../../../Alert';
import close from '../../../../../assets/images/close.svg';
import successImg from '../../../../../assets/images/success.png';
import toast from 'react-hot-toast';
import { maskPhone } from '../../../../../utils/mask';
import '../../modal.scss'

const AcademicModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    email: '',
    courseID: '',
  });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCourses();
        setData(response);
      } catch (error) {
        console.log(error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullname || !formData.phone || !formData.email) {
      toast.error("Bütün sahələri doldurun!");
      return;
    }

    try {
      await createApply(formData);
      setIsSuccess(true)
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('Siz artıq bu tədbir üçün müraciət etmisiniz');
      } else {
        console.error(error.message);
      }
    }
  };

  if (loading) {
    return <p>Yüklənir...</p>;
  }

  if (!data) {
    return <AlertMessage text="Göstəriləcək məlumat yoxdur" />;
  }

  const handlePhoneFocus = () => {
    if (!formData.phone) {
      setFormData((prevData) => ({
        ...prevData,
        phone: '(+994) ',
      }));
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace('(+994)', '').trim();
    setFormData((prevData) => ({
      ...prevData,
      phone: maskPhone(value),
    }));
  };

  const nextStep = () => {
    if (!formData.courseID) return;
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => setStep((prevStep) => prevStep - 1);

  return (
    <div className="academic-modal">
      <div className="academic-modal__content">
        <button className="close-button" onClick={onClose}>
          <img src={close} alt="Bağla" />
        </button>
        {
          isSuccess ? <div className="success-container">
          <img src={successImg} alt="" />
          <h2>Müraciətiniz qeydə alındı</h2>
          <p>Qısa zaman ərzində sizə geri dönüş edəcəyik!</p>
        </div> : <>
        {step === 1 && (
          <div>
            <h2>Tədris proqramına qoşulun</h2>
            <span>(2 addımdan 1-cisi)</span>
            <form>
              {data.map((item) => (
                <label
                  key={item.id}
                  className={`custom-radio ${formData.courseID === String(item.id) ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="courseID"
                    value={String(item.id)}
                    checked={formData.courseID === String(item.id)}
                    onChange={(e) =>
                      setFormData({ ...formData, courseID: e.target.value })
                    }
                  />
                  <div className="radio-content">
                    <span className="radio-title">{item.title}</span>
                  </div>
                </label>
              ))}
              <button
                style={{ marginTop: '24px' }}
                type="button"
                onClick={nextStep}
                disabled={!formData.courseID}
              >
                Müraciət et
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2>Tədris proqramına qoşulun</h2>
            <span>(2 addımdan 2-cisi)</span>
            <form className="modal-input" onSubmit={handleSubmit}>
              <div className="modal-input-container">
                <label htmlFor="fullname">Ad</label>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  placeholder="Adınızı daxil edin"
                  value={formData.fullname}
                  onChange={(e) =>
                    setFormData({ ...formData, fullname: e.target.value })
                  }
                />
              </div>
              <div className="modal-input-container">
                <label htmlFor="phone">Telefon nömrəsi</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="(+994) 50-265-64-63"
                  value={formData.phone}
                  onFocus={handlePhoneFocus}
                  onChange={handlePhoneChange}
                />
              </div>
              <div className="modal-input-container">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email@mail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <button type="submit">Göndər</button>
              <button
                style={{ backgroundColor: '#fff' }}
                type="button"
                onClick={prevStep}
              >
                Geri
              </button>
            </form>
          </div>
        )}
        </>
        }
        
      </div>
    </div>
  );
};

export default AcademicModal;
