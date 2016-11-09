function LowesInvite(){
    /* options{
     *   color: 签名颜色 默认为#333333
     *   x: 签名x坐标
     *   y: 签名y坐标
     *   fontSize:  签名字号
     *   fontFamily: 签名字体
     *   bold: true or false 签名是否加粗
     * }*/
    var options=arguments[0]||{};
    this.root=document.querySelector(".lowesInvite");
    this.createDom(this.root.getAttribute("data-img"),this.root);

    this.canvas=document.querySelector(".lowesInvite>canvas");
    this.context=this.canvas.getContext("2d");
    this.image=document.querySelector(".lowesInvite>img");

    //必须等待图片下载完后再进行canvas渲染
    this.image.onload=function(){

        //动态设置canvas的宽高
        this.canvas.setAttribute("width",''+this.image.offsetWidth);
        this.canvas.setAttribute("height",''+this.image.offsetHeight);

        //保存原始图片源
        this.originalData=this.image.src;

        //保存画布宽高
        this.width=this.image.offsetWidth;
        this.height=this.image.offsetHeight;

        //设置签名属性
        this.context.font=options.fontSize+"px "+options.fontFamily;
        if(options.bold) this.context.font="bold "+this.context.font;
        this.context.textAlign="left";
        this.context.baseline="middle";

        this.setNamePos(options.x,options.y);
        this.setNameColor(options.color);

        //初始化
        this.init();

        this.image.onload=null;     //防止图片重复onload
    }.bind(this);

}

//创建DOM元素
LowesInvite.prototype.createDom=function(src,root){
    var img=document.createElement("img");
    var canvas=document.createElement("canvas");
    img.src=src;
    canvas.style.opacity=0;
    canvas.style.position="absolute";
    canvas.style.zIndex=-999;
    canvas.style.left=0;
    canvas.style.top=0;
    root.appendChild(img);
    root.appendChild(canvas);
}

//初始化函数
LowesInvite.prototype.init=function(){
    this.clear();
    this.name=null;
    this.context.fillText('您的名字',this.signX,this.signY);
    this.image.src=this.canvas.toDataURL("image/png");
}

//重绘原始图像
LowesInvite.prototype.clear=function(){
    this.image.src=this.originalData;
    // this.context.clearRect(0,0,this.width,this.height);  若加上则会出现无法重绘的情况，暂不清楚原因
    this.context.drawImage(this.image,0,0,this.width,this.height);
};

//设置签名起始位置
LowesInvite.prototype.setNamePos=function(x,y){
    this.signX=x||0;
    this.signY=y||0;
};

//设置签名颜色
LowesInvite.prototype.setNameColor=function(color){
    this.context.fillStyle=color||"#333333";
};

//添加被邀者姓名
LowesInvite.prototype.drawName=function(name){
    this.clear();
    this.name=name;
    this.context.fillText(name,this.signX,this.signY);
    this.image.src=this.canvas.toDataURL("image/png");
};

//下载图片
LowesInvite.prototype.exportImg=function(){
    // let imageData=this.context.getImageData(0,0,this.width,this.height);
    // let data=imageData.data;
    if(!this.name) return alert('请输入您的姓名后再下载!');
    var alink=document.createElement("a");
    alink.download="invitation";
    alink.href=this.image.src;
    var evt=document.createEvent('MouseEvents');
    evt.initEvent('click',true,true);
    alink.dispatchEvent(evt);
};