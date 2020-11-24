import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from "../components/post"

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
      <SEO title="Discount Codes" />
      {!posts ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>There are no posts yet</p>
      ) : (
        <div class="container">
          <div id="post-container-left" className="post-container">
            {posts.map((post, index) =>
              index % 2 === 0 ? (
                <Post
                  key={`post-${post._id}`}
                  name={post.name}
                  imageUrl={post.imageUrl}
                  productUrl={post.productUrl}
                />
              ) : (
                <></>
              )
            )}
          </div>

          <div id="post-container-right" className="post-container">
            {posts.map((post, index) =>
              index % 2 === 1 ? (
                <Post
                  key={`post-${post._id}`}
                  name={post.name}
                  imageUrl={post.imageUrl}
                  productUrl={post.productUrl}
                />
              ) : (
                <></>
              )
            )}
          </div>
        </div>
      )}
    </Layout>
  )
}

export default IndexPage
