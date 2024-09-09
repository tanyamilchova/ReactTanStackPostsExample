import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import PostsList1 from "./PostsList1"
import PostsList2 from "./PostsList2"



export default function App() {
 const[currentPage, setCurrentPage] = useState(<PostsList1 />)
 const queryClient = useQueryClient()
 return (
  <div>
   <button onClick={() => setCurrentPage(<PostsList1 />)}>
        Posts List 1
      </button>
      <button onClick={() => setCurrentPage(<PostsList2 />)}>
        Posts List 2
      </button>

      <button
        onMouseEnter={onHoverPostOneLink}
        onClick={() => setCurrentPage(<Post id={1} />)}
      >
        First Post
      </button>

      <br />
      {currentPage}
    </div>
 )
}


