'use client';

import { useEffect, useState } from 'react';
import PromptCardList from './PromptCardList';

export default function Feed() {
  const [posts, setPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  function handleSearchChange(e) {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filteredPrompts(e.target.value);
        // console.log(searchResult);
        setSearchedResults(searchResult);
      }, 500)
    );
  }

  function filteredPrompts(searchText) {
    console.log(searchText);
    const regex = new RegExp(searchText, 'i'); // 'i' flag for case insensitive search
    return posts.filter(
      (post) =>
        regex.test(post.creator.username) ||
        regex.test(post.tag) ||
        regex.test(post.prompt)
    );
  }

  function handleTagClick(tagName) {
    setSearchText(tagName);

    const searchResult = filteredPrompts(tagName);
    setSearchedResults(searchResult);
  }

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
}
