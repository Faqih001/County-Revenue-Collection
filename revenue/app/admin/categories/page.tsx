"use client";

import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import data from "@/app/pay/data.json";

// Types and Interfaces for Services Management Page (Admin)
type BillingRules = {
  [key: string]: any;
};

// Service Interface for Services Management Page (Admin)
type Service = {
  service_name: string;
  service_code: string;
  description: string;
  service_type: string;
  billing_rules: BillingRules;
  unit: string;
  billing_period: string;
  uniqueIdentifier: string;
};

// Services Management Page (Admin)
const ServicesManagement = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit" | "delete">("add");
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // New Service State for Services Management Page (Admin)
  const [newService, setNewService] = useState<Service>({
    service_name: "",
    service_code: "",
    description: "",
    service_type: "",
    billing_rules: {},
    unit: "",
    billing_period: "",
    uniqueIdentifier: "",
  });

  // Fetch Services Data from JSON File
  useEffect(() => {
    const fetchServices = async () => {
      setServices(data.municipal_services);
    };
    fetchServices();
  }, []);

  // Open Modal Function for Services Management Page (Admin)
  const openModal = (
    type: "add" | "edit" | "delete",
    service: Service | null = null
  ) => {
    setModalType(type);
    setSelectedService(service);
    setNewService(
      service || {
        service_name: "",
        service_code: "",
        description: "",
        service_type: "",
        billing_rules: {},
        unit: "",
        billing_period: "",
        uniqueIdentifier: "",
      }
    );
    setIsModalOpen(true);
  };

  // Close Modal Function for Services Management Page (Admin)
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    setNewService({
      service_name: "",
      service_code: "",
      description: "",
      service_type: "",
      billing_rules: {},
      unit: "",
      billing_period: "",
      uniqueIdentifier: "",
    });
  };

  // Handle Add Service Function for Services Management Page (Admin)
  const handleAdd = () => {
    setServices([...services, newService]);
    closeModal();
  };

  // Handle Edit Service Function for Services Management Page (Admin)
  const handleEdit = () => {
    if (selectedService) {
      setServices(
        services.map((service) =>
          service.service_code === selectedService.service_code
            ? newService
            : service
        )
      );
      closeModal();
    }
  };

  // Handle Delete Service Function for Services Management Page (Admin)
  const handleDelete = () => {
    if (selectedService) {
      setServices(
        services.filter(
          (service) => service.service_code !== selectedService.service_code
        )
      );
      closeModal();
    }
  };

  const inputClassName =
    "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
  const labelClassName = "block text-sm font-medium text-gray-700 mb-1";
  const groupClassName = "mb-4";

  const renderFormFields = () => (
    <>
      <div className={groupClassName}>
        <label className={labelClassName}>Service Name</label>
        <input
          type="text"
          value={newService.service_name}
          onChange={(e) =>
            setNewService({ ...newService, service_name: e.target.value })
          }
          className={inputClassName}
          required
        />
      </div>
      <div className={groupClassName}>
        <label className={labelClassName}>Service Code</label>
        <input
          type="text"
          value={newService.service_code}
          onChange={(e) =>
            setNewService({ ...newService, service_code: e.target.value })
          }
          className={inputClassName}
          disabled={modalType === "edit"}
          required
        />
      </div>
      <div className={groupClassName}>
        <label className={labelClassName}>Service Type</label>
        <input
          type="text"
          value={newService.service_type}
          onChange={(e) =>
            setNewService({ ...newService, service_type: e.target.value })
          }
          className={inputClassName}
          required
        />
      </div>
      <div className={groupClassName}>
        <label className={labelClassName}>Description</label>
        <textarea
          value={newService.description}
          onChange={(e) =>
            setNewService({ ...newService, description: e.target.value })
          }
          className={inputClassName}
          required
        />
      </div>
      <div className={groupClassName}>
        <label className={labelClassName}>Unit</label>
        <input
          type="text"
          value={newService.unit}
          onChange={(e) =>
            setNewService({ ...newService, unit: e.target.value })
          }
          className={inputClassName}
          required
        />
      </div>
      <div className={groupClassName}>
        <label className={labelClassName}>Billing Period</label>
        <input
          type="text"
          value={newService.billing_period}
          onChange={(e) =>
            setNewService({ ...newService, billing_period: e.target.value })
          }
          className={inputClassName}
        />
      </div>
      <div className={groupClassName}>
        <label className={labelClassName}>Unique Identifier</label>
        <input
          type="text"
          value={newService.uniqueIdentifier}
          onChange={(e) =>
            setNewService({ ...newService, uniqueIdentifier: e.target.value })
          }
          className={inputClassName}
          required
        />
      </div>
      <div className={groupClassName}>
        <label className={labelClassName}>Billing Rules (JSON Format)</label>
        <textarea
          value={JSON.stringify(newService.billing_rules, null, 2)}
          onChange={(e) =>
            setNewService({
              ...newService,
              billing_rules: JSON.parse(e.target.value || "{}"),
            })
          }
          className={inputClassName}
          placeholder='{"key": "value"}'
          required
        />
      </div>
    </>
  );

  return (
    <div className="p-6 mx-auto max-w-7xl">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Services Management</h1>
        <button
          onClick={() => openModal("add")}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Add New Service
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Service Name
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Code
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Type
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Description
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Unit
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Billing Period
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Unique Identifier
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service.service_code}>
                <td className="px-6 py-4">{service.service_name}</td>
                <td className="px-6 py-4">{service.service_code}</td>
                <td className="px-6 py-4">{service.service_type}</td>
                <td className="px-6 py-4">{service.description}</td>
                <td className="px-6 py-4">{service.unit}</td>
                <td className="px-6 py-4">{service.billing_period || "N/A"}</td>
                <td className="px-6 py-4">{service.uniqueIdentifier}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => openModal("edit", service)}
                    className="mr-2 text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openModal("delete", service)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isModalOpen} onClose={closeModal}>
        <div className="fixed inset-0 bg-black bg-opacity-30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            {modalType === "add" || modalType === "edit" ? (
              <>
                <h2 className="mb-4 text-xl font-bold">
                  {modalType === "add" ? "Add New Service" : "Edit Service"}
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    modalType === "add" ? handleAdd() : handleEdit();
                  }}
                >
                  {renderFormFields()}
                  <div className="flex justify-end mt-4 space-x-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      {modalType === "add" ? "Add Service" : "Update Service"}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h2 className="mb-4 text-xl font-bold">Confirm Delete</h2>
                <p>
                  Are you sure you want to delete "
                  {selectedService?.service_name}"?
                </p>
                <div className="flex justify-end mt-4 space-x-4">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ServicesManagement;
