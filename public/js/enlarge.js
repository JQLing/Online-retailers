function gbc(oParent,tclass){
	var aClass=oParent.getElementsByTagName('*');
	var result=[];
	for(var i=0;i<aClass.length;i++){
		if(aClass[i].className==tclass)
			result.push(aClass[i]);
	}
	return result;
}
window.onload=function(){
	var sbp=document.getElementById('show_bigger_pic');
	var c=gbc(sbp,'cover')[0];
	var fs=gbc(sbp,'float_span')[0];
	var spd=gbc(sbp,'small_pic_div')[0];
	var sp=spd.getElementsByTagName('img')[0];
	var bpd=gbc(sbp,'big_pic_div')[0];
	var bp=bpd.getElementsByTagName('img')[0];
	/*
	var spdw;
	var spdh;
	var spw;              //比例计算暂存参数变量
	var sph;
	var bpw;
	var bph;
	var btn=true;
	*/
	c.onmouseover=function(){
		fs.style.display='block';
		bpd.style.display='block';
		c.style.cursor='move';
		/*if(btn){
			spw=sp.offsetWidth;
			sph=sp.offsetHeight;
			bpw=bp.offsetWidth;
			bph=bp.offsetHeight;
			spdw=spd.offsetWidth;
			spdh=spd.offsetHeight;
			
			var fsw=Math.ceil(spw/bpw*spdw);
			var fsh=Math.ceil(sph/bpw*spdh);
			
			fs.style.width=fsw+'px';
			fs.style.height=fsh+'px';
			btn=false;
		}*/
	};
	c.onmouseout=function(){
		fs.style.display='none';
		bpd.style.display='none';
	};
	c.onmousemove=function(ev){
		var oEvent=ev||event;
		var l=oEvent.clientX-sbp.offsetLeft-fs.offsetWidth/2;
		var t=oEvent.clientY-sbp.offsetTop-fs.offsetHeight/2;
		if(l<0){
			l=0;
		}
		else if(l>c.offsetWidth-fs.offsetWidth){
			l=c.offsetWidth-fs.offsetWidth;
		}
		if(t<0){
			t=0;
		}
		else if(t>c.offsetHeight-fs.offsetHeight){
			t=c.offsetHeight-fs.offsetHeight;
		}
		fs.style.left=l+'px';
		fs.style.top=t+'px';   
		
		var percentX=l/c.offsetWidth;
		var percentY=t/c.offsetHeight;
		bp.style.left=-percentX*(bp.offsetWidth)+'px';
		bp.style.top=-percentY*(bp.offsetHeight)+'px';
	};
};