//componrents
import Header from "components/Header/Header";
import GalleryBlock from "components/GalleryBlock/GalleryBlock";
import { ReduxProvider } from "lib/ReduxProvider";
import Snowfall from 'react-snowfall'
import CvBlock from "components/CvBlock/CvBlock";
//styles
import styles from "./styles.module.scss"

function App() {
  return (
    <ReduxProvider>
      <Header />
      <main className={styles.main}>
        <GalleryBlock />
        <CvBlock />
      </main>
      <Snowfall />
    </ReduxProvider>
  );
}

export default App;
