"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Appbar() {
  return (
    <div className="w-full border-b px-10 py-4 flex justify-between">
      <div className="text-2xl font-bold">LOGO.</div>
      <div className="flex flex-wrap justify-center gap-4">
        <button
          className="block w-full rounded bg-red-600 px-8 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          onClick={() => signOut({ callbackUrl: "/signin" })}
        >
          Logout
        </button>

        <Link
          href={"/signin"}
          className="block w-full border rounded px-8 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
