import { useQuery } from "@tanstack/react-query"
import { getPost } from "../api/posts" 
import { getUser } from "../api/users"

export default function Post({ id }) {
  const postQuery = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
    placeholderData: { title: "Loading...", body: "", userId: null }
  });

  const userQuery = useQuery({
    queryKey: ["users", postQuery?.data?.userId],
    enabled: postQuery?.data?.userId != null,
    queryFn: () => getUser(postQuery.data.userId),
    placeholderData: { name: "Loading User..." }
  });

  if (postQuery.status === "loading") return <h1>Loading...</h1>;
  if (postQuery.status === "error") return <h1>{JSON.stringify(postQuery.error)}</h1>;


  const postData = postQuery.data || {};
  const userData = userQuery.data || {};

  return (
    <>
      <h1>
        {postData.title} <br />
        <small>
          {userQuery.isLoading
            ? "Loading User..."
            : userQuery.isError
            ? "Error Loading User"
            : userData.name}
        </small>
      </h1>
      <p>{postData.body}</p>
    </>
  );
}

