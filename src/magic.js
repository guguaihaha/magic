(function(window,document){
var GL = {
    nodeType:function(node){
        /*
        * 1:元素节点
        * 2:属性节点
        * 3:文本节点
        * 8:注释节点
        * 9:文档节点
        *
        * **/
        return node.nodeType;
    },
    isElement:function(node){
        var status = false;
        if(GL.nodeType(node) == 1){
            status = true;
        }
        return status;
    },
    isText:function(node){
        var status = false;
        if(GL.nodeType(node) == 3){
            status = true;
        }
        return status;
    }
}
function magic(selector,contentType){
      if(contentType){
          return new magic.fn.warpContent(selector);
      }else{
          return new magic.fn.selector(selector);
      }
}
    //
magic.fn = magic.prototype = {
    constructor:magic,
    selector:function(selector){
      return magic.makeArray.call(this,selector);
    },
    warpContent:function(html){

    },
    //此方法只遍历节点
    each:function(fn){
       var length = this.length;
       for(var i = 0; i<length;i++){
           fn.call(this[i],i);
       }
    },
    css:function(object,style){
        if(typeof(object) == "string"){
            this.each(function(i){
                var name = object.toLowerCase();
                style = style.toLowerCase();
                this.style[name] = style;
            })
        }else if(typeof(object)=="object"&&!style){
            var _this = this;
            magic.each(object,function(i,n){
                var name = i.toLowerCase();
                style = n.toLowerCase();
                _this.each(function(){
                    this.style[name] = style;
                })
            })
        }
        return this;
    },
    html:function(html){},
    text:function(text){},
    parent:function(){},
    parents:function(){},
    children:function(){},
    next:function(){},
    prev:function(){},
    val:function(){},
    append:function(){},
    prepend:function(){},
    appendTo:function(){},
    prependTo:function(){},
    before:function(){},
    after:function(){},
    insertBefore:function(){},
    insertAfter:function(){},
    remove:function(){},
    siblings:function(){},
    eq:function(){},
    hasClass:function(){},
    animate:function(){},
    show:function(){},
    hide:function(){},
    offset:function(){},
    scrollTop:function(){},
    attr:function(){},
    removeAttr:function(){},
    data:function(){},
    removeData:function(){}
}
magic.fn.selector.prototype = magic.fn;
//此方法伪装对象类型
magic.makeArray = function(selector){
        var _this = this;
        var arr = [];
        var length = selector.length;
        var total = 0;
        if(length){
            each(selector,function(i){
                if(GL.isElement(this)){
                    _this[i] = this;
                    total++;
                }
            })
            _this.length = total;
        }else{
            if(GL.isElement(selector)){
                _this[0] = selector;
                _this.length = 1;
            }else{
                _this.length = 0;
            }

        }
       return _this;
}
//此方法遍历数组对象
magic.each = function(object,fn){
     if(object){
         for(var i in object){
             if(object.hasOwnProperty(i)){
                 fn.call(object[i],i,object[i]);
             }
         }
     }
}
//

//
function each(object,fn){
    if(object) {
        for (var i in object) {
            if (object.hasOwnProperty(i)) {
                fn.call(object[i], i);
            }
        }
    }
}
window.magic = magic;
})(window,document)