import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";

import arrowRight from '../../../../assets/images/arrow-right.svg'
import eventImg from '../../../../assets/images/event.jpg'
import "../blog.scss";
import BlogCard from "../../../../components/Blog";
import { getBlogDetails } from "../../../../api/blog";
import AlertMessage from "../../../../components/Alert";
import { getFormattedDate } from "../../../../utils/date";
import Loader from '../../../../components/Loader';

const BlogDetails = () => {
  const { slug } = useParams()
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBlogDetails(slug);
        setData(response);
      } catch (error) {
        console.log(error);
        setData(null);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />
  }

  if (!data) {
    return <AlertMessage text='Göstəriləcək məlumat yoxdur'/>;
  }

  return (
    <div className="blog-details-page">
        <Helmet>
        <title>{data.blog.title} | Bloq Detalları</title>
        <meta name="description" content={data.blog.description.substring(0, 160)} />
        <meta property="og:title" content={data.blog.title} />
        <meta property="og:description" content={data.blog.description.substring(0, 160)} />
        <meta property="og:image" content={`${process.env.REACT_APP_IMAGE_URL}blogs/${data.blog.image}`} />
        <meta property="og:url" content={`${window.location.origin}/bloqlar/${slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Beelik Bloqlar",
            "description": "Beelik platformasında müxtəlif mövzular haqqında ən son bloqları oxuyun.",
            "url": "https://beelik.az/bloqlar",
            "blogPost": data.relatedBlogs.map(blog => ({
              "@type": "BlogPosting",
              "headline": blog.title,
              "description": blog.description,
              "url": `https://beelik.az/bloqlar/${blog.slug}`,
              "datePublished": blog.createDate,
              "author": {
                "@type": "Person",
                "name": "Beelik"
              },
              "image": `${process.env.REACT_APP_IMAGE_URL}blogs/${blog.image}`
            }))
          })}
        </script>
      </Helmet>
      <div className="details">
        <div className="breadcrumb">
          <ul>
            <li>
              <Link to="/">Ana səhifə</Link>
            </li>
            <li>
              <img src={arrowRight} alt="" />
            </li>
            <li>
              <Link to="/bloqlar">Bloqlar</Link>
            </li>
            <li>
              <img src={arrowRight} alt="" />
            </li>
            <li>
              <Link to={`/bloqlar/${data.blog.id}`}>{data.blog.title}</Link>
            </li>
          </ul>
        </div>
        <div className="details__wrap">
            <div className="details__wrap__title">
                <h1>{data.blog.title}</h1>
                <ul>
                    <li>
                        <span>{getFormattedDate(data.blog.createDate)}</span>
                    </li>
                    <li>
                        <span>|</span>
                    </li>
                    <li>
                        <span>{data.blog.readTime} dəq oxuma vaxtı</span>
                    </li>
                </ul>
            </div>
            <div className="details__wrap__image">
                <img src={`${process.env.REACT_APP_IMAGE_URL}blogs/${data.blog.image}`} alt={data.blog.title} oading="lazy"/>
            </div>
            <div className="details__wrap__content">
              <div dangerouslySetInnerHTML={{ __html: data.blog.description }} />
            </div>
        </div>
        {
          data.relatedBlogs.length > 0 && <div className="similar-blogs">
          <h2>Oxşar bloqlar</h2>
          <div className="similar-blogs__list">
              {
                data.relatedBlogs.map(item => {
                  return(
                    <BlogCard key={item.id} data={item}/>
                  )
                })
              }
          </div>
      </div>
        }
        
      </div>
    </div>
  );
};

export default BlogDetails;
