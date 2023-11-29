import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      data {
        id
        attributes {
          name
          reviews {
            data {
              id
              attributes {
                title
                rating
                body
                categories {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Category = () => {
  const { id } = useParams();
  const { data, error, loading } = useQuery(CATEGORY, {
    variables: { id: id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const mapCategory = (data) => {
    if (!data) {
      return null;
    }
    const { id, attributes } = data;
    return {
      id,
      name: attributes.name,
      reviews: attributes.reviews?.data?.map(mapReviews),
    };
  };

  const mapReviews = (review) => {
    const { id, attributes } = review;

    return {
      id,
      rating: attributes.rating,
      title: attributes.title,
      body: attributes.body,
      categories: attributes.categories?.data?.map(mapCategory),
    };
  };

  const category = mapCategory(data.category.data);

  return (
    <div>
      <h2>{category.name}</h2>
      {category.reviews?.map((review) => (
        <div key={review.id} className="review-card">
          <div className="rating">{review.rating}</div>
          <h2>{review.title}</h2>

          {review.categories.map((c) => (
            <small key={c.id}>{c.name}</small>
          ))}

          <ReactMarkdown>{`${review.body.substring(0, 200)}...`}</ReactMarkdown>
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
};

export default Category;
