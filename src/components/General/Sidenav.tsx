import { cn } from "@/lib/utils";
import {
  ChevronRight,
  CreditCard,
  DollarSign,
  Home,
  Menu,
  PieChart,
  Search,
  Settings,
  Wallet,
  X,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Input } from "../ui/input";

function Sidenav() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const routes = useMemo(
    () => [
      {
        label: "Overview",
        icon: Home,
        href: "/",
        active: location.pathname === "/",
      },
      {
        label: "DeFi Usage",
        icon: PieChart,
        href: "/defi-usage",
        active: location.pathname === "/defi-usage",
      },
      {
        label: "Profitability",
        icon: DollarSign,
        href: "/profitability",
        active: location.pathname === "/profitability",
      },
      {
        label: "Transaction Decoder",
        icon: CreditCard,
        href: "/transaction-decoder",
        active: location.pathname === "/transaction-decoder",
      },
    ],
    [location.pathname]
  );

  return (
    <>
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-[80] bg-card">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto border-r">
          <div className="flex items-center justify-between px-4">
            <Link to="/" className="flex items-center">
              <span className="ml-2 text-xl font-bold">SolBlaze bSOL</span>
            </Link>
          </div>
          <div className="mt-6 flex flex-col px-3 gap-0.5">
            {routes.map((route) => (
              <Link
                key={route.href}
                to={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                  route.active
                    ? "bg-accent text-primary font-medium"
                    : "text-muted-foreground"
                )}
              >
                <route.icon className="h-4 w-4" />
                {route.label}
                {route.active && <ChevronRight className="ml-auto h-4 w-4" />}
              </Link>
            ))}
          </div>
        </div>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Mobile sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-40"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <Link
                to="/"
                className="flex items-center"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Wallet className="h-6 w-6 text-primary" />
                <span className="ml-2 text-lg font-bold">SolBlaze bSOL</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <div className="px-4 py-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full bg-background pl-8"
                  />
                </div>
              </div>
              <div className="mt-4 flex flex-col px-3 gap-0.5">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    to={route.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                      route.active
                        ? "bg-accent text-primary font-medium"
                        : "text-muted-foreground"
                    )}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <route.icon className="h-4 w-4" />
                    {route.label}
                    {route.active && (
                      <ChevronRight className="ml-auto h-4 w-4" />
                    )}
                  </Link>
                ))}
              </div>
            </div>
            <div className="p-4 border-t">
              <Button variant="outline" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default React.memo(Sidenav);
