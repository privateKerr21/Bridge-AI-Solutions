export const metadata = {
  title: { absolute: "Dashboard — Bridge AI Solutions" },
};

export default function DashboardPage() {
  return (
    <iframe
      src="/dashboard/app.html"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        border: "none",
      }}
      title="Bridge AI Dashboard"
    />
  );
}
