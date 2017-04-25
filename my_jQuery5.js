
(function (window,undefined){
    var jQuery=function (selector,undefined){
        return  new $.fn.init(selector);
    };
    jQuery.prototype={
        constructor:jQuery,
        init:function (selector){
            if (!selector){
                return this;
            }
            else if (jQuery.isFunction(selector)){
                jQuery.ready(selector);
            }else if (jQuery.isString(selector)){
                if (jQuery.isHtml(selector)){
                    var temp=document.createElement('div');
                    temp.innerHTML=selector;
                    [].push.call(this,temp);
                }else{
                    var nodes=document.querySelector(selector);
                    [].push.call(this,nodes);
                }
                return this;

            }else if(jQuery.isLikeArray(selector)){
                var arr=[].slice.call(selector);
                [].push.call(this,arr);
                return this;
            }else{
                this[0]=selector;
                this.length=1;
                return this;
            }

        },
        length:0,
        jquery:'1.1.0',
        selector:'',
        toArray:function (){
            return [].slice.call(this);
        },
        get: function (index){
            if (arguments.length==0){
                return this;
            }
            if (index>=0){
                return this[index];
            }else {
                return this[this.length+index];
            }
        },
        eq:function (index){
            if (arguments.length==0){
                return $();
            }else{
                return $(this.get(index));
            }
        },
        first:function (){
            return this.eq(0);
        },
        last:function (){
            return this.eq(-1);
        },
        push:[].push,
        sort:[].sort,
        slice:[].slice,
        splice:[].splice,
        each:function (fn){
           $.each(this,fn);
        },
        map:function (fn){
            $.each(this,fn);
        }

    };
    jQuery.fn=jQuery.prototype;
    jQuery.fn.init.prototype=jQuery.fn;
    window.jQuery=window.$=jQuery;
    jQuery.fn.extend=jQuery.extend=function (obj){
        for(var key in obj){
            this[key]=obj[key];
        }
    };
    jQuery.extend({
       isString:function (str){
           return typeof str === 'string';
       },
        isFunction:function (fn){
            return typeof fn === 'function';
        },
        isObject:function (obj){
            return typeof obj === 'object';
        },
        isWindow:function (obj){
            return obj===window.window
        },
        isLikeArray:function (arr){
            if (!this.isObject(arr)||this.isFunction(arr)||this.isWindow(arr)){
                return false;
            }
            if ('length' in arr && arr.length-1 in arr){
                return true;
            }
            else if (({}).toString()=='[objext Array]'){
                return true;
            }
            return false;
        },
        ready:function (fn){
            if (document.addEventListener){
                document.addEventListener('DOMContentLoaded',function(){
                    fn();
                })
            }else{
                document.attachEvent('onreadystatechange',function (){
                    if (document.readyState=='complete'){
                        fn();
                    }
                })
            }
        },
        isHtml:function (html){
            return html.charAt(0)=='<'&&html.charAt(html.length-1)=='>'&&html.length>=3;
        },
        each:function (obj,fn){
            if (jQuery.isLikeArray(obj)){
                for(var i=0;i<obj.length;i++){
                    fn(i,obj[i]);
                }
            }else if(jQuery.isObject(obj)){
                for(var key in obj){
                    fn(key,obj[key]);
                }
            }
        },
        map:function (){
            var res=[];
            if (jQuery.isLikeArray(obj)){
                for(var i=0;i<obj.length;i++){
                    fn(i,obj[i]);
                    res.push(obj[i]);
                }
            }else if (jQuery.isObject(obj)){
                for(var key in obj){
                    fn(key,obj[key]);
                    res.push(obj[key]);
                }
            }
            return res;
        }
    });
    jQuery.fn.extend({
        empty:function (){
            this.each(function (){
                this.innerHTML='';
            });
            return this;
        },
        remove:function (){
            if (arguments.length==0){
                return this;
            }
            else{
                this.parentNode.removeChild(this);

            }
            return this;
        },
        html:function (content){
            if (arguments.length==0){
                return this;
            }
            if (jQuery.isString(content)){
                this.each(function (key,value){
                    this.innerHTML=content;
                })
            }else if (content.nodeType){
                this.empty();
                this.each(function (key,value){
                    if (key==0){
                        value.appendChild(content);
                    }
                    else{
                        var temp=content.cloneNode(true);
                        value.appendChild(temp);
                    }
                })
            }else{
                this.empty();
            }
            return this;
        },
        text:function (content){
            if (arguments.length==0){
                var res='';
                this.each(function (key,value){
                    res+=value.innerHTML;
                });
                return res;
            }
            else{
                this.each(function (key,value){
                    if (key==0){
                        value.innerText=content;
                    }else{
                        value.innerHTML=content.toString();
                    }
                })
            }
        },
        appendTo:function (obj){
            if(arguments.length==0){
                return $();
            }
            obj=$(obj);
            var res=[];
            this.each(function (key,value){
                $.each(obj,function (key2,value2){
                    if (key2==0){
                        value2.appendChild(value);
                        res.push(value);
                    }else{
                        var temp=value.cloneNode(true);
                        res.push(temp);
                        value2.appendChild(temp);
                    }
                })
            });
            return $(res);
        },
        prependTo:function (obj){
            if (arguments.length==0){
                return $();
            }
            obj=$(obj);
            var res=[];
            var self=this;
            $.each(obj,function (key,value){
                var node=value.firstChild;
                self.each(function (key2,value2){
                    if (key==0){
                        value.insertBefore(value2,node);
                        res.push(value2);
                    }else{
                        var temp=value.cloneNode(true);
                        res.push(temp);
                        value.insertBefore(temp,node);
                    }
                })
            });
            return $(res);
        },
        append:function (obj){
            if (arguments.length==0){
                return this;
            }else if (!jQuery.isObject(obj)){
                this.each(function (key,value){
                    value.innerHTML+=obj;
                })
            }
            else {
                $(obj).appendTo(this);
            }
            return this;
        },
        prepend:function (obj){
            if(arguments.length==0){
                return this;
            }else if (!jQuery.isObject(obj)){
                this.each(function (key,value){
                    value.innerHTML=obj+value.innerHTML;
                })
            }else{
                $(obj).prependTo(this);
            }
        }
    })
    jQuery.fn.extend({
        attr:function (key,value){
            if (arguments.length==0){
                throw '错误';
            }else if (arguments.length==1){
                return this[0].getAttribute(key);
            }else if(arguments.length==2){
                this.each(function (index,ele){
                    ele.setAttribute(key,value);
                })
            }
            return this;
        },
        removeAttr:function (attr){
            if (arguments.length==0){
                return this;
            }else{
                this.attributes.removeNamedItem(attr);
            }
            return this;
        },
        prop:function (key,value){
            if (arguments.length==0){
                throw '错误';
            }
            else if (arguments.length==1){
                return this[0][key];
            }
            else if (arguments.length==2){
                this.each(function (index,ele){
                    ele[key]=value;
                })
            }
            return this;
        },
        removeProp:function (name){
            if (arguments.length==0){
                return this;
            }
            this.each(function (index,ele){
                delete ele[name];
            });
            return this;
        },
        css:function (key,value){
            if (arguments.length==0){
                throw '错误';
            }
            else if (arguments.length==1){
                if (jQuery.isString(key)){
                    return this[0].getAttribute(key);
                }else if (jQuery.isObject(key)){
                    this.each(function (index,ele){
                        $.each(key,function (styleName,styleValue){
                            ele.style[styleName]=styleValue;

                        })
                    })
                }
            }
            else if (arguments.length==2){
                this.each(function (index,ele){
                    ele.style[key]=value;
                })
            }
        },
        val:function (value){
            if(arguments.length==0){
                return this[0].value;
            }
            this.each(function (index,ele){
                ele.value=value;
            });
            return this;
        },
        hasClass:function (name){
            if (arguments.length==0){
                return false;
            }
            else if (arguments.length==1){
                var flag=false;
                this.each(function (index,ele){
                    var className=' '+ele.className+' ';
                    if (className.indexOf(' '+name+' ')!=-1){
                        flag=true;
                        return false;
                    }
                });
                return flag;
            }

        },
        addClass:function (name){
            if (arguments.length==0){
                return this;
            }
            else {
                var names=name.split(' ');
                this.each(function (key,value){
                    $.each(names,function (index,ele){
                    if (!$(ele).hasClass(value)){
                        ele.classname+=' '+value;
                    }
                    })
                })
            }
        },
        removeClass:function (name){
            if (arguments.length==0){
                this.each(function (index,ele){
                    ele.classname='';
                });
            }else{
                var names=name.split(' ');
                this.each(function (index,ele){
                    $.each(names,function (key,value){
                      if (!$(ele).hasClass(value)){
                          var className=' '+ele.className+' ';
                          ele.classname=className.replace(' '+value+' ',' ');
                      }
                    })
                })
            }
            return this;
        },
        toggleClass:function (name){
            if (arguments.length==0){
                return this.removeClass();
            }else{
                var names=name.split(' ');
                this.each(function (index,ele){
                    ele=$(ele);
                    $.each(names,function (key,value){
                        if (ele.hasClass(value)){
                            ele.removeClass(value);
                        }else{
                            ele.addClass(value);
                        }

                    })
                })
            }
            return this;
        }
    })
})(window);