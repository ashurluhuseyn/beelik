import React from 'react';
import './blog-card.scss';
import { Link } from 'react-router-dom';
import { getFormattedDate } from '../../utils/date';
import { Helmet } from 'react-helmet';

const BlogCard = ({ data }) => {  
  return (
    <div className='blog-card'>
      <Helmet>
        <title>{data.title}</title>
        <meta name="description" content={data.description.slice(0, 150)} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": data.title,
            "image": `${process.env.REACT_APP_IMAGE_URL}blogs/${data.image}`,
            "datePublished": data.createDate,
            "author": {
              "@type": "Person",
              "name": "Your Blog Author Name"
            },
            "articleBody": data.description
          })}
        </script>
      </Helmet>
      <Link to={`/blogs/${data.id}`}>
        <div className="blog-card__content">
          <div className="blog-card__content__img">
            <span>{data.category.title}</span>
            <img 
              src={`${process.env.REACT_APP_IMAGE_URL}/blogs/${data.image}`} 
              alt={`${data.title} - ${data.category.title}`} 
              loading="lazy" 
            />
          </div>
          <div className="blog-card__content__description">
            <div className="blog-card__content__description__top">
              <span>{getFormattedDate(data.createDate)}</span>
              <span>{data.readTime} dəq oxuma vaxtı</span>
            </div>
            <div className="blog-card__content__description__content">
              <h1>{data.title}</h1>
              <p>{data.description.length > 100 ? data.description.slice(0, 100) + "..." : data.description}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
