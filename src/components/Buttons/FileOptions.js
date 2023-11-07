"use client";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import {
  faCheck,
  faEllipsis,
  faSpinner,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
  deleteFile,
  renameFile,
  makeFilePrivate,
  makeFilePublic,
} from "@/services/post";
import { toast } from "react-toastify";

const langs = [
  { language: "c", ext: "c", name: "C", icon: "/images/program/c.svg" },
  { language: "cpp", ext: "cpp", name: "C++", icon: "/images/program/cpp.svg" },
  {
    language: "java",
    ext: "java",
    name: "Java",
    icon: "/images/program/java.svg",
  },
  {
    language: "python3",
    ext: "py",
    name: "Python 3",
    icon: "/images/program/py.svg",
  },
  {
    language: "javascript",
    ext: "js",
    name: "JavaScript",
    icon: "/images/program/js.svg",
  },
  {
    language: "typescript",
    ext: "ts",
    name: "TypeScript",
    icon: "/images/program/ts.svg",
  },
  {
    language: "csharp",
    ext: "cs",
    name: "C#",
    icon: "/images/program/cs.svg",
  },
  {
    language: "golang",
    ext: "go",
    name: "GoLang",
    icon: "/images/program/go.svg",
  },
  {
    language: "ruby",
    ext: "rb",
    name: "Ruby",
    icon: "/images/program/rb.svg",
  },
  {
    language: "swift",
    ext: "swift",
    name: "Swift",
    icon: "/images/program/swift.svg",
  },
  {
    language: "bash",
    ext: "sh",
    name: "Bash",
    icon: "/images/program/sh.svg",
  },
  {
    language: "scala",
    ext: "scala",
    name: "Scala",
    icon: "/images/program/scala.svg",
  },
  {
    language: "kotlin",
    ext: "kt",
    name: "Kotlin",
    icon: "/images/program/kt.svg",
  },
  {
    language: "rust",
    ext: "rs",
    name: "Rust",
    icon: "/images/program/rs.svg",
  },
  {
    language: "php",
    ext: "php",
    name: "PHP",
    icon: "/images/program/php.svg",
  },
  {
    language: "dart",
    ext: "dart",
    name: "Dart",
    icon: "/images/program/dart.svg",
  },
  {
    language: "plaintext",
    ext: "txt",
    name: "Plain Text",
    icon: "/images/program/txt.svg",
  },
];

function FileOptions({
  id,
  directoryId,
  fileTitle,
  className,
  renameClass,
  onDelete,
  onRename,
  isPrivate,
  onPrivateToggle,
}) {
  const containerRef = useRef(null);
  const btnRef = useRef(null);
  const formRef = useRef(null);
  const [showActions, setShowActions] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTitle(fileTitle);
  }, [fileTitle]);
  const handleDelete = async (e) => {
    e.preventDefault();
    if (deleting) return;
    setDeleting(true);
    try {
      await deleteFile(id);
      onDelete(id);
      setDeleting(false);
      setShowActions(false);
    } catch (err) {
      setDeleting(false);
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };
  const handleRename = async (e) => {
    e.preventDefault();
    if (renaming || !title.trim()) return;
    const ext = title.split(".").pop();
    const lang = langs.find((l) => l.ext === ext);
    if (!lang) return toast.error("Invalid file extension");
    const payload = {
      id,
      directoryId,
      title: title.trim(),
      language: lang,
    };
    setRenaming(true);
    try {
      await renameFile(payload);
      setRenaming(false);
      onRename(id, title, lang);
      setShow(false);
    } catch (err) {
      setRenaming(false);
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };
  const inputRef = (node) => {
    if (node && show) node.focus();
  };
  const rename = (e) => {
    e.preventDefault();
    setShow(true);
    setShowActions(false);
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target) &&
        !btnRef.current.contains(e.target)
      ) {
        setShowActions(false);
      }
    };
    const hideForm = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", hideForm);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", hideForm);
    };
  }, []);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const privateFile = async (e) => {
    e.preventDefault();
    try {
      const { data } = await makeFilePrivate(id);
      toast.success(data.message);
      setShowActions(false);
      onPrivateToggle(id, true);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };
  const publicFile = async (e) => {
    e.preventDefault();
    try {
      const { data } = await makeFilePublic(id);
      toast.success(data.message);
      setShowActions(false);
      onPrivateToggle(id, false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <div className={className}>
        <button ref={btnRef} onClick={() => setShowActions(!showActions)}>
          <Icon icon={faEllipsis} />
        </button>
        {showActions && (
          <div ref={containerRef}>
            <button onClick={handleDelete}>
              {deleting ? "Deleting.." : "Delete"}
            </button>
            <button onClick={rename}>Rename</button>
            <button onClick={isPrivate ? publicFile : privateFile}>
              {isPrivate ? "Public" : "Private"}
            </button>
          </div>
        )}
      </div>
      {show && (
        <form ref={formRef} className={renameClass} onSubmit={handleRename}>
          <input
            ref={inputRef}
            type="text"
            placeholder="new title"
            value={title}
            onChange={handleChange}
          />
          {title && title !== fileTitle ? (
            <button type="submit" disabled={renaming}>
              <Icon icon={renaming ? faSpinner : faCheck} spin={renaming} />
            </button>
          ) : (
            <span onClick={() => setShow(false)}>
              <Icon icon={faTimes} />
            </span>
          )}
        </form>
      )}
    </>
  );
}

export default FileOptions;
