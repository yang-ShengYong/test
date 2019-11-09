var pageContainer = document.querySelector('.page-container');
var pageItems = document.querySelectorAll('.page-item');
var count = pageItems.length;
var page = 1; // 记录当前屏序号，默认第1屏开始
var canNext = false, canPrev = false; // 控制能否继续滚下一屏或者上一屏的开关
var canSlide = true; // 控制阻止滚动的开关

// 初始化过渡动画
function initAnimation() {
  // 循环遍历每一屏，设置初始位置和过渡动画属性
for (var i = 0, len=count; i < len; i++) {
  var item = pageItems[i];
  // 使第一屏置于屏幕中
  if (i === page-1) {
          item.style.transform = 'translate3d(0, 0, 0)';
  } else {
          // 通过js设置元素的css样式属性transform,达到动态的控制每一屏的位置。
    if (i < page-1) {
      item.style.transform = 'translate3d(0, -100%, 0)';
    } else if (i > page-1) {
      item.style.transform = 'translate3d(0, 100%, 0)';
    }
  }
      // 让所有屏都加上过渡动画class
  item.classList.add('transition');
  }
  // 初始允许滚动
  canSlide = true;
if (page <= 1){
  canNext = true;
} else if (page >= count){
  canPrev = true;
}
}

// 控制滚动限制函数
function slideCtrl() {
  // 触发全屏滚动时阻止多次触发, 得等一屏滚动结束后才可以继续滚动
  canSlide = false;

  // 控制各种情况的可上下滚动限制。
  if (page == count) {
  canNext = false;
  canPrev = true;
} else if (page == 1) {
  canNext = true;
  canPrev = false;
} else {
  canNext = true;
  canPrev = true;
}
}

// 滚动下一屏
function slideNext() {
	pageItems[page - 1].style.transform = 'translate3d(0, -100%, 0)';
	pageItems[page].style.transform = 'translate3d(0, 0, 0)';
  page++;
  runAnimation(page - 1);
	slideCtrl()
}
// 滚动上一屏
function slidePrev() {
	pageItems[page - 2].style.transform = 'translate3d(0, 0, 0)';
	pageItems[page - 1].style.transform = 'translate3d(0, 100%, 0)';
  page--;
  runAnimation(page - 1);
	slideCtrl()
}

// 初始化事件
function initEvent() {
  // 添加鼠标滚轮事件，为了兼容firefox浏览器多监听了DOMMouseScroll
document.addEventListener('DOMMouseScroll', wheelFunc);
  document.addEventListener('mousewheel', wheelFunc);
  // 当每次滑动结束后的触发的事件
pageContainer.addEventListener('transitionend', transitionend);
}

// 鼠标滚轮事件
function wheelFunc(e){
  // 参数e代表当前事件的event对象，会给出当前事件的所有信息。
  var e = e || window.event;

  // 用事件对象给出的信息判断是滚轮向上或者向下
if (e.wheelDeltaY < 0 || e.wheelDelta < 0 || e.detail > 0) {
      // 每次滚动前都需要确认滚动开关是否都为true
      // xx && xx && xx() 等同于 if (xx && xx) { xx() };
  canSlide && canNext && slideNext();
} else if (e.wheelDeltaY > 0 || e.wheelDelta > 0 || e.detail < 0) {
  canSlide && canPrev && slidePrev();
}
}

// 这里对应了前面的slideCtrl函数，滚动时阻止多次滚轮触发，滚动结束时才可继续触发。
// 如果不理解可以把slideCtrl函数里的canSlide = false;这句去掉，再查看效果便知。
function transitionend() {
  canSlide = true;
}

// 启动初始化动画和事件，完成全屏滚动的实现
function start() {
initAnimation()
initEvent()
}

start()

/*
var touchPoint = {}; // 首先我们需要一个全局变量来记录滑动位置。

//然后在initEvent函数里加入绑定三个触膜事件
function initEvent() {

    touchPoint = {
        startpoint: 0,
        endpoint: 0
    }
    pageContainer.addEventListener('touchstart', touchStart);
    pageContainer.addEventListener('touchmove', touchMove);
    pageContainer.addEventListener('touchend', touchEnd);
}

function touchStart(e) {
  // 当手指开始触摸屏幕时记录起始位置
  touchPoint.startpoint = e.targetTouches[0].clientY;
}
function touchMove(e) {
  // 手指滑动时禁止默认的行为（比如微信从顶部往下滑会整个网页拉下，或者内容超过容器长度时会有滚动条正常滚动，这都属于默认行为）
  e.preventDefault();
  // 每像素滑动都会记录最新的结束点。
  touchPoint.endpoint = e.targetTouches[0].clientY;
}
function touchEnd(e) {
  if (!touchPoint.endpoint) {
      return false;
  }
  // 取纵向Y轴的结束点与起始点对比，结束点比起始点小60，视为往上滑，结束点比起始点大60视为往下滑。
  // 60这个值视情况而定，有时候用户只是点按操作，起始点与结束点还是有细微的差距的，所以这个值不能太小。
  if ((touchPoint.endpoint - touchPoint.startpoint) < -60) {
      canSlide && canNext && slideNext();
  } else if ((touchPoint.endpoint - touchPoint.startpoint) > 60) {
      canSlide && canPrev && slidePrev();
  }
  // 完成一次滑屏后重置
  touchPoint = {};
}

****/

function initAnimation() {
  var steps = pageContainer.querySelectorAll('.step');
  if (steps.length > 0) {
      for (var element of Array.from(steps)) {
          // 将所有step元素隐藏起来
          element.style.display = 'none';
      }
  }
  // 然后播放第一屏动画
  runAnimation(page - 1);
  
}

function runAnimation(index) {
  var steps = pageItems[index].querySelectorAll('.step');
  for (var element of Array.from(steps)) {
      // 去除display即为显示元素，显示元素便自动播放动画。
      element.style.display = '';
  }
}
