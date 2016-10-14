/**
 * Created by zhyks on 16/8/23.
 */

function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : id;
}

window.onload = function () {
    var lis = $('tab-header').getElementsByTagName('li');
    var contents = $('tab-content').getElementsByClassName('dom');

    if (lis.length !== contents.length) return;

    for (var i=0; i<lis.length; i++) {
        var li = lis[i];
        li.id = i;

        li.onmousemove = function () {
            for (var j=0; j<lis.length; j++) {
                lis[j].className = '';
                contents[j].style.display = 'none';
            }
            this.className = 'selected';
            contents[this.id].style.display = 'block';
        }
    }
};