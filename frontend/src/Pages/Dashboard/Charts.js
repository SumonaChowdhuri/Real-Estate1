import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import axios from 'axios';



const Charts = () => {
  const [propertyData, setPropertyData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [financeData, setFinanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch property data
        const propertyResponse = await axios.get(`http://localhost:3005/Property/getAllProperty`);
        const properties = propertyResponse.data;
        const propertyStatusCount = properties.reduce((acc, property) => {
          acc[property.status] = (acc[property.status] || 0) + 1;
          return acc;
        }, {});
        const formattedPropertyData = Object.entries(propertyStatusCount).map(([name, value]) => ({
          name,
          value
        }));
        setPropertyData(formattedPropertyData);

        // Fetch booking data
        const bookingResponse = await axios.get(`http://localhost:3005/booking/getAllBooking`);
        const bookings = bookingResponse.data;
        const bookingStatusCount = bookings.reduce((acc, booking) => {
          acc[booking.Bookingstatus] = (acc[booking.Bookingstatus] || 0) + 1;
          return acc;
        }, {});
        const formattedBookingData = Object.entries(bookingStatusCount).map(([name, value]) => ({
          name,
          value
        }));
        setBookingData(formattedBookingData);

        // Fetch project data
        const projectResponse = await axios.get(`http://localhost:3005/project/getproject`);
        const projects = projectResponse.data;
        const projectStatusCount = projects.reduce((acc, project) => {
          acc[project.status] = (acc[project.status] || 0) + 1;
          return acc;
        }, {});
        const formattedProjectData = Object.entries(projectStatusCount).map(([name, value]) => ({
          name,
          value
        }));
        setProjectData(formattedProjectData);

        // Fetch finance data
        const financeResponse = await axios.get(`http://localhost:3005/finance/getAllFinance`);
        const finances = financeResponse.data;
        const formattedFinanceData = finances.map(finance => ({
          date: new Date(finance.TransactionDate).toLocaleDateString(),
          amount: finance.amount
        }));
        setFinanceData(formattedFinanceData);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch chart data');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading charts...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Property Status Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Property Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={propertyData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {propertyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value} properties`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Booking Status Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Booking Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={bookingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Number of Bookings', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value) => `${value} bookings`} />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" name="Bookings" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Project Status Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Project Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={projectData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {projectData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value} projects`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Finance Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Finance Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={financeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              label={{ value: 'TransactionDate', position: 'insideBottom', offset: -5 }} 
            />
            <YAxis 
              label={{ value: 'amount ($)', angle: -90, position: 'insideLeft' }} 
            />
            <Tooltip 
              formatter={(value) => [`$${value}`, 'amount']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="amount" 
              stroke="#8884d8" 
              activeDot={{ r: 8 }} 
              name="amount"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts; 