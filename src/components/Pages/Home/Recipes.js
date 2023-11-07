import Recipe from "@/components/Cards/Recipe";
import styles from "@/styles/pages/home/Recipes.module.scss";

const data = [
  {
    _id: "1",
    title: "Potato Roti Recipe Potato Roti Recipe Potato Roti Recipe",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. loremkfjbvhif jvb fbvf jvfd ubvf jvfdhjvhbfvf djvfduhbv",
    category: "veg",
    tags: ["potato", "roti"],
    image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
    rating: 4,
    author: {
      username: "user1",
      image:
        "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
    },
    createdAt: "2021-08-01T12:00:00.000Z",
  },
  {
    _id: "2",
    title: "Potato Roti Recipe Potato Roti Recipe Potato Roti Recipe",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. loremkfjbvhif jvb fbvf jvfd ubvf jvfdhjvhbfvf djvfduhbv",
    category: "non-veg",
    tags: ["potato", "roti"],
    image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
    rating: 3,
    isRated: true,
    author: {
      username: "user1",
      image:
        "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
    },
    createdAt: "2021-08-01T12:00:00.000Z",
  },
  {
    _id: "3",
    title: "Potato Roti Recipe Potato Roti Recipe Potato Roti Recipe",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. loremkfjbvhif jvb fbvf jvfd ubvf jvfdhjvhbfvf djvfduhbv",
    category: "non-veg",
    tags: ["potato", "roti"],
    image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
    rating: 0,
    isRated: false,
    author: {
      username: "user1",
      image:
        "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
    },
    createdAt: "2021-08-01T12:00:00.000Z",
  },
];

function Recipes() {
  return (
    <div className={styles.recipes}>
      {data.map((recipe, i) => (
        <Recipe key={i} data={recipe} />
      ))}
    </div>
  );
}

export default Recipes;
