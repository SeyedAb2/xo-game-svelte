<script>
    import {user} from "../store/store";

    let userInput = {
        email:"",
        password:""
    }
    let error = undefined;
    function login(){
        user.login(userInput).catch(
            err => error = err.response
        )
    }
    function register(){
        user.register(userInput).catch(
            err => {
                error = err.response;
            }
        )
    }
</script>
<style  type="text/scss">
    .text-error{
        color:rgb(211, 60, 60);
    }
    .login-main{
        height: 310px;
        background: rgb(27, 27, 27);
        border-radius:25px;
        box-shadow: 0 0 0.2rem 0.1rem rgba(white, .15);
        .login-title{
            font-family: 'Lobster', cursive;
            color:rgb(223, 223, 223);
            padding: 0;
            margin: 10px 0 0 0;
        }
        .describ{
            font-family: 'Pacifico', cursive;;
            text-align: center;
            color:rgb(153, 153, 153);
            @media(max-width:365px){
                font-size:0.95rem
            }
        }
        .input-group {
            input , span{
                background-color:rgb(51, 51, 51);
                color:rgb(161, 161, 161);
                border: 1px solid rgb(104, 104, 104);
                &:focus{
                    box-shadow: 0 0 0 0 rgba(13, 110, 253, .25);
                }
            }
        }
        .btn-custom{
            font-family: 'Pacifico', cursive;;
            width: 30%;
            margin:20px 10px 10px 0;
            text-align: center;
            padding:5px;
            color:white;
            
            &:nth-child(1){
                background:#0077ff;
            }
            &:nth-child(2){
                background:#c91400;
            }
            &:active{
                &:nth-child(1){
                background:#004492;
                }
                &:nth-child(2){
                    background:rgba(184, 2, 2, 0.945);
                }
                // background:rgba(184, 2, 2, 0.945);
                box-shadow: 0 0 0 0;
            }
            &:focus{
                box-shadow: 0 0 0 0;
                border:0;
                outline:0;
            }
            &:hover{
                @media(min-width:768px){
                    &:nth-child(1){
                        background:#004492;
                    }
                    &:nth-child(2){
                        background:rgba(184, 2, 2, 0.945);
                    }
                }
            }
        }
    }
</style>
<div  class="container mx-auto">
    <div class="row justify-content-center d-flex align-items-start">
        <div  class="col-11 col-sm-10 col-md-6 col-lg-4 overflow-hidden login-main">
            <div  class="row h-100 w-100 m-0 p-0 align-items-start justify-content-center">
                <h1 class="col-12 text-center font-family login-title">
                    Login \ Sign-up
                </h1>
                <p class="describ">please login or register to play XO game</p>
                <div class="col-12">
                    <div class="row justify-content-center">
                        <div class="col-12 justify-content">
                            <div class="input-group flex-nowrap">
                                <span class="input-group-text" id="email-wrapping">
                                    <i class="fas fa-envelope"></i>
                                </span>
                                <input bind:value="{userInput.email}" type="email" class="form-control" placeholder="example@example.com" aria-label="email" aria-describedby="email-wrapping">
                            </div>
                            <div class="input-group flex-nowrap mt-3">
                                <span class="input-group-text" id="password-wrapping">
                                    <i class="fas fa-lock"></i>
                                </span>
                                <input bind:value="{userInput.password}" type="password" class="form-control" placeholder="password" aria-label="password" aria-describedby="password-wrapping">
                            </div>
                            
                            {#if error && error.status!=200}
                                <div class="text-center text-error w-100 mt-1 p-2">
                                    {error.data.message[0].messages[0].message}
                                </div>
                            {/if}
                            <div class="row justify-content-end">
                                <button on:click = {register} class="btn btn-custom">Register</button>
                                <button on:click = {login} class="btn btn-custom">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
