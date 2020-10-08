import React from 'react'

const NavItem = ({category, changeCategory, productFilter}) => {
    return (
        <div className="nav-item">
          {productFilter === category ? (
            <span onClick={() => changeCategory(category)}>
              <span className="diamond">&diams;&nbsp;</span>
              {`${category}s`}
              <span className="diamond">&nbsp;&diams;</span>
            </span>
          ) : (
              <span onClick={() => changeCategory(category)}>{`${category}s`}</span>
            )}
        </div>
    )
}

export default NavItem
