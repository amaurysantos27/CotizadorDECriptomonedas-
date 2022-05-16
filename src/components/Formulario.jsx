import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useSelectMonedas from '../hooks/useSelectMonedas';
import { monedas } from '../data/moneda';
import Error from './Error';

const InputSubmit = styled.input`
  background-color: #66a2fe;
  border: none;
  width: 100%;
  padding: 10px;
  color: #ffffff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 20px;
  border-radius: 20px;
  transition: background-color 0.3s ease;
  margin-top: 30px;
  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const Formulario = ({ setMonedas }) => {
  const [cripto, setCripto] = useState([]);
  const [error, setError] = useState(false);
  const [moneda, SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas);
  const [CriptoMonedas, SelectCriptoMonedas] = useSelectMonedas(
    'Elige tu Criptomoneda',
    cripto
  );

  useEffect(() => {
    const consultarAPI = async () => {
      const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      const arrayCriptos = resultado.Data.map((cripto) => {
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        };
        return objeto;
      });

      setCripto(arrayCriptos);
    };
    consultarAPI();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    //validar que ambos campos esten llenos
    if ([moneda, CriptoMonedas].includes('')) {
      setError(true);
      return;
    }

    setError(false);
    //pasar los datos al componente principal

    setMonedas({
      moneda,
      CriptoMonedas,
    });
  };

  return (
    <>
      {error ? (
        <Error className="error">Todos los campos son obligatorios</Error>
      ) : null}
      <form onSubmit={handleSubmit}>
        <SelectMonedas />
        <SelectCriptoMonedas />

        {moneda}
        {CriptoMonedas}
        <InputSubmit type="submit" />
      </form>
    </>
  );
};

export default Formulario;
