import styled from 'styled-components'

export const H1 = styled.h1`
  font-size: 24px;
  text-align: center;
  color: black;
  font-weight : bold;
  margin-top : 20px;
  margin-bottom : 20px;
`;

export const Logo = styled.img`
  margin-bottom: -30px;
  height: 150px;
`;

export const StripedListLine = styled.div`
  background-color: #e6b3ff;
`;

export const ButtonStyled = styled.button`
  font-size : 16px;
  border: 2px solid #9966ff;
  border-radius: 5px;
  background-color: #9966ff;
  color : white;
  height : 44px;
  margin-top:5px;
  :hover {
    color: black;
  }
`;

export const Label = styled.label`
  font-size : 12px;
  color : #777777;
  margin-bottom: 12px;
`;

interface InputProps {
  valid: boolean;
}

export const InputStyled = styled.input`
border: ${(props: InputProps) => props.valid ? "1px solid #777777" : "1px solid red"}
border-radius: 4px;
height: 20px;
width: 40 px;
`;

export const ErrorStyled = styled.div`
  font-size : 12px;
  color: red;
  marginTop: 10px;
  text-align: justify;
`

export const SideMarginStyled = styled.div`
  margin-left: 45.5%;
  margin-right:46%;
`


export const Wrapper = styled.section`
`;


