import logoPng from "../assets/CHAMPION.png";

export function Logo({ variant = "default" }) {
  const size = variant === "footer" ? 40 : 42;

  return (
    <img
      src={logoPng}
      alt="Champion Sport Activities logo"
      width={size}
      height={size}
      className="brand-mark"
      draggable="false"
    />
  );
}
