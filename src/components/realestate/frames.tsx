import Image from "next/image";

/** A real screenshot in browser chrome. */
export function BrowserFrame({
  src,
  alt,
  url,
  ratio = "aspect-[16/10]",
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  src: string;
  alt: string;
  url: string;
  ratio?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-[14px] border border-border-strong bg-bg-elevated shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-border bg-bg-elevated-2 px-3.5 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-text-faint/40" />
          <span className="size-2.5 rounded-full bg-text-faint/40" />
          <span className="size-2.5 rounded-full bg-text-faint/40" />
        </div>
        <div className="mx-auto max-w-[260px] flex-1 truncate rounded-md bg-bg px-3 py-1 text-center text-[11px] text-text-faint">
          {url}
        </div>
        <div className="w-[42px]" aria-hidden="true" />
      </div>
      <div className={`relative ${ratio} overflow-hidden`}>
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover object-top" />
      </div>
    </figure>
  );
}

/** A real screenshot in a phone bezel. */
export function PhoneFrame({
  src,
  alt,
  className = "",
  sizes = "240px",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-[28px] border-[5px] border-[#1d1f23] bg-[#1d1f23] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)] ${className}`}
    >
      <div className="relative aspect-[416/900] overflow-hidden rounded-[22px]">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
      </div>
    </figure>
  );
}
