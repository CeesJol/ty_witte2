import React from "react"
import "./layout.css"

const Post = ({ name, imageUrl }) => {
  return (
    <a href={imageUrl}>
      <div className="post">
        <img src={imageUrl} alt={name} />
        <p>{name}</p>
      </div>
    </a>
  )
}

export default Post
