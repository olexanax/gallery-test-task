//componrents
import Header from "components/Header/Header";
import GalleryBlock from "components/GalleryBlock/GalleryBlock";
import { ReduxProvider } from "lib/ReduxProvider";
//styles
import styles from "./styles.module.scss"

function App() {
  return (
    <ReduxProvider>
      <Header />
      <main className={styles.main}>
        <GalleryBlock />
      </main>
    </ReduxProvider>
  );
}

export default App;
