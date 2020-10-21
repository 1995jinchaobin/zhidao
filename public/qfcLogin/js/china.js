localStorage.clear();
var formOne = document.getElementById('formOne');
var formTwo = document.getElementById('formTwo');
// 数据请求兼容
function createXHR(){
    if(typeof XMLHttpRequest != "undefined"){
        return new XMLHttpRequest();
    }else if(typeof ActiveXObject != "undefined"){
        if(typeof arguments.callee.activeXString != 'string'){
            var versions = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],i,len;
            for(i=0,len=versions.length;i<len;i++){
                try{
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                }catch(ex){
                    // console.log(ex);
                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    }else{
        throw new Error('No XHR object available.');
    }
}
// 获取URL属性
function getQueryStringArgs(){
    var qs = (location.search.length>0)?location.search.substring(1):"";
    var args = {};
    var i,len;
    items = qs.length?qs.split('&'):[],item = null,name = null,value = null;
    for(i=0,len=items.length;i<len;i++){
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if(name.length){
            args[name] = value;
        }
    }
    return args;
}
// 获取数据
if(getQueryStringArgs().type==1){
    formOne.style.display = "none";
    formTwo.style.display = 'block';
}
var btn = document.getElementById('btn');
var model = document.getElementById('model');
var tig = document.getElementById('tig');
var phone = document.getElementById('phone');
var pass = document.getElementById('pass');
function ajax(url){
    var xhr = createXHR();
    xhr.open('get',url,true);
    xhr.send();
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4&&xhr.status==200){
            var data = JSON.parse(xhr.responseText);
            if(data.status==0){
                localStorage.setItem('token',data.result.token);
                localStorage.setItem('userId',data.result.user.id);
                localStorage.setItem('phone',phone.value);
                localStorage.setItem('suitIndex',1);
                localStorage.setItem('password',pass.value);
                let user = JSON.stringify(data.result.user);
                localStorage.setItem('user',user);
                window.location.href = 'http://www.zhidaoai.com';
            }else{
                tig.innerHTML = data.msg;
                model.style.display = 'block';
                setTimeout(function(){
                    tig.innerHTML = '';
                    model.style.display = 'none';
                },1000);
            }
        }
    }
}
// 中英文切换
function langChange(index){
    if(index==1){
        window.location.href = 'https://www.zhidaoai.com/qfcLogin/enindex.html';
    }
}
// 注册点击
var register = document.getElementById('register');
register.onclick = function(event){
    if(event.preventDefault){
        // w3c的方法是event.preventDefault()
        event.preventDefault();
    }else{
        // IE则使用的是event.returnValue=false
        event.returnValue = false;
    }
    localStorage.setItem('path','/Register');
    window.location.href = 'http://www.zhidaoai.com';
}
// 忘记密码点击
var forget = document.getElementById('forget');
forget.onclick = function(event){
    if(event.preventDefault){
        // w3c的方法是event.preventDefault()
        event.preventDefault();
    }else{
        // IE则使用的是event.returnValue=false
        event.returnValue = false;
    }
    localStorage.setItem('path','/Forget');
    window.location.href = 'http://www.zhidaoai.com';
}
function toOther(index){
    if(index==0){
        formOne.style.display = "none";
        formTwo.style.display = 'block';
    }else if(index==1){
        formOne.style.display = "block";
        formTwo.style.display = 'none';
    }
}
// 登陆点击
btn.onclick = function(event){
    if(event.preventDefault){
        // w3c的方法是event.preventDefault()
        event.preventDefault();
    }else{
        // IE则使用的是event.returnValue=false
        event.returnValue = false;
    }
    if(phone.value == '' || pass.value == ''){
        tig.innerHTML = "账号和密码不能是空的";
        model.style.display = 'block';
        setTimeout(function(){
            tig.innerHTML = '';
            model.style.display = 'none';
        },1000);
    }else{
        ajax('https://www.ayznscm.com/appuser/login?phone='+phone.value+'&password='+pass.value+'&userFrom='+4);
    }
}