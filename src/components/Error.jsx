import styled from '@emotion/styled';

const Texto = styled.div`
  background-color: #b7322c;
  color: #ffffff;
  padding: 10px;
  font-size: 15px;
  text-tranform: uppercase;
  font-font-family: 'Roboto';
  text-align: center;
`;

const Error = ({ children }) => {
  return <Texto>{children}</Texto>;
};

export default Error;
