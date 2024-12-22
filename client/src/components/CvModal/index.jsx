import React, { useEffect, useState } from 'react'
import './cv-modal.scss'
import { IoMdClose } from "react-icons/io";
import { getFormattedDate } from '../../utils/date';
import { getApplicationsByVacancy } from '../../api/Apply/jobApply';

const CvModal = ({ active, setIsActive, id }) => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      if (id) {
        try {
          const data = await getApplicationsByVacancy(id);
          console.log(data);
          setApplications(data);
        } catch (error) {
          console.error('Application couldnt get', error);
        }
      }
    };

    fetchApplications();
  }, [id]);

  return (
    <div className={`cv-modal ${active ? 'active' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h1>Müraciətlər ({applications.length})</h1>
          <IoMdClose onClick={() => setIsActive(false)} />
        </div>
        <div className="modal-body">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray bg-white shadow-md">
              <thead className='divide-y divide-gray-200'>
                <tr>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border">
                    Ad, Soyad
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border">
                    Müraciət etdiyi vakansiya
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border">
                    Müraciət tarixi
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border">
                    CV
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {app.fullname} 
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {app.vacancy.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getFormattedDate(app.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <a href={`${process.env.REACT_APP_IMAGE_URL}cvs/${app.cv}`} target="_blank" rel="noopener noreferrer">CV'ni yüklə</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CvModal;
