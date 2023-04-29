import { useState, useEffect } from "react";
import { useProductos } from "../../ProductosContext/ProductoProvider";

export function ReviewsProducto({ id_producto }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { getReviewsByProductId, getAvgRatingByProductId } = useProductos();
  const [reviews, setReviews] = useState([]);
  const [minStars, setMinStars] = useState(0);

  const [avgRating, setAvgRating] = useState(0);
  useEffect(() => {
    // Definir una función asincrónica dentro del useEffect para utilizar await
    const fetchData = async () => {
      try {
        const data = await getReviewsByProductId(id_producto);
        const AvgRating = await getAvgRatingByProductId(id_producto);

        if (data) {
          setReviews(data);
        }
        if (AvgRating) {
          setAvgRating(parseFloat(AvgRating).toFixed(2));

        } else {
          setAvgRating(0);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  function generateStars(rating) {
    const fullStars = Math.floor(rating); // Número de estrellas llenas
    const halfStars = Math.ceil(rating - fullStars); // Número de estrellas medias
    const emptyStars = 5 - fullStars - halfStars; // Número de estrellas vacías
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push({ type: "full" });
    }
    for (let i = 0; i < halfStars; i++) {
      stars.push({ type: "half" });
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push({ type: "empty" });
    }
    return stars;
  }

  return (
    <div>
      <h2>Reviews</h2>
      <div className="stars">
        {generateStars(avgRating).map((star, index) => (
          <box-icon
            key={index}
            name={star.type === "half" ? "star-half" : "star"}
            type={
              star.type === "full" || star.type === "half" ? "solid" : "regular"
            }
            color="#ffc107"
          />
        ))}
      </div>
      <p>Calificación promedio: {avgRating} %</p>

      <label>
        Filtrar por calificación mínima:
        <select
          value={minStars}
          onChange={(e) => setMinStars(Number(e.target.value))}
        >
          <option value={0}>Todas</option>
          <option value={1}>1 estrella</option>
          <option value={2}>2 estrellas</option>
          <option value={3}>3 estrellas</option>
          <option value={4}>4 estrellas</option>
          <option value={5}>5 estrellas</option>
        </select>
      </label>

      <ul>
        {reviews
          .filter((review) => {
            if (minStars === 0) {
              return true;
            } else {
              return review.calificacion == minStars;
            }
          })
          .map((review) => (
            <li key={review.id}>
              <h3>{review.titulo}</h3>
              <p>{review.comentario}</p>
              <div className="stars">
                <p style={{ display: "inline" }}>{review.calificacion}</p>{" "}
                {generateStars(review.calificacion).map((star, index) => (
                  <box-icon
                    key={index}
                    name={star.type === "half" ? "star-half" : "star"}
                    type={
                      star.type === "full" || star.type === "half"
                        ? "solid"
                        : "regular"
                    }
                    color="#ffc107"
                  />
                ))}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
