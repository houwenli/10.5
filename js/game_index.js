var module = (function($,module){
	// 模块内参数
	var currentName = '';
	var currentUid = 0;
	var screenWidth;
	var screenHeight;
	var tableWidth;
	var tableHeight;
	var ws = null;
	var playerArr = [
		{username:"唐家三少", current:false,banker:false},
		{username:"东方不败", current:false,banker:false},
		{username:"独孤求败", current:false,banker:false},
		{username:"哈哈哈哈", current:true,banker:false},
		{username:"骷髅精灵", current:false,banker:false},
		{username:"番茄土豆", current:false,banker:false},
		{username:"再来一次", current:false,banker:false}
	];
	var timerId;
	var cardArr = ['1-1','1-2','1-3','1-4','1-5','1-6','1-7','1-8','1-9','1-10','1-11','1-12','1-13',
				   '2-1','2-2','2-3','2-4','2-5','2-6','2-7','2-8','2-9','2-10','2-11','2-12','2-13',
				   '3-1','3-2','3-3','3-4','3-5','3-6','3-7','3-8','3-9','3-10','3-11','3-12','3-13',
				   '4-1','4-2','4-3','4-4','4-5','4-6','4-7','4-8','4-9','4-10','4-11','4-12','4-13']

	// 初始化模块
	module.init=function(){
		screenWidth = document.body.clientWidth;
		screenHeight = document.body.clientHeight;
		tableWidth = screenWidth*.7;
		tableHeight = screenHeight*.8;
		// 进入游戏建立websocket链接
		module.WebSocketConn();
		// //初始化牌桌
		// module.initTable();
		// // 初始化当前玩家
		// module.initPlayer(playerArr);
	}

	// websocket链接
	module.WebSocketConn = function(){
		if (ws != null && ws.readyState == 1) {
            module.log("已经在线");
            return
        }

        if ("WebSocket" in window) {
            // Let us open a web socket
            // ws = new WebSocket("ws://ulpin.com:8080/flower/api/");
            ws = new WebSocket("ws:localhost:8080");
            ws.onopen = function() {
                // websocket is connect
                module.log('成功进入聊天室');

                // alt 链接成功，初始化已有用户
                onBegin(paramArr);
            };
            ws.onmessage = function(event) {
                var data = $.parseJSON(event.data);
                var action = 'on' + data[0];
                var params = data[1];
                window[action](params);
               	// module.log(event.data);
            };
            ws.onclose = function() {
                // websocket is closed.
                module.log("已经和服务器断开");
            };
            ws.onerror = function(event) {
                module.log("error " + event.data);
            };
        } else {
            // The browser doesn't support WebSocket
            alert("WebSocket NOT supported by your Browser!");
        }

        // alt 链接成功，初始化已有用户
        onBegin(paramArr);
	}

	module.SendMsg = function(msg) {
        if (ws != null && ws.readyState == 1) {
            //ws.send(msg);
            ws.send(JSON.stringify(["chat", {"msg":msg}]))
        } else {
            module.log('请先进入聊天室');
        }
    }

    module.WebSocketClose = function() {
        if (ws != null && ws.readyState == 1) {
            ws.close();
            module.log("发送断开服务器请求");
        } else {
            module.log("当前没有连接服务器")
        }
    }

    module.log = function(text) {
        console.log(text)
        return false;
    }

    module.checkws = function() {
      if (ws == null || ws.readyState != 1) {
          module.log('请先进入聊天室');
          return false;
      }
      return true;
    }

    // add 选择用户名
    module.selectname = function(name){
    	if (module.checkws()) {
          //ws.send('game|join');
          ws.send('["selectname"],{"username":'+name+'}');
      }
    }

    module.join = function() {
      if (module.checkws()) {
          //ws.send('game|join');
          ws.send('["join"]');
      }
    }

    module.cancel = function(){
      if (module.checkws()) {
          //ws.send('game|cancel');
          ws.send('["cancel"]');
      }
    }

    module.dealer = function(){
      if (module.checkws()){
          //ws.send('game|dealer|10');
          ws.send('["dealer",{"num":10}]');
      }
    }

    module.rob = function(num){
      if (module.checkws()){
          //ws.send('game|bet_a|5');
          ws.send('["bet_a",{"num":'+num+'}]');
      }
    }

    module.bet_a = function(num){
      if (module.checkws()){
          //ws.send('game|bet_a|5');
          ws.send('["bet_a",{"num":'+num+'}]');
      }
    }

    module.get_card = function(){
      if (module.checkws()){
          //ws.send('game|get_card');
          ws.send('["get_card"]');
      }
    }

    module.bet_b = function(num){
      if (module.checkws()){
          //ws.send('game|bet_b|3');
          ws.send('["bet_b",{"num":' + num + '}]');
      }
    }

    module.quit = function(){
      if (module.checkws()){
          module.WebSocketClose();
      }
    }

	// 初始化牌桌
	module.initTable = function(){
		$(".table").css({
			width:tableWidth,
			height:tableHeight,
			marginLeft:-1*screenWidth*.7/1.7
		})
	}

	// 初始化当前玩家
	module.initPlayer = function(playerArr){
		var playerLen = playerArr.length;
		var currentTarget;
		var playerStr = '';
		for(var i = 0;i < playerLen;i++){
			if(playerArr[i].current){
				currentTarget = i;
				break;
			}
		}
		for(var j=0;j < playerLen;j++){
			var deg;
			var top;
			var lrft;
			if(j<=currentTarget){
				deg = 270-(currentTarget-j)*360/playerLen;
			}else{
				deg = 270+(j-currentTarget)*360/playerLen;
			}
			// 确定left值,top值，一四象限
			if(Math.cos(deg*Math.PI/180)>0){
				left = tableWidth/2+tableWidth/2*tableHeight/2/Math.sqrt(Math.pow(tableWidth/2,2)*Math.pow(Math.tan(deg*Math.PI/180),2)+Math.pow(tableHeight/2,2));
				top = tableHeight/2-tableWidth/2*tableHeight/2*Math.tan(deg*Math.PI/180)/Math.sqrt(Math.pow(tableWidth/2,2)*Math.pow(Math.tan(deg*Math.PI/180),2)+Math.pow(tableHeight/2,2))
			}
			//二三象限
			if(Math.cos(deg*Math.PI/180)<=0){
				left = tableWidth/2-tableWidth/2*tableHeight/2/Math.sqrt(Math.pow(tableWidth/2,2)*Math.pow(Math.tan(deg*Math.PI/180),2)+Math.pow(tableHeight/2,2))
				top = tableHeight/2+tableWidth/2*tableHeight/2*Math.tan(deg*Math.PI/180)/Math.sqrt(Math.pow(tableWidth/2,2)*Math.pow(Math.tan(deg*Math.PI/180),2)+Math.pow(tableHeight/2,2))
			}
			if(Math.sin(deg*Math.PI/180)<=0){
				//在三四象限把牌放在头像上面
				playerStr += '<div class="player '+(j==currentTarget?' current-player ':'')+(playerArr[j].banker?'banker':'')+'" style="top:'+top+'px;left:'+left+'px;"><ul class="board-pannel clearfix"><li><img src="./images/1.5/back.png"/></li><li><img src="./images/1.5/1-1.png"/></li></ul><img src="'+(playerArr[j].banker?'./images/banker.jpg':'./images/player.jpg')+'"/>'+(j==currentTarget?'':'<p>'+playerArr[j].username+'<span class="chip"></span></p>')+'</div>';
			}else{
				playerStr += '<div class="player '+(playerArr[j].banker?'banker':'')+'" style="top:'+top+'px;left:'+left+'px"><img src="'+(playerArr[j].banker?'./images/banker.jpg':'./images/player.jpg')+'"/><p>'+playerArr[j].username+'<span class="chip"></span></p><ul class="board-pannel clearfix"><li><img src="./images/1.5/back.png"/></li><li><img src="./images/1.5/1-1.png"/></li></ul></div>';
			}
		}
		$('.table').append(playerStr);
	}

	// 倒计时效果
	module.countdown =function(className,func,flag){
		//第三个参数为true，清除倒计时
		if(flag){
			$("."+className).hide();
			$('.'+className+" .time-num").text(3);
			clearTimeout(timerId)
			return;
		}
		$("."+className).show();
		var timeLeft = parseInt($('.'+className+" .time-num").text());
		var arg = arguments;
		timerId=setTimeout(function(){
			if(timeLeft>0){
				$('.'+className+" .time-num").text(timeLeft-1);
				arg.callee(className,func,flag);
			}else{
				$("."+className).hide();
				// func?console.log(func):'';
				func?func():'';
			}
		},1000);
	}


	// 添加一些触发事件
	module.addListener = function(){
		// 选择用户名
		$(".select-username li").click(function(){
			var _this = $(this);
			currentName = _this.text();
			currentUid = _this.data('uid');
			//module.selectname(currentName);
			$(".enter-game").hide();
			$(".part-game").show();
		});
		// 参与游戏
		$(".join").click(function(){
			module.join();
			$(this).hide();
			$(".giveup").show();
			//开始倒计时
			module.countdown("satrt-time",function(){
				//alt 开始游戏
				onGamestart(playerArr);
				//发两张牌，重新组装playerArr
				onDealer(playerArr);
				robBanker();
			})
			//alt 参加游戏
			// 参加信息
			// var joinMsg = [
			// 	{username:"独孤求败", uid:3, current:false,banker:false},
			// ]
			onJoin([{username:currentName,uid:currentUid,current:false,banker:false}]);
		});
		// 放弃游戏
		$('.giveup').click(function(){
			module.cancel();
			$(this).hide();
			$(".join").show();
			//结束倒计时
			module.countdown("satrt-time",function(){},true)

			//alt
			onCancel(joinMsg);
		});
		// 抢注加筹码
		$('.rob-banker-crl .rob-banker-sub').click(function(){
			var num = parseInt($('.rob-banker-crl .rob-banker-num').text())-1>=0?parseInt($('.rob-banker-crl .rob-banker-num').text())-1:0;
			$('.rob-banker-crl .rob-banker-num').text(num);
		});
		// 抢注减筹码
		$('.rob-banker-crl .rob-banker-add').click(function(){
			var num = parseInt($('.rob-banker-crl .rob-banker-num').text())+1<=10?parseInt($('.rob-banker-crl .rob-banker-num').text())+1:10;
			$('.rob-banker-crl .rob-banker-num').text(num);
		});
		$(".rob-banker").click(function(){
			module.rob(parseInt($('.rob-banker-crl .rob-banker-num').text()))
			$('.rob-banker-crl').hide();

			// alt
			onRobBanker(robMsg);

			setTimeout(function(){
				onBankerSure(bankerMsg)
			},3000)

			setTimeout(bet_a,6000)
		});
		// 盲注加筹码
		$('.blind-bet-crl .blind-bet-sub').click(function(){
			var num = parseInt($('.blind-bet-crl .blind-bet-num').text())-1>=0?parseInt($('.blind-bet-crl .blind-bet-num').text())-1:0;
			$('.blind-bet-crl .blind-bet-num').text(num);
		});
		// 盲注减筹码
		$('.blind-bet-crl .blind-bet-add').click(function(){
			var num = parseInt($('.blind-bet-crl .blind-bet-num').text())+1<=10?parseInt($('.blind-bet-crl .blind-bet-num').text())+1:10;
			$('.blind-bet-crl .blind-bet-num').text(num);
		});
		$(".blind-bet").click(function(){
			module.bet_a(parseInt($('.rob-banker-crl .rob-banker-num').text()))
			$('.blind-bet-crl').hide();

			// alt
			onBet_a(robMsg,chipArr);
			cardInHand(cardInHandArr);

			setTimeout(bet_b,3000)
		});
		//要牌
		$('.getcard').click(function(){
			module.get_card();
			get_card(getCardArr);
			onGet_card(getCardMsg);
		});
		// 下注加筹码
		$('.bet-crl .bet-sub').click(function(){
			var num = parseInt($('.bet-crl .bet-num').text())-1>=0?parseInt($('.bet-crl .bet-num').text())-1:0;
			$('.bet-crl .bet-num').text(num);
		});
		// 下注减筹码
		$('.bet-crl .bet-add').click(function(){
			var num = parseInt($('.bet-crl .bet-num').text())+1<=10?parseInt($('.bet-crl .bet-num').text())+1:10;
			$('.bet-crl .bet-num').text(num);
		});
		$(".bet").click(function(){
			module.bet_b(parseInt($('.rob-banker-crl .rob-banker-num').text()))
			$('.bet-crl').hide();
			// alt
			onBet_b(robMsg);
			setTimeout(function(){
				onGameover(playerCardArr);
			}, 3000)
		});
		// 聊天室切换
		$(".chat-ctl li").click(function(event) {
			var ctl = $(this).data('ctl');
			$(".chat-room-detail ."+ctl+"-pannel").show().siblings().hide();
		});
		//发送消息
		$(".sendmsg").click(function(event){
			var msg = $(".msgtext").val();
			if(msg){
				module.SendMsg(msg);
				$(".chat-pannel").append('<p><span class="chat-name">'+currentName+'</span>：<span class="chat-msg">'+msg+'</span></p>');
				$(".msgtext").val('');
			}
		})
	}

	// 公共方法
	module.utils = {
		searchIndex:function(value,arr){
			if(!isArray(arr)){
				return -1;
			}
			for(var i = 0,arrLength = arr.length; i < arrLength; i++){
				if(typeof(arr[i])=='object'){
					for(var arrValue in arr[i]){
						if(value == arrValue){
							return i;
						}
					}
					return -1;
				}else{
					if(value == arr[i]){
						return i;
					}else{
						return -1;
					}
				}
			}
		},
		isArray:function(o){
			return Object.prototype.toString.call(o)=='[object Array]';
		},
		dealer:function(playerArr,cardArr){
			for(var i = 0; i < playerArr.length; i++){

			}
		}
	}

	// 调试
	module.debug = function(){
		console.log(currentName,currentUid)
	}

	return module;
})(jQuery,module||{});

$(function(){
	module.init();
	module.addListener();
})

// websock调用
//开始之前渲染已经存在的用户
var paramArr = [
	{username:"东方不败", current:false,banker:false},
	{username:"诸葛孔明", current:false,banker:false}
]
function onBegin(params){
	var waitStr = '';
	var memberStr ='';
	for(var i =0;i<params.length;i++){
		waitStr+='<li>'+params[i].username+'</li>';
		memberStr+='<p>'+params[i].username+'</p>';
		$(".select-username ul li[data-username="+params[i].username+"]").remove();
	}
	$(".waited-gamer ul").html(waitStr);
	$(".member-pannel").html(memberStr);
}
function onChat(params) {
    module.log("onChat=" + JSON.stringify(params));
}

function onLogin(params) {
    module.log("onLogin=" + JSON.stringify(params));
}

function onLoginInit(params) {
    module.log("onLoginInit=" + JSON.stringify(params))
}

//参与游戏
function onJoin(params) {
    // module.log("onJoin=" + JSON.stringify(params));
	$(".waited-gamer ul").append('<li class="uid'+params[0].uid+'">'+params[0].username+'</li>');
	$(".member-pannel").append('<p class="uid'+params[0].uid+'">'+params[0].username+'</p');
	$(".chat-pannel").append('<p><span class="chat-name">系统消息</span>：<span class="chat-msg">'+params[0].username+'进入房间</span></p')
}

function onCancel(params) {
    // module.log("onCancel=" + JSON.stringify(params));
    $('.waited-gamer li').remove('.uid'+params[0].uid);
    $(".member-pannel p").remove('.uid'+params[0].uid);
}

// add 抢庄
function robBanker(){
	$(".rob-banker-crl").show();
}
var robMsg = [{name:'哈哈哈哈',rob:'5'}]
function onRobBanker(params){
	$(".chat-pannel").append('<p><span>系统消息</span>：<span>'+params[0].name+'抢注下了'+params[0].rob+'</span></p>')
}

var bankerMsg = [{username:"唐家三少", location:0},]
function onBankerSure(params){
	$(".player>img").eq(params[0].location).attr('src','./images/banker.jpg')
}

function onDealer(params) {
    // module.log("onDealer=" + JSON.stringify(params));    
    module.initPlayer(params);
}

// 盲注
function bet_a(){
	$(".blind-bet-crl").show();
}
var chipArr = [
		{username:"唐家三少", chip:6},
		{username:"东方不败", chip:7},
		{username:"独孤求败", chip:8},
		{username:"哈哈哈哈", chip:9},
		{username:"骷髅精灵", chip:8},
		{username:"番茄土豆", chip:6},
		{username:"再来一次", chip:4}
]
function onBet_a(params,chipArr) {
	for(var i = 0;i<chipArr.length;i++){
		$('.player .chip').text(chipArr[i].chip)
	}
    // module.log("onBet_a=" + JSON.stringify(params));
    $(".chat-pannel").append('<p><span>系统消息</span>：<span>'+params[0].name+'盲注下了'+params[0].rob+'</span></p>')
}

//看底牌
var cardInHandArr = [{name:'哈哈哈哈',card:'3-3'}];
function cardInHand(params){
	$(".current-player .board-pannel li").eq(0).find('img').attr('src','./images/1.5/'+params[0].card+'.png');
}

//要牌
var getCardArr = [{name:'哈哈哈哈',card:'1-3'}];
var getCardMsg = [{name:'哈哈哈哈'}];
function get_card(params){
	$(".current-player .board-pannel").append('<li><img src="./images/1.5/'+params[0].card+'.png" ></li>');
}
function onGet_card(params) {
    // module.log("onGet_card=" + JSON.stringify(params));
    $(".chat-pannel").append('<p><span>系统消息</span>：<span>'+params[0].name+'要了一张牌</span></p>')
}

// 下注
function bet_b(){
	$(".bet-crl").show();
}
function onBet_b(params) {
    // module.log("onBet_b=" + JSON.stringify(params));
    $(".chat-pannel").append('<p><span>系统消息</span>：<span>'+params[0].name+'下注下了'+params[0].rob+'</span></p>')
}

function onQuit(params) {
    module.log("onQuit=" + JSON.stringify(params));
}

function onGamestart(params) {
    // module.log("onGamestart=" + JSON.stringify(params));
    $(".waited-gamer").hide();
    $(".part-game").hide();
    $(".start-game").show();
    module.initTable();
}

function onMycard(params) {
    module.log("onMycard=" + JSON.stringify(params));
}

function onGetMycard(params) {
    module.log("onGetMycard=" + JSON.stringify(params));
}
var playerCardArr = [
		{username:"唐家三少", card:'1-12',point:8,record:20},
		{username:"东方不败", card:'2-3',point:7,record:30},
		{username:"独孤求败", card:'3-4',point:5,record:-40},
		{username:"哈哈哈哈", card:'3-3',point:6,record:-20},
		{username:"骷髅精灵", card:'4-5',point:3,record:-40},
		{username:"番茄土豆", card:'4-8',point:8,record:20},
		{username:"再来一次", card:'3-6',point:10,record:30}
	];
function onGameover(params) {
    // module.log("onGameover=" + JSON.stringify(params));
    var statStr = '';
    for(var i=0;i<params.length;i++){
    	$('.player').eq(i).find('.board-pannel li').eq(0).find('img').attr('src','./images/1.5/'+params[i].card+'.png');
    	statStr += '<p><span class="name">'+params[i].username+'</span><span class="point">'+params[i].point+'</span><span class="record">'+params[i].record+'</span></p>';
    }
    $('.gameover').append(statStr).show();
}

function onReload(params) {
    module.log("onReload=" + JSON.stringify(params));
}

function onError(params) {
    module.log("onError=" + JSON.stringify(params))
}