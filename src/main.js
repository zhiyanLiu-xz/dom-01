// document.createElement('div')
const div = dom.creat("<div><span>newDiv</span></div>"); //创建一个节点
console.log(div);

dom.after(test, div);

const div3 = dom.creat('<div id="parent"></div>'); //新建
dom.wrap(test, div3); //把test包到div3里面

const nodes = dom.empty(window.empty);
console.log(nodes);

dom.attr(test, "title", "Hi,I am Lzy"); //dom.attr三个参数实现写
const title = dom.attr(test, "title"); //用dom.attr函数两个参数获取test的title属性
console.log(`title: ${title}`);

dom.text(test, "你好，这是新的文本内容");
//一般用这个是将标签里的内容（文本和标签）全部覆盖，如果想要只覆盖一部分，就用span将其抱起来，给一个特定的id即可，然后针对id操作即可
dom.text(test); //读取文本内容

dom.style(test, { border: "1px solid red", color: "blue" }); //参数是对象就是设置它的值
console.log(dom.style(test, "border")); //参数是字符串就是读取元素的border
dom.style(test, "border", "1px solid black"); //设置，把test的border改成'1px solid black'

dom.class.add(test, "red");
dom.class.add(test, "blue");
dom.class.remove(test, "blue");
console.log(dom.class.has(test, "blue")); //检测是否含有blue

const fn = () => {
  console.log("点击了");
};
dom.on(test, "click", fn); //添加了点击监听
dom.off(test, "click", fn); //移除了监听

const testDiv = dom.find("#test")[0]; //数组
console.log(testDiv);
const test2 = dom.find("#test2")[0];
console.log(dom.find(".red", test2)[0]); //后面是找的范围，默认在test2里面找

console.log(dom.parent(test));

const s2 = dom.find("#s2")[0];
console.log(dom.siblings(s2));
console.log(dom.next(s2));
console.log(dom.previous(s2));

const t = dom.find("#travel")[0];
dom.each(dom.children(t), (n) => dom.style(n, "color", "red")); //遍历所有节点

console.log(dom.index(s2));
