import { useEffect, useState } from "react";
import { getCategories } from "../../api/category";
import { getDataByQueryType } from "../../utils/queryType";
import './category.scss'
import { Link } from "react-router-dom";

const CategoryList = ({ queryType, onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const categoryHandler = async (id) => {
    try {
      setActiveCategoryId(id);
      const data = await getDataByQueryType(queryType, id);
      onCategorySelect(data.blogs || data.events || data.services);
    } catch (error) {
      console.error('Error fetching data by category:', error);
      onCategorySelect([]);
    }
  };

  const handleStaticLink = () => {
    setActiveCategoryId(null);
    onCategorySelect(null);
  };

  return (
    <ul className='categories'>
      <li
        className={activeCategoryId === null ? 'active' : ''}
        onClick={handleStaticLink}
      >
        <Link to={`/${queryType}`}>Hamısı</Link>
      </li>
      {categories &&
        categories.map((item) => (
          <li 
            key={item.id} 
            onClick={() => categoryHandler(item.id)} 
            className={item.id === activeCategoryId ? 'active' : ''}
          >
            <span>{item.title}</span>
          </li>
        ))}
    </ul>
  );
};

export default CategoryList;
