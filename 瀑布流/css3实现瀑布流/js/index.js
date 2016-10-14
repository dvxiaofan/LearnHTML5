/**
 * Created by xiaomage on 16/5/10.
 */
function $(id) {
    return typeof id === 'string'?document.getElementById(id):id;
}

// 当网页加载完毕
window.onload = function () {
    // alert(0);
    // for(i=0,j=0; i<10,j<6; i++,j++){
    //     console.log(i, j, i+j);
    // }
    // debugger;
    // 瀑布流布局
    waterFall('main', 'box');
    // 滚动加载盒子
    window.onscroll = function () {
        // 条件
        if(cheackWillLoad()){
            // 造数据
            var data = {'dataImg' : [{'img' : '1.jpg'}, {'img' : '11.jpg'}, {'img' : '2.jpg'}, {'img' : '3.jpg'}, {'img' : '4.jpg'}, {'img' : '5.jpg'}, {'img' : '6.jpg'}, {'img' : '7.jpg'}, {'img' : '8.jpg'}, {'img' : '9.jpg'}, {'img' : '10.jpg'}, {'img' : '11.jpg'}, {'img' : '12.jpg'}, {'img' : '13.jpg'}, {'img' : '13.jpg'}, {'img' : '14.jpg'}, {'img' : '15.jpg'}, {'img' : '16.jpg'}, {'img' : '19.jpg'}]};
            // 加载数据
            for(var i=0; i<data.dataImg.length; i++){
                // 创建最外面的盒子
                var newBox = document.createElement('div');
                newBox.className = 'box';
                $('main').appendChild(newBox);

                // 创建里面的盒子
                var newPic = document.createElement('div');
                newPic.className = 'pic';
                newBox.appendChild(newPic);

                // 创建img
                var newImg = document.createElement('img');
                newImg.src = 'images/' + data.dataImg[i].img;
                newPic.appendChild(newImg);

            }

            // 瀑布流布局
            waterFall('main', 'box');
        }
    }
}



// 实现瀑布流布局
function waterFall(parent, box) {
    // ------父盒子居中------

    // 1.1 拿到所有的子盒子
    var allBox = $(parent).getElementsByClassName(box);

    // 1.2 求出盒子的宽度
    var boxWidth = allBox[0].offsetWidth;
    // alert(boxWidth);

    // 1.3 求出浏览器的宽度
    var screenWidth = document.body.offsetWidth;
    // alert(screenWidth);

    // 1.4 求出列数
    var cols = Math.floor(screenWidth / boxWidth);
    // alert(cols);

    // 1.5 父标签居中
    $(parent).style.width = boxWidth * cols + 'px';
    $(parent).style.margin = '0 auto';


    // -----子盒子定位------
    // 1.1 高度数组
    var heightArr = [];
    // 1.2 遍历
    for(var i=0; i<allBox.length; i++){
        // 1.2.1 求出单独盒子的高度
        var boxHeight = allBox[i].offsetHeight;
        if(i<cols){ // 第一行中的盒子
            heightArr.push(boxHeight);
        }else{ // 需要定位的盒子
            // 1.2.1 求出最矮盒子的高度
            var minBoxHeight = Math.min.apply(this, heightArr);
            // 1.2.2 求出最矮盒子对应的索引
            var minBoxIndex = getMinBoxIndex(minBoxHeight, heightArr);
            // 1.2.3 盒子定位
            allBox[i].style.position = 'absolute';
            allBox[i].style.top = minBoxHeight + 'px';
            allBox[i].style.left = minBoxIndex * boxWidth + 'px';
            // 1.2.4 更新数组中最矮盒子的高度
            heightArr[minBoxIndex] += boxHeight;
        }
    }

    console.log(heightArr, minBoxHeight, minBoxIndex);
}


// 取出数组中最矮盒子对应的索引
function getMinBoxIndex(val, arr){
    for(var i in arr){
        if (val == arr[i]) return i;
    }
}

// 判断是否符合条件
function cheackWillLoad() {
    // 取出所有的盒子
    var allBox = $('main').getElementsByClassName('box');
    // 取出最后一个盒子
    var lastBox = allBox[allBox.length -1];
    // 求出最后一个盒子高度的一半 + 头部偏离位置
    var lastBoxDis = lastBox.offsetHeight * 0.5 + lastBox.offsetTop;
    // 求出浏览器的高度  标准模式 和 混杂模式
    var screenHeight = document.body.clientHeight || document.documentElement.clientHeight;
    // 页面偏离屏幕的高度
    var scrollTopHeight = document.body.scrollTop;

    // console.log(screenHeight);

    // 判断
    return lastBoxDis <= screenHeight + scrollTopHeight;
}