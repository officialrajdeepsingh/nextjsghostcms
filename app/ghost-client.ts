import GhostContentAPI, { PostOrPage, GhostAPI, GhostError, BrowseFunction, PostsOrPages  } from "@tryghost/content-api";

// Create API instance with site credentialE

export const api: GhostAPI = new GhostContentAPI({
  url: process.env.GHOST_URL as string,
  key: process.env.GHOST_KEY as string,
  version: "v5.0"
});


// Posts (Home page )

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
export async function getPaginationPosts(page: number) {
  return await api.posts
    .browse({
      include: ["tags", "authors"],
      limit: 10,
      page: page
    })
    .catch((error: Error) => {
      console.log(error)
    });
}

// Read (Reading page)

export async function getSinglePost(postSlug: string) {
  return await api.posts
    .read({
      slug: postSlug
    }, { include: ["tags", "authors"] })
    .catch((error: Error) => {
      console.log(error)
    });
}


// Pages (Page)
export async function getAllPages() {
  return await api.pages
    .browse({
      limit: 'all'
    })
    .catch((error: Error) => {
      console.log(error)
    });
}

export async function getSinglePage(pageSlug: string) {
  return await api.pages
    .read({
      slug: pageSlug
    }, { include: ["tags"] })
    .catch((error: Error) => {
      console.log(error)
    });
}

// Author (Author page)

export async function getSingleAuthor(authorSlug: string) {
  return await api.authors.read({
    slug: authorSlug
  }, { include: ["count.posts"] })
    .catch((error: Error) => {
      console.log(error)
    });
}

export async function getSingleAuthorPosts(authorSlug: string) {
  return await api.posts.browse({ filter: `authors:${authorSlug}` })
    .catch((error: Error) => {
      console.log(error)
    });
};

export async function getAllAuthors() {

  return await api.authors
    .browse({
      limit: "all"
    })
    .catch((error: Error) => {
      console.log(error)
    });
}

// tag (Tag page)

export async function getTagPosts(tagSlug: string) {

  return await api.posts.browse({ filter: `tag:${tagSlug}`, include: 'count.posts' })
    .catch((error: Error) => {
      console.log(error)
    });

}

export async function getSingleTag(tagSlug: string) {

  return await api.tags.read({ slug: tagSlug })
    .catch((error: Error) => {
      console.log(error)
    });
}

export async function getAllTags() {
  return await api.tags.browse({
    limit: "all"
  })
    .catch((error: Error) => {
      console.log(error)
    });
}

// Search 
export async function getSearchPosts() {
  return await api.posts.browse({ include: ["tags", "authors"], limit: "all" })
    .catch((error: Error) => {
      console.log(error)
    });
}

// Navigation
export async function getNavigation() {
  return await api.settings.browse()
    .catch((error: Error) => {
      console.log(error)
    });

}