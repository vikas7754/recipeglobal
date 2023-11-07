"use client";
import DynamicInput from "@/components/Inputs/DynamicInput";
import Input from "@/components/Inputs/Input";
import Layout from "@/components/Layout";
import styles from "@/styles/pages/Publish.module.scss";
import {
  faCircle,
  faCircleCheck,
  faCloudUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

function PublishRecipe() {
  const imgRef = useRef(null);
  const [active, setActive] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("veg");

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
    if (active === 2 && (!title.trim() || !description.trim())) {
      toast.error("Title and description are required");
      return;
    }
    setActive((prev) => prev + 1);
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    setActive((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0) {
      toast.error("Please select atleast one image");
      return;
    }
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
    const formData = new FormData();
    formData.append("images", images);
    const imgUrls = [];
    try {
    } catch (err) {
      console.log(err);
    }

    if (imgUrls.length === 0) {
      toast.error("Something went wrong");
      return;
    }

    const payload = {
      title,
      description,
      category,
      ingredients,
      instructions,
      images: imgUrls,
    };
    try {
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout>
      <div className={styles.container}>
        <div></div>
        <form action="" onSubmit={() => {}} className="scroll">
          <fieldset className={active === 0 ? styles.active : ""}>
            <h4>
              <span className="gradient">Ingredients</span>
            </h4>
            <DynamicInput
              onChange={handleIngredients}
              placeholder="Ingredient "
              limit={200}
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
            <div className={styles.category}>
              <div className={styles.category_label}>
                <label htmlFor="category">Category</label>
              </div>
              <div className={styles.categories}>
                <div
                  className={category === "veg" ? styles.active_category : ""}
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
                      icon={category === "veg" ? faCircleCheck : faCircle}
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
                      icon={category === "non-veg" ? faCircleCheck : faCircle}
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
              <div onClick={handleImageSelect} className={styles.image_select}>
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
            <div className={styles.btns}>
              <button onClick={handlePrevious}>Previous</button>
              <button onClick={handleSubmit}>Publish</button>
            </div>
          </fieldset>
        </form>
      </div>
    </Layout>
  );
}

export default PublishRecipe;