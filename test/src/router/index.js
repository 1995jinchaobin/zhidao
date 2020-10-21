import Vue from 'vue';
import Router from 'vue-router';



Vue.use(Router);
const router = new Router({
    routes: [
        // 设计师招募
        {
            path:'/maker',
            name:'maker',
            component:resolve => require(['../components/maker/maker'],resolve),
        },
        //新版工作室
        {
            path: '/newstudio',
            name: 'newstudio',
            component:resolve => require(['../components/newstudio/index'],resolve),
            children: [
                {
                    path: '/newstudio/guanli1',
                    name: 'guanli1',
                    component:resolve => require(['../components/newstudio/guanli1'],resolve),
                },
                {
                    path: '/newstudio/guanli2',
                    name: 'guanli2',
                    component:resolve => require(['../components/newstudio/guanli2'],resolve),
                },
                {
                    path: '/newstudio/guanli3',
                    name: 'guanli3',
                    component:resolve => require(['../components/newstudio/guanli3'],resolve),
                },
                {
                    path: '/newstudio/guanli4',
                    name: 'guanli4',
                    component:resolve => require(['../components/newstudio/guanli4'],resolve),
                },
                {
                    path: '/newstudio/huaxing1',
                    name: 'huaxing1',
                    component:resolve => require(['../components/newstudio/huaxing1'],resolve),
                },
                {
                    path: '/newstudio/huaxing2',
                    name: 'huaxing2',
                    component:resolve => require(['../components/newstudio/huaxing2'],resolve),
                },
                {
                    path: '/newstudio/huaxing3',
                    name: 'huaxing3',
                    component:resolve => require(['../components/newstudio/huaxing3'],resolve),
                },
                {
                    path: '/newstudio/jiaoyi1',
                    name: 'jiaoyi1',
                    component:resolve => require(['../components/newstudio/jiaoyi1'],resolve),
                },
                {
                    path: '/newstudio/sucai1',
                    name: 'sucai1',
                    component:resolve => require(['../components/newstudio/sucai1'],resolve),
                },
                {
                    path: '/newstudio/sucai2',
                    name: 'sucai2',
                    component:resolve => require(['../components/newstudio/sucai2'],resolve),
                },
                {
                    path: '/newstudio/sucai3',
                    name: 'sucai3',
                    component:resolve => require(['../components/newstudio/sucai3'],resolve),
                },
                {
                    path: '/newstudio/zhangben1',
                    name: 'zhangben1',
                    component:resolve => require(['../components/newstudio/zhangben1'],resolve),
                },
            ]
        },
        {
            path: '/studioshenqing',
            name: 'studioshenqing',
            component:resolve => require(['../components/newstudio/studioshenqing'],resolve),
        },
        {
            path: '/shenhechenggong',
            name: 'shenhechenggong',
            component:resolve => require(['../components/newstudio/shenhechenggong'],resolve),
        },
        //
        {
            path: '/Uploadfile',
            name: 'Uploadfile',
            component:resolve => require(['../components/banquan/Uploadfile'],resolve),
        },
        {
            path: '/Banquan',
            name: 'Banquan',
            component:resolve => require(['../components/banquan/Banquan'],resolve),
        },
        {
            path: '/EnBanquan',
            name: 'EnBanquan',
            component:resolve => require(['../components/banquan/EnBanquan'],resolve),
        },
        {
            path: '/EnDongtai',
            name: 'EnDongtai',
            component:resolve => require(['../components/user/EnDongtai'],resolve),
        },
        // 首页相关的页面
        {
            path: '/Homepage',
            name: 'Homepage',
            component:resolve => require(['../components/homepage/Index'],resolve),
        },
        {
            path: '/EnHomepage',
            name: 'EnHomepage',
            component:resolve => require(['../components/homepage/EnIndex'],resolve),
        },
        {
            path: '/reservation',
            name: 'Reservation',
            component:resolve => require(['../components/home/Reservation'],resolve),
        },
        {
            path: '/Task',
            name: 'Task',
            component:resolve => require(['../components/homepage/Task'],resolve),
        },
        {
            path: '/EnTask',
            name: 'EnTask',
            component:resolve => require(['../components/homepage/EnTask'],resolve),
        },
        {
            path: '/Paging',
            name: 'Paging',
            component:resolve => require(['../components/homepage/Paging'],resolve),
        },
        {
            path: '/EnPaging',
            name: 'EnPaging',
            component:resolve => require(['../components/homepage/EnPaging'],resolve),
        },
        // 选择页面
        {
            path: '/StudioManagement',
            name: 'StudioManagement',
            component:resolve => require(['../components/studio/StudioManagement'],resolve),
        },
        {
            path: '/MaterialManagement',
            name: 'MaterialManagement',
            component:resolve => require(['../components/studio/MaterialManagement'],resolve),
        },
        {
            path: '/FlowerManagement',
            name: 'FlowerManagement',
            component:resolve => require(['../components/studio/FlowerManagement'],resolve),
        },
        {
            path: '/TransactionManagement',
            name: 'TransactionManagement',
            component:resolve => require(['../components/studio/TransactionManagement'],resolve),
        },
        {
            path: '/MyLeader',
            name: 'MyLeader',
            component:resolve => require(['../components/studio/MyLeader'],resolve),
        },
        {
            path: '/Regulations',
            name: 'Regulations',
            component:resolve => require(['../components/studio/Regulations'],resolve),
        },
        //英文版工作室
        {
            path: '/EnStudioManagement',
            name: 'EnStudioManagement',
            component:resolve => require(['../components/studio/EnStudioManagement'],resolve),
        },
        {
            path: '/EnMaterialManagement',
            name: 'EnMaterialManagement',
            component:resolve => require(['../components/studio/EnMaterialManagement'],resolve),
        },
        {
            path: '/EnFlowerManagement',
            name: 'EnFlowerManagement',
            component:resolve => require(['../components/studio/EnFlowerManagement'],resolve),
        },
        {
            path: '/EnTransactionManagement',
            name: 'EnTransactionManagement',
            component:resolve => require(['../components/studio/EnTransactionManagement'],resolve),
        },
        {
            path: '/EnMyLeader',
            name: 'EnMyLeader',
            component:resolve => require(['../components/studio/EnMyLeader'],resolve),
        },
        {
            path: '/EnRegulations',
            name: 'EnRegulations',
            component:resolve => require(['../components/studio/EnRegulations'],resolve),
        },
        //首页
        {
            path: '/Select',
            name: 'Select',
            component:resolve => require(['../components/home/Select'],resolve),
        },
        {
            path: '/Enselect',
            name: 'Enselect',
            component:resolve => require(['../components/home/Enselect'],resolve),
        },
        //工作室页面
        {
            path: '/Studio',
            name: 'Studio',
            component:resolve => require(['../components/studio/Index'],resolve),
        },
        {
            path: '/Help',
            name: 'Help',
            component:resolve => require(['../components/studio/Help'],resolve),
        },
        {
            path: '/Enstudio',
            name: 'Enstudio',
            component:resolve => require(['../components/studio/Enindex'],resolve),
        },
        // ai配色
        {
            path: '/Matching',
            name: 'Matching',
            component:resolve => require(['../components/matching/Index'],resolve),
        },
        {
            path: '/Enmatching',
            name: 'Enmatching',
            component:resolve => require(['../components/matching/Enindex'],resolve),
        },
        {
            path: '/Changecolour',
            name: 'Changecolour',
            component:resolve => require(['../components/matching/Changecolour'],resolve),
        },
        {
            path: '/Enchangecolour',
            name: 'Enchangecolour',
            component:resolve => require(['../components/matching/Enchangecolour'],resolve),
        },
        // 智能抠图页面
        {
            path: '/Cut',
            name: 'Cut',
            component:resolve => require(['../components/cut/Index'],resolve),
        },
        {
            path: '/Encut',
            name: 'Encut',
            component:resolve => require(['../components/cut/Enindex'],resolve),
        },
        {
            path: '/Cutout',
            name: 'Cutout',
            component:resolve => require([ '../components/cut/Cutout'],resolve),
        },
        // 花型设计
        {
            path: '/Flowerdesign',
            name: 'Flowerdesign',
            component:resolve => require(['../components/flowerdesign/Index'],resolve),
        },
        {
            path: '/Operate',
            name: 'Operate',
            component:resolve => require(['../components/flowerdesign/Operate'],resolve),
        },
        {
            path: '/Patterns',
            name: 'Patterns',
            component:resolve => require(['../components/flowerdesign/Patterns'],resolve),
        },
        {
            path: '/Colour',
            name: 'Colour',
            component:resolve => require(['../components/flowerdesign/Colour'],resolve),
        },
        {
            path: '/Shading',
            name: 'Shading',
            component:resolve => require(['../components/flowerdesign/Shading'],resolve),
        },
        {
            path: '/Newoperate',
            name: 'Newoperate',
            component:resolve => require(['../components/flowerdesign/Newoperate'],resolve),
        },
        {
            path: '/Newoperate2',
            name: 'Newoperate2',
            component:resolve => require(['../components/ai/Newoperate2'],resolve),
        },
        {
            path: '/Ennewoperate',
            name: 'Ennewoperate',
            component:resolve => require(['../components/flowerdesign/Ennewoperate'],resolve),
        },
        {
            path: '/Enflowerdesign',
            name: 'Enflowerdesign',
            component:resolve => require(['../components/flowerdesign/Enindex'],resolve),
        },
        {
            path: '/Enoperate',
            name: 'Enoperate',
            component:resolve => require(['../components/flowerdesign/Enoperate'],resolve),
        },
        {
            path: '/Enpatterns',
            name: 'Enpatterns',
            component:resolve => require(['../components/flowerdesign/Enpatterns'],resolve),
        },
        {
            path: '/Encolour',
            name: 'Encolour',
            component:resolve => require(['../components/flowerdesign/Encolour'],resolve),
        },
        {
            path: '/Enshading',
            name: 'Enshading',
            component:resolve => require([ '../components/flowerdesign/Enshading'],resolve),
        },
        // 花型商城
        {
            path: '/Shopping',
            name: 'Shopping',
            component:resolve => require([ '../components/shopping/Index'],resolve),
        },
        {
            path: '/Shopselect',
            name: 'Shopselect',
            component:resolve => require(['../components/shopping/Shopselect'],resolve),
        },
        {
            path: '/Enshopselect',
            name: 'Enshopselect',
            component:resolve => require(['../components/shopping/Enshopselect'],resolve),
        },
        {
            path: '/Shopdetail',
            name: 'Shopdetail',
            component:resolve => require(['../components/shopping/Shopdetail'],resolve),
        },
        {
            path: '/Shopthreed',
            name: 'Shopthreed',
            component:resolve => require(['../components/shopping/Shopthreed'],resolve),
        },
        {
            path: '/Enshopping',
            name: 'Enshopping',
            component:resolve => require(['../components/shopping/Enindex'],resolve),
        },
        {
            path: '/Enshopthreed',
            name: 'Enshopthreed',
            component:resolve => require(['../components/shopping/Enshopthreed'],resolve),
        },
        {
            path: '/Enshopdetail',
            name: 'Enshopdetail',
            component:resolve => require(['../components/shopping/Enshopdetail'],resolve),
        },
        // ai设计
        {
            path: '/Ai',
            name: 'Ai',
            component:resolve => require(['../components/ai/Index'],resolve),
        },
        {
            path: '/Enai',
            name: 'Enai',
            component:resolve => require(['../components/ai/Enindex'],resolve),
        },
        // 登陆相关的页面
        {
            path: '/Login',
            name: 'Login',
            component:resolve => require(['../components/login/Index'],resolve),
        },
        {
            path: '/Register',
            name: 'Register',
            component:resolve => require(['../components/login/Register'],resolve),
        },
        {
            path: '/Forget',
            name: 'Forget',
            component:resolve => require(['../components/login/Forget'],resolve),
        },
        {
            path: '/Enlogin',
            name: 'Enlogin',
            component:resolve => require(['../components/login/Enindex'],resolve),
        },
        {
            path: '/Enregister',
            name: 'Enregister',
            component:resolve => require(['../components/login/Enregister'],resolve),
        },
        {
            path: '/Enforget',
            name: '/Enforget',
            component:resolve => require(['../components/login/Enforget'],resolve),
        },
        // 个人中心
        {
            path: '/User',
            name: 'User',
            component:resolve => require(['../components/user/Index'],resolve),
            children: [
                {
                    path: '/',
                    name: 'Flower',
                    component:resolve => require(['../components/user/Flower'],resolve),
                },
                {
                    path: '/User/Source',
                    name: 'Source',
                    component:resolve => require(['../components/user/Source'],resolve),
                },
                {
                    path: '/User/copyright',
                    name: 'copyright',
                    component:resolve => require(['../components/user/copyright'],resolve),
                },
                {
                    path: '/User/invoice',
                    name: 'invoice',
                    component:resolve => require(['../components/user/invoice'],resolve),
                },
                {
                    path: '/User/Car',
                    name: 'Car',
                    component:resolve => require(['../components/user/Car'],resolve),
                },
                {
                    path: '/User/Money',
                    name: 'Money',
                    component:resolve => require(['../components/user/Money'],resolve),
                },
                {
                    path: '/User/xiugaimima',
                    name: 'xiugaimima',
                    component:resolve => require(['../components/user/xiugaimima'],resolve),
                },
                {
                    path: '/User/qianbao',
                    name: 'qianbao',
                    component:resolve => require(['../components/user/qianbao'],resolve),
                },
                {
                    path: '/User/zizhanghao',
                    name: 'zizhanghao',
                    component:resolve => require(['../components/user/zizhanghao'],resolve),
                },
                {
                    // path:'/User/geren:headPhoto',
                    path: '/User/geren',
                    name: 'geren',
                    component:resolve => require(['../components/user/geren'],resolve),
                },
                {
                    path: '/User/dingdan',
                    name: 'dingdan',
                    component:resolve => require(['../components/user/dingdan'],resolve),
                },
                {
                    path: '/User/colorSeparation',
                    name: 'ColorSeparation',
                    component:resolve => require(['../components/user/ColorSeparation'],resolve),
                }
            ]
        },
        {
            path: '/Vip',
            name: 'Vip',
            component:resolve => require(['../components/user/Vip'],resolve),
        },
        {
            path: '/Money',
            name: 'Money',
            component:resolve => require(['../components/user/Money'],resolve),
        },
        {
            path: '/Notes',
            name: 'Notes',
            component:resolve => require(['../components/user/Notes'],resolve),
        },
        {
            path: '/Order',
            name: 'Order',
            component:resolve => require(['../components/user/Order'],resolve),
        },
        {
            path: '/Car',
            name: 'Car',
            component:resolve => require(['../components/user/Car'],resolve),
        },
        {
            path: '/Fabric',
            name: 'Fabric',
            component:resolve => require(['../components/user/Fabric'],resolve),
        },
        {
            path: '/Detail',
            name: 'Detail',
            component:resolve => require(['../components/user/Detail'],resolve),
        },
        {
            path: '/Upfabric',
            name: 'Upfabric',
            component:resolve => require(['../components/user/Upfabric'],resolve),
        },
        {
            path: '/Enuser',
            name: 'Enuser',
            component:resolve => require(['../components/user/Enindex'],resolve),
        },
        {
            path: '/Envip',
            name: 'Envip',
            component:resolve => require(['../components/user/Envip'],resolve),
        },
        {
            path: '/Enmoney',
            name: 'Enmoney',
            component:resolve => require(['../components/user/Enmoney'],resolve),
        },
        {
            path: '/Ennotes',
            name: 'Ennotes',
            component:resolve => require(['../components/user/Ennotes'],resolve),
        },
        {
            path: '/Enorder',
            name: 'Enorder',
            component:resolve => require(['../components/user/Enorder'],resolve),
        },
        {
            path: '/Encar',
            name: 'Encar',
            component:resolve => require(['../components/user/Encar'],resolve),
        },
        {
            path: '/Enfabric',
            name: 'Enfabric',
            component:resolve => require(['../components/user/Enfabric'],resolve),
        },
        {
            path: '/Endetail',
            name: 'Endetail',
            component:resolve => require(['../components/user/Endetail'],resolve),
        },
        {
            path: '/Enupfabric',
            name: 'Enupfabric',
            component:resolve => require(['../components/user/Enupfabric'],resolve),
        },
        // 新手教程 ok
        {
            path: '/New',
            name: 'New',
            component:resolve => require(['../components/new/Index'],resolve),
        },
        {
            path: '/Ennew',
            name: 'Ennew',
            component:resolve => require(['../components/new/Enindex'],resolve),
        },
        // 3D展示
        {
            path: '/Threed',
            name: 'Threed',
            component:resolve => require(['../components/threed/Index'],resolve),
        },
        {
            path: '/Content',
            name: 'Content',
            component:resolve => require(['../components/threed/Content'],resolve),
        },
        {
            path: '/Enthreed',
            name: 'Enthreed',
            component:resolve => require(['../components/threed/Enindex'],resolve),
        },
        {
            path: '/Encontent',
            name: 'Encontent',
            component:resolve => require(['../components/threed/Encontent'],resolve),
        },
        {
            path: '/Copyright',
            name: 'Copyright',
            component:resolve => require(['../components/user/copyright'],resolve),
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
    // mode: 'history',
    // base: '/dist'
});
export default router