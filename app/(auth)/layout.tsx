import PublicRoute from "@/features/auth/components/PublicRoute";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <PublicRoute>{children}</PublicRoute>;
}
