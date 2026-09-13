import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: null,
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
