//styles
import styles from "./styles.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@splidejs/react-splide/css";
//libs
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { FC } from "react";
import { motion } from "framer-motion";
//@ts-ignore
import Slider from "react-slick";
import classNames from "classnames";
//utols
import lockScroll from "lib/utils/lockScroll";
import unlockScroll from "lib/utils/unlockScroll";
//redux
import { GetPhotosResponse } from "reduxFolder/api/users/types/GetImages";

interface Props {
  isModalOpen: boolean;
  onClose: () => void;
  images: GetPhotosResponse;
  startFrom: number;
  firstMount: boolean;
}

const ImageViewer: FC<Props> = ({ isModalOpen, onClose, images, startFrom, firstMount }) => {
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    if (isModalOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }, [isModalOpen]);

  useEffect(() => {
    return () => {
      unlockScroll();
    };
  }, []);

  const variants1 = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: startFrom,
  };

  return (
    <>
      <Portal>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={variants1}
          viewport={{ once: true, amount: 0.8 }}
          className={classNames(styles.modal__window, firstMount ? styles.firstMount : "")}
        >
          <Slider {...settings} ref={sliderRef} className={styles.slider}>
            {images.map((image) => (
              <div className={styles.slide} key={image.id}>
                <img className={styles.modalImage} src={image.urls.regular} width={800} height={548} alt={image.alt_description} />
                <div className={styles.imageData}>
                  <h6 className={styles.name}>{image.description || "No name"}</h6>
                  <p className={styles.author}>{image.user.name || "Unknown"}</p>
                </div>
              </div>
            ))}
          </Slider>
          <div onClick={() => onClose()} className={styles.closeImageModal}>
            <div onClick={onClose} className={styles.closeIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
              </svg>
            </div>
          </div>
        </motion.div>
      </Portal>
    </>
  );
};

interface PortalProps {
  children: React.ReactNode;
}

const Portal: React.FC<PortalProps> = ({ children }) => {
  const node = document.createElement("div");
  document.body.appendChild(node);

  return ReactDOM.createPortal(children, node);
};

export default ImageViewer;