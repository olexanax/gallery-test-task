import ReactDOM from 'react-dom/client';
import 'styles/styles.scss';
import App from 'components/App/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App />
);