import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";

const CATEGORIES = gql`
  query GetCategories {
    categories {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

const Header = () => {
  const { data, error, loading } = useQuery(CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const categories = data.categories.data.map((category) => ({
    id: category.id,
    name: category.attributes.name,
  }));
  return (
    <div className="site-header">
      <Link to="/">
        <h1>Strapi Reviews</h1>
      </Link>
      <nav className="categories">
        <span>Filter reviews by category:</span>
        {categories.map((category) => (
          <Link key={category.id} to={`/category/${category.id}`}>
            {category.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Header;
