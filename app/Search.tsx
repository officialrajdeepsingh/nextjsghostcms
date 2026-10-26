"use client"

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Search as SearchIcon, X, Calendar, Clock, ArrowRight } from "lucide-react";
import Link from 'next/link';
import type { PostOrPage } from "@tryghost/content-api";
import { format } from 'date-fns';

function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [data, setData] = useState<PostOrPage[] | null>(null);

  const loadData = useCallback(() => {
    if (!data) {
      import('@/search.json').then((mod) => {
        setData(mod.default as PostOrPage[]);
      });
    }
  }, [data]);

  // Global keyboard shortcut: Command+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        loadData();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [loadData]);

  const searchResults = useMemo(() => {
    if (!query || !query.trim() || !data) {
      return [];
    }

    const q = query.trim().toLowerCase();
    return data
      .filter((item: PostOrPage) => item?.title?.trim().toLowerCase().includes(q))
      .slice(0, 8);
  }, [query, data]);

  return (
    <Popover.Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (nextOpen) loadData();
        setOpen(nextOpen);
      }}
    >
      <Popover.Trigger asChild>
        <button
          className="group flex h-9 items-center gap-2 rounded-lg border border-border/70 bg-muted/40 px-3 text-xs text-muted-foreground transition-all hover:border-border hover:bg-muted/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-44 md:w-56 cursor-pointer"
          aria-label="Search stories"
          onMouseEnter={loadData}
          onFocus={loadData}
        >
          <SearchIcon className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
          <span className="flex-1 text-left truncate">Search stories...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border/80 bg-background px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground shadow-xs">
            <span className="text-[11px]">⌘</span>K
          </kbd>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={8}
          className="z-50 w-[calc(100vw-2rem)] sm:w-[460px] rounded-xl border border-border bg-popover/95 p-0 text-popover-foreground shadow-xl backdrop-blur-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          {/* Header with Search Input */}
          <div className="flex items-center border-b border-border/60 px-3 py-2.5">
            <SearchIcon className="mr-2.5 size-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                loadData();
                setQuery(e.target.value);
              }}
              placeholder="Search articles by title, topic..."
              className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="rounded-sm p-1 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
                aria-label="Clear search"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Results List */}
          <div className="max-h-[380px] overflow-y-auto p-2">
            {!query.trim() ? (
              <div className="px-3 py-8 text-center text-xs text-muted-foreground">
                Type something to search across all published articles...
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-1">
                <div className="px-2 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Found {searchResults.length} {searchResults.length === 1 ? 'article' : 'articles'}
                </div>
                {searchResults.map((item) => (
                  <Link
                    key={item.uuid}
                    href={`/read/${item.slug}`}
                    onClick={() => {
                      setOpen(false);
                      setQuery('');
                    }}
                    className="group flex flex-col gap-1 rounded-lg p-2.5 text-sm transition-colors hover:bg-muted/80 focus:bg-muted/80 focus:outline-none"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {item.title}
                      </span>
                      <ArrowRight className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
                    </div>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {item.published_at && (
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="size-3" />
                          {format(new Date(item.published_at), 'MMM dd, yyyy')}
                        </span>
                      )}
                      {item.reading_time ? (
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-3" />
                          {item.reading_time} min read
                        </span>
                      ) : null}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="px-3 py-8 text-center text-xs text-muted-foreground">
                No articles matching &ldquo;<span className="text-foreground font-medium">{query}</span>&rdquo;
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="flex items-center justify-between border-t border-border/50 bg-muted/30 px-3 py-2 text-[11px] text-muted-foreground">
            <span>Press <kbd className="rounded border bg-background px-1 py-0.5 font-mono text-[10px]">ESC</kbd> to close</span>
            <span>Ghost Search</span>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default Search;
