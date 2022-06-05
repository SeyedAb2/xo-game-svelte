<script>
    import {user , game} from "../store/store";
    let joinStatus = false;
    const changeJoinStatus = () => {
        joinStatus = !joinStatus;
    }
    const newGamae = ()=>{
        game.newGame($user.jwt) 
    }
    const copyCode = ()=>{
        let copyElement = document.querySelector(".copy");
        copyElement.style.insetInlineStart = 60 + "%"
        setTimeout(()=>{
            copyElement.style.insetInlineStart = 110 + "%"
        },2000)
        let copyText = $game.code;
        console.log(copyText)
        navigator.clipboard.writeText(copyText);
    }
</script>
<style type="text/scss">
    .game-main{
        height: 300px;
        background: rgb(27, 27, 27);
        border-radius:25px;
        box-shadow: 0 0 0.2rem 0.1rem rgba(white, .15);
        .game-title{
            font-family: 'Lobster', cursive;
            color:rgb(223, 223, 223);
            padding: 0;
            margin: 10px 0 0 0;
        }
        .describ{
            font-family: 'Fjalla', cursive;;
            text-align: center;
            color:rgb(153, 153, 153);
        }
    }
    .menu-item{
        color:rgb(190, 190, 190);
        font-size:1.3rem;
        font-family: 'Fjalla', cursive;
        cursor: pointer;
        transition: all 0.25s;
        &:hover{
            .arrow-o,.arrow-x{
                display: inline;
            }
            background-color:rgb(34, 34, 34);
            transform:scale(1.15);
        }
    }
    .border-bottom{
        border-bottom: 1px solid rgb(61, 61, 61) !important;
    }
    .menu{
        margin-bottom: 10px;
        border-radius: 20px;
        background-color:rgba(31, 1, 29, 0.384);
        overflow: hidden;
    }
    .arrow-x{
        color: #c91400;
        font-weight: bold;
        font-size: 1.4rem;
        margin: 0 4px;
        font-family: 'Pacifico';
        display:none;
    }
    .arrow-o{
        color: #0077ff;
        font-weight: bold;
        font-size: 1.4rem;
        margin: 0 4px;
        font-family: 'Pacifico';
        display:none;
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
        width:70%;
        margin: 20px auto;
    }
    .join-main{
        height:130px;
        margin-bottom: 10px;
        border-radius: 14px;
        background-color:rgba(31, 1, 29, 0.384);
        overflow: hidden;
    }
    .btn{
        font-family: 'Fjalla', cursive;
    }
    .lds-hourglass {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
    }
    .lds-hourglass:after {
        content: " ";
        display: block;
        border-radius: 50%;
        width: 0;
        height: 0;
        margin: 10px -10px 0 -10px;
        box-sizing: border-box;
        border: 32px solid red;
        border-color: #0077ff transparent #c91400 transparent;
        animation: lds-hourglass 1.2s infinite;
    }
    @keyframes lds-hourglass {
        0% {
            transform: rotate(0);
            animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
        }
        50% {
            transform: rotate(900deg);
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        100% {
            transform: rotate(1800deg);
        }
    }
    .new-game-title{
        font-family: 'Fjalla', cursive;
        color: rgb(224, 224, 224);
        font-size: 1.1rem;
        .code{
            font-family: 'Fjalla', cursive;
            font-size: 1.2rem;
            color: rgb(224, 224, 224);
            background-color:rgba(0, 0, 0, 0.87);
            padding:6px 15px;
            border-radius: 5px;
            cursor:pointer;
        }
        .copy{
            margin: 0 10px;
            padding:5px 10px;
            background: rgb(29, 63, 158);
            color: white;
            border-radius: 5px;
            border: none;
            position: absolute;
            z-index: 200;
            width: 80px;
            top: 32px;
            inset-inline-start: 110%;
            transition:all 0.25s;
        }    
    }
    .share-friend{
        text-align: center;
        color: rgb(175, 175, 175);
        margin-top: 25px;
        font-family: 'Fjalla', cursive;

    }
    .waiting-text{
        font-family: 'Fjalla', cursive;
        color: rgb(175, 175, 175);
        font-size: 1.2rem;
    }
</style>
<div class="container mx-auto">
    <div class="row justify-content-center d-flex align-items-start">
        <div class="col-11 col-sm-10 col-md-4 overflow-hidden game-main">
            <div  class="row h-100 w-100 m-0 p-0 align-items-start justify-content-center">
                {#if !$game}
                <h1 class="col-12 text-center font-family game-title">
                    Welcome To XO Game
                </h1>
                <p class="describ">
                    Choose an option and enjoy the game</p>
                <div class="col-12">
                    <div class="row overflow-hidden justify-content-center">
                        {#if !joinStatus}
                        <div class="col-12 justify-content menu">
                            <div on:click="{newGamae}" class="w-100 menu-item text-center p-3 border-bottom font-weight-bold">
                                <span class="arrow-x"> X </span>
                                New Game
                                <span class="arrow-o"> O </span>
                            </div>
                            <div on:click="{changeJoinStatus}" class="w-100 menu-item text-center p-3 border-bottom font-weight-bold">
                                <span class="arrow-x"> X </span>
                                Connect to game
                                <span class="arrow-o"> O </span>
                            </div>
                            <div on:click="{user.exit}" class="w-100 menu-item text-center p-3 font-weight-bold">
                                <span class="arrow-x"> X </span>
                                Exit
                                <span class="arrow-o"> O </span>
                            </div>
                        </div>
                        {/if}
                        {#if joinStatus}
                        <div class="col-12 justify-content">
                            <div class="w-100 join-main">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="enter code to join game" aria-label="text" aria-describedby="text-wrapping">
                                    <div class="row mt-3 w-100 d-flex justify-content-center align-items-center">
                                        <button on:click="{changeJoinStatus}" class="col me-2 btn btn-danger">Back</button>
                                        <button class="col ms-2 btn btn-success">Join</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/if}
                    </div>
                </div>
                {/if}
                {#if $game}
                <div class="col-12 my-4">
                    <div class="row  justify-content-center justify-content-center">
                        <h2 class="position-relative text-center new-game-title">
                            Your game code is <span code="{$game.code}" on:click="{copyCode}" class="code">{$game.code}</span> 
                            <span class="copy">copied</span>
                        </h2>
                        <p class="share-friend">feel free to share width anyone you want to play with.</p>
                        <div class="lds-hourglass mt-2"></div>
                        <p class="mt-2 text-center waiting-text font-weight-bold">
                            Wait for the player to join
                        </p>
                    </div>
                </div>
                {/if}
            </div>
        </div>
    </div>
</div>