import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { apiRequestHandler } from '../../apiConfig/service';
const getDashBoardData=async(endPoint,token)=>{
const res=await apiRequestHandler({endPoint,headers:{Authorization: `Bearer ${token}`}});
return res?.data
}
const Dashboard = () => {

const [dashboardData,setDashboardData]=useState({})
  useEffect(()=>{
  getDashBoardData("getDashboardDataApi",localStorage.getItem("token")).then(res=>{setDashboardData(res||[])})
  
  },[])
  console.log("dashBoard data---> ",dashboardData)
  const styles = {
    container: {
      padding: '2rem',
      backgroundColor: '#f5f7fa',
      minHeight: '100vh',
      fontFamily: 'Segoe UI, sans-serif',
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '2rem',
      color: '#1a2e44',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '1.5rem',
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '1.5rem',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
    },
    cardHover: {
      transform: 'translateY(-6px)',
      boxShadow: '0 10px 24px rgba(0, 0, 0, 0.12)',
    },
    icon: {
      fontSize: '30px',
      marginBottom: '12px',
    },
    label: {
      fontSize: '18px',
      color: '#6b7280',
    },
    value: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#111827',
    },
    chartWrapper: {
      marginTop: '3rem',
      backgroundColor: '#fff',
      padding: '2rem',
      borderRadius: '16px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
    },
  };

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const cards = [
    { label: 'Total Blogs', value: dashboardData?.blogCount||"0", icon: '📝' },
    { label: 'Total Comments', value: dashboardData?.totalComments||"0", icon: '💬' },
    { label: 'Total Categories', value: dashboardData?.categoryCount||"0", icon: '📂' },
    { label: 'Total Services', value: dashboardData?.servicePageCount||"0", icon: '🛠️' },
    { label: 'Contact Forms', value: dashboardData?.contactCount||"0", icon: '📩' },
  ];

  const chartOptions = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: { show: false },
    },
    xaxis: {
      categories: [
        'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
      ],
      labels: {
        style: { fontSize: '13px' }
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    colors: ['#00bfa5'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    },
    tooltip: {
      theme: 'light',
    }
  };

  const chartSeries = [{
    name: "Submissions",
    data: [4, 7, 3, 5, 6, 2, 9]
  }];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Dashboard</h2>

      <div style={styles.grid}>
        {cards?.map((card, index) => (
          <div
            key={index}
            style={{
              ...styles.card,
              ...(hoveredIndex === index ? styles.cardHover : {}),
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div style={styles.icon}>{card.icon}</div>
              <div style={styles.label}>{card.label}</div>
            </div>
            <div style={styles.value}>{card.value}</div>
          </div>
        ))}
      </div>

      <div style={styles.chartWrapper}>
        <h3 style={{ marginBottom: '1rem', color: '#1a2e44' }}>Contact Form Submissions (Last 7 Days)</h3>
        <Chart options={chartOptions} series={chartSeries} type="area" height={300} />
      </div>
    </div>
  );
};

export default Dashboard;
