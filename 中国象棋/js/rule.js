function rule(ele1,ele2) {
    let id1 = ele1.id
    let X1 = id1.charAt(4)*1
    let Y1 = id1.charAt(5)*1
   
    let id2 = ele2.id

    let X2,Y2
    if(id2.length == 2){
         X2 = id2.charAt(0)*1
         Y2 = id2.charAt(1)*1
    }else if(id2.length == 6){
         X2 = id2.charAt(4)*1
         Y2 = id2.charAt(5)*1
    }
    let n = 0
    if( chessPieces.bJ1.x === chessPieces.rJ1.x  && X2 !== chessPieces.bJ1.x && X1 === chessPieces.bJ1.x){
        for(let attr in chessPieces){
            if(chessPieces[attr].x == X1){
                n++
            }
        }
        if(n === 3){
            //将军了
            alert('将军')
            return true
        }
       
    }
   
   
    if(id1.charAt(1) === 'C'){
         //------------------------------------------车检索
         let arr = [];
         if(X1 === X2){
           if(Y1 > Y2){
                //上检索
                for(let attr in chessPieces){
                    if(chessPieces[attr].x == X1 && chessPieces[attr].y > Y2 && chessPieces[attr].y < Y1  ){
                        arr.push(chessPieces[attr].y)
                    }
                }
                if(arr.length == 0){
                    return false
                }
               
            }else if(Y1 < Y2){
                //下检索
                for(let attr in chessPieces){
                    if(chessPieces[attr].x == X1 && chessPieces[attr].y > Y1 && chessPieces[attr].y < Y2){
                        arr.push(chessPieces[attr].y)
                    }
                }
                if(arr.length == 0){
                    return false
                }
            }
         }else if(Y1 === Y2){
            if(X1 > X2){
                //左检索
                for(let attr in chessPieces){
                    if(chessPieces[attr].y == Y1 && chessPieces[attr].x < X1 && chessPieces[attr].x > X2){
                        arr.push(chessPieces[attr].x)
                    }
                }
                if(arr.length == 0){
                    return false
                }
            }else if(X1 < X2){
                //右检索
                for(let attr in chessPieces){
                    if(chessPieces[attr].y == Y1 && chessPieces[attr].x > X1 && chessPieces[attr].x < X2){
                        arr.push(chessPieces[attr].x)
                    }
                }
                if(arr.length == 0){
                    return false
                }
            }
         }
    }else if (id1.charAt(1) === 'M') {
        //----------------------------------------------马检索
        let arr = [];
       if(Y1-2 == Y2 && (X1-1 == X2 || X1+1 == X2)){
            //上
            
            for(let attr in chessPieces){
                if(chessPieces[attr].x == X1 && chessPieces[attr].y == Y1 - 1){
                    arr.push(true)
                    break
                } 
            }
           if(!arr[0]) return false
        }else if(Y1+2 == Y2 && (X1-1 == X2 || X1+1 == X2)){
            //下
           
            for(let attr in chessPieces){
                if(chessPieces[attr].x == X1 && chessPieces[attr].y == Y1 + 1){
                    arr.push(true)
                    break
                }
            }
            if(!arr[0]) return false
        }else if(X1-2 == X2 && (Y1-1 == Y2 || Y1+1 == Y2)){
            //左
           
            for(let attr in chessPieces){
                if(chessPieces[attr].y == Y1 && chessPieces[attr].x == X1 - 1){
                    arr.push(true)
                    break
                }
             }
            if(!arr[0]) return false
        }else if(X1+2 == X2 && (Y1-1 == Y2 || Y1+1 == Y2)){
            //右
            for(let attr in chessPieces){
                if(chessPieces[attr].y == Y1 && chessPieces[attr].x == X1 + 1){
                    arr.push(true)
                    break
                }
             }
            if(!arr[0]) return false
        }
    }else if (id1.charAt(1) === 'X'){
    //--------------------------------------------相检索
        let arr = [];
       
        if(id1.charAt(0) === 'r'){
            if(Y2 < 5) return true 
        }
        if(id1.charAt(0) === 'b'){
            if (Y2 > 4) return true 
        } 
        if(Y1-2 == Y2 && X1-2 == X2 ){
            //左上
            for(let attr in chessPieces){
                if(chessPieces[attr].x == X1-1 && chessPieces[attr].y == Y1 - 1){
                    arr.push(true)
                    break
                } 
            }
           if(!arr[0]) return false
        }else if(Y1-2 == Y2 && X1+2 == X2 ){
            //左上
            for(let attr in chessPieces){
                if(chessPieces[attr].x == X1+1 && chessPieces[attr].y == Y1 - 1){
                    arr.push(true)
                    break
                } 
            }
           if(!arr[0]) return false
        }else if(Y1+2 == Y2 && X1-2 == X2 ){
            //左下
           for(let attr in chessPieces){
                if(chessPieces[attr].x == X1-1 && chessPieces[attr].y == Y1 + 1){
                    arr.push(true)
                    break
                }
            }
            if(!arr[0]) return false
        }else if(Y1+2 == Y2 && X1+2 == X2 ){
            //右下
            for(let attr in chessPieces){
                if(chessPieces[attr].x == X1+1 && chessPieces[attr].y == Y1 + 1){
                    arr.push(true)
                    break
                }
            }
            if(!arr[0]) return false
        }
    }else if (id1.charAt(1) === 'S'){
        //----------------------------------------士检索
        let arr = [];
        if((X1 == 3 || X1 == 5) && X2 == 4){
            if(Y1 < 3 && Y2 == 1){ //黑棋
                return chazhao(1) 
            }else if(Y1 > 6 && Y2 == 8){ //红棋
                return chazhao(8)
            }
        }else if(X1 == 4){
            if(Y1 < 3 && ((X2 == 3 || X2 == 5) && (Y2 == 0 || Y2 ==2))){ //黑棋
                return false 
            }else if(Y1 > 6 && ((X2 == 3 || X2 == 5) && (Y2 == 7 || Y2 ==9))){ //红棋
                return false 
            }
        }
    }else if (id1.charAt(1) === 'J'){
         //----------------------------------------将检索
         let arr = [];
         if(id1.charAt(0) === 'r'){
           if(X2 >= 3 && X2 <= 5 && Y2 >= 7){
               
                if(((X1+1 == X2 || X1-1 == X2) && Y1 === Y2) || ((Y1+1 == Y2 || Y1-1 == Y2) && X1 === X2)) return false 
            }
         }else if(id1.charAt(0) === 'b'){
            if(X2 >= 3 && X2 <= 5 && Y2 <= 2){
                if(((X1+1 == X2 || X1-1 == X2) && Y1 === Y2) || ((Y1+1 == Y2 || Y1-1 == Y2) && X1 === X2)) return false 
            }
         }
    }else if (id1.charAt(1) === 'P'){
        //----------------------------------------炮检索
        let arr = [];
        if(X1 === X2){
            if(Y1 > Y2){
                //上检索
                for(let attr in chessPieces){
                    if(chessPieces[attr].x == X1 && chessPieces[attr].y > Y2 && chessPieces[attr].y < Y1  ){
                        arr.push(chessPieces[attr])
                    }
                }
                if(ele2.nodeName === 'P' && arr.length == 0){
                    return false
                }else if(ele2.nodeName === 'DIV' && arr.length == 1){
                     return false
                }
                
            }else if(Y1 < Y2){
                //下检索
                for(let attr in chessPieces){
                    if(chessPieces[attr].x == X1 && chessPieces[attr].y > Y1 && chessPieces[attr].y < Y2){
                        arr.push(chessPieces[attr].y)
                    }
                }
                if(ele2.nodeName === 'P' && arr.length == 0){
                    return false
                }else if(ele2.nodeName === 'DIV' && arr.length == 1){
                    return false
                }
            }
        }else if(Y1 === Y2){
            if(X1 > X2){
                //左检索
                for(let attr in chessPieces){
                    if(chessPieces[attr].y == Y1 && chessPieces[attr].x < X1 && chessPieces[attr].x > X2){
                        arr.push(chessPieces[attr].x)
                    }
                }
                if(ele2.nodeName === 'P' && arr.length == 0){
                    return false
                }else if(ele2.nodeName === 'DIV' && arr.length == 1){
                    return false
                }
            }else if(X1 < X2){
                //右检索
                for(let attr in chessPieces){
                    if(chessPieces[attr].y == Y1 && chessPieces[attr].x > X1 && chessPieces[attr].x < X2){
                        arr.push(chessPieces[attr].x)
                    }
                }
                if(ele2.nodeName === 'P' && arr.length == 0){
                    return false
                }else if(ele2.nodeName === 'DIV' && arr.length == 1){
                    return false
                }
            }
        }
    }else if (id1.charAt(1) === 'Z'){
        //----------------------------------------炮检索
        let arr = [];
        if(id1.charAt(0) === 'r'){
          if(Y2 < 5){
                if(((X1+1 == X2 || X1-1 == X2) && Y1 === Y2) || ( Y1-1 == Y2 && X1 === X2)) return false 
           }else if(Y2 >= 5){
               if(X1 == X2 && Y1-1 == Y2) return false
           }
        }else if(id1.charAt(0) === 'b'){
            if(Y2 >= 5){
                if(((X1+1 == X2 || X1-1 == X2) && Y1 === Y2) || ( Y1+1 == Y2 && X1 === X2)) return false 
            }else if(Y2 < 5){
                if(X1 == X2 && Y1+1 == Y2) return false
            }
        }

    }
   return true
} 





function  chazhao (n) {
    let arr = []
    for(let attr in chessPieces){
        if(chessPieces[attr].x == 4 && chessPieces[attr].y == n){
            arr.push(true)
            break
        }
    }
    if(!arr[0]) return false
}