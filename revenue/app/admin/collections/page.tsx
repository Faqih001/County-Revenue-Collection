"use client"
import React, { useEffect, useState } from 'react';

// DashboardPage Component that fetches and displays the payment data from the API endpoint /api/dashboard
const DashboardPage = () => {

  // State to store the dashboard data
  const [dashboardData, setDashboardData] = useState(null);

  // Fetch the dashboard data from the API endpoint /api/dashboard when the component mounts and store it in the state
  useEffect(() => {

    // Function to fetch the dashboard data from the API endpoint /api/dashboard
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchDashboardData();
  }, []);

  if (!dashboardData) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <div className="p-6 mx-auto max-w-7xl">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Payment Dashboard</h1>
      {dashboardData.success && dashboardData.data.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {/* <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">ID</th> */}
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Payment Date</th>
                {/* <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Status</th> */}
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Reference</th>
                {/* <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">User ID</th> */}
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">User Name</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dashboardData.data.map((payment, idx) => (
                <tr key={payment.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {/* <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{payment.id}</td> */}
                  <td className="px-6 py-4 text-sm text-right text-gray-900 whitespace-nowrap">
                    Ksh {Number(payment.amount).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {new Date(payment.payment_date).toLocaleDateString()}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full Ksh{
                      payment.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                      payment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      payment.status === 'FAILED' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td> */}
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{payment.reference}</td>
                  {/* <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{payment.user_id}</td> */}
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{payment.user_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No payments found.</p>
      )}
    </div>
  );
};

export default DashboardPage;