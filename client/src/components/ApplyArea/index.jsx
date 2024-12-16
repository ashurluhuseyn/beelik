import React, { useState } from 'react'
import './apply.scss'
import arrowRight from '../../assets/images/arrow-right.svg'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { createApply } from '../../api/corporateApply';
import { maskPhone } from '../../utils/mask';

const ApplyArea = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        firstname: '', 
        lastname: '', 
        email: '',
        phone: '', 
        description: ''
      });
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!data.firstname || !data.lastname || !data.email || !data.phone || !data.description) {
          toast.error('Zəhmət olmasa, bütün sahələri doldurun.');
          return;
        }
    
        try {
          await createApply(data);
          toast.success('Müraciətiniz uğurla göndərildi!');
          navigate('/corporate')
        } catch (error) {
          console.error('Error submitting form:', error);
          toast.error('Müraciət göndərilərkən xəta baş verdi.');
        }
      };
  return (
    <div className='apply-area'>
        <div className="apply-area__title">
            <h1>Tərəfdaş müraciəti</h1>
            <p>Please provide your company details or contact us via phone or video call.</p>
        </div>
        <div className="apply-area__form">
            <form onSubmit={handleSubmit}>
                <h1>Müraciət et</h1>
                <div className="input-container-area">
                    <div className="input-container">
                        <input onChange={(e) => setData({...data, firstname: e.target.value})} type="text" placeholder='Ad'/>
                        <input onChange={(e) => setData({...data, lastname: e.target.value})} type="text" placeholder='Soyad'/>
                        <input onChange={(e) => setData({...data, email: e.target.value})} type="email" placeholder='E-mail'/>
                    </div>
                    <div className="input-container">
                        <input 
                        onChange={(e) => {
                            const maskedPhone = maskPhone(e.target.value);
                            setData({ ...data, phone: maskedPhone }); 
                          }}
                        value={data.phone} type="tel" placeholder='Telefon nömrəsi'/>
                        <input onChange={(e) => setData({...data, description: e.target.value})} type="text" placeholder='Qeyd' className='textarea'/>
                    </div>
                </div>
                <div className="input-submit-container">
                        <button type='submit'>Göndər <img src={arrowRight} alt="" /></button>
                    </div>
            </form>
        </div>
    </div>
  )
}

export default ApplyArea