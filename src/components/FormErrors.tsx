import React from 'react';


export const FormErrors = ({formErrors} : {formErrors : any}) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <p key={i} style = 
          {{
            fontSize : '12px', 
            color:'red', 
            marginTop:'10px' 
          }}>{fieldName} {formErrors[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
  </div>