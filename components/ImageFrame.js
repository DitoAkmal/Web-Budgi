'use client';
import Image from "next/image";

export default function ImageFrame({
  src,
  alt="image",
  className=""
}) {
  return (
    <div
      className={`
        relative w-full overflow-hidden rounded-3xl bg-[#b79bbd]/20 shadow-xl
        ${className}`
      }
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width:768px) 100vw, 50vw"
        className="object-cover  object-center"
      />
    </div>
  );
}