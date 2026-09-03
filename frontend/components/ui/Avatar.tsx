import Image from "next/image";

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
  xl: "h-20 w-20 text-xl",
};

function getInitials(name?: string) {
  if (!name) return "K";

  const words = name.trim().split(/\s+/);

  return words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

export default function Avatar({
  src,
  alt = "",
  name,
  size = "md",
}: AvatarProps) {
  const sizeClass = sizes[size];

  if (src) {
    return (
      <div
        className={[
          "relative shrink-0 overflow-hidden rounded-full border border-gold/40 bg-parchment",
          sizeClass,
        ].join(" ")}
      >
        <Image
          src={src}
          alt={alt || name || "Avatar"}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      aria-label={name}
      className={[
        "flex shrink-0 items-center justify-center rounded-full border border-gold/40 bg-parchment font-serif font-semibold text-maroon",
        sizeClass,
      ].join(" ")}
    >
      {getInitials(name)}
    </div>
  );
}
