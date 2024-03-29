import Appbar from "@/components/Appbar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Appbar />
      {children}
    </div>
  );
}
