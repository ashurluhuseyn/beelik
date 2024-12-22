import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import BlogCard from '../../../components/Blog';
import AlertMessage from '../../../components/Alert';

import './blog.scss';
import { getCategories } from '../../../api/category';
import { getBlogsByCategory, getBlogs } from '../../../api/blog';
import Loader from '../../../components/Loader';

const Blogs = () => {
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all'); 

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoriesData, blogsData] = await Promise.all([
          getCategories(), 
          getBlogs()
        ]);
        const allCategory = { id: 'all', title: 'Hamısı' };
        setCategories([allCategory, ...categoriesData]);
        setBlogs(blogsData.blogs);
      } catch (error) {
        console.error('Xəta baş verdi:', error);
        setCategories([]);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    setActiveCategory(categoryId); 
    setLoading(true);

    try {
      const blogsData = categoryId === 'all' 
        ? await getBlogs() 
        : await getBlogsByCategory(categoryId);

      setBlogs(blogsData.blogs);
    } catch (error) {
      console.error('Xəta baş verdi:', error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />
  }

  return (
    <div className="blogs-page">
      <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Beelik Bloqlar",
          "description": "Beelik platformasında müxtəlif mövzular haqqında ən son bloqları oxuyun.",
          "url": "https://beelik.com/blogs",
          "blogPost": blogs.map(blog => ({
            "@type": "BlogPosting",
            "headline": blog.title,
            "description": blog.description,
            "url": `https://beelik.com/blogs/${blog.id}`,
            "datePublished": blog.createDate,
            "author": {
              "@type": "Person",
              "name": "Beelik"
            },
            "image": blog.image
          }))
        })}
      </script>
      </Helmet>
      <div className="blogs">
        <div className="blogs__title">
          <h1>Bloqlar</h1>
        </div>
        <div className="blogs__category">
          <ul>
            {categories.map((category) => (
              <li
                key={category.id}
                className={activeCategory === category.id ? 'active-category' : ''}
                onClick={() => handleCategoryClick(category.id)}
              >
                <span>{category.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="blogs__list">
          {blogs.length > 0 ? (
            blogs.map(blog => <BlogCard key={blog.id} data={blog} />)
          ) : (
            <AlertMessage text="Göstəriləcək bloq yoxdur." />
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
