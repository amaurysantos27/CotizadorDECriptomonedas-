import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import imagenCripto from './img/imagen-criptos.png';
import Formulario from './components/formulario';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 772px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;
const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;
const Heading = styled.h1`
  color: #fff;
  font-size: 2rem;
  color: #ffffff;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50 px;
  font-size: 34px;

  &::after {
    content: '';
    width: 400px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin-top: 20px;
  }
`;

function App() {
  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const cotizarCripto = async () => {
        setCargando(true);
        const { moneda, CriptoMonedas } = monedas;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${CriptoMonedas}&tsyms=${moneda}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setResultado(resultado.DISPLAY[CriptoMonedas][moneda]);
        setCargando(false);
      };
      cotizarCripto();
    }
  }, [monedas]);

  return (
    <Contenedor>
      <Imagen src={imagenCripto} alt="imagen cripto" />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario setMonedas={setMonedas} />
        {cargando && <Spinner />}
        {resultado.PRICE && <Resultado resultado={resultado} />}
      </div>
    </Contenedor>
  );
}

export default App;
