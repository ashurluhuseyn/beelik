import React, { useEffect, useState } from 'react';
import { getApplyCounts, getCourseViews, getHourlyViews } from '../../../api/stat';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

import './admin-home.scss';
import { CiUser, CiLocationArrow1, CiBoxList, CiKeyboard } from 'react-icons/ci';

const AdminHome = () => {
  const [counts, setCounts] = useState({ academicApply: 0, corporateApply: 0, blogCount: 0, userCount: 0, vacancyCount: 0, courseCount: 0 });
  const [courseViews, setCourseViews] = useState([]);
  const [hourlyViews, setHourlyViews] = useState([]);

  useEffect(() => {
    async function fetchApplyCounts() {
      try {
        const data = await getApplyCounts();
        setCounts(data);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    }

    async function fetchCourseViews() {
      try {
        const data = await getCourseViews();
        setCourseViews(data);
      } catch (error) {
        console.error('Error fetching views:', error);
      }
    }

    async function fetchHourlyViews() {
      try {
        const data = await getHourlyViews();
        setHourlyViews(data);
      } catch (error) {
        console.error('Error fetching hourly views:', error);
      }
    }

    fetchApplyCounts();
    fetchCourseViews();
    fetchHourlyViews();
  }, []);

  const total = counts.academicApply + counts.corporateApply;
  const academicApplyPercentage = ((counts.academicApply / total) * 100).toFixed(2);
  const corporateApplyPercentage = ((counts.corporateApply / total) * 100).toFixed(2);

  const data = {
    labels: [`Akademik müraciət (${academicApplyPercentage}%)`, `Korporativ müraciət (${corporateApplyPercentage}%)`],
    datasets: [
      {
        label: 'Müraciət sayı',
        data: [counts.academicApply, counts.corporateApply],
        backgroundColor: ['rgb(63, 208, 189)', 'rgb(130, 107, 248)'],
      },
    ],
  };

  const courseLabels = courseViews.map(course => course.name);
  const courseData = courseViews.map(course => course.views);

  const courseChartData = {
    labels: courseLabels,
    datasets: [
      {
        label: 'Kurs Baxış Sayıları',
        data: courseData,
        backgroundColor: ['#6B81B3', '#e63757', '#2c7be5', '#f5803e', '#038d53', '#63B8F5', '#656566'],
      },
    ],
  };

  const hourlyLabels = hourlyViews.map(view => `${view.hour}:00`);
  const hourlyData = hourlyViews.map(view => view.count);

  const hourlyChartData = {
    labels: hourlyLabels,
    datasets: [
      {
        label: 'Saatlıq Girişlər',
        data: hourlyData,
        backgroundColor: '#6B81B3',
        borderColor: '#6B81B3',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='admin-home'>
      <div className="wrap">
        <div className="wrap__top">
          <ul>
            <li>
              <CiUser />
              <p><span>{counts.userCount}</span> İstifadəçi</p>
            </li>
            <li>
              <CiKeyboard />
              <p><span>{counts.courseCount}</span> Kurs</p>
            </li>
            <li>
              <CiBoxList />
              <p><span>{counts.blogCount}</span> Bloq</p>
            </li>
            <li>
              <CiLocationArrow1 />
              <p><span>{counts.vacancyCount}</span> Vakansiya</p>
            </li>
          </ul>
        </div>
        <div className='d-flex justify-content-between'>
          <div className="apply-chart">
            <Pie data={data} />
          </div>

          <div className="apply-chart">
            <Bar data={courseChartData} options={{ responsive: true }} />
          </div>

          
        </div>
        <div className="apply-chart">
            <Bar data={hourlyChartData} options={{
              responsive: true,
              scales: {
                x: { title: { display: true, text: 'Saatlar' } },
                y: { title: { display: true, text: 'Giriş sayı' }, beginAtZero: true },
              },
            }} />
          </div>
      </div>
    </div>
  );
};

export default AdminHome;