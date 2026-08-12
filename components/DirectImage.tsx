import type { CSSProperties } from "react";

type DirectImageProps = {
  alt: string;
  className?: string;
  fill?: boolean;
  height?: number;
  priority?: boolean;
  sizes?: string;
  src: string;
  width?: number;
};

const fillStyle: CSSProperties = {
  height: "100%",
  inset: 0,
  objectFit: "cover",
  position: "absolute",
  width: "100%",
};

export default function DirectImage({
  alt,
  className,
  fill = false,
  height,
  priority = false,
  sizes,
  src,
  width,
}: DirectImageProps) {
  return (
    // The Worker serves these originals directly; its image optimizer endpoint
    // is not available and otherwise returns HTTP 500 for every image.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      className={className}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      height={fill ? undefined : height}
      loading={priority ? "eager" : "lazy"}
      sizes={sizes}
      src={src}
      style={fill ? fillStyle : undefined}
      width={fill ? undefined : width}
    />
  );
}
