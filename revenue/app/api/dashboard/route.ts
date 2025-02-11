import { NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { payments, users, serviceAccounts } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';
import { eq } from 'drizzle-orm/expressions';
import { auth } from '@clerk/nextjs/server';

//Dashboard API to fetch all payments for the admin user
export async function GET(response: NextResponse) {
  // Get the user ID from the auth function
  try {
    const allPayments = await db
      .select({
        id: payments.id,
        amount: payments.amount,
        payment_date: payments.payment_date,
        status: payments.status,
        reference: payments.reference,
        user_id: users.id,
        user_name: users.name,
      })
      .from(payments)
      .leftJoin(serviceAccounts, eq(payments.service_account_id, serviceAccounts.id))
      .leftJoin(users, eq(serviceAccounts.user_id, users.id))
      .orderBy(desc(payments.payment_date));

    return NextResponse.json({ success: true, data: allPayments });
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch payments' }, { status: 500 });
  }
}