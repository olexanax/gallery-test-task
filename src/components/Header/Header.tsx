//components
import Button from "components/UI/Button/Button"
//utlis
import scrollTo from "lib/utils/scrollTo"
//styels
import styles from "./styles.module.scss"


const Header = () => {

  const scrollToSection = (sectionId: string) => {
    scrollTo(sectionId)
  };

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <img alt="logo" src={"https://www.agora.software/wp-content/uploads/2021/09/logo-agora-software.svg"} />
        <nav className={styles.nav}>
          <Button onClick={() => scrollToSection('gallery')}>
            Gallery
          </Button>
          <Button onClick={() => scrollToSection('cv')}>
            CV
          </Button>
        </nav>
      </div>
    </header>
  )
}

export default Header