"use client";
// components/shared/ImageWithFallback.tsx — upgraded to next/image
import { useState } from "react";
import NextImage, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

const FallbackSvg = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "flex items-center justify-center bg-slate-100 text-slate-400",
      className
    )}
    role="img"
    aria-label="Image failed to load"
  >
    <svg
      width="64"
      height="64"
      viewBox="0 0 88 88"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeLinejoin="round"
      opacity=".3"
      fill="none"
      strokeWidth="3.7"
      aria-hidden="true"
    >
      <rect x="16" y="16" width="56" height="56" rx="6" />
      <path d="m16 58 16-18 32 32" />
      <circle cx="53" cy="35" r="7" />
    </svg>
  </div>
);

type ImageWithFallbackProps = Omit<ImageProps, "src"> & {
  src: string;
  sizes?: string;
};

export function ImageWithFallback({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw",
  ...rest
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <FallbackSvg className={className} />;
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={cn("object-cover", className)}
      onError={() => setHasError(true)}
      {...rest}
    />
  );
}
