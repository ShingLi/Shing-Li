<template>
	<div class="main">
		<img src="../assets/bing.png" alt="" class="logo">
		<div class="search-box">
			<input type="text" class="search"
				v-model="keyworld"
				@focus='focus'
				@blur = "blur"
				@keydown.enter='search'
				@keyup='get($event)'
				@keydown.down="changedown()"
				@keydown.up.prevent = 'changeup($event)'
			>
			<input type="submit" class="submit" @click='search()'>
			<div class="list-demo">
				<transition-group tag='ul' name='list' v-cloak mode="out-in">
					<li 
						v-for ="(value,index) in Datas"
						:key='value'
						:class="{libg:index==now}"
						class="list-complete-item" 
						@mouseover="selectHover(index)"
						@click = "selectClick(index)"
					>{{value}}</li>
				</transition-group>
			</div>
		</div>
		<transition name = 'fade'>
			<div class="modal" v-if='showBox'></div>
		</transition>
	</div>
	
</template>
<script>
	import jsonp from 'jsonp'
	export default{
		data(){
			return {
				keyworld:'',
				showBox:false,
				Datas:[],
				now:0,
				srcUrl:"https://cn.bing.com/search?q="
			}
		},
		methods:{
			focus(){
				this.showBox = true
			},
			blur(){
				this.showBox = false
			},
			search(){
				if(this.keyworld==""){
					window.open("https://baike.baidu.com/item/"+"韩雪")
				}else{
					window.open(this.srcUrl+this.keyworld)
				}
			},
			get($event){
				if($event.keyCode==40||$event.keyCode==38){
					return false;
				 // console.log(this)
				}
				let that = this
					jsonp('https://sug.so.360.cn/suggest?callback=suggest_so&encodein=utf-8&encodeout=utf-8&word='+this.keyworld,null,function(err,data){
						if(err){
								
						}else{
							that.Datas = data.s
						}
					})
			},
			selectHover(index){
				this.now = index
			},
			selectClick(index){
				this.keyworld=this.Datas[index]
				this.search()
				console.log(index)
				console.log(this.Datas[index])
			},
			changedown(){
				this.now++
				if(this.now ==this.Datas.length){
					this.now=0
				}
				this.keyworld = this.Datas[this.now]
			},
			changeup($event){
				console.log($event.keyCode)
				this.now--
				if(this.now<0){
					this.now=this.Datas.length-1;
				}
				this.keyworld = this.Datas[this.now]
			}
		}
	}
</script>
<style scoped>
	*{
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.main{
		display: flex;
		margin: 120px 0 0 80px;

	}
	.logo,.search-box{
		z-index: 999;
	}
	.search-box{
		background-color: #fff;
		display: flex;
		align-items:center;
		height: 49px;
		margin-left: 20px;
		padding-right: 5px;
		position: relative;

	}
	.search{
		width: 540px;
		border: none;
		outline: none;
		padding-left: 20px;
		font-size: 20px;
	}
	.submit{
		text-indent: -99px;
		width: 45px;
		height: 45px;
		outline: none;
		border: none;
		display: inline-block;
		cursor: pointer;
		background: url('../assets/search-btn.png')0px 0px no-repeat;
	}
	.modal{
		top:0;
		bottom: 0px;
		left: 0px;
		right: 0px;
		position: fixed;
		opacity: .55;
		background-color:#000;
	}
	.list-demo{
		position: absolute;
		top:49px;
		width: 100%;
	}

	.list-demo li{
		background-color: #fff;
		padding: 9px 20px;
		cursor: pointer;
		width: 590px;
	}
	.list-demo li:first-child{
		border-top:1px solid #ccc;
	}
	.libg{
		background-color: #eee !important;
	}
	/*动画部分*/
	.fade-enter-active,.fade-leave-active{
		transition: opacity .5s
	}
	.fade-enter,.fade-leave-to,.list-enter,.list-leave-to{
		opacity: 0
	}
	
	.list-leave-active{
		position: absolute;
	}
	.list-complete-item{
		transition: all .7s
	}
	
</style>