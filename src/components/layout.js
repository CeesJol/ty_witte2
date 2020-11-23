/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 0 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: `2rem`,
            color: "grey",
            fontSize: "0.75rem",
            lineHeight: "1",
          }}
        >
          © {new Date().getFullYear()} DiscountCodes. DiscountCodes is a
          participant in the Amazon Services LLC Associates Program, an
          affiliate advertising program designed to provide a means for sites to
          earn advertising fees by advertising and linking to Amazon.com
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
