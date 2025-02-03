"use client";
import React, { useEffect, useState } from 'react';
import data from '@/app/pay/data.json';
import Link from 'next/link';
import Transactions from '@/app/admin/collections/page'; // Adjusted import statement

// Define the Page component that will be rendered by the server and the client
export default function Page() {

  // State to hold the total revenue and total transactions fetched from the server
  const [totalRevenue, setTotalRevenue] = useState<number | null>(null);

  // State to hold the total transactions fetched from the server
  const [totalTransactions, setTotalTransactions] = useState<number | null>(null);

  // Fetch the total revenue and total transactions from the server
  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await fetch('/api/revenue');
        const result = await response.json();
        if (result.success) {
          setTotalRevenue(result.data.total_amount);
          setTotalTransactions(result.data.total_transactions);
        } else {
          console.error("Failed to fetch revenue data:", result.message);
        }
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchRevenueData();
  }, []);

  // Calculate the total services by counting entries in `municipal_services`
  const totalServices = data.municipal_services.length;

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-lg font-semibold">Total Services</h3>
          <p className="text-5xl font-bold mt-4">{totalServices}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-5xl font-bold mt-4">
            {totalRevenue !== null ? `Ksh ${totalRevenue.toLocaleString()}` : 'Loading...'}
          </p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-lg font-semibold">Total Transactions</h3>
          <p className="text-5xl font-bold mt-4">
            {totalTransactions !== null ? totalTransactions : 'Loading...'}
          </p>
        </div>
      </div>

      {/* Transactions Component */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Transactions</h2>
        <Transactions /> {/* Render the Transactions component */}
      </div>

      {/* Button Section */}
      <div className="mt-5 mb-10 flex justify-center gap-4">
        <Link href='/admin/collections'>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition duration-300">
            View Collections
          </button>
        </Link>
        <Link href='/admin/categories'>
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg shadow transition duration-300">
            View Categories
          </button>
        </Link>
      </div>
    </div>
  );  
}
