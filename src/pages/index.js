import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"

const GraphQLClient = require("graphql-request").GraphQLClient

const IndexPage = () => {
  const client = new GraphQLClient("https://graphql.fauna.com/graphql", {
    headers: {
      Authorization: `Bearer ${process.env.GATSBY_FAUNA_KEY}`,
      "Content-type": "application/json",
      Accept: "application/json",
    },
  })
  const [posts, setPosts] = useState(null)
  const [loaded, setLoaded] = useState(false)
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
      <>
        hi
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
      </>
    </Layout>
  )
}

export default IndexPage
