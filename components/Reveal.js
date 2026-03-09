
'use client';
import { useEffect } from "react";

export default function Reveal({children}){

  useEffect(()=>{
    const els=document.querySelectorAll(".reveal");

    const obs=new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add("active");
        }
      });
    },{threshold:.2});

    els.forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  },[]);

  return children;
}
