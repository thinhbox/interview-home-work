import React, { useState, useEffect, Fragment } from 'react';
import ReactPaginate from 'react-paginate';
import './App.css';
import GeneralNavBar from 'components/GeneralNavBar';
import Post from 'components/Post/Post';
import { getPostList } from 'services/post';
import { getUserList } from 'services/user';
import { Container } from 'react-bootstrap';
import SearchBar from 'components/SearchBar';

function App() {
  const [userList, setUserList] = useState(
    JSON.parse(localStorage.getItem('userList'))
  );
  const [postList, setPostList] = useState(
    JSON.parse(localStorage.getItem('postList'))
  );
  const [postToDisplay, setPostToDisplay] = useState([]);
  const [pageCount, setPageCount] = useState();
  const [pageLimit, setPageLimit] = useState(3);
  const [curPage, setCurPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [searching, setSearching] = useState(false);

  function searchByTitle(keyword) {
    if (
      keyword.trim() === '' ||
      keyword.length <= 0 ||
      keyword === null ||
      keyword === undefined
    ) {
      setSearching(false);
      setCurPage(0);
      setOffset(0 * pageLimit);
      setPageCount(Math.ceil(postList.length / pageLimit));
      setPostToDisplay(postList.slice(offset, offset + pageLimit));
    } else {
      const result = postList.filter((element) =>
        element.title.includes(keyword)
      );
      setSearching(true);
      setPostToDisplay(result);
    }
  }

  useEffect(() => {
    if (!userList || !postList) {
      console.log('Fetching');
      getUserList().then((data) => {
        setUserList(data);
        localStorage.setItem('userList', JSON.stringify(data));
      });
      getPostList().then((data) => {
        setPostList(data);
        localStorage.setItem('postList', JSON.stringify(data));
      });
    } else {
      console.log('curPage:');
      console.log(curPage);
      setCurPage(curPage);
      setOffset(curPage * pageLimit);
      setPageCount(Math.ceil(postList.length / pageLimit));
      setPostToDisplay(postList.slice(offset, offset + pageLimit));
    }
  }, [offset, curPage]);

  function getAuthor(authorId) {
    return userList ? userList[authorId - 1].name : 'Loading...';
  }

  function createPosts() {
    if (postToDisplay) {
      return (
        <Fragment>
          {postToDisplay.map((post) => (
            <Post key={post.id} getAuthor={getAuthor} data={post} />
          ))}
          <Container
            hidden={searching}
            fluid
            style={{ width: '40rem', marginTop: '1rem' }}>
            <ReactPaginate
              pageCount={pageCount}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={handlePageChange}
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          </Container>
        </Fragment>
      );
    } else {
      return <div>Loading Page...</div>;
    }
  }

  function handlePageChange(data) {
    setCurPage(data.selected);
    setOffset(curPage * pageLimit);
  }

  return (
    <div className='App'>
      {console.log('Re-rendered!')}

      <GeneralNavBar />

      <SearchBar method={searchByTitle} />
      {createPosts()}
    </div>
  );
}

export default App;
