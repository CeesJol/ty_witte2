import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const GraphQLClient = require("graphql-request").GraphQLClient

const UploadNewImagesPage = () => {
  const client = new GraphQLClient("https://graphql.fauna.com/graphql", {
    headers: {
      Authorization: `Bearer ${process.env.GATSBY_FAUNA_KEY}`,
      "Content-type": "application/json",
      Accept: "application/json",
    },
  })
  const [disabled, setDisabled] = useState(false)
  const [posts, setPosts] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [fields, setFields] = useState({
    name: "",
    imageUrl: "",
  })
  const handleChange = event => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    })
  }
  const handleNewPost = async event => {
    setDisabled(true)
    event.preventDefault()
    await mutate(fields.name, fields.imageUrl).then(
      post => {
        setFields({
          name: "",
          imageUrl: "",
        })
        toast.success("Post added successfully!")
        setPosts([...posts, post.createPost])
      },
      err => {
        toast.error("Failed to add post")
      }
    )
    setDisabled(false)
  }
  const mutate = async (name, imageUrl) => {
    return await client.request(
      `
			mutation {
				createPost(data: { name: "${name}", imageUrl: "${imageUrl}" }) {
					name
					imageUrl
				}
			}
			
			`
    )
  }
  useEffect(() => {
    if (!loaded) {
      setLoaded(true)

      client
        .request(
          `query {
						posts {
							data {
								_id
								name
								imageUrl
							}
						}
					}`
        )
        .then(data => {
          setPosts(data.posts.data)
        })
    }
  })
  return (
    <Layout>
      <ToastContainer />
      <>
        <p>
          <b>Your posts</b>
        </p>
        <ul>
          {!posts ? (
            <p>Loading posts...</p>
          ) : posts.length === 0 ? (
            <p>There are no posts yet</p>
          ) : (
            posts.map(post => (
              <li>
                {post.name} - {post.imageUrl}
              </li>
            ))
          )}
        </ul>
        <br />
        <form>
          <p>
            <b>New post</b>
          </p>
          <input
            type="text"
            id="name"
            name="name"
            value={fields.name}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={fields.imageUrl}
            onChange={handleChange}
          />
          <br />
          <button onClick={handleNewPost} disabled={disabled}>
            Upload
          </button>
        </form>
      </>
    </Layout>
  )
}

// export const query = graphql`
//   {
//     fauna {
//       posts {
//         data {
//           _id
//           name
//           imageUrl
//         }
//       }
//     }
//   }
// `

// const ADD_POST = graphql`
//   mutation AddPost($name: String!, $imageUrl: String!) {
//     addPost(name: $name, imageUrl: $imageUrl) {
//       name
//       imageUrl
//     }
//   }
// `

// function addPost() {
//   let input;
//   const [addPost, { data }] = useMutation(ADD_POST);

//   return (
//     <div>
//       <form
//         onSubmit={e => {
//           e.preventDefault();
//           addPost({ variables: { type: input.value } });
//           input.value = '';
//         }}
//       >
//         <input
//           ref={node => {
//             input = node;
//           }}
//         />
//         <button type="submit">Add Post</button>
//       </form>
//     </div>
//   );
// }

export default UploadNewImagesPage
