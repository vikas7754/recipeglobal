"use client";
import Layout from "@/components/Layout";
import { sendNotification } from "@/services/user";
import styles from "@/styles/pages/Contact/Contact.module.scss";
import {
  faGithub,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLocationDot,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { toast } from "react-toastify";
import useUser from "@/redux/hooks/useUser";

function ContactPage() {
  const { isLoggedIn } = useUser();
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    if (e.target.value.length > 500) return;
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      return toast.error("Please login to continue");
    }
    if (!message.trim()) {
      return toast.error("Please enter message");
    }
    const payload = {
      userId: "6504ac2858f27b67120b5cf3",
      message,
      category: "contact",
    };
    try {
      setSending(true);
      await sendNotification(payload);
      setSending(false);
      setMessage("");
      toast.success("Message sent successfully");
    } catch (err) {
      setSending(false);
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <Layout>
        <div className={styles.main}>
          <div className={styles.container}>
            <div className={styles.content}>
              <h1>Send Message</h1>
              <p>
                Send a message and our team will get back to you within 24
                hours.
              </p>
              <div className={styles.btns}>
                <a href="https://www.youtube.com/@freecodez" target="_blank">
                  <i>
                    <FontAwesomeIcon icon={faYoutube} />
                  </i>
                  <span>YouTube Channel</span>
                </a>
                <a href="mailto:freecodez.com@gmail.com" target="_blank">
                  <i>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </i>
                  <span>Email Address</span>
                </a>
                <a href="https://goo.gl/maps/RRpNVfhwSETyDips8" target="_blank">
                  <i>
                    <FontAwesomeIcon icon={faLocationDot} />
                  </i>
                  <span>Greater Noida UP IN</span>
                </a>
              </div>
              <div className={styles.social}>
                <a href="https://www.linkedin.com/in/vikas7754/">
                  <i>
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </i>
                </a>
                <a href="https://github.com/vikas7754">
                  <i>
                    <FontAwesomeIcon icon={faGithub} />
                  </i>
                </a>
                <a href="https://www.instagram.com/freecodez.dev/">
                  <i>
                    <FontAwesomeIcon icon={faInstagram} />
                  </i>
                </a>
                <a href="https://www.youtube.com/@freecodez">
                  <i>
                    <FontAwesomeIcon icon={faYoutube} />
                  </i>
                </a>
              </div>
            </div>
            <div className={styles.form}>
              <form action="" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="msg">Your Message</label>
                  <textarea
                    name="msg"
                    id="msg"
                    rows="10"
                    placeholder="Message"
                    value={message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className={styles.submit}>
                  <button type="submit" disabled={sending}>
                    {sending ? (
                      <>
                        <span>Message Sending...</span>
                        <FontAwesomeIcon icon={faSpinner} spin />
                      </>
                    ) : (
                      "Send Your Message"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default ContactPage;
