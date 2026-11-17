import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Project } from "@/lib/projects";
import { Reveal } from "./reveal";
import "./work-expander.css";

/**
 * Selected work. Hover a card and it grows while its screenshot scrolls down
 * the real page; see work-expander.css. Server-rendered: all of the motion is
 * CSS, so the only client piece is the entrance reveal.
 */
export function WorkExpander({ projects }: { projects: Project[] }) {
  return (
    <div className="we mt-12">
      {projects.map((p, i) => {
        const shot = p.tall ?? { src: p.image, width: 1440, height: 900 };
        return (
          <Reveal key={p.slug} delay={i * 0.08} className="we-item">
            <Link href={`/work#${p.slug}`} className="we-card group outline-none">
              <div className="we-shot">
                <Image
                  src={shot.src}
                  width={shot.width}
                  height={shot.height}
                  alt={`${p.name} website`}
                  priority={i === 0}
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="we-info">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-xs uppercase tracking-[0.1em] text-text-faint">{p.category}</p>
                    <h3 className="mt-1.5 text-lg font-medium text-text">{p.name}</h3>
                  </div>
                  <ArrowUpRight
                    weight="bold"
                    className="mt-1 size-4 shrink-0 text-text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </div>
                <div className="we-text">
                  <p className="we-sum line-clamp-3 text-sm leading-relaxed text-text-muted">{p.summary}</p>
                  <p className="we-desc line-clamp-4 text-sm leading-relaxed text-text-muted">{p.description}</p>
                </div>
                <div className="we-foot">
                  <span className="flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 3).map((t) => (
                      <span key={t} className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-text-muted">
                        {t}
                      </span>
                    ))}
                  </span>
                  <span className="shrink-0 text-sm font-medium text-text">View project &rarr;</span>
                </div>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
