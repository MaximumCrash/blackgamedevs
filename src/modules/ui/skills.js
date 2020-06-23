//** @jsx jsx */
import React from "react"
import { Flex, jsx } from "theme-ui"

import Button from "@ui/Button"
import { useSite } from "@layouts/SiteContext"

const Skills = ({ children }) => {
  const { filters, setFilter, filterSet } = useSite()
  const _Children = React.Children.toArray(children)

  const onClick = (f) => {
    const filter = filterSet.skills.find((n) => n.label === f.trim());
    console.log(filter, f);
    setFilter(filter);
  }

  return (
    <Flex
      className="skills"
      sx={{
        flexWrap: "wrap",
        mt: "1rem",
        mb: '.64rem',
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      {_Children.map((child, index) => {
        const isActive = filters.find((n) => n.label === child.props.children.trim());

        return (
          <Button sx={{fontSize: '15px', mr:'.25', mb: '.5rem',color: isActive ? 'link_hover' : 'text_secondary', borderColor: isActive ? 'link_hover' : "text_secondary", '&:hover': {color: isActive ? 'link_hover' : 'text', borderColor: isActive ? 'link_hover' : "text"}, '&:hover > *': {color: isActive ? 'link_hover' : 'text'}, '& > *': {color: isActive ? 'link_hover' : 'text_secondary', borderColor: isActive ? 'link_hover' : "text_secondary"}}} key={`skill-child-${index}-${child}`} onClick={() => onClick(child.props.children)}>
            {child}
          </Button>
        )
      })}
    </Flex>
  )
}

export default Skills
