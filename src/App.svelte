<!-- Script Component -->
<script>
	import GameSetup from './components/game-setup.svelte';
	import Login from './components/Login.svelte';
	import {user , game} from "./store/store";
</script> 	

<!-- Style Component -->
<style global type="text/scss">
	body{
		position:relative;
		// cursor: url('../../public/image/cursor.png') 10 12, auto;
	}
	.header{
		padding-top: 15px;
		
		h1{
			margin-top:20px;
			background: -webkit-linear-gradient(45deg,#0077ff, #c91400);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			font-family: 'Modak', cursive;
			@media(max-width:768px){
				font-size:2rem;
			}
			@media(min-width:768px){
				font-size:3.5rem;
			}
		}
		.logo{
			width:100px;
			height:100px;
			@media(max-width:768px){
				width:50px;
				height:50px;
				margin-bottom:20px;
			}
		}
		.logo+h1{
			@media(max-width:768px){
				font-size: 2.6rem;
				margin-bottom:30px;
			}
			@media(max-width:420px){
				font-size: 1.6rem;
				margin-bottom:30px;
			}
		}
	}
	.content{
		width:100%;
		// min-height:78vh;
		display: block;
	}
	.copyright{
		width:100%;
		color: white;
		background:-webkit-linear-gradient(45deg,#0077ff, #c91400);
		padding:5px;
		text-align:center;
		font-weight:normal;
		font-family:'Vollkorn', cursive;
		position: absolute;
		bottom:0;
	}
</style>

<!-- Template Component -->

<div class="w-100 auto-cur container-fluid m-0 header">
	<div class="row align-items-center justify-content-between">
		<div class="col-auto ms-3 d-flex align-items-center">
			<img class="logo" src="./image/xo.png" alt="" tite="">
			<h1 class="d-flex">
				<span class="x-word">X</span><span class="o-word">O</span>
				<span class="game-word">Game</span>
			</h1>
		</div>
		<div class="col-3 d-flex align-items-center pe-5">
			<div class="col-4 d-flex align-items-center "></div>
			<div class="col-4 d-flex align-items-center "></div>
			<div class="col-4 d-flex align-items-center "></div>
		</div>
	</div>
</div>

<div class="content mb-5 ">
	{#if $user}
		<div>
			<GameSetup />
		</div>
	{/if}
	{#if !$user}
		<div>
			<Login />
		</div>
	{/if}
</div>
<!-- <div class="copyright">&copy; Copyright , Create And Developed By SeyedAb2</div> -->