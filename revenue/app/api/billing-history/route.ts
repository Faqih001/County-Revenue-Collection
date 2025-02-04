import { NextResponse } from "next/server";

// app/api/billing-history/route.ts
export async function GET(request: Request) {
    // Import the auth and db functions
    const { userId } = auth();

    // If the user is not signed in, return a 401 Unauthorized
    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get the service query parameter from the URL
    const { searchParams } = new URL(request.url);

    // Get the service query parameter from the URL and decode it
    const service = searchParams.get('service');

    const history = await db.select()
        .from(transactions)
        .where(eq(transactions.user_id, userId))
        .where(service ? 
            like(transactions.additional_details->>'service_name', service) : 
            undefined)
        .orderBy(desc(transactions.transaction_date));

    return NextResponse.json(history);
}