import "./globals.css";
import Nav from "@/components/layout/nav";
import { Suspense } from "react";

export const metadata = {
  title: "DocGenie",
  description:
    "",
  themeColor: "#FFF",
};

/* eslint-disable @next/next/no-img-element */
import CaseList from "@/components/case/CaseList";
import CaseListSkeleton from "@/components/case/CaseListSkeleton";
import EditButton from "@/components/case/EditButton";
import "./globals.css";

const CaseListComponent = CaseList as unknown as () => JSX.Element;

export default async function RootLayout({
  children }: { 
    children: React.ReactNode;
  }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>DocGenie</title>
        <link rel="icon" href="/docg.ico?v=2" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
