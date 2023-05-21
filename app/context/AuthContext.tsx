"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

interface IAuthContext {
  children: React.ReactNode;
}
export default function AuthContext({ children }: IAuthContext) {
  return <SessionProvider>{children}</SessionProvider>;
}
