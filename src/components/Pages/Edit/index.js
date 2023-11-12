"use client";
import Layout from "@/components/Layout";
import LoginSignup from "@/components/LoginSignup";
import useUser from "@/redux/hooks/useUser";
import { useEffect, useRef, useState } from "react";
import DynamicInput from "@/components/Inputs/DynamicInput";
import Input from "@/components/Inputs/Input";
import styles from "@/styles/pages/Publish.module.scss";
import {
  faCircle,
  faCircleCheck,
  faCloudUpload,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { uploadImages, updateRecipe } from "@/services/recipe";
import { getRecipeBySlug } from "@/actions/recipe";
import RecipeSkeleton from "@/components/Skeleton/RecipeSkeleton";

function EditRecipe({ slug }) {
  const { isLoggedIn, user } = useUser();
  const [recipe, setRecipe] = useState(null);
  const [active, setActive] = useState(0);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("veg");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState("");
  const imgRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchRecipe = async () => {
    const res = await getRecipeBySlug(slug);
    if (!res) {
      setError(true);
      setLoading(false);
      return;
    }
    setRecipe(res);
    setIngredients(res.ingredients);
    setInstructions(res.instructions);
    setTitle(res.title);
    setTags(res.tags.join(", "));
    setCategory(res.category);
    setDescription(res.description);
    setVideo("https://www.youtube.com/watch?v=" + res.video);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  const handleIngredients = (values) => {
    setIngredients(values);
  };

  const handleInstructions = (values) => {
    setInstructions(values);
  };

  const handleImageSelect = (e) => {
    e.preventDefault();
    if (imgRef?.current) imgRef.current.click();
  };

  const handleImages = (e) => {
    e.preventDefault();
    const files = [...e.target.files];
    if (files.length > 0) {
      if (files.length > 4) {
        setImages(files.slice(0, 4));
        return;
      }
      setImages(files);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (active === 0 && ingredients.length === 0) {
      toast.error("Please add atleast one ingredient");
      return;
    }
    if (active === 1 && instructions.length === 0) {
      toast.error("Please add atleast one instruction");
      return;
    }
    if (
      active === 2 &&
      (!title.trim() || !description.trim() || !tags.trim())
    ) {
      const tagsArr = tags.split(",").map((tag) => tag.trim());
      if (tagsArr.length < 2) return toast.error("Please add atleast two tags");
      toast.error("Title and description are required");
      return;
    }
    setActive((prev) => prev + 1);
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    setActive((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!isLoggedIn) return toast.error("Please login to update recipe");
    if (user.role !== "admin" && recipe?.author?._id !== user?.id)
      return toast.error("You are not the author of this recipe");
    if (images.length > 4) {
      toast.error("Maximum 4 images are allowed");
      return;
    }
    if (
      ingredients.length === 0 ||
      instructions.length === 0 ||
      !title.trim() ||
      !description.trim()
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    const imgUrls = [];

    if (images.length !== 0) {
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
      try {
        setIsSubmitting(true);
        const res = await uploadImages(formData);
        if (res?.data?.images) {
          res.data.images.forEach((img) => {
            imgUrls.push(img);
          });
        }
      } catch (err) {
        setIsSubmitting(false);
        toast.error(err?.response?.data?.message || err?.message);
        return;
      }
    }

    if (imgUrls.length === 0) {
      for (let i = 0; i < recipe.images.length; i++) {
        imgUrls.push(recipe.images[i]);
      }
    }

    let videoId = "";
    if (video) {
      const match =
        /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/.exec(
          video
        );
      const id = match ? (match?.[2].length === 11 ? match[2] : null) : null;
      if (id != null) {
        videoId = id;
      } else {
        setIsSubmitting(false);
        toast.error("Invalid youtube video url!");
        return;
      }
    }

    const payload = {
      id: recipe._id,
      title,
      description,
      category,
      ingredients,
      instructions,
      images: imgUrls,
      video: videoId || "",
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    try {
      setIsSubmitting(true);
      const res = await updateRecipe(payload);
      toast.success(res?.data?.message);
      setActive(0);
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      toast.error(err?.response?.data?.message || err?.message);
    }
  };

  return (
    <Layout>
      {loading && (
        <div className={styles.loading}>
          <RecipeSkeleton />
        </div>
      )}
      {error && <div>Recipe not found</div>}
      {!loading && !error && (
        <>
          {isLoggedIn ? (
            <>
              <div className={styles.container}>
                <form
                  action=""
                  onSubmit={() => {}}
                  className="scroll"
                  encType="multipart/form-data"
                >
                  <fieldset className={active === 0 ? styles.active : ""}>
                    <h4>
                      <span className="gradient">Ingredients</span>
                    </h4>
                    <DynamicInput
                      onChange={handleIngredients}
                      placeholder="Ingredient "
                      limit={200}
                      data={recipe.ingredients}
                    />
                    <div className={styles.btns}>
                      <button onClick={handleNext}>Proceed Next</button>
                    </div>
                  </fieldset>
                  <fieldset className={active === 1 ? styles.active : ""}>
                    <h4>
                      <span className="gradient">Instructions</span>
                    </h4>
                    <DynamicInput
                      onChange={handleInstructions}
                      placeholder="Step "
                      limit={200}
                      data={recipe.instructions}
                    />
                    <div className={styles.btns}>
                      <button onClick={handlePrevious}>Previous</button>
                      <button onClick={handleNext}>Next</button>
                    </div>
                  </fieldset>
                  <fieldset className={active === 2 ? styles.active : ""}>
                    <h4>
                      <span className="gradient">Basic Details</span>
                    </h4>
                    <Input
                      type="text"
                      value={title}
                      placeholder="Title of the recipe"
                      onChange={setTitle}
                      id={"title"}
                    />
                    <Input
                      id={"tags"}
                      type="text"
                      value={tags}
                      placeholder="Tags: eg. tomato, potato, etc"
                      onChange={setTags}
                    />
                    <div className={styles.category}>
                      <div className={styles.category_label}>
                        <label htmlFor="category">Category</label>
                      </div>
                      <div className={styles.categories}>
                        <div
                          className={
                            category === "veg" ? styles.active_category : ""
                          }
                        >
                          <input
                            type="radio"
                            value="veg"
                            name="category"
                            id="veg"
                            defaultChecked
                            onChange={(e) => setCategory(e.target.value)}
                          />
                          <label htmlFor="veg">
                            <FontAwesomeIcon
                              icon={
                                category === "veg" ? faCircleCheck : faCircle
                              }
                              color="var(--green)"
                            />
                            <span>Veg</span>
                          </label>
                        </div>
                        <div
                          className={
                            category === "non-veg" ? styles.active_category : ""
                          }
                        >
                          <input
                            type="radio"
                            value="non-veg"
                            name="category"
                            id="non-veg"
                            onChange={(e) => setCategory(e.target.value)}
                          />
                          <label htmlFor="non-veg">
                            <FontAwesomeIcon
                              icon={
                                category === "non-veg"
                                  ? faCircleCheck
                                  : faCircle
                              }
                              color="#e6194c"
                            />
                            <span>Non-Veg</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <textarea
                        name="description"
                        id="desc"
                        cols="30"
                        rows="10"
                        placeholder="Short description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <div className={styles.btns}>
                      <button onClick={handlePrevious}>Previous</button>
                      <button onClick={handleNext}>Next</button>
                    </div>
                  </fieldset>
                  <fieldset className={active === 3 ? styles.active : ""}>
                    <h4>
                      <span className="gradient">Preview Images</span>
                    </h4>
                    <div className={styles.publish_images}>
                      <div
                        onClick={handleImageSelect}
                        className={styles.image_select}
                      >
                        <div className={styles.select}>
                          <div className={styles.header}>
                            {images.length > 0 ? (
                              <div className={styles.images}>
                                {images.map((image, i) => (
                                  <div className={styles.image} key={i}>
                                    <img
                                      src={URL.createObjectURL(image)}
                                      alt="preview"
                                      width="100%"
                                    />
                                  </div>
                                ))}
                              </div>
                            ) : recipe?.images?.length > 0 ? (
                              <div className={styles.images}>
                                {recipe.images.map((image, i) => (
                                  <div className={styles.image} key={i}>
                                    <img
                                      src={image}
                                      alt="preview"
                                      width="100%"
                                    />
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <>
                                <i>
                                  <FontAwesomeIcon icon={faCloudUpload} />
                                </i>
                                <span>Browse Images</span>
                              </>
                            )}
                          </div>
                          <div className={styles.footer}>
                            {images.length > 0 ? (
                              <span>{images.length} image selected</span>
                            ) : (
                              <span>No Image Selected</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <input
                        ref={imgRef}
                        type="file"
                        name="image"
                        id="image"
                        multiple
                        accept="image/*"
                        onChange={handleImages}
                      />
                    </div>
                    <div className={styles.video}>
                      <label htmlFor="video">Youtube Video (optional)</label>
                      <input
                        type="text"
                        value={video}
                        placeholder="Youtube video url"
                        onChange={(e) => setVideo(e.target.value)}
                      />
                    </div>
                    <div className={styles.btns}>
                      <button onClick={handlePrevious}>Previous</button>
                      <button onClick={handleSubmit}>
                        {isSubmitting ? (
                          <>
                            <span>Please Wait..</span>
                            <i>
                              <FontAwesomeIcon icon={faSpinner} spin />
                            </i>
                          </>
                        ) : (
                          <>
                            <span>Update Recipe</span>
                          </>
                        )}
                      </button>
                    </div>
                  </fieldset>
                </form>
              </div>
            </>
          ) : (
            <LoginSignup
              hideCloseBtn={true}
              isShowLogin={true}
              onClose={() => {}}
            />
          )}
        </>
      )}
    </Layout>
  );
}

export default EditRecipe;
