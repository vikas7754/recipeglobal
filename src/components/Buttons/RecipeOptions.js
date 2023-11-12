"use client";
import { faEdit, faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/Buttons/RecipeOptions.module.scss";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { deleteRecipe } from "@/services/recipe";

function RecipeOptions({ slug, id, onDelete }) {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await deleteRecipe(id);
      setLoading(false);
      setShow(false);
      toast.success("Recipe deleted successfully");
      onDelete(true);
    } catch (err) {
      setLoading(false);
      toast.error(err?.response?.data?.message || err?.message);
    }
  };
  return (
    <>
      <div className={styles.container}>
        {show &&
          createPortal(
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <h3>Are you sure you want to delete this recipe?</h3>
                <div className={styles.modalActions}>
                  <button className="btn" onClick={handleDelete}>
                    {loading ? (
                      <>
                        <span>Deleting..</span>
                        <FontAwesomeIcon icon={faSpinner} spin />
                      </>
                    ) : (
                      <>
                        <span>Yes</span>
                        <FontAwesomeIcon icon={faTrash} />
                      </>
                    )}
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      setShow(false);
                    }}
                  >
                    <span>No</span>
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )}
        <button className="btn" onClick={() => setShow(true)}>
          <span>Delete</span>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <Link href={`/edit/${slug}`}>
          <span>Edit</span>
          <FontAwesomeIcon icon={faEdit} />
        </Link>
      </div>
    </>
  );
}

export default RecipeOptions;
