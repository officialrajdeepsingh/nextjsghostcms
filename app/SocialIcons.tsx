"use client"

import { useSyncExternalStore } from "react";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { Sun, Moon } from "lucide-react";
import { useTheme } from 'next-themes';
import Link from "next/link";
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Settings } from "@tryghost/content-api";

const Search = dynamic(() => import('@/Search'))

const emptySubscribe = () => () => { }

function SocialIcons({ setting }: { setting?: Settings }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <Search />

      {setting?.twitter ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon-sm" asChild className="text-muted-foreground hover:text-foreground">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={`https://twitter.com/${setting.twitter}`}
                aria-label="Twitter"
              >
                <FaTwitter className="size-3.5" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Twitter</TooltipContent>
        </Tooltip>
      ) : null}

      {setting?.facebook ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon-sm" asChild className="text-muted-foreground hover:text-foreground">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.facebook.com/${setting.facebook}`}
                aria-label="Facebook"
              >
                <FaFacebook className="size-3.5" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Facebook</TooltipContent>
        </Tooltip>
      ) : null}

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="text-muted-foreground hover:text-foreground"
          >
            {mounted ? (
              resolvedTheme === "dark" ? (
                <Sun className="size-4 transition-transform duration-200" />
              ) : (
                <Moon className="size-4 transition-transform duration-200" />
              )
            ) : (
              <Moon className="size-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Toggle theme</TooltipContent>
      </Tooltip>
    </div>
  );
}

export default SocialIcons;
