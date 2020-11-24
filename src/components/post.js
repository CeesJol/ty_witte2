import React from "react"
import "./post.css"

const Post = ({ name, imageUrl, productUrl, code }) => {
  return (
    <a href={productUrl} target="_blank">
      <div className="post">
        <img src={imageUrl} alt={name} />
        <p>{name}</p>
        {code ? <p>Discount code: {code}</p> : ""}
      </div>
    </a>
  )
}

export default Post
