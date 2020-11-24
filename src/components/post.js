import React from "react"
import "./post.css"

const Post = ({ name, imageUrl, productUrl }) => {
  return (
    <a href={productUrl} target="_blank">
      <div className="post">
        <img src={imageUrl} alt={name} />
        <p>{name}</p>
      </div>
    </a>
  )
}

export default Post
