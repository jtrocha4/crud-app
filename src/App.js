import './App.css';
import Formulario from './components/Formulario';

// Corregir url de las imagenes, que no sean las mismas para cada usuario.
// Y validar que no se repitan los usuarios.

function App() {
  return (
    <div className="App">
      <h1>Crud app</h1>
      <Formulario></Formulario>
    </div>
  );
}

export default App;
