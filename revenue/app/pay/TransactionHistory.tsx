
// components/TransactionHistory.tsx
'use client'

import { Table, Text } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'

// Transaction History for the user to view their recent transactions on the platform
export function TransactionHistory() {

  // Fetch transactions from the API using react-query
  const { data: transactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => fetch('/api/transactions').then(res => res.json())
  })

  return (
    <Stack>
      <Text size="lg" weight={500}>Recent Transactions</Text>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Date</Table.Th>
            <Table.Th>Service</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {transactions?.map(tx => (
            <Table.Tr key={tx.id}>
              <Table.Td>{new Date(tx.date).toLocaleDateString()}</Table.Td>
              <Table.Td>{tx.service}</Table.Td>
              <Table.Td>KSH {tx.amount}</Table.Td>
              <Table.Td>{tx.status}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Stack>
  )
}