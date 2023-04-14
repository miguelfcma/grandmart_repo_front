import { useState } from "react";

export function ReviewsProducto() {
  const [reviews, setReviews] = useState([
    { id: 1, author: "Juan Perez", content: "Me encantó el producto", rating: 4 },
    { id: 2, author: "Maria Rodriguez", content: "No cumplió mis expectativas", rating: 2 },
    { id: 3, author: "Pedro Gomez", content: "Excelente calidad y precio", rating: 5 }
  ]);

  const [newReview, setNewReview] = useState({
    author: "",
    content: "",
    rating: 0
  });

  const handleInputChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = reviews.length + 1;
    setReviews([...reviews, { id, ...newReview }]);
    setNewReview({ author: "", content: "", rating: 0 });
  };

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
            <p>Rating: {review.rating}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <h3>Add a review</h3>
        <label>
          Author:
          <input type="text" name="author" value={newReview.author} onChange={handleInputChange} />
        </label>
        <label>
          Content:
          <textarea name="content" value={newReview.content} onChange={handleInputChange} />
        </label>
        <label>
          Rating:
          <input type="number" name="rating" value={newReview.rating} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
