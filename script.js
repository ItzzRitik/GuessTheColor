var newGame,hard,easy,head,options,livesreplay,ease,color,colorDark;
var header,palette,answer,life,started;

function onResize(){
	setPaletteSize();
}
function generateCol(darkAsWell){
	var limit=255,modify=70;;
	var r=Math.floor(Math.random()*limit);
	var g=Math.floor(Math.random()*limit);
	var b=Math.floor(Math.random()*limit);
	if(darkAsWell){colorDark="RGB("+(r-modify)+", "+(g-modify)+", "+(b-modify)+")"}
		return "RGB("+r+", "+g+", "+b+")";
}
function setColor(item,col,back){
	if(back){document.querySelector(item).style.backgroundColor=col;}
	else{document.querySelector(item).style.color=col;}
}
function addMouseEvent(item){
	item.addEventListener("mouseover",function(){
		this.style.background = color;
		this.style.color = '#fff';
	});
	item.addEventListener("mouseleave",function(){
		this.style.background = '#fff';
		this.style.color = color;
		if(ease==easy && this.getAttribute("class")!="newText"){
			ease.style.background = color;
			ease.style.color = '#fff';
		}
		else if(ease==hard && this.getAttribute("class")!="newText"){
			ease.style.background = color;
			ease.style.color = '#fff';
		}
	});
	item.addEventListener("mousedown",function(){
		this.style.background = colorDark;
	});
	item.addEventListener("mouseup",function(){
		this.style.background = color;
	});
	item.addEventListener("click",function(){
		if(this.getAttribute("class")!="newText"){
			if(this.getAttribute("class")=="easy"){setEasy()}
				else if(this.getAttribute("class")=="hard"){setHard()}
			}
		else{reload();}
	});
}
function setEasy(){
	ease=easy;
	easy.style.background = color;hard.style.background = "#fff";
	easy.style.color = '#fff';hard.style.color = color;
	life=3;
	setLives(life);
}
function setHard(){
	ease=hard;
	hard.style.background = color;easy.style.background = "#fff";
	hard.style.color = '#fff';easy.style.color = color;
	life=2;
	setLives(life);
}
function reload()
{
	window.location.reload(false);
}
function setLives(num){
	lives.innerHTML="";
	for(var i=0;i<num;i++)
	{
		lives.innerHTML+="<i class='fas fa-heart'></i> ";
	}
}
function cardClick(){
	if(!started){
		started=true;
		easy.style.pointerEvents='none';
		hard.style.pointerEvents='none';
	}
	if(this.style.backgroundColor != answer.toLowerCase()){
		setLives(--life);
		this.classList.add('fade_item');
		this.removeEventListener('click',cardClick);
		if(life==0){
			gameOver();
		}
	}
	else{
		gameOver();
	}
}
function gameOver(){
	for(var i=0;i<options.length;i++){
		options[i].classList.add('fade_itemC');
	}
	color=answer;
	if(life==0){color="#555";}
	setColor('.hPane',color,true);
	document.querySelector('.controls').style.height = '0';
	document.querySelector('.controls').style.transition = '1.2s cubic-bezier(0.86, 0, 0.07, 1)';

	header.style.transition = '1.8s cubic-bezier(0.86, 0, 0.07, 1)';
	header.style.paddingTop = '0px';
	header.style.height = window.innerHeight+"px";

	setTimeout(function() {
		document.querySelector('.hPane .first').innerHTML = 'YOU WON';
		document.querySelector('.hPane .last').innerHTML = 'CONGRATULATIONS';
		if(life==0)
		{
			document.querySelector('.hPane .first').innerHTML = 'GAME OVER';
			document.querySelector('.hPane .last').innerHTML = 'NO MORE LIVES';
		}
	}, 600);
	setTimeout(function() {
		replay.style.display= 'flex';
		replay.style.opacity = '1';
	}, 1800);

	document.querySelector('.hCenter').style.transition = '1.8s cubic-bezier(0.86, 0, 0.07, 1)'; 
	document.querySelector('.hCenter').style.transform = 'translateY(-100px)';
}
function setPaletteSize(){
	var gSize=window.innerHeight-header.offsetHeight-55;
	var cardSize=Math.min(window.innerWidth,gSize);
	palette.style.height = cardSize+'px';
	palette.style.width = cardSize+'px';
	
	//console.log(palette.offsetWidth+" x "+palette.offsetHeight);
	for(var i=0;i<options.length;i++)
	{
		options[i].style.width = (cardSize*0.28)+'px';
		options[i].style.height = (cardSize*0.28)+'px';
		options[i].style.border = (cardSize*0.008)+'px solid #fff';
		options[i].style.margin = (cardSize*0.01866)+'px';
		options[i].style.borderRadius = (cardSize*0.057)+'px';
		console.log(cardSize+" = "+options[i].style.borderRadius);
	}
}

function main(){
	newGame=document.querySelector(".controls .newText");
	hard=document.querySelector(".controls .hard");
	easy=document.querySelector(".controls .easy");
	header=document.querySelector('.hPane');
	head=document.querySelector('.hPane .current');
	palette=document.querySelector('.palette');
	options=document.querySelectorAll(".palette .item");
	lives=document.querySelector('.lives');
	replay=document.querySelector('.replay');
	ease=hard;
	life=2;
	started=false;
	color = generateCol(true);

	addMouseEvent(newGame);
	addMouseEvent(hard);
	addMouseEvent(easy);
	setLives(life);

	setColor('.hPane',color,true);
	setColor('.controls .contain .newGame',color,false);
	setColor('.controls .contain .easy',color,false);
	setColor('.lives',color,false);

	hard.style.background = color;
	hard.style.color = '#fff';

	answer = generateCol(false);
	head.innerHTML=answer;

	replay.addEventListener("mousedown",function(){
		this.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
	});

	replay.addEventListener("mouseup",function(){
		this.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
	});
	replay.addEventListener("click",function(){
		reload();
	});

	var correct=Math.round(Math.random()*5);
	for(var i=0;i<options.length;i++)
	{
		if(i!=correct){
			options[i].style.backgroundColor = generateCol(false);
		}
		else{
			options[i].style.backgroundColor = answer;
		}
		options[i].addEventListener("click",cardClick);
		onResize();

		lives.addEventListener('click',function(){
			//options[correct].click();
		});
	}
}
main();