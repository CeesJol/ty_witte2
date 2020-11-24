import React from "react"
import "./post.css"

const Post = ({ name, imageUrl, productUrl, code, price1, price2 }) => {
  return (
    <a href={productUrl} target="_blank" rel="noopener noreferrer">
      <div className="post">
        <img src={imageUrl} alt={name} />
        <p>{name}</p>
        {price1 && price2 ? (
          <p>
            <s>{price1}</s> - {price2}
          </p>
        ) : price1 || price2 ? (
          <p>{price1 || price2}</p>
        ) : (
          <></>
        )}
        {code ? <p>Discount code: {code}</p> : ""}
      </div>
    </a>
  )
}

export default Post
