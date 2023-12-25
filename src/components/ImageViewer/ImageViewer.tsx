"use client"
//styles
import styles from "./styles.module.scss";
import "@splidejs/react-splide/css";
import { useEffect } from "react"
import ReactDOM from "react-dom"
import { FC } from "react"
//libs
import { motion } from 'framer-motion';
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
//utils
import lockScroll from "lib/utils/lockScroll";
import unlockScroll from "lib/utils/unlockScroll";
//images
import { GetPhotosResponse } from "reduxFolder/api/users/types/GetImages";
import classNames from "classnames";


interface Props {
  isModalOpen: boolean
  onClose: () => void,
  images: GetPhotosResponse,
  startFrom: number
  firstMount: boolean
}

const ImageViewer: FC<Props> = ({ isModalOpen, onClose, images, startFrom, firstMount }) => {

  useEffect(() => {
    if (isModalOpen) {
      lockScroll()
    } else {
      unlockScroll()
    }
  }, [isModalOpen])

  useEffect(() => {
    return () => {
      unlockScroll()
    }
  }, [])

  const variants1 = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      }
    },
  };

  const options = {
    rewind: true,
    type: "loop",
    perPage: 1,
    pagination: false,
    start: startFrom
  }

  return (
    <>
      <Portal>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={variants1}
          viewport={{ once: true, amount: 0.8 }}
          className={classNames(styles.modal__window, firstMount ? styles.firstMount : '')} >
          <Splide
            {...{ options }}
            className={styles.slider}
          >
            {images.map((image) => (
              <SplideSlide className={styles.slide} key={image.id}>
                <img className={styles.modalImage} src={image.links.download} width={800} height={548} alt="" />
              </SplideSlide>
            ))}
          </Splide>
          <div onClick={() => onClose()} className={styles.closeImageModal} >
            <div onClick={onClose} className={styles.closeIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
              </svg>
            </div>
          </div>
        </motion.div>
      </Portal>
    </>
  )
}

interface PortalProps {
  children: React.ReactNode;
}

const Portal: React.FC<PortalProps> = ({ children }) => {
  const node = document.createElement("div");
  document.body.appendChild(node);

  return ReactDOM.createPortal(children, node);
};
export default ImageViewer