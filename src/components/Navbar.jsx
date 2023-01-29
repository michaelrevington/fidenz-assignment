import Image from "next/image";
import CS from "../../styles/Component.module.css";
import { _SourceSans as SourceSans } from "../font";

export default function Navbar(props) {
  return (
    <nav
      className={[CS.center, CS.row].join(" ")}
      style={{
        padding: "15px 0",
        margin: "8px 0",
        height: "var(--navbar-height)",
      }}
    >
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
    </nav>
  );
}
