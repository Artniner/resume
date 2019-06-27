/*
*--------------------------变量说明----------------------------
*introduce: 介绍
*sourceBoardStyle: 源码区样式
*trs: 过度语
*codeHighLight: 代码高亮
*moveRight: 源码区向右移动
*drawBoard: 画板，简历区
*resume: 简历内容
*str: 总字符串
*/

var animateSpeed = 20;

/*字符拼接*/
var strArray = new Array();
strArray[0] = '\n\
	/**\n\
	 *我叫张三，来自广东深圳\n\
	 *我今年10岁，毕业于哈佛商学院，吹牛大王专业\n\
	 *接触前端一年，我的理想是当一名前端工程师\n\
	 *来看看我为你准备的菜，先来点CSS，加点基本样式......\n\
	**/\n';
strArray[1] = '\
	*{\n\
		-webkit-transition: all 1s;\n\
		transition: all 1s;\n\
	}\n\
	body{\n\
		background: #3f5263;\n\
	}\n\
	#sourceBoard{\n\
		color: white;\n\
		overflow: auto;\n\
		border: 1px solid #ccc;\n\
		width: 46%;\n\
		height: 45%;\n\
		font-family: "monospace";\n\
		font-size: 14px;\n\
	}\n';
strArray[2] = '\t\/*似乎有点单调，那么就让语法高亮吧*\/\n';
strArray[3] = '\
	#sourceBoard		{background: #303030;}\n\
	.token.comment	{color: #857f6b; font-style: italic;}\n\
	.token.selector	{color: #e69f0f;}\n\
	.token.property	{color: #64d5ea;}\n'
strArray[4] = '\t\/*接下来，我需要准备一下简历。先将刚才写的样式踢到一边儿去*\/\n';
strArray[5] = '\
	#sourceBoard{\n\
		position: absolute;\n\
		-webkit-transform: translate(110%, 2%);\n\
		transform: translate(110%, 2%);\n\
		height: 96%;\n\
	}\n\
	\/*OK,接下来开始准备简历板*\/\n';
strArray[6] = '\
	#drawBoard{\n\
		color: white;\n\
		overflow: auto;\n\
		border: 1px solid #ccc;\n\
		width: 46%;\n\
		height: 96%;\n\
		font-family: "微软雅黑";\n\
		font-size: 14px;\n\
		position: absolute;\n\
		-webkit-transform: translate(5%, 2%);\n\
		transform: translate(5%, 2%);\n\
	}\n';
strArray[7] = '\n\
# <center>张三_前端开发简历</center>\n\
----------------------------------------------\n\
## 工作经历: ## \n\
----------------------------------------------\n\
### 1.一二三四五六七八九学校：音乐教师 ### \n\
	"虽然跟前端无关，但是简历一定要写出来"。By腾讯HR \n\
\n\
### 2. 中国某某网 (政府媒体)：前端开发 ### \n\
1.  专题设计\n\
2.  频道维护\n\
3.  对接后台搭建前端模版\n\
4.  前端性能优化与前沿技术学习\n\
5.  业务成就：\n\
1.主导技术选型、方案设计、代码编写，完成中国某某网二级子频道页面进行响应式改版。\n\
	>改版前 : http://news.lanzhou.cn/system/2018/01/27/011502919.shtml \n\
	>改版后 : http://news.lanzhou.cn/system/2018/01/11/011492028.shtml \n\
----------------------------------------------\n\
### 技术栈 ### \n\
----------------------------------------------\n\
0. JavaScript/jQuery\n\
1. Bootstrap\n\
2. Nodejs\n\
3. AngularJs\n\
4. CSS3\n\
5. Ajax\n\
6. Webpack\n\
### 项目汇总 ### \n\
	[https://github.com/ZQ-jhon/-](https://github.com/ZQ-jhon/-) \n\
### 博客\n\
----------------------------------------------\n\
1. CSDN博客：[我的CSDN博客](http://blog.csdn.net/qq_20264891) \n\
2. GitHub博客：[我的GitHub博客](https://ZQ-jhon.github.io)';
strArray[8] = '\
	\/*对了，这个简历是markdown语法，应该改成html才看着舒服。\n\
	*接下来变个魔术\n\
	*倒数3个数字\n\
	*3......\n\
	*2......\n\
	*1......\n\
	*OK,这就是为您准备的菜，祝享用愉快！*/';
strArray[9] = '\n';

// 常规定义
var styleTag = document.getElementById('styleTag');
var sourceBoard = document.getElementById('sourceBoard');

var wordsCount = 1;
var strCount = 1;
var str = strArray[0];
var resumeWords = 1;

// 代码动画
var controller = setInterval(put,animateSpeed);
function put(){
	if(strCount == 8){	//简历部分
		document.getElementById('drawBoard').innerHTML = strArray[7].substring(0, resumeWords);
		
		$('#drawBoard').animate({
			scrollTop: 1000
		}, 50);
		
		if(resumeWords>=strArray[7].length){
			str += strArray[8];
			strCount++;
		}
		resumeWords++;
	}else{	//代码部分
		if(strCount<=7){
			sourceBoard.innerHTML = str.substring(0,wordsCount);
			styleTag.innerHTML = str.substring(0,wordsCount);
		}
		
		// 代码高亮
		if((strCount>=4 && strCount<=7) || strCount>=9){
			sourceBoard.innerHTML = Prism.highlight(str.substring(0,wordsCount),Prism.languages.css);
		}
		
		// 简历板
		if(strCount == 7){
			if(!document.getElementById('drawBoard')){
				var drawBoard = document.createElement('pre');
				drawBoard.id = 'drawBoard';
				document.body.appendChild(drawBoard);
			}
		}
		
		// markdown
	/*	if(wordsCount>=967){
			document.getElementById('drawBoard').innerHTML = marked(strArray[7]);
		}
	*/	
		// 自动滚动
		$('#sourceBoard').animate({
			scrollTop: 1000
		}, 50);
		
		
		// 判断一条str是否完成
		if(wordsCount>=str.length){
			if(strCount != 7) str += strArray[strCount];
			strCount++;
		}
		
		
		//console.log(wordsCount+str.substr(0,wordsCount).substr(-1));
		
		wordsCount++;
	}
	
	// 判断是否全部完成
	if(strCount>strArray.length){
		window.clearInterval(controller);
	}
}