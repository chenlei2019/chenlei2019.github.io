import Home from './components/Home'
import Menu from './components/Menu'
import Admin from './components/Admin'
import About from './components/about/About'
import Login from './components/Login'
import Register from './components/Register'

//二级目录
import Contact from './components/about/Contact'
import Delivery from './components/about/Delivery'
import History from './components/about/History'
import OrderingGuide from './components/about/OrderingGuide'

//三级目录
import Phone from './components/about/Contact/Phone'
import PersonName from './components/about/Contact/PersonName'

export const routes = [
  {path:'/',name:"homeLink",component:Home},
  {path:'/menu',name:"menuLink",component:Menu},
  {path:'/admin',name:"adminLink",component:Admin,
  // beforeEnter:(to,from,next)=>{
    //路由独享守卫
    // alert("非登录状态，不能访问此页面！");
    // next('/login');
    //   if(to.path == "/login" || to.path == '/register'){
    //     next();
    //    }
    //    else{
    //       alert("还没有登录，请先登录");
    //       next('./login');
    //    }
    // }
  },
  {path:'/about',name:"aboutLink",redirect:'/about/contact',component:About,children:[
    {path:'/about/contact',name:"contactLink",redirect:'/about/contact/personname',component:Contact,children:[
      {path:'/about/contact/phone',name:"phoneNumber",component:Phone},
      {path:'/about/contact/personname',name:"personName",component:PersonName}
    ]},
    {path:'/about/history',name:"historyLink",component:History},
    {path:'orderingGuide',name:"orderingGuideLink",component:OrderingGuide},
    {path:'/delivery',name:"deliveryLink",component:Delivery}
  ]},
  {path:'/login',name:"loginLink",component:Login},
  {path:'/register',name:"registerLink",component:Register},
  {path:'*',redirect:'/'}
]