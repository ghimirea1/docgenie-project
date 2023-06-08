import { Suspense } from "react";
import CaseList from "@/components/case/CaseList";
import CaseListSkeleton from "@/components/case/CaseListSkeleton";
import EditButton from "@/components/case/EditButton";

const CaseListComponent = CaseList as unknown as () => JSX.Element;

export default async function Home() {
    return (
        <>
            <div className="containerr">
                <section className="col sidebar">
                    <section className="sidebar-header">
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
                <section className="content"></section>
            </div>
        </>
    );
}