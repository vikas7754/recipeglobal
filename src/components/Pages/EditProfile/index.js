"use client";
import Input from "@/components/Inputs/Input";
import Layout from "@/components/Layout";
import LoginSignup from "@/components/LoginSignup";
import useUser from "@/redux/hooks/useUser";
import { useEffect, useState } from "react";
import { updateUserInfo, uploadImages } from "@/services/recipe";
import { toast } from "react-toastify";
import styles from "@/styles/pages/UpdateProfile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

function EditProfile() {
  const router = useRouter();
  const { isLoggedIn, user } = useUser();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setUsername(user.username);
    }
  }, [user]);

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) return toast.error("Please login to update profile");
    if (!name.trim() || !username.trim()) {
      toast.error("All fields are required");
      return;
    }
    setUpdating(true);
    let imgUrl = user?.image;
    if (image) {
      const formData = new FormData();
      formData.append("images", image);
      try {
        const { data } = await uploadImages(formData);
        const { images } = data;
        imgUrl = images[0];
      } catch (err) {
        setUpdating(false);
        toast.error(err?.response?.data?.message || err?.message);
        return;
      }
    }
    try {
      const payload = { name, username, image: imgUrl };
      await updateUserInfo(payload);
      toast.success("Profile updated successfully");
      router.push(`/u/${username}`);
      setUpdating(false);
    } catch (err) {
      setUpdating(false);
      toast.error(err?.response?.data?.message || err?.message);
    }
  };
  return (
    <Layout>
      {isLoggedIn ? (
        <>
          <div className={styles.container}>
            <form action="" onSubmit={handleSubmit}>
              <div className={styles.img}>
                <label htmlFor="image">
                  <img
                    src={image ? URL.createObjectURL(image) : user?.image}
                    alt="image"
                    className={""}
                  />
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={onImageChange}
                  accept="image/*"
                />
              </div>
              <Input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(v) => setName(v)}
              />
              <Input
                type="text"
                placeholder="Your username"
                value={username}
                onChange={(v) => setUsername(v)}
              />
              <div className={styles.link}>
                <a href="https://freecodez.com/forgotPassword" target="_blank">
                  Change Password
                </a>
              </div>
              <div className={styles.btn}>
                <button type="submit">
                  {updating ? (
                    <>
                      <span>Updating...</span>
                      <i>
                        <FontAwesomeIcon icon={faSpinner} spin />
                      </i>
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </button>
              </div>
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
    </Layout>
  );
}

export default EditProfile;
