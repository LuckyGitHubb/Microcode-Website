import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { apiRequestHandler } from '../apiConfig/service';

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const slug = location.state?.slug;
  console.log(slug)
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
          const params = {};
        if (slug) {
          params.searchQuery = slug;  // ✅ send as searchQuery if slug present
        }
        const response = await apiRequestHandler({
          method: 'GET',
          endPoint: 'getBlog',
          params:params

        });

        if (response?.responseCode === 200 || response?.status === 200 || response?.success) {
          setBlogs(response.data || []);
        } else {
          setError(response?.message || 'Failed to fetch blogs');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred while fetching blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="text-center">Loading Blogs...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div>
      <div className="blog-area home-blog blog-2-col default-padding bottom-less">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
              <div className="site-heading text-center">
                <h4 className="sub-title">Blog Insight</h4>
                <h2 className="title split-text">Top Picks This Week</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {blogs.length === 0 ? (
              <div className="text-center">No blogs available.</div>
            ) : (
              blogs.map((blog, index) => (
                <div key={blog._id || index} className="col-xl-6 col-md-6 col-lg-6 mb-30">
                  <div
                    className={`home-blog-style-one-item wow fadeInUp${
                      index > 0 ? ' data-wow-delay="200ms"' : ''
                    }`}
                  >
                    <div className="home-blog-thumb">
                      <img
                        title={blog.title || 'Microcode Software'}
                        src={blog.blogThumbnail || '/static/img/default-blog.webp'}
                        alt={blog.title || 'Image Not Found'}
                      />
                      <ul className="home-blog-meta">
                        <li>
                          <a href="#">{blog.category?.[0]?.name || 'Uncategorized'}</a>
                        </li>
                        <li>
                          {blog.createdAt
                            ? new Date(blog.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })
                            : 'October 15, 2024'}
                        </li>
                      </ul>
                    </div>
                    <div className="content">
                      <div className="info">
                        <h3 className="blog-title">
                          <Link to={`/blog/${blog.slug || ''}`}>
                            {blog.title || 'Untitled Blog Post'}
                          </Link>
                        </h3>
                        <Link to={`/blog/${blog.slug || ''}`} className="btn-read-more">
                          Read More <i className="fas fa-long-arrow-right" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;