"use client";

import { OrganizationSwitcher, Show, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ReactNode } from "react";

type SyncpadNavbarProps = {
  children?: ReactNode;
};

export function SyncpadNavbar({ children }: SyncpadNavbarProps) {
  return (
    <header className="bg-[#fafaf7]">
      <nav
        className="mx-auto flex h-[76px] max-w-[1440px] items-center gap-5 px-6 sm:px-10 lg:px-14"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="group flex items-baseline rounded-md text-[#22221f] outline-none focus-visible:ring-2 focus-visible:ring-[#496fe8] focus-visible:ring-offset-4"
          aria-label="Syncpad home"
        >
          <span className="landing-wordmark">
            sync<span>pad</span>
          </span>
          <span className="ml-1.5 inline-block size-1.5 rounded-full bg-[#496fe8] transition-transform duration-200 group-hover:scale-125" />
        </Link>

        {children ? (
          <div className="hidden min-w-0 flex-1 justify-center sm:flex">
            {children}
          </div>
        ) : (
          <div className="flex-1" />
        )}

        <div className="ml-auto flex shrink-0 items-center gap-3 text-[14px]">
          <Show when="signed-out">
            <Link
              href="/sign-in"
              className="rounded-md px-2 py-2 font-medium text-[#63635d] transition-colors hover:text-[#252521] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#496fe8]"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="rounded-md bg-[#252521] px-3.5 py-2 font-medium text-white transition-colors hover:bg-[#3b3b36] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#496fe8] focus-visible:ring-offset-2"
            >
              Get started
            </Link>
          </Show>
          <Show when="signed-in">
            <OrganizationSwitcher />
            <UserButton />
          </Show>
        </div>
      </nav>
    </header>
  );
}
