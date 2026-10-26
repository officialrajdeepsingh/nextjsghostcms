import GhostContentAPI, { GhostAPI, GhostError, PostOrPage, PostsOrPages, Author, Tag, Tags, Settings } from "@tryghost/content-api";

// Create API instance with site credentialE

export const api: GhostAPI = new GhostContentAPI({
  url: process.env.GHOST_URL as string,
  key: process.env.GHOST_KEY as string,
  version: "v5.0"
});


// Posts (Home page)
export async function getPosts() {
  return await api.posts
    .browse({
      include: ["tags", "authors"],
      limit: 10
    })
    .catch((error: GhostError) => {
      throw error
    });
}

// Pagination
export async function getPaginationPosts(page: number): Promise<PostsOrPages | null> {
  if (!page || Number.isNaN(page)) return null;
  return await api.posts
    .browse({
      include: ["tags", "authors"],
      limit: 10,
      page: page
    })
    .catch((error: Error) => {
      console.log(error)
      return null;
    });
}

// Read (Reading page)
export async function getSinglePost(postSlug: string): Promise<PostOrPage | null> {
  if (!postSlug) return null;
  return await api.posts
    .read({
      slug: postSlug
    }, { include: ["tags", "authors"] })
    .catch((error: Error) => {
      console.log(error)
      return null;
    });
}


// Pages (Page)
export async function getAllPages(): Promise<PostsOrPages | null> {
  return await api.pages
    .browse({
      limit: 'all'
    })
    .catch((error: Error) => {
      console.log(error)
      return null;
    });
}

export async function getSinglePage(pageSlug: string): Promise<PostOrPage | null> {
  if (!pageSlug) return null;
  return await api.pages
    .read({
      slug: pageSlug
    }, { include: ["tags"] })
    .catch((error: Error) => {
      console.log(error)
      return null;
    });
}

// Author (Author page)
export async function getSingleAuthor(authorSlug: string): Promise<Author | null> {
  if (!authorSlug) return null;
  return await api.authors.read({
    slug: authorSlug
  }, { include: ["count.posts"] })
    .catch((error: Error) => {
      console.log(error)
      return null;
    });
}

export async function getSingleAuthorPosts(authorSlug: string): Promise<PostsOrPages | null> {
  if (!authorSlug) return null;
  return await api.posts.browse({ filter: `authors:${authorSlug}` })
    .catch((error: Error) => {
      console.log(error)
      return null;
    });
};

export async function getAllAuthors(): Promise<Author[] | null> {
  return await api.authors
    .browse({
      limit: "all"
    })
    .catch((error: Error) => {
      console.log(error)
      return null;
    });
}

// tag (Tag page)
export async function getTagPosts(tagSlug: string): Promise<PostsOrPages | null> {
  if (!tagSlug) return null;
  return await api.posts.browse({ filter: `tag:${tagSlug}`, include: 'count.posts' })
    .catch((error: Error) => {
      console.log(error)
      return null;
    });
}

export async function getSingleTag(tagSlug: string): Promise<Tag | null> {
  if (!tagSlug) return null;
  return await api.tags.read({ slug: tagSlug })
    .catch((error: Error) => {
      console.log(error)
      return null;
    });
}

export async function getAllTags(): Promise<Tags | null> {
  return await api.tags.browse({
    limit: "all"
  })
    .catch((error: Error) => {
      console.log(error)
      return null;
    });
}

// Search 
export async function getSearchPosts(): Promise<PostsOrPages | null> {
  return await api.posts.browse({ include: ["tags", "authors"], limit: "all" })
    .catch((error: Error) => {
      console.log(error)
      return null;
    });
}

// Settings
export async function getSettings(): Promise<Settings | null> {
  return await api.settings.browse()
    .catch((error: Error) => {
      console.log(error)
      return null;
    });
}

// Navigation (alias for getSettings)
export const getNavigation = getSettings;

// Related posts
export async function getRelatedPosts(
  currentPostId: string,
  tagSlug?: string,
  limit: number = 3
): Promise<PostsOrPages> {
  try {
    let posts: PostsOrPages | null = null;
    if (tagSlug) {
      posts = await api.posts.browse({
        filter: `tag:${tagSlug}+id:-${currentPostId}`,
        limit,
        include: ["tags", "authors"],
      });
    }

    if (!posts || posts.length === 0) {
      posts = await api.posts.browse({
        filter: `id:-${currentPostId}`,
        limit,
        include: ["tags", "authors"],
      });
    }

    return posts || ([] as unknown as PostsOrPages);
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [] as unknown as PostsOrPages;
  }
}