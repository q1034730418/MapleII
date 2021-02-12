var arr01=[100];
var arr02=[100];
var arr03=[100];
var min =arr01[0];
var min5 =arr03[0];
for(i=1; i<$gameMap._events.length;i++){
    if($gameMap._events[i]==undefined || $gameMap._events[i]._user.battler == null){
        console.log("这是一个{普通事件}"+' ID: '+i)
        arr01[i]=999;
        arr02[i]=999;
        arr03[i]=999;
    }else{ arr01[i]=$gameMap.event(i)._x /*- $gamePlayer._x;*/       //玩家与事件距离X
           arr02[i]=$gameMap.event(i)._y                             //玩家与事件距离y
           arr03[i]=Math.abs($gameMap.event(i)._x - $gamePlayer._x)+($gameMap.event(i)._y - $gamePlayer._y)
           console.log("这是一个【怪物】ID:"+i+ "    x坐标 : "+arr01[i]+"     y坐标 : "+arr02[i]+'     距离'+arr03[i]+'格')
               //获取距离绝对值

    }
    if(min>arr01[i]){
        min =arr01[i]
    }
    if(min5>arr03[i]){
        min5 =arr03[i]
    }

}
arr03.filter(function (item,index) {

    if(item==min5){
        //console.log(item); //找出元素
　　　　 console.log('最近的怪物事件编号： '+index+"        距离： "+min5); //找出最近的怪物的元素在数组中的索引
    }
});
//console.log("X轴最近的怪物："+min)
//console.log("Y轴最近的怪物："+min2)