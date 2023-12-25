//styles
import styles from "./styles.module.scss"
//libs
import { motion } from "framer-motion"
import { FC } from "react"
//componenys
//types
import { PhotoType } from "reduxFolder/api/users/types";

const variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
    }
  },
};

interface Props extends PhotoType {
  onClick: (arg?: any) => void
}

const GalleryCard: FC<Props> = ({ links, user, id, description, alt_description, blur_hash, onClick }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={variants}
      viewport={{ once: true, amount: 0.8 }}
      onClick={onClick}
      className={styles.card}>
      <img alt={alt_description} src={links.download} className={styles.image} />
      <h6 className={styles.name}>
        {description || "No name"}
      </h6>
      <p className={styles.author}>
        {user.name || "Unknown"}
      </p>
    </motion.div>
  )
}

export default GalleryCard