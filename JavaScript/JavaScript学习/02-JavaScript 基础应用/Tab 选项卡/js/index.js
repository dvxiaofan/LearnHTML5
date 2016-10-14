/**
 * Created by zhyks on 16/8/23.
 */

function $(id) {
    // 类型比较
    return typeof id === 'string' ? document.getElementById(id) : id;
}

// 当网页还在完毕时调用
window.onload = function () {
    var lis = $('tab-header').getElementsByTagName('li');
    var contents = $('tab-content').getElementsByClassName('dom');

    // console.log(lis, contents);

    if (lis.length !== contents.length) return;

//    遍历
    for (var i=0; i<lis.length; i++){
        var li = lis[i];
        // console.log(li);
        li.id = i;
        li.onmousemove = function () {
            for (var j=0; j<lis.length; j++) {
            //    所有的都不被选中
                lis[j].className = '';
                contents[j].style.display = 'none';
            }
            this.className = 'selected';
            contents[this.id].style.display = 'block';

        }
    }
};