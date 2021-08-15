import './App.scss';
import CardForm, { IFormInputs } from './components/CardForm/CardForm';

const App = () => (
  <main>
    <CardForm
      onSubmitSuccess={(data: IFormInputs) =>
        alert(`Form submitted!\n${JSON.stringify(data)}`)
      }
    />
  </main>
);

export default App;
