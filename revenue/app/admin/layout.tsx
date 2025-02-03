// layout.tsx
"use client"
import { useUser, RedirectToSignIn } from '@clerk/nextjs';
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import Link from 'next/link';

// Define the Layout component that will be rendered by the server and the client 
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get the user object from the useUser hook
  const { isLoaded, isSignedIn, user } = useUser();

  // If the user object is not loaded, display a loading message
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // If the user is not signed in, redirect to the sign-in page
  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  // Get the email address of the user
  const email = user.emailAddresses[0].emailAddress;

  // If the user is not an admin, display an access denied message
  if (email !== 'admin@revenue.ke') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-700">Admins have access only.</p>

          
        </div>
        {/* utto to go to pay */}
        <Link href="/" className="mt-10 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors">
            
              Go to Home
            </Link>
          
      </div>
    );
  }

  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}