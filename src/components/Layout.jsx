import Image from "next/image";
import Footer from "./Footer";
import Navbar from "./Navbar";

import CS from "../../styles/Component.module.css";

import BackgroundImage from "../images/Header bg.png";

export default function Layout({ children }) {
  return (
    <>
      <section
        className={CS.page}
        style={{
          position: "fixed",
          zIndex: "-1",
          backgroundColor: "var(--main-color)",
        }}
      >
        <Image
          src={BackgroundImage}
          alt={"Background image"}
          style={{ width: "100%", maxHeight: "400px", height: "fit-content" }}
        />
      </section>
      <section className={CS.page} style={{ position: "relative" }}>
        <Navbar />
        {children}
        <Footer />
      </section>
    </>
  );
}
