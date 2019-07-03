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
		color: black;\n\
		overflow: auto;\n\
		border: 1px solid #ccc;\n\
		width: 44%;\n\
		height: 96%;\n\
		background: #f7f0d4;\n\
		font-family: "微软雅黑";\n\
		font-size: 14px;\n\
		position: absolute;\n\
		-webkit-transform: translate(5%, 2%);\n\
		transform: translate(5%, 2%);\n\
	}\n';
strArray[7] = '\n\
# 姓名\n\
------------------------------\n\
>性别：x  \n\
>籍贯：xxxxxxx  \n\
>生日：xxxx.xx  \n\
>学历：xx  \n\
>毕业院校：xxxxxx大学  \n\
>手机：12345678900  \n\
>邮箱：123456789@xx.com  \n\
## 教育背景  \n\
------------------------------  \n\
>* xxxx.xx-xxxx.xx  xxxxxx大学  xxxx专业  \n\
>* xxxx.xx-xxxx.xx  xxxxxx大学  xxxx专业  \n\
## 项目经历  \n\
------------------------------  \n\
>* xxxx项目  \n\
>* xxxx项目  \n\
>* xxxx项目  \n\
## 个人技能  \n\
------------------------------  \n\
>* xxxx  \n\
>* xxxx  \n\
>* xxxx  \n\
>* xxxx  \n\
>* xxxx  \n\
>* xxxx  \n\
## 奖项荣誉  \n\
-----------------------------  \n\
>* xxxx  \n\
>* xxxx  \n\
>* xxxx  \n\
## 兴趣爱好  \n\
-----------------------------  \n\
>* xxxx  \n\
>* xxxx  \n\
>* xxxx  \n\
## 自我评价  \n\
-----------------------------  \n\
>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  \n\
>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  \n\
>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
strArray[8] = '\
	/**对了，这个简历是markdown语法，应该改成html才看着舒服。\n\
	 *接下来变个魔术\n\
	 *倒数3个数字\n\
	 *3......\n\
	 *2......\n\
	 *1......\n\
	**/\n';
strArray[9] = '\t/*再来点特效*/\n';
strArray[10] = '\
	pre:hover{\n\
		box-shadow: 0px 0px 40px 5px rgba(255, 255, 255, 0.4);\n\
	}\n'
strArray[11] = '\t/*看起来不是很美观，没关系，调整一下格式*/\n';
strArray[12] = '\
	#drawBoard{\n\
		padding: 0 20px;\n\
	}'

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
		var drawBoard = document.getElementById('drawBoard');
		drawBoard.innerHTML = strArray[7].substring(0, resumeWords);
		
		drawBoard.scrollTop = drawBoard.scrollHeight;
		
		if(resumeWords>=strArray[7].length){
			str += strArray[8];
			strCount++;
		}
		
		resumeWords++;
	}else{	//代码部分
		if(strCount<=7 || strCount>=10){
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
	
		sourceBoard.scrollTop = sourceBoard.scrollHeight;
		
		// 判断一条str是否完成
		if(wordsCount>=str.length){
			// markdown
			if(strCount == 9){
				var drawBoard = document.getElementById('drawBoard');
				drawBoard.style.cssText = 'white-space: normal';
				drawBoard.innerHTML = marked(strArray[7]);
			}
			if(strCount != 7) str += strArray[strCount];
			strCount++;
		}		
		
		//console.log(strCount+' '+wordsCount+' '+str.substr(0,wordsCount).substr(-1));
		
		wordsCount++;
	}
	
	// 判断是否全部完成
	if(strCount>strArray.length){
		window.clearInterval(controller);
	}
}