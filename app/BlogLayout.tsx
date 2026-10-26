"use client"
import React from "react";
import Footer from "@/Footer";
import Header from "@/Header";
import { ThemeProvider } from 'next-themes';
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Settings } from "@tryghost/content-api";

function Layout({ setting, children }: { setting?: Settings, children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <TooltipProvider delayDuration={200}>
        <div className="flex min-h-screen flex-col">
          {setting ? <Header setting={setting} /> : null}
          <div className="flex-1">
            {children}
          </div>
          {setting ? <Footer setting={setting} /> : null}
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default Layout;
