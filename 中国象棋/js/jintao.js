

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

let initMap = [
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
let frag = document.createDocumentFragment();

let general ={}; 
 for (var i = 0; i < initMap.length; i++) {   //渲染页面
    for (var j = 0; j < initMap[i].length; j++) {
        let attr = initMap[i][j] 
        if(attr === undefined){
                let p = document.createElement('p')
                p.style.top = i*57+'px';
                p.style.left = j*57+'px';
            
                p.id = "" + j + i;
                frag.appendChild(p)
        }else{
                let div = document.createElement('div')
                div.style.background = "url("+chessPieces[attr].img+") no-repeat" ;
                div.style.top = chessPieces[attr].y*57+'px';
                div.style.left = chessPieces[attr].x*57+'px';
                div.id = attr+'-'+ chessPieces[attr].x +chessPieces[attr].y
                frag.appendChild(div)
                if(attr.charAt(1) === 'J'){
                    general[attr] = div
                }
        }
        
    }
}
let jiangjun = document.querySelector('.jiangjun') 
let spans = document.querySelector('.kaishi') 
let xing = document.querySelector('.xing') 
spans.onclick = function(){
    spans.remove()
    box.appendChild(frag)
}
function jiangJun(){
    jiangjun.style.opacity = 1;
    setTimeout(function(){
        jiangjun.style.opacity = 0;
    },1000)
}

function xingX(){
   if(xing.offsetTop === 290){
        xing.style.top = 0;
    }else{
        xing.style.top = '290px';
    }
}


let t = {};  //定义全局对象
t.hue = 'b'; //红棋先走 
t.prev = false; //用来记录空白处的点击  
t.div = box.getElementsByTagName('div')

t.swop = (e1,e2) => { //走步不吃子
    //arr[0]为起点位置arr[1]终点位置
 
   if( !e1 ) return 
   //rule(e1,arr[1])  //规则
   if(rule(e1,e2)) return  //判断是否符合规则
   t.prev = false;
  
   let q = e1.id.slice(-2)
   let z = e2.id.slice(-2)
   e1.style.top = z[1]*57+'px';
   e1.style.left = z[0]*57+'px';
   e1.id = e1.id.slice(0,4) + z;
   chessPieces[e1.id.slice(0,3)].y =  z[1];
   chessPieces[e1.id.slice(0,3)].x =  z[0];
   initMap[q[1]][q[0]] = undefined ;
   initMap[z[1]][z[0]] = e1.id.slice(0,3);
   e2.style.top = q[1]*57+'px';
   e2.style.left = q[0]*57+'px';
   e2.id = q ;
   t.hue = e1.id.charAt(0)
   xingX()
   if(t.hue === 'r'){
        e1.className =  e2.className = 'activeR'
        if(!rule(e1,general.bJ1)){
            jiangJun()
        }
       
   }else if(t.hue === 'b'){
        e1.className =  e2.className = 'activeB' 
        if(!rule(e1,general.rJ1)){
            jiangJun()
        }
       
   }
}

t.interChange = (e1,e2) => {  //走步吃子
    //e1起点位置，e2终点位置
    let q = e1.id.slice(-2);
    let z = e2.id.slice(-2);
    //吃子后改变位置、数据
    if(rule(e1,e2)) return //判断是否符合规则
    t.prev = false;
    e1.style.top = z[1]*57+'px';
    e1.style.left = z[0]*57+'px';
    e1.id = e1.id.slice(0,4) + z;
    chessPieces[e1.id.slice(0,3)].y =  z[1]
    chessPieces[e1.id.slice(0,3)].x =  z[0]
    initMap[q[1]][q[0]] = undefined ;
  
    initMap[z[1]][z[0]] = e1.id.slice(0,3);
   //吃子后删除数据、元素
    e2.remove();
    delete chessPieces[e2.id.slice(0,3)]
    t.hue = e1.id.charAt(0);
   //添加一个空白
    let p = document.createElement('p')
    p.style.top = q[1]*57+'px';
    p.style.left = q[0]*57+'px';
    p.id=q;
    box.appendChild(p)
    xingX()
    if(t.hue === 'r'){
        e1.className =  p.className = 'activeR'
       
        if(!rule(e1,general.bJ1)){
            jiangJun()
        }
    }else if(t.hue === 'b'){
        e1.className =  p.className = 'activeB' 
       
        if(!rule(e1,general.rJ1)){
            jiangJun()
        }
    }
    t.coordinate[1] = p
}
t.coordinate = []     //存储起点终点的位置



box.onclick = function(ev){
    if(ev.target.id === 'box') return
    
    if(ev.target.nodeName === 'DIV'){
       // t.pure() //清除所有的边框
       //if(t.coordinate[0]) t.coordinate[0].className = ''
        let ele =  ev.target;
        if(ele.id.charAt(0) === 'r') {  //红子
            if(t.hue === 'b'){       //该红子走了
                if(t.coordinate[0]) t.coordinate[0].className = ''
                if(t.coordinate[1]) t.coordinate[1].className = ''
                ele.className = 'activeR';
                t.coordinate[0] = ele; //记录起点位置
                t.prev = true 
                
           }else  if( t.coordinate[0] !== null && t.coordinate[0].id.charAt(0) === 'b' && t.hue === 'r'){
                //黑子要吃红子
                t.coordinate[1] = ele
                t.interChange(t.coordinate[0],t.coordinate[1])   //起点终点交换位置
                return
            }
        }else if(ele.id.charAt(0) === 'b'){ //黑子
            if(t.hue === 'r'){              //该黑子走了
                if(t.coordinate[0]) t.coordinate[0].className = ''
                if(t.coordinate[1]) t.coordinate[1].className = ''
                ele.className = 'activeB';
                t.coordinate[0] = ele;
                t.prev = true 
                return
            }else if(t.coordinate[0] !== null && t.coordinate[0].id.charAt(0) === 'r' && t.hue === 'b'){
                //红子要吃黑子
                t.coordinate[1] = ele
                t.interChange(t.coordinate[0],t.coordinate[1]) //起点终点交换位置
            }
        }
    }else if (ev.target.nodeName === 'P' && t.prev) {//走步不吃子
        let ele =  ev.target
        t.coordinate[1] = ele //终点位置
        t.swop(t.coordinate[0],t.coordinate[1])  //起点终点交换位置
    }
}
