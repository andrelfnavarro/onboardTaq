import * as React from 'react';
import "./Login.css";



function Login(){
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
    