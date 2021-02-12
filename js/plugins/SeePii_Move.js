var jl1 = 0;
function juli(){
    let ex =0;
    let ey=0;
    var jl=[100];
    var m5 =jl[0];
    for(i=1; i<$gameMap._events.length;i++){
    if($gameMap._events[i]==undefined || $gameMap._events[i]._user.battler == null || $gameMap._events[i]._coopMembers!=undefined){
        //console.log($gameMap._events.length)
        jl[i]=999;
    }else{
      jl[i]=Math.abs($gameMap.event(i)._x - ex)+($gameMap.event(i)._y - ey)
             //console.log(ex)
            //console.log(ey)
    }
    if(m5>jl[i]){
        m5 =jl[i]
    }

}
jl.filter(function (item,index) {
    if(item==m5){
        jl1 = index;
    }});
}