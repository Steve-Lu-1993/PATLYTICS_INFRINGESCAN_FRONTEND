import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { useGenericQuery } from "@/hooks/useGenericQuery";

export default function Layout({ children }: { children: React.ReactNode }) {
  const token = window.localStorage.getItem("t");

  const userComparison = useGenericQuery({
    endpoint: "/userComparison/user/list",
    token: token || "",
    enabled: !!token,
  });

  if (!token) {
    return <main className="w-full">{children}</main>;
  }

  if (userComparison.isLoading) {
    return <div>Loading...</div>;
  }

  if (userComparison.isError) {
    return <div>Error...</div>;
  }

  const userComparisonData = userComparison?.data.data

  return (
    <SidebarProvider>
      {userComparison.data && <AppSidebar userComparisonData={userComparisonData}/>}
      <main className="w-full">
        {children}
      </main>
    </SidebarProvider>
  );
}
