import ComponentStyles from "../../styles/Component.module.css";

export default function RouteProgress(props) {
  return (
    <span
      style={{
        position: "absolute",
        height: "3px",
        backgroundColor: "lightcyan",
        boxShadow: "0 0 6px var(--dark)",
        zIndex: "50000",
        top: "0",
        ...props.style,
      }}
    ></span>
  );
}
