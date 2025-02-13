import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Comments({
      provider: 'giscus',
      options: {
        repo: 'nesoy/nesoy.github.io',
        repoId: 'MDEwOlJlcG9zaXRvcnk3NzUxOTM5NQ==',
        category: 'Comments',
        categoryId: 'DIC_kwDOBJ7aI84Cmt2C',
        mapping: 'pathname'
      }
    }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/nesoy",
      Twitter: "https://x.com/nesoy_kwon",
      LinkedIn: "https://www.linkedin.com/in/young-jae-kwon-3514b3141/",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.RecentNotes({ showTags: false , limit: 10})),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.RecentNotes({ showTags: false , limit: 10})),
  ],
  right: [],
}
