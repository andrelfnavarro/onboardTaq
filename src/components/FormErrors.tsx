import React from 'react';
import { ErrorStyled } from '../styles/Taqstyles';


export const FormErrors = ({formErrors} : {formErrors : any}) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <ErrorStyled>Conteúdo {formErrors[fieldName]}</ErrorStyled>
        )
      } else {
        return '';
      }
    })}
  </div>
