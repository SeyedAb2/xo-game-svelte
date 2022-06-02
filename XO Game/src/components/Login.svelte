<script>
    import {user} from "../store/store";
    let userInput = {
        email:"",
        password:""
    }
</script>
<style  type="text/scss">
    .login-main{
        height: 300px;
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
            text-align: center;
            color:rgb(153, 153, 153);
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
            width: 30%;
            margin:20px 10px 10px 0;
            text-align: center;
            padding:5px;
            color:white;
            &:active{
                background:rgba(184, 2, 2, 0.945);
                box-shadow: 0 0 0 0;
            }
            &:focus{
                box-shadow: 0;
            }
            &:hover{
                @media(min-width:768px){
                    background:rgba(184, 2, 2, 0.945);
                }
            }
            &:nth-child(1){
                background:#0077ff;
            }
            &:nth-child(2){
                background:#c91400;
            }
        }
    }
</style>
<div class="container mx-auto">
    <div class="row justify-content-center d-flex align-items-start">
        <div class="col-11 col-sm-10 col-md-4 overflow-hidden login-main">
            <div class="row h-100 w-100 m-0 p-0 align-items-start justify-content-center">
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
                            <div class="row justify-content-end">
                                <button on:click = {()=> user.register(userInput)} class="btn btn-custom">Register</button>
                                <button on:click = {()=> user.login(userInput)} class="btn btn-custom">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
