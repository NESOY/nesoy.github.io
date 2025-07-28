import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

export const sortByRecentDate: Options["sortFn"] = (a, b) => {
  if (!a.isFolder && !b.isFolder) {
    const dateA = a.data.frontmatter?.date ? new Date(a.data.frontmatter.published) : new Date(0);
    const dateB = b.data.frontmatter?.date ? new Date(b.data.frontmatter.published) : new Date(0);

    return dateB.getTime() - dateA.getTime();
  }

  if (a.isFolder && b.isFolder) {
    return a.displayName.localeCompare(b.displayName, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  }

  return a.data ? 1 : -1;
}

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.DesktopOnly(
      Component.Adsense({
        clientId: "ca-pub-1829817529831781",
        slotId: "7543380157"
      })
    ),
    Component.Comments({
      provider: 'giscus',
      options: {
        repo: 'nesoy/nesoy.github.io',
        repoId: 'MDEwOlJlcG9zaXRvcnk3NzUxOTM5NQ==',
        category: 'Comments',
        categoryId: 'DIC_kwDOBJ7aI84Cmt2C',
        mapping: 'title'
      }
    }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/nesoy",
      Twitter: "https://x.com/nesoy_kwon",
      LinkedIn: "https://www.linkedin.com/in/young-jae-kwon-3514b3141/",
      RSS: "https:/nesoy.github.io/index.xml",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    // Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
   Component.DesktopOnly(Component.Explorer({
      title: "Wiki",
      sortFn: sortByRecentDate
    })),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    Component.Graph(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.DesktopOnly(Component.Explorer({
      title: "Wiki",
      sortFn: sortByRecentDate
    })),
  ],
  right: [],
}
