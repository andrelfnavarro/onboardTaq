import * as React from 'react';
import "./Login.css";


export interface Props {
    email?: string;
    password?: number;
  }

function Login({email = "andre.navarro@taqtile.com", password = 1234567890}:Props){
    return(
        <div className="Login">
        <h1>
            Bem-vindo(a) à Taqtile!
        </h1>
        <form>
            <label>
                E-mail  
            </label>
            <input type="text" name="email" />
            
            <label>
                Senha
            </label>
            <input type="password" name="password" />
        </form>

        <button>
            Entrar
        </button>
        </div>


    );
}

export default Login;
    