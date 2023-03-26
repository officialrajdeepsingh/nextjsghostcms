import GhostContentAPI from "@tryghost/content-api";

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: 'http://localhost:2368',
  key: 'd37f8a76a0fd9cd909fe3f1db5',
  version: "v5.0"
});

export async function getPosts() {
  return await api.posts
    .browse({
      include: ["tags", "authors"],
      limit: "all"
    })
    .catch(err => {
      console.error(err);
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
      console.error(err);
    });
}

export async function getSingleAuthorPost(authorSlug: string) {
  return await api.posts.browse({ filter: `authors:${authorSlug}` }).catch(err => {
    console.log(err)
  })
}

export async function getTagPosts(tagSlug: string) {

  return await api.posts.browse({ filter: `tag:${tagSlug}`, include: 'count.posts' }).catch(err => {
    console.log(err)
  });

}

export async function getSearchPosts(tagSlug: string) {

  return await api.posts.browse({ filter: `title:My new`, include: 'count.posts' }).catch(err => {
    console.log(err)
  });
}
