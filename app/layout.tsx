import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
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
import { NextAuthProvider } from "./providers";

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
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
      <div className="navbar">
        <Suspense fallback="...">
          {/* @ts-expect-error Server Component */}
          <Nav />
        </Suspense>
        </div>
        <div className="containerr">
          <section className="col sidebar">
            <section className="sidebar-header">
              {/* <img
                className="logo"
                src="/icons/svg/logo.svg"
                width="22px"
                height="20px"
                alt=""
                role="presentation"
              /> */}
              <strong>My Cases</strong>
            </section>
            <section className="sidebar-menu" role="menubar">
              <EditButton>Create Case</EditButton>
            </section>
            <nav>
              <Suspense fallback={<CaseListSkeleton />}>
                <CaseListComponent />
              </Suspense>
            </nav>
          </section>
          <NextAuthProvider>
            <section className="content">{children}</section>
          </NextAuthProvider>
          </div>
      </body>
    </html>
  );
}

// export default async function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={cx(sfPro.variable, inter.variable)}>
//         <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
//         <Suspense fallback="...">
//           {/* @ts-expect-error Server Component */}
//           <Nav />
//         </Suspense>
//         <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
//           {children}
//         </main>
//         <Footer />
//         <Analytics />
//       </body>
//     </html>
//   );
// }
