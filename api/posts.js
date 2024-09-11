import axios from "axios"

export function getPosts() {
  return axios
    .get("http://localhost:3000/posts", { params: { _sort: "title" } })
    .then(res => res.data)
}

// export function getPost(id) {
//   return axios.get(`http://localhost:3000/posts/${id}`).then(res => res.data)
// }
export function getPost(id) {
  return axios.get(`http://localhost:3000/posts/${id}`)
    .then(res => res.data)
    .catch(error => {
      console.error('Error fetching post:', error);
      throw error; 
    });
}

export function createPost({ title, body }) {
  return axios
    .post("http://localhost:3000/posts", {
      title,
      body,
     userId: 1,
      id: Date.now(),
    })

    .then(res => {
      console.log("Post created:", res.data);
      return res.data; 
    })
    .catch(error => {
      console.error("Error creating post:", error);
      throw new Error(error.response?.data?.message || "Failed to create post");
    });
}

export function getPostsPaginated(page) {
  return axios
    .get("http://localhost:3000/posts", {
      params: { _page: page, _sort: "title", _limit: 2 },
    })
    .then(res => {
      const hasNext = page * 2 <= parseInt(res.headers["x-total-count"])
      return {
        nextPage: hasNext ? page + 1 : undefined,
        previousPage: page > 1 ? page - 1 : undefined,
        posts: res.data,
      }
    })
}
