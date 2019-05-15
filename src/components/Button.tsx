import React from 'react';
import { ButtonStyled } from '../styles/Taqstyles'

// export default function ButtonComponent (type:string, title:string, enabled:boolean = true) {
//     return (
//       <Button type="submit" disabled ={!enabled}>{title}</Button>
//     )
// }

export interface ButtonProps {
  type: string;
  title: string;
  enabled: boolean;
}

export const CustomButton: React.SFC<ButtonProps> = props => (
  <ButtonStyled
    type="submit"
    disabled ={!props.enabled}
  >
    {props.title}
  </ButtonStyled>
)

CustomButton.defaultProps = {
  enabled: true,
}

export default CustomButton
