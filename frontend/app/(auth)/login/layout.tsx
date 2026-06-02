export const metadata = {
  title: "Runekeeper - Login",
  // description: "Join or Create a Room in Runekeeper",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="login-container">
      <div className="login-overlay" />
      <div className="login-content">
        {children}
      </div>
    </div>
  );
}