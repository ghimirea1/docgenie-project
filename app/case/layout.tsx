import React from "react";
import CaseList from "@/components/case/CaseList";
import CaseListSkeleton from "@/components/case/CaseListSkeleton";
import EditButton from "@/components/case/EditButton";
import "./styles.css";

import { Suspense } from "react";
import Nav from "@/components/layout/nav";

const CaseListComponent = CaseList as unknown as () => JSX.Element;
export default function Caselayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
        <section className="content">{children}</section>
      </div>
    </body>
  );
}
