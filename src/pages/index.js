//** @jsx jsx */
import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Text, Flex, Box, jsx } from "theme-ui"

import { useSite } from "@layouts/SiteContext"
import Shortcodes from "@components/shortcodes"
import Search from "@components/search"
import iconLocation from "@public/icons/icon-location.svg"
import noUserImage from '@public/no-user-image.png'

const Index = () => {
  const {
    results: { people, companies },
	
  } = useSite()

  const sortByName = (dataObj) => {
	  return dataObj.sort((a, b) => {
		  if (a.node.name === null && b.node.name !== null) {
			  return 1;
		  } else if (a.node.name !== null && a.node.name === null) {
			  return -1;
		  }

		  if (a.node.name === b.node.name) return 0;
		  return a.node.name.localeCompare(b.node.name)
	  })
  }


  return (
    <>
      <Search />
      <Text
        as="h2"
        sx={{ color: "primary", fontWeight: "normal", mb: 3, mt: 3 }}
      >
        People
      </Text>
      {people && (
        <Flex
          as="ul"
          sx={{
            listStyleType: "none",
            p: 0,
            display: "inline-flex",
            flexWrap: "wrap",
            m: "-2rem 0 0 -2rem",
            width: "calc(100% + 2rem)",
          }}
        >
          <MDXProvider components={Shortcodes}>
            {sortByName(people).map(({ node }) => {
				const hasImage = node.rawBody.includes('![');

				return (<Flex
                as="li"
                sx={{
                  m: "2rem 0 0 2rem",
                  width: "30%",
                  maxWidth: "405px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  "& > .title": {
                    fontSize: "1.25em",
                    margin: "0 0 .5rem",
                    order: 0,
                    color: "primary",
                  },
                  "& > .location": {
                    order: 1,
                  },
                  "& > img": {
                    order: 2,
                    width: "100%",
                    maxWidth: "405px",
                    height: "300px",
                    objectFit: "cover",
					borderRadius: '5px',
					
                  },
                  "& > .skills": { order: 3 },
                  "& > .personal": { order: 4 },
                  "& > .business": { order: 5 },
                  "& > .games": { order: 6 },
                }}
              >
			  {!hasImage && <img src={noUserImage} alt="No User Image"/>}
                <MDXRenderer>
				
				{node.body}</MDXRenderer>
              </Flex>)
			})}
          </MDXProvider>
        </Flex>
      )}
      {/* <Text as="h2">Companies</Text>
		{companies && <Flex>
			<MDXProvider components={Shortcodes}>
				<MDXRenderer>
					{companies.map(({node}) => node.body)}
				</MDXRenderer>
			</MDXProvider>
		</>} */}
    </>
  )
}

export default Index
