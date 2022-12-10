import React from 'react'
import Search from './Search';

const Nav = () => {
  return (
    <nav className="h-16 border-b flex justify-around">
      <h1 className="text-3xl font-bold underline">Logo</h1>
      <Search />
      <h1 className="text-3xl font-bold underline">Logo</h1>
    </nav>
  );
}

export default Nav