import GhostContentAPI from "@tryghost/content-api";

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: 'http://localhost:2368',
  key: 'd37f8a76a0fd9cd909fe3f1db5',
  version: "v5.0"
});

export async function getPosts() {
  let posts = await api.posts
    .browse({
      include: ["tags", "authors"],
      limit: "all"
    })
    .catch(err => {
      console.error(err);
    });



  return posts
}


export async function getSinglePost(postSlug: string) {
  let singlePost = await api.posts
    .read({
      slug: postSlug
    })
    .catch(err => {
      console.error(err);
    });


  return singlePost
}
