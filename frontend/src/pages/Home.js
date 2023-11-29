import React from "react";
// import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const REVIEWS = gql`
  query GetReviews {
    reviews {
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

const Home = () => {
  // const { data, error, loading } = useFetch(
  //   "http://localhost:1337/api/reviews"
  // );

  const { data, error, loading } = useQuery(REVIEWS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  let reviews = null;

  if (data) {
    reviews = data.reviews.data.map((review) => ({
      id: review.id,
      title: review.attributes.title,
      rating: review.attributes.rating,
      body: review.attributes.body,
    }));
  }

  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id} className="review-card">
          <div className="rating">{review.rating}</div>
          <h2>{review.title}</h2>

          <small>console list</small>
          <p>{review.body.substring(0, 200)} ...</p>
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
