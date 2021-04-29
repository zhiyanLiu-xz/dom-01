window.dom = {
  creat(String) {
    //新建节点
    const container = document.createElement("div");
    container.innerHTML = String; //字符串就直接变成了div里面的HTML内容
    return container.children[0]; //div在container标签里面
  }, //等价于creat: function(){} 等价于dom外部的 dom.creat = function(){}

  after(node, node2) {
    //新建一个弟弟node2
    node.parentNode.insertBefore(node2, node.nextSibling);
    //node的爸爸调用insertBefore，把node2插入node的下一个节点前面
  },

  before(node, node2) {
    //新增一个哥哥
    node.parentNode.insertBefore(node2, node);
  },

  append(parent, node) {
    //新增一个儿子
    parent.appendChild(node);
  },

  wrap(node, parent) {
    //新增爸爸（在node和原始父级之间插一个）
    dom.before(node, parent); //先把parent放到node前面，成为哥哥
    dom.append(parent, node); //让node成为parent的儿子，由于只能有一个父亲，则前面那个自动断开
  },

  remove(node) {
    //删节点
    node.parentNode.removeChild(node);
    return node; //删的人还可以保留这个节点的引用
  },

  empty(node) {
    //删掉node的所有孩子
    const array = []; //装删掉的孩子
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild; //第一个孩子已经被移除，现在老二变成第一个孩子
    }
    return array; //保留所有移除孩子的引用
  },

  attr(node, name, value) {
    if (arguments.length === 3) {
      //参数长度
      return node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },

  text(node, string) {
    // 适配
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string;
      } else {
        node.textContent = string;
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },

  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },

  style(node, name, value) {
    if (arguments.length === 3) {
      // dom.style(div, 'color', 'red')
      node.style[name] = value; //变量做key要用中括号
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        //判断第二个参数的类型，如果是字符串
        // dom.style(div, 'color')
        return node.style[name];
      } else if (name instanceof Object) {
        //instanceof 运算符用来检测 Object.prototype 是否存在于参数 name 的原型链上。
        //name是object的
        // dom.style(div, {color: 'red'})
        const object = name;
        for (let key in object) {
          //遍历object里面所有的key
          //key: border/color
          //node.style.border = ...
          node.style[key] = object[key];
        }
      }
    }
  },

  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },

  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },

  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  }, //如果有scope就在scope里面调用，如果没有scope就在document里调用

  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },

  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  },
  //先变成数组，在filter
  //filter:一个新的、由通过测试的元素组成的数组，如果没有任何数组元素通过测试，则返回空数组。

  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      //x存在且3表示文本
      x = x.nextSibling;
    }
    return x;
  },

  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },

  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },

  index(node) {
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
