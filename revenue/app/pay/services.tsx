// pages/revenue/index.tsx
import { useState } from 'react';
import { 
  Card, 
  Grid, 
  Select, 
  Button, 
  Text,
  Stack,
  Group,
  NumberInput 
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

//Revenue Page Components for different services that will be rendered based on the selected service
export default function RevenuePage() {

  // State to store the selected service code and service details
  const [selectedService, setSelectedService] = useState('');
  const [serviceDetails, setServiceDetails] = useState(null);

  // Fetch municipal services from the API using react-query
  const { data: services, isLoading } = useQuery({
    queryKey: ['municipal-services'],
    queryFn: () => fetch('/api/services').then(res => res.json())
  });

  // Function to render the form based on the selected service
  const renderServiceForm = () => {

    // If no service is selected, return null to render nothing
    if (!serviceDetails) return null;

    // Render the form based on the service type
    switch(serviceDetails.service_type) {
      case 'metered':
        return <MeteredServiceForm service={serviceDetails} />;
      case 'time_based':
        return <ParkingServiceForm service={serviceDetails} />;
      case 'annual_permit':
        return <PermitServiceForm service={serviceDetails} />;
      case 'property_based':
        return <PropertyRatesForm service={serviceDetails} />;
      default:
        return <BasicServiceForm service={serviceDetails} />;
    }
  };

  return (
    <Stack spacing="xl" p="md">
      <Text size="xl" weight={700}>Municipal Revenue Services</Text>
      
      <Select
        label="Select Service"
        placeholder="Choose a service"
        data={services?.map(s => ({ 
          value: s.service_code, 
          label: s.service_name 
        })) || []}
        onChange={(val) => {
          setSelectedService(val);
          setServiceDetails(services?.find(s => s.service_code === val));
        }}
      />

      {renderServiceForm()}
    </Stack>
  );
}