(function(){function LongPress(el,opts,cb){var defOpts={interval:1000};this.beforeClick=false;this.longPressTimer=null;this.mouseMoveCounter=0;this.timeCounter=0;defOpts=extend(defOpts,opts);this.handleTouchStart=function(e){e.preventDefault();var _this=this;_this.beforeClick=true;_this.mouseMoveCounter=0;_this.timeCounter=0;_this.longPressTimer=setInterval(function(){_this.timeCounter+=1;if(typeof defOpts.onProgress==="function"){defOpts.onProgress.call(_this,_this.timeCounter/(defOpts.interval/100))}if(_this.timeCounter>=defOpts.interval/100){typeof defOpts.onComplete==="function"&&defOpts.onComplete.call(_this);clearInterval(_this.longPressTimer)}},100)};this.handleTouchMove=function(e){if(this.beforeClick){clearInterval(this.longPressTimer)}};this.handleMouseMove=function(e){if(this.beforeClick){this.mouseMoveCounter+=1;if(this.mouseMoveCounter>1){clearInterval(this.longPressTimer)}}};this.handleTouchEnd=function(e){this.beforeClick=false;this.mouseMoveCounter=0;this.longPressTimer&&clearInterval(this.longPressTimer)};function extend(obj,obj2){for(var i in obj2){if(obj2.hasOwnProperty(i)){if(typeof obj2[i]==="object"){obj[i]=extend(obj[i]||{},obj2[i])}else{obj[i]=obj2[i]}}}return obj}el.addEventListener("touchstart",this.handleTouchStart,false);el.addEventListener("mousedown",this.handleTouchStart,false);el.addEventListener("touchmove",this.handleTouchMove,false);el.addEventListener("mousemove",this.handleMouseMove,false);el.addEventListener("touchend",this.handleTouchEnd,false);el.addEventListener("mouseup",this.handleTouchEnd,false)}if(typeof module!=="undefined"&&typeof exports==="object"){module.exports=LongPress}else{if(typeof define==="function"&&(define.amd||define.cmd)){define(function(){return LongPress})}else{this.LongPress=LongPress}}})();
class Params {
  constructor(w,l,qty,boxes) {
    this.w = w,
    this.l = l,
    this.qty = qty,
    this.boxes = boxes
  }

}

const input_l = document.getElementById('length')
const input_w = document.getElementById('width')
const input_qty = document.getElementById('qty')
const input_boxes = document.getElementById('boxes')
const output = document.getElementById('result')
const btn_calc = document.getElementById('btn_calc')
const btn_showAddTile = document.getElementById('btnShowAddTile')
const newTileElem = document.getElementById('newTile')
const btnAddTile = document.getElementById('btnAddTile')
const tilesListElem = document.getElementById('tiles')

let params = new Params(0, 0, 1, 1);

let tilesList = []

// btn_showAddTile.addEventListener('click', ()=>{
//   newTileElem.style.display = 'flex'
// })
// btnAddTile.addEventListener('click', ()=>{
//   addTile(input_w.value, input_l.value)
// })


input_l.addEventListener('input',()=>{
  params.l = event.target.value
  showParams()
  output.value = '-'
})
input_w.addEventListener('input', ()=>{
  params.w = event.target.value
  showParams()
  output.value = '-'
})

input_qty.addEventListener('change',()=>{
  params.qty = event.target.value
  showParams()
  output.value = '-'
})

input_boxes.oninput = ()=>{
  params.boxes = input_boxes.value
  showParams()
  output.value = '-'
}
input_boxes.on
btn_calc.addEventListener('click', ()=> {
  
  
  output.value = calcS(params) + 'м²'
    // console.log(tilesList)
  // console.log(isRepeat(params.w, params.l))
  console.log(calcS(params.w, params.l))
  
  console.log(calcS(params.w, params.l) == NaN)
    if(!isRepeat(params.w, params.l)){
      addTile(params.w, params.l)
    }
  
  
  
  // if(!isRepeat(params.l, params.w)){
  //   addTile(params.w, params.l)
  // }

})



class Tile {
  constructor(width,length) {
    this.width = width,
    this.length = length
  }
}
function addTile(width, length) {
  tilesList.push(new Tile(width, length))
    console.log(tilesList)
    const newTile = document.createElement('button')
    newTile.className = 'tile'
    if(width >=100 && length >=100){
      newTile.innerHTML = `${width}×${length}`
      const tile_s = document.createElement('div')
      tile_s.style.position = 'absolute'
      tile_s.style.bottom = '1px'
      // tile_s.style.margin = '0 auto'
      tile_s.innerHTML = `${width*length/1000000}м²`
      newTile.insertAdjacentElement("beforeend",tile_s)
    }
    

    new LongPress(newTile,{
      interval: 1000,
      onProgress: function(percent){
        if(percent <=0.5){
          input_l.value = length
          input_w.value = width
          output.value = '-'
      
          params.w = width
          params.l = length
      
          newTile.style.backgroundColor = '#ffffff29'
          // newTile.style.color = 'black'
          newTile.style.borderWidth = '4px'
          // newTile.style.fontSize = 'larger'
          // newTileElem.style.display = 'none'
        
          getSiblings(newTile).forEach((elem)=>{
            elem.style.backgroundColor =''
          })
        }
        console.log(percent)
      },
      onComplete: function(){
        console.log('complete')
        tilesListElem.removeChild(newTile)
        tilesList.splice(tilesList.indexOf(new Tile(width, length)))
      }
    })

  
  newTile.addEventListener('click', ()=>{
    input_l.value = length
    input_w.value = width
    output.value = '-'

    params.w = width
    params.l = length

    newTile.style.backgroundColor = '#ffffff29'
    // newTile.style.color = 'black'
    newTile.style.borderWidth = '4px'
    // newTile.style.fontSize = 'larger'
    // newTileElem.style.display = 'none'
  
    getSiblings(newTile).forEach((elem)=>{
      elem.style.backgroundColor =''
    })
  })
  newTile.classList.add(['newTile'])
    newTile.style.width = `${width}px`
  newTile.style.height = `${length}px`
  tilesListElem.insertBefore( newTile, btn_showAddTile)
}

function calcS(params) {
  // Tab to edit
  
  let result = params.l*params.w*params.qty*params.boxes/1000000
  
  return result
  
  
}

function getSiblings(element){
  let siblings = [];
  Array.from(element.parentNode.children).forEach(sibling => {
      if(sibling !== element) {
         siblings.push(sibling);
      }
  });
  return siblings;
} // Получаем массив соседей элемента

function showParams(){
  console.log(params)
}

function isRepeat(width, length){
  let isRepeat = false
  if(tilesList.length === 0){
    console.log('is empty')
    return isRepeat
  }else{
    for (let index = 0; index < tilesList.length; index++) {
      const element = tilesList[index];
      if(element.width == width && element.length == length){
        console.log('уже был')
        isRepeat = true
        console.log(`isRepeat = ${isRepeat}`)
        break;
      }else{
        isRepeat = false
      }
    }
    return isRepeat

  }
}
