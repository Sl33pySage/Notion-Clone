import styles from "./Cover.module.css";
import { useRef, type ChangeEventHandler } from "react";
export const Cover = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onChangeCoverImage = () => {
    fileInputRef.current?.click();
  };
  const onCoverImageUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    const target = event.target;
    console.log(target?.files?.[0]);
  };
  return (
    <div className={styles.cover}>
      <img className={styles.image} src="" alt="Cover" />
      <button onClick={onChangeCoverImage} className={styles.button}>
        Change cover
      </button>
      <input
        onChange={onCoverImageUpload}
        style={{ display: "none" }}
        ref={fileInputRef}
        type="file"
      />
    </div>
  );
};
