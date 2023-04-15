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

export async function getAllPages(): BrowseFunction<PostsOrPages> {
  return await api.pages
    .browse({
      limit: 'all'
    })
    .catch((error) => { });
  }

  export async function getSinglePage(pageSlug: string): BrowseFunction<PostOrPage> {
    return await api.pages.read({
       pageSlug
         { include: ["tags"] })
    .catch((error: Error)  return error
                                    });
      
        
       A or (Author page)
        
          t
             async function getSingleAuthor(authorSlug: string) {
            rn await api.authors.read({
           lug: authorSlug
       { include: ["count.posts"] })
    
                        console.log(error)
                      });
        
      
        port async function getSingleAuthorPosts(authorSlug: string) {
      turn await api.posts.browse({ filter: `authors:${authorSlug}` })
    
                      console.log(error)
                      });
        
          
         anc function getAllAuthors() {
        
        turn await api.authors
      rowse({
          limit: "all"
      })
    
                      console.log(error)
                        });
  
  
// tag (Tag page)
        
       anc function getTagPosts(tagSlug: string) {
    
      turn await api.posts.browse({ filter: `tag:${tagSlug}`, include: 'count.posts' })
        atch((error: Error) => {
        console.log(error)
    });
  
    
  
     anc function getSingleTag(tagSlug: string) {
    
      turn await api.tags.read({ slug: tagSlug })

                    console.log(error)
                    });
  
    
       async function getAllTags() {
      rn await api.tags.browse({
      limit: "all"
      

                    console.log(error)
                    });
  
    
   Srch 
    port async function getSearchPosts() {
      turn await api.posts.browse({ include: ["tags", "authors"], limit: "all" })

                    console.log(error)
                    });
  
    
   Nigation
    port async function getNavigation() {
    turn await api.settings.browse()
      atch((error: Error) => {
        console.log(error)
    });
  
}
