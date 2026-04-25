"use client"
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
const INTERVIEWER_ONLY=["/dashboard"];
const INTERVIEWEE_ONLY=["/appointments"];

const RoleRedirect = ({role}) => {
    const pathname=usePathname();
    const router=useRouter();

    useEffect(() => {
    if (role === "UNASSIGNED" && pathname !== "/onboarding") {
        router.replace("/onboarding");

    } else if (role === "INTERVIEWER" && pathname.startsWith("/onboarding")) {
        router.replace("/dashboard");

    } else if (role === "INTERVIEWEE" && pathname.startsWith("/onboarding")) {
        router.replace("/explore");

    } else if (role === "INTERVIEWER" && INTERVIEWEE_ONLY.some((p) => pathname.startsWith(p))) {
        router.replace("/dashboard");

    } else if (role === "INTERVIEWEE" && INTERVIEWER_ONLY.some((p) => pathname.startsWith(p))) {
        router.replace("/appointments");
    }

}, [role, pathname, router]);



  return null;
}

export default RoleRedirect;
