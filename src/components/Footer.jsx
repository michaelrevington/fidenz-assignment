import CS from "../../styles/Component.module.css";
import { _OpenSans as OpenSans } from "../font";

export default function Footer() {
  return (
    <footer
      className={[CS.center, OpenSans.className].join(" ")}
      style={{
        position: "absolute",
        width: "100%",
        bottom: "0",
        color: "var(--container-content)",
        height: "var(--footer-height)",
        backgroundColor: "var(--container)",
      }}
    >
      <span style={{ opacity: "0.502", letterSpacing: "2px" }}>
        2021 Fidenz Technologies
      </span>
    </footer>
  );
}
