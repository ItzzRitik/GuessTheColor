var newGame=document.querySelector(".controls .newText");
var hard=document.querySelector(".controls .hard");
var easy=document.querySelector(".controls .easy");
var head=document.querySelector('.hPane .current');
var ease=hard;
var color="RGB(23, 119, 87)";
var colorDark="RGB(13, 109, 77)";
var answer="RGB(23, 119, 87)";

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
			if(this.getAttribute("class")=="easy"){
				ease=easy;
				easy.style.background = color;hard.style.background = "#fff";
				easy.style.color = '#fff';hard.style.color = color;
			}
			else if(this.getAttribute("class")=="hard"){
				ease=hard;
				hard.style.background = color;easy.style.background = "#fff";
				hard.style.color = '#fff';easy.style.color = color;
			}
		}
	});
}
color = generateCol(true);


addMouseEvent(newGame);
addMouseEvent(hard);
addMouseEvent(easy);

setColor('.hPane',color,true);
setColor('.controls .contain .newGame',color,false);
setColor('.controls .contain .easy',color,false);

hard.style.background = color;hard.style.color = '#fff';

answer = generateCol(false);
head.innerHTML=answer;

var options=document.querySelectorAll(".palette .item");
var place=Math.round(Math.random()*5);
for(var i=0;i<options.length;i++)
{
	if(i!=place){options[i].style.backgroundColor = generateCol(false);}
	else{options[i].style.backgroundColor = answer;}
	options[i].addEventListener("mouseover",function(){
		this.classList.add("circle_item");
	});
	options[i].addEventListener("mouseleave",function(){
		this.classList.remove("circle_item");
	});
	options[i].addEventListener("click",function(){
		console.log(this.style.backgroundColor);
	});
}