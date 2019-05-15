import { ClipLoader } from 'react-spinners';
import React from 'react';

export interface LoaderProps {
  loading: boolean;
}


export const CustomLoader: React.SFC<LoaderProps> = props => (

  <div className='sweet-loading' style={{ textAlign: 'center', display: 'block' }}>
    <ClipLoader
      sizeUnit={"px"}
      size={150}
      color={'#e6b3ff'}
      loading={props.loading}
    />
  </div>

)
