import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
// import useFetch from "../hooks/useFetch";

const REVIEW = gql`
  query GetReview($id: ID!) {
    review(id: $id) {
      data {
        id
        attributes {
          title
          rating
          body
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
  };

  return (
    <div className="review-card">
      <div className="rating">{review.rating}</div>
      <h2>{review.title}</h2>

      <small>console list</small>
      <p>{review.body}</p>
    </div>
  );
};

export default ReviewDetails;
