import { Navbar } from "@/components/admin-panel/navbar";

// Define the ContentLayoutProps type that represents the props of the ContentLayout component
interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

// Define the ContentLayout component that will be rendered by the server and the client
export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} />
      <div className="container pt-8 pb-8 px-4 sm:px-8">{children}</div>
    </div>
  );
}
