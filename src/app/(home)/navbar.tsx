import { PenSquare } from "lucide-react";
import { SignInButton, SignUpButton, UserButton, Show } from "@clerk/nextjs";
import SearchBar from "./search-bar";

export const Navbar = () => {
  return (
    <div className="w-full h-full ">
      <div className="container w-full px-4 flex justify-between h-16 items-center gap-4">
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-105">
            <PenSquare size={20} className="stroke-[1.5]" />
          </div>
          <div className="flex flex-col">
            <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              Syncpad
            </div>
            <div className="text-xs text-neutral-500 -mt-1 tracking-wide">
              Collaborate
            </div>
          </div>
        </div>
        <SearchBar />
        <div className="flex items-center gap-3">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                Sign Up
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </div>
  );
};
