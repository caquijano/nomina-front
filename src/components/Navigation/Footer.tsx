import "./navigation.css";
import React, { useContext } from "react";
import {FooterData} from './FooterData'
import ContextSidebar from "../../context/ContextSidebar";

function Footer() {
  const {position} = useContext<any>(ContextSidebar)
  return (
    <div
      className={position ? "bg-dark text-center text-white Footer" : "bg-dark text-center text-white Footer active" }
      style={{float: "right"}}
    >
      {/* Grid container */}
      <div className="container p-4">
        {/* Section: Social media */}
        <section className="mb-4">
          {FooterData.map((val, index)=>{
            return(
               <a
               key={index}
            className="btn btn-outline-light btn-floating m-1"
            href={val.link}
            role="button"
          >
            <div id="icon">{val.icon} </div>
          </a>
            )
          })

          }
         
        </section>
        {/* Section: Social media */}
      </div>
      {/* Grid container */}
      {/* Copyright */}
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      >
        © 2021 Copyright:
        <a className="text-white" href="https://mdbootstrap.com/">
          LLHerrera
        </a>
      </div>
      {/* Copyright */}
    </div>
  );
}

export default Footer;
