import useUser from "@/redux/hooks/useUser";
import styles from "@/styles/Buttons/Rating.module.scss";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Rating({ id, currentRating, isRated }) {
  const { isLoggedIn } = useUser();
  const [rating, setRating] = useState(currentRating);

  useEffect(() => {
    setRating(currentRating);
  }, [currentRating]);

  const handleRating = async (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      toast.error("You need to login first");
      return;
    }
    if (isRated) {
      e.preventDefault();
      return;
    }
    setRating(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.rating}
        style={{
          "--fill":
            rating <= 1
              ? "#f71e4d"
              : rating <= 3
              ? "var(--primary)"
              : "var(--green)",
        }}
      >
        <input
          type="radio"
          name={id}
          id={`${id}-5`}
          value={5}
          defaultChecked={rating === 5}
          onChange={handleRating}
        />
        <label htmlFor={`${id}-5`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              pathLength="360"
              d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
            ></path>
          </svg>
        </label>

        <input
          type="radio"
          name={id}
          id={`${id}-4`}
          value={4}
          defaultChecked={rating === 4}
          onChange={handleRating}
        />
        <label htmlFor={`${id}-4`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              pathLength="360"
              d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
            ></path>
          </svg>
        </label>

        <input
          type="radio"
          name={id}
          id={`${id}-3`}
          value={3}
          defaultChecked={rating === 3}
          onChange={handleRating}
        />
        <label htmlFor={`${id}-3`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              pathLength="360"
              d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
            ></path>
          </svg>
        </label>

        <input
          type="radio"
          name={id}
          id={`${id}-2`}
          value={2}
          defaultChecked={rating === 2}
          onChange={handleRating}
        />
        <label htmlFor={`${id}-2`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              pathLength="360"
              d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
            ></path>
          </svg>
        </label>
        <input
          type="radio"
          name={id}
          id={`${id}-1`}
          value={1}
          defaultChecked={rating === 1}
          onChange={handleRating}
        />
        <label htmlFor={`${id}-1`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              pathLength="360"
              d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
            ></path>
          </svg>
        </label>
      </div>
      {rating !== 0 && (
        <div className={styles.currentRating}>
          <span
            style={{
              color:
                rating <= 1
                  ? "#f71e4d"
                  : rating <= 3
                  ? "var(--primary)"
                  : "var(--green)",
            }}
          >
            ( {rating} )
          </span>
        </div>
      )}
    </div>
  );
}

export default Rating;
