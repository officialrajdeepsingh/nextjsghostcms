import GhostContentAPI from "@tryghost/content-api";

// Create API instance with site credentialE

export const api = new GhostContentAPI({
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
  .catch((Error: Error) => {
    throw Error
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
  .catch((Error: Error) => {
    throw Error
  });
}

// Read (Reading page)

export async function getSinglePost(postSlug: string) {
  return await api.posts
    .read({
      slug: postSlug
    }, { include: ["tags", "authors"] })
    .catch((Error: Error) => {
      throw Error
    });
}


// Pages (Page)

export async function getAllPages() {
  return await api.pages
    .browse({
      limit: 'all'
    })
    .catch((Error: Error) => {
      throw Error
    });
}

export async function getSinglePage(pageSlug: string) {
  return await api.pages
    .read({
      slug: pageSlug
    }, { include: ["tags"] })
    .catch((Error: Error) => {
      throw Error
    });
}

// Author (Author page)

export async function getSingleAuthor(authorSlug: string) {
  return await api.authors
    .read({
      slug: authorSlug
    }, { include: ["count.posts"] })
    .catch((Error: Error) => {
      throw Error
    });
}

export async function getSingleAuthorPosts(authorSlug: string) {
  return await api.posts.browse({ filter: `authors:${authorSlug}` })
    .catch((Error: Error) => {
      throw Error
    });
};

export async function getAllAuthors() {

  return await api.authors
  .browse({
    limit: "all"
  })
  .catch((Error: Error) => {
    throw Error
  });
}

// tag (Tag page)

export async function getTagPosts(tagSlug: string) {

  return await api.posts.browse({ filter: `tag:${tagSlug}`, include: 'count.posts' })
    .catch((Error: Error) => {
      throw Error
    });

}

export async function getSingleTag(tagSlug: string) {

  return await api.tags.read({ slug: tagSlug })
    .catch((Error: Error) => {
      throw Error
    });
}

export async function getAllTags() {
  return await api.tags.browse({
    limit: "all"
  })
    .catch((Error: Error) => {
      throw Error
    });
}

// Search 
export async function getSearchPosts() {
  return await api.posts.browse({ include: ["tags", "authors"], limit: "all" })
    .catch((Error: Error) => {
      throw Error
    });
}

// Navigation
export async function getNavigation() {
  return await api.settings.browse().catch((Error: Error) => {
    throw Error
  });

}
