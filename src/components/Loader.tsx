import { ClipLoader } from 'react-spinners';
import React from 'react';

export default function Loader (loading:boolean){
    return (
        <div className='sweet-loading' style={{ textAlign: 'center', display: 'block' }}>
            <ClipLoader
                sizeUnit={"px"}
                size={150}
                color={'#e6b3ff'}
                loading={loading}
              />
        </div>
    )
}