import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
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
  const defaultState = {
    name: "",
    imageUrl: "",
    productUrl: "",
    code: "",
    price1: "",
    price2: "",
  }
  const [fields, setFields] = useState(defaultState)
  const handleChange = event => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    })
  }
  const handleNewPost = async event => {
    setDisabled(true)
    event.preventDefault()
    await createPost(
      fields.name,
      fields.imageUrl,
      fields.productUrl,
      fields.code,
      fields.price1,
      fields.price2
    ).then(
      post => {
        setFields(defaultState)
        toast.success("Post added successfully!")
        setPosts([...posts, post.createPost])
      },
      err => {
        toast.error(`Failed to create post: ${err}`)
      }
    )
    setDisabled(false)
  }
  const handleDeletePost = async id => {
    await deletePost(id).then(
      post => {
        toast.success("Post deleted successfully!")
        setPosts(posts.filter(x => x._id !== post.deletePost._id))
      },
      err => {
        toast.error(`Failed to delete post: ${err}`)
      }
    )
  }
  const createPost = async (
    name,
    imageUrl,
    productUrl,
    code,
    price1,
    price2
  ) => {
    return await client.request(
      `mutation {
				createPost(data: { name: "${name}", imageUrl: "${imageUrl}", productUrl: "${productUrl}", code: "${code}", price1: "${price1}", price2: "${price2}" }) {
					_id
					name
					imageUrl
					productUrl
					code
					price1
					price2
				}
			}`
    )
  }
  const deletePost = async id => {
    return await client.request(
      `mutation {
				deletePost(id: "${id}") {
					_id
				}
			}`
    )
  }
  useEffect(() => {
    client
      .request(
        `query {
						posts {
							data {
								_id
								name
								imageUrl
								productUrl
								code
								price1
								price2
							}
						}
					}`
      )
      .then(data => {
        setPosts(data.posts.data)
      })
  }, [])
  return (
    <Layout>
      <ToastContainer />
      <>
        <p>
          <b>Your posts</b>
        </p>

        {!posts ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>There are no posts yet</p>
        ) : (
          <ul>
            {posts.map(post => (
              <li key={`post-${post._id}`}>
                <a
                  href={post.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {post.name}
                </a>{" "}
                - <a onClick={() => handleDeletePost(post._id)}>delete</a>
              </li>
            ))}
          </ul>
        )}

        <br />
        <form>
          <p>
            <b>New post</b>
          </p>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={fields.name}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            placeholder="Image URL"
            value={fields.imageUrl}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            id="productUrl"
            name="productUrl"
            placeholder="Product URL"
            value={fields.productUrl}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            id="code"
            name="code"
            placeholder="Discount Code"
            value={fields.code}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            id="price1"
            name="price1"
            placeholder="Old price"
            value={fields.price1}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            id="price2"
            name="price2"
            placeholder="New price"
            value={fields.price2}
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

export default UploadNewImagesPage
