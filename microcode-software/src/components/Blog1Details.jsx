import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiRequestHandler } from '../apiConfig/service';
import ApiConfig from '../apiConfig/ApiConfig';
import Loader from './Loader';
import NotFoundPage from '../pages/NotFoundPage';
import NotFound from './NotFound';

function Blog1Details() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [categories, setCategories] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const [blogResponse, categoriesResponse, recentPostsResponse] = await Promise.all([
          apiRequestHandler({
            method: 'GET',
            endPoint: ApiConfig.getBlogBySlug(slug),
          }),
          apiRequestHandler({
            method: 'GET',
            endPoint: 'getCategories',
          }),
          apiRequestHandler({
            method: 'GET',
            endPoint: 'getBlog',
            params: { limit: 3 },
          }),
        ]);

        if (blogResponse?.responseCode === 200 || blogResponse?.status === 200 || blogResponse?.success) {
          setBlog(blogResponse.data || null);
        } else {
          setError(blogResponse?.message || 'Failed to fetch blog details');
        }

        if (categoriesResponse?.success) {
          setCategories(categoriesResponse.data || []);
        }

        if (recentPostsResponse?.success) {
          setRecentPosts(recentPostsResponse.data || []);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim() === '') {
        setSuggestions([]);
        return;
      }

      try {
        const response = await apiRequestHandler({
          method: 'GET',
          endPoint: ApiConfig.searchBlogs,
          params: { query },
        });

        if (response?.success) {
          setSuggestions(response.data || []);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setIsFocused(true);
  };

  const handleSuggestionClick = (slug) => {
    console.log("clicked")
    navigate('/blog', { state: { slug } });
    // setQuery('');
    // setSuggestions([]);
    // setIsFocused(false);
  };



  const handleBlur = () => {
    // setTimeout(() => setIsFocused(false), 200);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    console.log("error")
    return <NotFound />;
  }

  if (!blog) {
    console.log(blog)
    return <NotFoundPage />;
  }

  return (
    <>
      {/* Start Breadcrumb */}
      <div className="breadcrumb-area text-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h1>{blog.title || 'Untitled Blog'}</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li>
                    <Link to="/">
                      <i className="fas fa-home" /> Home
                    </Link>
                  </li>
                  <li className="active">Blog Single</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* End Breadcrumb */}
      {/* Start Blog */}
      <div className="blog-area single full-blog right-sidebar full-blog default-padding-bottom">
        <div className="container">
          <div className="blog-items">
            <div className="row">
              <div className="blog-content col-xl-8 col-lg-7 col-md-12 pr-35 pr-md-15 pl-md-15 pr-xs-15 pl-xs-15">
                <div className="blog-style-two item">
                  <div className="blog-item-box">
                    <div className="thumb">
                      <img
                        title={blog.title || 'Microcode Software'}
                        src={blog.blogThumbnail || '/static/img/default-blog.webp'}
                        alt={blog.title || 'Image Not Found'}
                      />
                    </div>
                    <div className="info">
                      <div className="meta">
                        <ul>
                          <li>
                            <i className="fas fa-calendar-alt" />{' '}
                            {blog.createdAt
                              ? new Date(blog.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })
                              : 'October 15, 2024'}
                          </li>
                          {/* <li>
                            <i className="fas fa-user-circle" /> Nirdesh
                          </li> */}
                        </ul>
                      </div>
                      <div className="outfit-font" dangerouslySetInnerHTML={{ __html: blog.description || '' }} />
                    </div>
                  </div>
                </div>
                {/* Post Tags Share */}
                <div className="post-tags share">
                  <div className="tags">
                    <h4>Tags: </h4>
                    {(blog.tags?.split(',').map(tag => tag.trim()) || ['AI', 'Digital']).map((tag, index) => (
                      <a key={index} href="#">
                        {tag}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              {/* Start Sidebar */}
              <div className="sidebar col-xl-4 col-lg-5 col-md-12 mt-md-50 mt-xs-50">
                <aside>
                  <div className="sidebar-item search">
                    <div className="sidebar-info">
                      <div className="autocomplete-search-container">
                        <form >
                          <div className="input-group">
                            <input
                              type="text"
                              placeholder="Enter Keyword"
                              name="text"
                              className="form-control"
                              value={query}
                              onChange={handleInputChange}
                              onFocus={() => setIsFocused(true)}
                              onBlur={handleBlur}
                              ref={inputRef}
                              autoComplete="off"
                            />
                            <button type="submit">
                              <i className="fas fa-search" />
                            </button>
                          </div>
                        </form>
                        {isFocused && suggestions.length > 0 && (
                          <ul className="suggestions-list">
                            {suggestions.map((suggestion) => (
                              <li
                                key={suggestion._id}
                                className="suggestion-item"
                                onClick={() => handleSuggestionClick(suggestion.title)}
                              >
                                {suggestion.title}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="sidebar-item recent-post">
                    <h4 className="title">Recent Post</h4>
                    <ul>
                      {recentPosts.map((post) => (
                        <li key={post._id}>
                          <div className="thumb">
                            <Link to={`/blog/${post.slug}`}>
                              <img
                                title={post.title || 'Microcode Software'}
                                src={post.blogThumbnail || '/static/img/default-blog.webp'}
                                alt={post.title || 'Image Not Found'}
                              />
                            </Link>
                          </div>
                          <div className="info">
                            <div className="meta-title">
                              <span className="post-date">
                                {post.createdAt
                                  ? new Date(post.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                  })
                                  : 'Unknown Date'}
                              </span>
                            </div>
                            <Link to={`/blog/${post.slug}`}>
                              {post.title || 'Untitled Post'}
                            </Link>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="sidebar-item category">
                    <h4 className="title">Category List</h4>
                    <div className="sidebar-info">
                      <ul>
                        {categories.map((category) => (
                          <li key={category._id}>
                            <a href="#">
                              {category.name} <span>{category.blogCount}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </aside>
              </div>
              {/* End Sidebar */}
            </div>
          </div>
        </div>
      </div>
      {/* End Blog */}
    </>
  );
}

export default Blog1Details;