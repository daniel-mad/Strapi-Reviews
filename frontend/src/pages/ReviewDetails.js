import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import Category from "./Category";
// import useFetch from "../hooks/useFetch";
import ReactMarkdown from "react-markdown";

const REVIEW = gql`
  query GetReview($id: ID!) {
    review(id: $id) {
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
`;

const ReviewDetails = () => {
  const { id } = useParams();
  // const { data, error, loading } = useFetch(`http://localhost:1337/api/reviews/${id}`);
  const { data, error, loading } = useQuery(REVIEW, {
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const review = {
    id: data.review.data.id,
    title: data.review.data.attributes.title,
    rating: data.review.data.attributes.rating,
    body: data.review.data.attributes.body,
    categories: data.review.data.attributes.categories.data.map((category) => ({
      id: category.id,
      name: category.attributes.name,
    })),
  };

  return (
    <div className="review-card">
      <div className="rating">{review.rating}</div>
      <h2>{review.title}</h2>

      {review.categories.map((c) => (
        <small key={c.id}>{c.name}</small>
      ))}
      <ReactMarkdown>{review.body}</ReactMarkdown>
    </div>
  );
};

export default ReviewDetails;
