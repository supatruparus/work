!function (e, t) { "use strict"; var n = null, a = "PointerEvent" in e || e.navigator && "msPointerEnabled" in e.navigator, i = "ontouchstart" in e || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0, o = a ? "pointerdown" : i ? "touchstart" : "mousedown", r = a ? "pointerup" : i ? "touchend" : "mouseup", m = a ? "pointermove" : i ? "touchmove" : "mousemove", u = a ? "pointerleave" : i ? "touchleave" : "mouseleave", s = 0, c = 0, l = 10, v = 10; function f(e) { p(), e = function (e) { if (void 0 !== e.changedTouches) return e.changedTouches[0]; return e }(e), this.dispatchEvent(new CustomEvent("long-press", { bubbles: !0, cancelable: !0, detail: { clientX: e.clientX, clientY: e.clientY, offsetX: e.offsetX, offsetY: e.offsetY, pageX: e.pageX, pageY: e.pageY }, clientX: e.clientX, clientY: e.clientY, offsetX: e.offsetX, offsetY: e.offsetY, pageX: e.pageX, pageY: e.pageY, screenX: e.screenX, screenY: e.screenY })) || t.addEventListener("click", function e(n) { t.removeEventListener("click", e, !0), function (e) { e.stopImmediatePropagation(), e.preventDefault(), e.stopPropagation() }(n) }, !0) } function d(a) { p(a); var i = a.target, o = parseInt(function (e, n, a) { for (; e && e !== t.documentElement;) { var i = e.getAttribute(n); if (i) return i; e = e.parentNode } return a }(i, "data-long-press-delay", "1500"), 10); n = function (t, n) { if (!(e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame && e.mozCancelRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame)) return e.setTimeout(t, n); var a = (new Date).getTime(), i = {}, o = function () { (new Date).getTime() - a >= n ? t.call() : i.value = requestAnimFrame(o) }; return i.value = requestAnimFrame(o), i }(f.bind(i, a), o) } function p(t) { var a; (a = n) && (e.cancelAnimationFrame ? e.cancelAnimationFrame(a.value) : e.webkitCancelAnimationFrame ? e.webkitCancelAnimationFrame(a.value) : e.webkitCancelRequestAnimationFrame ? e.webkitCancelRequestAnimationFrame(a.value) : e.mozCancelRequestAnimationFrame ? e.mozCancelRequestAnimationFrame(a.value) : e.oCancelRequestAnimationFrame ? e.oCancelRequestAnimationFrame(a.value) : e.msCancelRequestAnimationFrame ? e.msCancelRequestAnimationFrame(a.value) : clearTimeout(a)), n = null } "function" != typeof e.CustomEvent && (e.CustomEvent = function (e, n) { n = n || { bubbles: !1, cancelable: !1, detail: void 0 }; var a = t.createEvent("CustomEvent"); return a.initCustomEvent(e, n.bubbles, n.cancelable, n.detail), a }, e.CustomEvent.prototype = e.Event.prototype), e.requestAnimFrame = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function (t) { e.setTimeout(t, 1e3 / 60) }, t.addEventListener(r, p, !0), t.addEventListener(u, p, !0), t.addEventListener(m, function (e) { var t = Math.abs(s - e.clientX), n = Math.abs(c - e.clientY); (t >= l || n >= v) && p() }, !0), t.addEventListener("wheel", p, !0), t.addEventListener("scroll", p, !0), t.addEventListener("contextmenu", p, !0), t.addEventListener(o, function (e) { s = e.clientX, c = e.clientY, d(e) }, !0) }(window, document);
class Params {
  constructor(w, h, qty, boxes, pie) {
    this.w = w,
      this.l = h,
      this.qty = qty,
      this.boxes = boxes,
      this.pie = pie
  }

}
class Tile {
  constructor(width, height) {
    this.width = width,
    this.height = height
  }
}
const maxSize = 300
const input_height = document.getElementById('length')
const input_width = document.getElementById('width')
const input_qty = document.getElementById('qty')
const input_boxes = document.getElementById('boxes')
const output = document.getElementById('result')
const btn_calc = document.getElementById('btn_calc')
const btn_showAddTile = document.getElementById('btnShowAddTile')
const newTileElem = document.getElementById('newTile')
const btnAddTile = document.getElementById('btnAddTile')
const tilesListElem = document.getElementById('tiles')
const pie = document.getElementById('pie')

let params = new Params(0, 0, 1, 1, 0);
let tilesList = []

const inputs = [input_height, input_width, input_qty, input_boxes, pie]
inputs.forEach((elem) => elem.addEventListener('focus', () => {
  elem.select();
})
)
inputs.forEach((elem) => {
  elem.addEventListener('submit', () => {
    console.log(calcS(params.w, params.l))

    console.log(calcS(params.w, params.l) == NaN)
    if (!(params.w == 0 || params.l == 0)) {

      if (!isRepeat(params.w, params.l)) {//если такой плитки не было
        addTile(params.w, params.l)
        output.value = calcS(params) + 'м²'
      }
      else {//если плитка была
        output.value = calcS(params) + 'м²'

      }
    } else { console.log('нулевой параметр') }
  })
})


input_height.addEventListener('input', () => {
  params.l = event.target.value
  showParams()
  output.value = '-'
})

input_width.addEventListener('input', () => {
  params.w = event.target.value
  showParams()
  output.value = '-'
})

input_qty.addEventListener('input', () => {
  params.qty = event.target.value
  showParams()
  output.value = '-'
})


input_boxes.addEventListener('input', () => {
  params.boxes = input_boxes.value
  showParams()
  output.value = '-'
})
pie.addEventListener('input', () => {
  params.l = event.target.value
  showParams()
  output.value = '-'
})


btn_calc.addEventListener('click', () => {
  console.log(params)
  if (!(params.w == 0 || params.l == 0)) {

    if (!isRepeat(params.w, params.l)) { //если такой плитки не было
      addTile(params.w, params.l)
      output.value = calcS(params) + 'м²'
    } else {
      output.value = calcS(params) + 'м²'
    }
  } else { console.log('нулевой параметр') }

})




function addTile(width, height) {
  console.log(`width = ${width}, height = ${height}`)
  tilesList.push(new Tile(width, height))
  const newTile = document.createElement('button')
  newTile.className = 'tile'

  newTile.innerHTML = `${width}×${height}`
  const tile_s = document.createElement('div')
  tile_s.style.position = 'absolute'
  tile_s.style.bottom = '1px'
  // tile_s.style.margin = '0 auto'
  tile_s.classList.add('tile__s')
  tile_s.innerHTML = `${width * height / 1000000}м²`
  newTile.insertAdjacentElement("beforeend", tile_s)

  const tile_deleteBtn = document.createElement('button')
  tile_deleteBtn.classList.add('tile__deleteBtn')
  tile_deleteBtn.innerHTML = 'x'
  newTile.insertAdjacentElement('beforeend', tile_deleteBtn)
  tile_deleteBtn.onclick = () => {
    console.log('delete')
    tilesListElem.removeChild(newTile)
    tilesList.splice(tilesList.indexOf(new Tile(width, height)))
  }
  newTile.addEventListener('click', () => {
    input_height.value = height
    input_width.value = width
    params.l = height
    params.w = width
    output.value = '-'
    // params.w = width
    // params.l = height
    getSiblings(newTile).forEach((elem) => {
      elem.style.backgroundColor = ''
    })
  })
  newTile.classList.add(['newTile'])
  let result = Number(width)>Number(height)
  console.log(`${width} >= ${height} ? : ${result}`)
  console.log(typeof width)
  if (result) {
    console.log('width>=height')

    newTile.style.width = `${width / width * maxSize}px`
    newTile.style.height = `${height / width * maxSize}px`
  } else {
    console.log('width < height')
    newTile.style.width = `${(height / height * maxSize)}px`
    newTile.style.height = `${(width / height * maxSize)}px`
  }
  console.log(`style = width: ${newTile.style.width} height: ${newTile.style.height}`)

  tilesListElem.insertBefore(newTile, btn_showAddTile)
}

function calcS(params) {
  // Tab to edit
  if (params.boxes == '' || params.boxes == 0) {
    params.boxes = 1
  }
  if (params.qty == '' || params.qty == 0) {
    params.qty = 1
  }
  let result = params.l * params.w * params.qty * params.boxes + pie / 1000000

  return result


}

function getSiblings(element) {
  let siblings = [];
  Array.from(element.parentNode.children).forEach(sibling => {
    if (sibling !== element) {
      siblings.push(sibling);
    }
  });
  return siblings;
}

function showParams() {
  console.log(params)
}

function isRepeat(width, height) {

  let isRepeat = false
  if (tilesList.length === 0) {
    console.log('первая')
    return isRepeat
  } else {
    for (let index = 0; index < tilesList.length; index++) {
      const element = tilesList[index];
      if ((element.width == height && element.height == width) || (element.width == width && element.height == height)) {
        console.log(`width = ${element.width} height = ${element.height}`)

        isRepeat = true
        break;
      } else {

        isRepeat = false
      }
    }


    
  }
  if(isRepeat){
    console.log('уже была')
}else{
  console.log('новая плитка')

}
  return isRepeat
}
