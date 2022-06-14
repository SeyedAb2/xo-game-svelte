<script>
    import { user , game , board , moveUpdate } from "../store/store";
    let error = undefined;
    let manualBoard = undefined;
    const unsubscribe = board.subscribe(
        (value) => {
            manualBoard = value;
        }
    );
    const copyCode = ()=>{
        let copyElement = document.querySelector(".copy");
        copyElement.style.insetInlineStart = 60 + "%"
        setTimeout(()=>{
            copyElement.style.insetInlineStart = 110 + "%"
        },2000)
        let copyText = $game.code;
        navigator.clipboard.writeText(copyText);
    }
    function getOpponent(board){
        if(!board){
            return null;
        }
        const currentUserId = $user.user.id;
        return board.player1.id ==  currentUserId ? board.player2 : board.player1;
    }
    function createTable(board){
        if(!board){
            return [];
        }
        let moves = board.moves;
        const table = [];
        for(let i=0;i<board.size;i++){
            const row = [];
            for(let j=0;j<board.size;j++){
                const filterMoves = moves.filter((moves) => moves.x == i && moves.y == j);
                if(filterMoves.length>0){
                    const move = filterMoves[0];
                    if(move.player == $user.user.id) {
                        row.push({x: i,y: j,marker: "X"})
                    }
                    else{
                        row.push({x: i,y: j,marker: "O"})
                    }
                }
                else{
                    row.push({x: i,y: j,marker: ""})
                }
            }
            table.push(row);
        }
        return table;
    }
    $: opponent = getOpponent(manualBoard);
    $: table = createTable(manualBoard);
</script>

{#if manualBoard && manualBoard.winner}
<div class="col-11 col-sm-10 col-md-4 overflow-hidden game-main">
    <div  class="row h-100 w-100 m-0 p-0 align-items-start justify-content-center">
        <div class="col-12 my-4">
            <div class="row  justify-content-center justify-content-center">
                {unsubscribe() || ""}
                <p class="w-100 m-0 p-0 mt-2 describ">
                    game code : {manualBoard.code}
                </p>
                <p class="w-100 m-0 p-0 my-2 describ">
                    opponent username : {opponent.email}
                </p>
                <p class="describ">
                    winner : {manualBoard.winner.username}
                </p>
            </div>
        </div>
    </div>
</div>
    
{:else}
    {#if opponent}
        <div class="col-11 col-sm-10 col-md-5 overflow-hidden game-main-board">
            <div  class="row d-flex align-end h-100 w-100 m-0 p-0 align-items-start justify-content-center">
                <div class="table-parent h-100 row pb-5 d-flex justify-content-center align-items-end">
                    <p class="w-100 m-0 p-0 mt-2 describ">
                        game code : {manualBoard.code}
                    </p>
                    <p class="w-100 m-0 p-0 my-2 describ">
                        opponent username : {opponent.email}
                    </p>
                    <table class="table-font">
                        {#each table as row}
                            <tr class="row">
                                {#each row as cell}
                                    <td class="{cell.marker == "X" ? 'o-color cell col':'x-color cell col'}" on:click={()=>{moveUpdate(cell,manualBoard,$user)}}>
                                        {cell.marker}
                                    </td>
                                {/each}
                            </tr>
                        {/each} 
                    </table>
                </div>
            </div>   
        </div>
    {:else}
        <div class="col-11 col-sm-10 col-md-4 overflow-hidden game-main">
            <div  class="row h-100 w-100 m-0 p-0 align-items-start justify-content-center">
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
            </div>
        </div> 
    {/if}
{/if}



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
    .game-main-board{
        height: 530px;
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
        // cursor: pointer;
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
    .text-error{
        color:rgb(211, 60, 60);
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
            // cursor:pointer;
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
    .table-parent{
        border-radius: 10px;
        overflow: hidden;
        .table {
            border-style: hidden;
            border-collapse: collapse;
            margin: auto;
        }
        .cell{
            border: 1px solid #313131;
            border-radius: 10px;
            margin: 2px;
            height: 10vw;
            text-align: center;
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 7.5rem;
            // cursor: pointer;
        }
        .game-title{
            font-family: 'Lobster', cursive;
            color:rgb(223, 223, 223);
            padding: 0;
            margin: 10px 0 0 0;
        }
        .describ{
            font-family: 'Fjalla', cursive;
            // text-align: center;
            color:rgb(153, 153, 153);
        }
        .table-font{
            font-family: 'Lobster', cursive;
        }
    }
    





.x-color{
    color: #0077ff;
}
.o-color{
    color: #c91400;
}
</style>