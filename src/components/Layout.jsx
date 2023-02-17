import Image from "next/image";
import Footer from "./Footer";
import Navbar from "./Navbar";

import CS from "../../styles/Component.module.css";

import BackgroundImage from "../images/Header bg.png";
import { signIn, useSession } from "next-auth/react";

export default function Layout({ children }) {
  const { data, status } = useSession();

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
        {status === "authenticated" ? children : (status === "loading" ? <>
          <p className={CS.row} style={{ textAlign: "center", padding: "5px", color: "white" }}>Logging in...</p>
        </> : <>
          <div className={[CS.center, CS.flexColumn].join(" ")} style={{ overflow: "visible" }}>
            <p style={{ margin: "8px 0", color: "white" }}>Sorry, You need to be logged in to see this page.</p>
            <button
              className={CS.btn}
              style={{ backgroundColor: "var(--highlight)", color: "white" }}
              onClick={() => {
                signIn()
              }}
            >
              Login or Sign up
            </button>
          </div>
        </>)}
        <Footer />
      </section>
    </>
  );
}
