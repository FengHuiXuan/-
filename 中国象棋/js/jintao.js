

let chessPieces = {   //生成每个棋子的坐标以及图片
    //黑棋
    bC1:{y:0,x:0,img:'./img/b_c.png'},
    bC2:{y:0,x:8,img:'./img/b_c.png'},
    bM1:{y:0,x:1,img:'./img/b_m.png'},
    bM2:{y:0,x:7,img:'./img/b_m.png'},
    bX1:{y:0,x:2,img:'./img/b_x.png'},
    bX2:{y:0,x:6,img:'./img/b_x.png'},
    bS1:{y:0,x:3,img:'./img/b_s.png'},
    bS2:{y:0,x:5,img:'./img/b_s.png'},
    bJ1:{y:0,x:4,img:'./img/b_j.png'},
    bP1:{y:2,x:1,img:'./img/b_p.png'},
    bP2:{y:2,x:7,img:'./img/b_p.png'},
    bZ1:{y:3,x:0,img:'./img/b_z.png'},
    bZ2:{y:3,x:2,img:'./img/b_z.png'},
    bZ3:{y:3,x:4,img:'./img/b_z.png'},
    bZ4:{y:3,x:6,img:'./img/b_z.png'},
    bZ5:{y:3,x:8,img:'./img/b_z.png'},

    //红棋
    rC1:{y:9,x:0,img:'./img/r_c.png'},
    rC2:{y:9,x:8,img:'./img/r_c.png'},
    rM1:{y:9,x:1,img:'./img/r_m.png'},
    rM2:{y:9,x:7,img:'./img/r_m.png'},
    rX1:{y:9,x:2,img:'./img/r_x.png'},
    rX2:{y:9,x:6,img:'./img/r_x.png'},
    rS1:{y:9,x:3,img:'./img/r_s.png'},
    rS2:{y:9,x:5,img:'./img/r_s.png'},
    rJ1:{y:9,x:4,img:'./img/r_j.png'},
    rP1:{y:7,x:1,img:'./img/r_p.png'},
    rP2:{y:7,x:7,img:'./img/r_p.png'},
    rZ1:{y:6,x:0,img:'./img/r_z.png'},
    rZ2:{y:6,x:2,img:'./img/r_z.png'},
    rZ3:{y:6,x:4,img:'./img/r_z.png'},
    rZ4:{y:6,x:6,img:'./img/r_z.png'},
    rZ5:{y:6,x:8,img:'./img/r_z.png'},


}

initMap = [
	['bC1','bM1','bX1','bS1','bJ1','bS2','bX2','bM2','bC2'],
	[     ,     ,     ,     ,     ,     ,     ,     ,    ,],
	[     ,'bP1',     ,     ,     ,     ,     ,'bP2',     ,],
	['bZ1',     ,'bZ2',     ,'bZ3',     ,'bZ4',     ,'bZ5'],
	[     ,     ,     ,     ,     ,     ,     ,     ,     ,],
	[     ,     ,     ,     ,     ,     ,     ,     ,     ,],
    ['rZ1',     ,'rZ2',     ,'rZ3',     ,'rZ4',     ,'rZ5'],
	[     ,'rP1',     ,     ,     ,     ,     ,'rP2',     ,],
	[     ,     ,     ,     ,     ,     ,     ,     ,     ,],
	['rC1','rM1','rX1','rS1','rJ1','rS2','rX2','rM2','rC2'],
];
//渲染在页面中
 var frag=document.createDocumentFragment();

 for (var i = 0; i < initMap.length; i++) {   //渲染页面
    for (var j = 0; j < initMap[i].length; j++) {
            let attr = initMap[i][j] 
       if(attr === undefined){
            let p = document.createElement('p')
            p.style.top = i*57+'px';
            p.style.left = j*57+'px';
            p.most={
                x:i,
                y:j
            };
            p.id=" " + j + i;
            frag.appendChild(p)
       }else{
            let div = document.createElement('div')
            div.style.background = "url("+chessPieces[attr].img+") no-repeat" ;
            div.style.top = chessPieces[attr].y*57+'px';
            div.style.left = chessPieces[attr].x*57+'px';
            div.id = attr+'-'+ chessPieces[attr].x +chessPieces[attr].y
            div.most = attr
            frag.appendChild(div)
       }
        
    }
 }
box.appendChild(frag)

let t = {};  //定义全局对象
t.hue = true; //默认红棋先走 
t.div = box.getElementsByTagName('div')

t.pure = () => { //清除所有的边框
    for (var i = 0; i < t.div.length; i++) {
        t.div[i].className = '';
    }
} 
t.panduan = false;
t.swop = (arr) => {
   if( !arr[0] ) return 
   let q = arr[0].id.slice(-2)
   let z = arr[1].id.slice(-2)
   arr[0].style.top = z[1]*57+'px';
   arr[0].style.left = z[0]*57+'px';
   arr[1].style.top = q[1]*57+'px';
   arr[1].style.left = q[0]*57+'px';
   t.hue = !t.hue
   t.panduan = false;
}

t.interChange = (e1,e2) => {
    let q = e1.id.slice(-2);
    let z = e2.id.slice(-2);
    e1.style.top = z[1]*57+'px';
    e1.style.left = z[0]*57+'px';
    e2.remove()
    console.log(e2)
}
t.coordinate = []     //存储起点终点的位置

t.trueFalse = null;

box.onclick = function(ev){
    t.pure() //清除所有的边框
   if(ev.target.nodeName == 'DIV'){
        let ele =  ev.target;
        // if(t.trueFalse !== ele.id.charAt(0)){
        //     t.f()
        // }
        if(ele.id.charAt(0) === 'r' &&  t.hue) {
             ele.className = 'activeR';
             t.coordinate[0] = ele;
             t.panduan = true;
             
             if(t.trueFalse !== null){ 
                 if(t.trueFalse.id.charAt(0) === 'b'){
                    t.interChange(t.trueFalse,ele)
                 }
             } 
        }else if(ele.id.charAt(0) === 'b' && t.hue === false){
            ele.className = 'activeB';
            t.coordinate[0] = ele;
            t.panduan = true;
            
            if(t.trueFalse.id.charAt(0) === 'r'){
                t.interChange(t.trueFalse,ele)
                
            }
        }
      
        
        t.trueFalse = ele


    }else if (ev.target.nodeName == 'P' && t.panduan ) {
        let ele =  ev.target
        t.coordinate[1] = ele
        t.swop(t.coordinate)
    }

}

