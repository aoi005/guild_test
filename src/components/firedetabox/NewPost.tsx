import React from "react";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "./firebase";

const NewPost = () => {
  const [selecttags, settags] = useState<string[]>([]);
  const alltags = ["aa", "bb", "cc", "dd", "ee", "ff", "gg", "hh", "ii", "jj"];
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    const isChecked: boolean = event.target.checked;
    if (isChecked) {
      settags((prevValues) => [...prevValues, value]);
    } else {
      settags((prevValues) => prevValues.filter((v) => v !== value));
    }
  };

  const [title, setTitle] = useState("");
  const [detail, setDetil] = useState("");
  const [name, setName] = useState("");
  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "posts"), {
        title: title,
        name: name,
        detail: detail,
        tags: selecttags,
        created_at: new Date().getTime(),
      });
      setTitle("");
      setName("");
      setDetil("");
      settags([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <p>新規投稿</p>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            value={title}
            placeholder="タイトル"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            value={name}
            placeholder="プレイヤー名"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            value={detail}
            placeholder="内容"
            onChange={(e) => setDetil(e.target.value)}
          />
        </div>
        <div>
          {alltags.map((tag, index) => (
            <label key={tag}>
              {tag}
              <input
                type="checkbox"
                value={tag}
                onChange={handleCheckboxChange}
                checked={selecttags.includes(tag)}
              />
              {index < alltags.length - 1 && "  "}
            </label>
          ))}
        </div>
        <div>Selected values: {selecttags.join(", ")}</div>
        <button type="submit">投稿</button>
      </form>
    </>
  );
};

export default NewPost;