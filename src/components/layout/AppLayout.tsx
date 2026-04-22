import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";

export function AppLayout() {
  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto w-full max-w-screen-md px-4 pb-24 pt-4 md:max-w-screen-lg md:px-6 md:pb-8">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}