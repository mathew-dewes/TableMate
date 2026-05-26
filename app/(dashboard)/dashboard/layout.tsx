import DashboardLinks from "./_components/DashboardLinks";

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section>
          <DashboardLinks/>
            {children}
        </section>)
}