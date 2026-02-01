import { FullSlug, resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

interface FrontmatterLinksOptions {
  /** Frontmatter fields to extract wikilinks from */
  fields: string[]
}

const defaultOptions: FrontmatterLinksOptions = {
  fields: ["category"],
}

export default ((userOpts?: Partial<FrontmatterLinksOptions>) => {
  const opts = { ...defaultOptions, ...userOpts }

  const FrontmatterLinks: QuartzComponent = ({
    fileData,
    displayClass,
    ctx,
  }: QuartzComponentProps) => {
    const links: { field: string; title: string; slug: string }[] = []

    if (fileData.frontmatter) {
      for (const field of opts.fields) {
        const value = fileData.frontmatter[field]
        if (value && typeof value === "string") {
          const match = value.match(/\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|([^\]]+))?\]\]/)
          if (match) {
            const linkTarget = match[1]
            const linkTitle = match[2] || linkTarget
            // Find matching slug from allSlugs
            const matchingSlugs = ctx.allSlugs.filter((slug) => {
              const parts = slug.split("/")
              const fileName = parts.at(-1)
              return linkTarget === fileName
            })
            let slug: string
            if (matchingSlugs.length === 1) {
              slug = matchingSlugs[0]
            } else {
              const currentDir = fileData.slug!.split("/").slice(0, -1).join("/")
              slug = currentDir ? `${currentDir}/${linkTarget}` : linkTarget
            }
            links.push({ field, title: linkTitle, slug })
          }
        }
      }
    }

    if (links.length === 0) {
      return null
    }

    return (
      <ul class={classNames(displayClass, "frontmatter-links")}>
        {links.map(({ field, title, slug }) => {
          const linkDest = resolveRelative(fileData.slug!, slug as FullSlug)
          return (
            <li>
              <a href={linkDest} class="internal frontmatter-link" data-field={field}>
                {title}
              </a>
            </li>
          )
        })}
      </ul>
    )
  }

  FrontmatterLinks.css = `
.frontmatter-links {
  list-style: none;
  display: flex;
  padding-left: 0;
  gap: 0.4rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.frontmatter-links > li {
  display: inline-block;
  white-space: nowrap;
  margin: 0;
  overflow-wrap: normal;
}

a.internal.frontmatter-link {
  border-radius: 8px;
  background-color: var(--highlight);
  padding: 0.2rem 0.4rem;
  margin: 0 0.1rem;
}
`

  return FrontmatterLinks
}) satisfies QuartzComponentConstructor
