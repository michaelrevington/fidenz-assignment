import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import CS from "../../styles/Component.module.css";
import Styles from "../../styles/Navbar.module.css";
import { _SourceSans as SourceSans } from "../font";

export default function Navbar(props) {
  const { data, status } = useSession()

  return (
    <nav
      className={[CS.center, CS.row, CS.spaceAround].join(" ")}
      style={{
        padding: "15px 0",
        margin: "8px 0",
        height: "var(--navbar-height)",
      }}
    >
      <Link href={"/"} className={[CS.center].join(" ")}>
        <Image
          src={"/icon.svg"}
          width={35}
          height={35}
          alt="Application logo"
          style={{ margin: "0 8px" }}
        />
        <text
          className={SourceSans.className}
          style={{
            fontWeight: "600",
            fontSize: "23px",
            color: "var(--secondary-color)",
          }}
        >
          Weather App
        </text>
      </Link>
      {status == "authenticated" && <div className={CS.center} style={{overflow: "visible"}}>
        <h1 className={Styles.name}>{data.user.name}</h1>
        <button className={CS.btn} onClick={() => { signOut() }} style={{ backgroundColor: "var(--highlight)", color: "white" }}>Logout</button>
      </div>}
    </nav>
  );
}
