import styled from '@emotion/styled';

const Contenedor = styled.div`
  color: #ffffff;
  font-family: 'Bebas Neue', cursive;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 30px;
`;

const Texto = styled.div`
  font-size: 18px;
  span {
    font-weight: bold;
    color: #ff9000;
  }
`;
const Imagen = styled.img`
  display: block;
  width: 120px;
`;

const Resultado = ({ resultado }) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCTHOUR, IMAGEURL, LASTUPDATE } =
    resultado;
  return (
    <Contenedor>
      <Imagen
        src={`https://www.cryptocompare.com//${IMAGEURL}`}
        alt="imagen cripto"
      />
      <div>
        <Texto>
          El precio es de: <span>{PRICE}</span>
        </Texto>
        <Texto>
          El precio mas alto del dia <span>{HIGHDAY}</span>
        </Texto>
        <Texto>
          El precio mas bajo del dia <span>{LOWDAY}</span>
        </Texto>
        <Texto>
          Variación en ultimas 24 horas: <span>{CHANGEPCTHOUR}</span>%
        </Texto>
        <Texto>
          Ultima actualizacion <span>{LASTUPDATE}</span>
        </Texto>
      </div>
    </Contenedor>
  );
};

export default Resultado;
