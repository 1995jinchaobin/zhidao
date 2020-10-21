// 用户行为习惯
function UserBehaviorMonitoring(path, name) {
    let time = new Date();
    time = changeDate(time);
    let IP = getlocalIP();
    console.log(path, name, IP, time);
}
function getlocalIP() {
    let IP = '';
    let PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection
    let peer = new PeerConnection({
        iceServers: []
    })
    peer.createDataChannel('')
    peer.createOffer().then((offer) => {
        peer.setLocalDescription(offer)
    })
    peer.onicecandidate = function (e) {
        if (e.candidate) {
            let reg = /([0-9]{1,3}(\.[0-9]{1,3}){3})/
            e.candidate.candidate.split('\n').forEach((str) => {
                str = reg.exec(str)
                if (str && str.length > 1) {
                    IP = str[1];
                    return IP
                }
            })
        }
    }
}
// 时间转换成年月日时分秒形式
function changeDate(date) {
    let time = new Date(date);
    let year = time.getFullYear(), month = double(time.getMonth() + 1), day = double(time.getDate()), hour = double(time.getHours()), minute = double(time.getMinutes()),
        second = double(time.getSeconds());
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}
function fun() {
    let startTime = localStorage.getItem('duration'); // 开始时间
    let endTime = new Date(); // 结束时间
    let Time = Math.floor((Date.parse(endTime) - Date.parse(startTime)) / 1000) + '秒';
    localStorage.setItem('duration', endTime);
    return Time
}
function getpath(path) {
    let startPath = localStorage.getItem('lastpath'); // 开始path
    var jsonpath = [["/maker", "设计师招募 ", "Designer Recruitment"],
    [" /newstudio", "工作室主页", "Studio homepage"],
    ["/newstudio/guanli1", "工作室主页/规范设计", "Studio homepage / standard design"],
    ["/newstudio/guanli2", "工作室主页/工作室管理条例", "Studio homepage /Regulations on management of studios"],
    ["/newstudio/guanli3", "工作室主页/免责说明", "Studio homepage /Exemption instruction"],
    ["/newstudio/guanli4", "工作室主页/设计师说明", "Studio homepage /Designer's note"],
    ["/newstudio/huaxing1", "工作室主页/上传花型", "Studio homepage / upload pattern"],
    ["/newstudio/huaxing2", "工作室主页/管理花型", "Studio homepage / management pattern"],
    ["/newstudio/huaxing3", "工作室主页/编辑花型", "Studio home / edit pattern"],
    ["/newstudio/jiaoyi1", "工作室主页/交易管理", "Studio homepage / transaction management"],
    ["/newstudio/sucai1", "工作室主页/上传素材", "Studio homepage / upload material"],
    ["/newstudio/sucai2", "工作室主页/管理素材", "Studio home / manage materials"],
    ["/newstudio/sucai3", "工作室主页/编辑素材", "Studio home / edit material"],
    ["/newstudio/zhangben1", "工作室主页/我的钱包", "Studio home / my wallet"],
    ["/studioshenqing", "工作室申请", "Studio application"],
    ["/shenhechenggong", "工作室申请成功", "Studio application successful"],
    ["/Uploadfile", "版权上传", "Copyright uploading"],
    ["/Banquan", "版权", "copyright"],
    ["/Homepage", "老版首页", "Old Homepage"],
    ["/reservation", "织道云分色预约演示", "Weaving cloud color separation appointment demonstration"],
    ["/Task", "任务大厅", "Task Hall"],
    ["/Paging", "智能快速分色", "Intelligent fast color separation"],
    ["/select", "首页", "home page"],
    ["/Select", "首页", "home page"],
    ["/Help", "测试图表", "Test chart"],
    ["/Matching", "AI配色", "AI color matching"],
    ["/Changecolour", "AI配色操作页面", "AI color operation page"],
    ["/Cut", "智能抠图", "Intelligent matting"],
    ["/Cutout", "智能抠图操作页面", "Smart matting operation page"],
    ["/Flowerdesign", "花型设计", "Pattern design"],
    ["/Operate", "花型设计旧版", "Old version of pattern design"],
    ["/Patterns", "花型设计旧版添加素材", "Adding materials to the old version of pattern design"],
    ["/Colour", "花型设计旧版花型素材", "Pattern design old pattern material"],
    ["/Shading", "花型设计旧版添加底纹", "Pattern design old version add shading"],
    ["/Newoperate", "花型设计操作页面", "Pattern design operation page"],
    ["/Shopping", "花型商城", "Flower shop"],
    ["/Shopselect", "旧版3D模型", "Old 3D model"],
    ["/Shopdetail", "花型商城图片购买", "Flower mall image purchase"],
    ["/Shopthreed", "3D模型旧版操作页面", "Old 3D model operation page"],
    ["/Ai", "AI设计", "AI design"],
    ["/Login", "登录", "Sign in"],
    ["/Register", "注册", "register"],
    ["/Forget", "忘记密码", "Forget password"],
    ["/User", "个人中心", "Personal Center"],
    ["/User/", "个人中心/我的花型", "Personal Center / my pattern"],
    ["/User/Source", "个人中心/我的素材", "Personal Center / my material"],
    ["/User/copyright", "个人中心/我的版权", "Personal Center / my copyright"],
    ["/User/invoice", "个人中心/我的发票", "Personal Center / my invoice"],
    ["/User/Car", "个人中心/购物车", "Personal Center / shopping cart"],
    ["/User/Money", "个人中心/我的钱包", "Personal Center / my wallet"],
    ["/User/xiugaimima", "个人中心/修改密码", "Personal Center / change password"],
    ["/User/qianbao", "个人中心/我的钱包旧版", "Personal Center / old version of my wallet"],
    ["/User/zizhanghao", "个人中心/创建子账号", "Personal Center / create sub account"],
    ["/User/geren", "个人中心/个人信息", "Personal Center / personal information"],
    ["/User/dingdan", "个人中心/我的订单", "Personal Center / my order"],
    ["/User/colorSeparation", "个人中心/我的分色", "Personal Center / my color separation"],
    ["/Vip", "VIP", "VIP"],
    ["/Money", "旧版我的钱包", "Old version of my wallet"],
    ["/Notes", "旧版推广信息", "Old version promotion information"],
    ["/Order", "旧版我的花型", "Old version of my pattern"],
    ["/Car", "旧版我的购物车", "Old version of my shopping cart"],
    ["/Fabric", "旧版创建分类", "Legacy creation categories"],
    ["/Detail", "旧版图片", "Old pictures"],
    ["/Upfabric", "旧版面料", "Old fabrics"],
    ["/New", "新手教程", "Novice tutorial"],
    ["/Threed", "3D展示", "3D display"],
    ["/Content", "3D展示操作页面", "3D display operation page"],
    ["/Copyright", "旧版我的版权", "Old version of my copyright"]]
    localStorage.setItem('lastpath', path);
    let jsonarray;
    for (let i = 0; i < jsonpath.length; i++) {
        if (startPath == jsonpath[i][0]) {
            jsonarray = jsonpath[i];
        }
    }
    return jsonarray
}
function double(str) {
    if (Number(str) > 9) {
        return str;
    } else {
        return "0" + str;
    }
}
export default {
    install(Vue, options) {
        Vue.prototype.UserBehaviorMonitoring = function (path,close) {
            let self = this;
            let time = new Date();
            let duration = fun();
            let lastpath = getpath(path);
            time = changeDate(time);
            let IP = localStorage.getItem("IP");
            if (lastpath != undefined) {
                let formData = new FormData();
                formData.append("ip", IP);
                formData.append("router", lastpath[1]);
                formData.append("router_en", lastpath[0]);
                formData.append("time", duration);
                let obj = {
                    url: self.all.baseUrl + "/new/monitor/addMonitorBehavior",
                    formdata: formData
                };
                this.getData(obj).then(res => {
                    if (lastpath != undefined&&close=='close') {
                        let formData = new FormData();
                        formData.append("ip", IP);
                        formData.append("router", '关闭');
                        formData.append("router_en", '关闭');
                        formData.append("time", '关闭');
                        let obj = {
                            url: self.all.baseUrl + "/new/monitor/addMonitorBehavior",
                            formdata: formData
                        };
                        this.getData(obj).then(res => {
                        });
                    } else {
                        console.log(res.data.e_msg);
                    }
                });
            } else {
                console.log(res.data.e_msg);
            }
               
        }
    }
}
