export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
}

const sizes = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-9 w-9 border-[3px]",
};

export default function Spinner({
  size = "md",
  label = "Loading",
}: SpinnerProps) {
  return (
    <span
      className="inline-flex items-center gap-2"
      role="status"
      aria-label={label}
    >
      <span
        aria-hidden="true"
        className={[
          "animate-spin rounded-full border-gold border-t-maroon",
          sizes[size],
        ].join(" ")}
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
