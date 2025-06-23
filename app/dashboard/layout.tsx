import DashboardNav from "@/components/DashbaordNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <DashboardNav />
      {children}
    </section>
  );
}
