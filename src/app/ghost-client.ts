import GhostContentAPI from "@tryghost/content-api";

// Create API instance with site credentialE

export const api = new GhostContentAPI({
  url: process.env.GHOST_URL as string,
  key: process.env.GHOST_KEY as string,
  version: "v5.0"
});

export async function getPosts() {
  return await api.posts
    .browse({
      include: ["tags", "authors"],
      limit: 10
    })
    .catch(err => {
      throw new Error(err)
    });
}

export async function getPaginationPosts(page: number) {
  return await api.posts
    .browse({
      include: ["tags", "authors"],
      limit: 10,
      page: page
    })
    .catch(err => {
      throw new Error(err)
    });
}


export async function getSinglePost(postSlug: string) {
  return await api.posts
    .read({
      slug: postSlug
    }, { include: ["tags", "authors"] })
    .catch(err => {
      console.error(err);
    });
}

export async function getSingleAuthor(authorSlug: string) {
  return await api.authors
    .read({
      slug: authorSlug
    }, { include: ["count.posts"] })
    .catch(err => {
      console.log(err)
    });

}

export async function getSingleAuthorPost(authorSlug: string) {
  return await api.posts.browse({ filter: `authors:${authorSlug}` })
    .catch(err => {
      console.log(err)
    })
};


export async function getTagPosts(tagSlug: string) {

  return await api.posts.browse({ filter: `tag:${tagSlug}`, include: 'count.posts' })
    .catch(err => {
      throw new Error(err)
    });
  ;

}

export async function getSingleTag(tagSlug: string) {

  return await api.tags.read({ slug: tagSlug })
    .catch(err => {
      throw new Error(err)
    });
  ;

}




export async function getAllTags() {
  return await api.tags.browse({
    limit: "all"
  }).catch(err => {
    console.log(err)
  })
}

export async function getSearchPosts() {
  return await api.posts.browse({ include: ["tags", "authors"], limit: "all" }).catch(err => {
    console.log(err)
  });
}


export async function getAllAuthors() {

  return await api.authors
    .browse({
      limit: "all"
    })
    .catch(err => {
      throw new Error(err)
    });

}

export async function getNavigation() {
  return await api.settings.browse()
}
