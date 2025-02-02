import { NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { payments } from '@/lib/db/schema';
import { sum, count } from 'drizzle-orm';

export const GET = async (request: Request) => {
  try {
    const totalRevenue = await db
      .select({
        total_amount: sum(payments.amount),
        total_transactions: count(payments.id),
      })
      .from(payments);

    return NextResponse.json({ success: true, data: totalRevenue[0] });
  } catch (error) {
    console.error('Error fetching revenue data:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch revenue data' }, { status: 500 });
  }
};