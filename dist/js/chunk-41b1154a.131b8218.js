(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-41b1154a"],{1511:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"user"},[s("Nav"),s("transition",{attrs:{name:"bounce"}},[s("Profile")],1),s("Footer")],1)},n=[],i=s("216c"),r=s("fd2d"),o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"user__profile"},[a("transition",{attrs:{name:"fall"}},[e.getSelectedUser._id&&this.getSelectedUser._id!==this.loggedUser._id?a("div",{directives:[{name:"show",rawName:"v-show",value:e.appeared,expression:"appeared"}],staticClass:"user__profile_selected",on:{load:e.onAppeared}},[a("div",{staticClass:"profile__group personal__data"},[a("div",{},[a("p",[a("img",{staticClass:"info__img",attrs:{src:e.signupInput.picture||s("0656")("./nopic"+Math.floor(5*Math.random())+".png")}})])]),a("div",{},[a("div",{},[a("span",{staticClass:"info__label"},[e._v("Username : ")]),a("p",{staticClass:"info__input"},[e._v(e._s(e.signupInput.username))])]),a("div",{},[a("span",{staticClass:"info__label"},[e._v("E-mail : ")]),a("p",{staticClass:"info__input"},[e._v(e._s(e.signupInput.email))])]),a("div",{},[a("span",{staticClass:"info__label"},[e._v("First name : ")]),a("p",{staticClass:"info__input"},[e._v(e._s(e.signupInput.first_name))])]),a("div",{},[a("span",{staticClass:"info__label"},[e._v("Last name : ")]),a("p",{staticClass:"info__input"},[e._v(e._s(e.signupInput.last_name))])])])]),a("div",{staticClass:"profile__group"},[a("div",{},[a("span",{staticClass:"info__label"},[e._v("About : ")]),a("p",{staticClass:"info__input",domProps:{innerHTML:e._s(e.signupInput.user_about)}})]),a("div",{},[a("span",{staticClass:"info__label"},[e._v("Friends : ")]),a("a",{staticClass:"info__friends",on:{click:function(t){return e.selectFriends(e.signupInput)}}},[a("p",{staticClass:"info__input"},[e._v(" "+e._s(e.nrOfFriends(e.signupInput.friends)))])])])])]):a("form",{directives:[{name:"show",rawName:"v-show",value:e.appeared,expression:"appeared"}],attrs:{action:""},on:{submit:function(t){return t.preventDefault(),e.userUpdate(e.signupInput)},load:e.onAppeared}},[a("div",{staticClass:"form__item"},[a("img",{staticClass:"info__img",attrs:{src:e.signupInput.picture||s("0656")("./nopic"+Math.floor(5*Math.random())+".png")}})]),a("div",{staticClass:"form__item"},[a("label",{attrs:{for:"username"}},[e._v("User name")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.signupInput.username,expression:"signupInput.username"}],attrs:{type:"text",name:"username",id:"username",required:""},domProps:{value:e.signupInput.username},on:{focus:e.clearErrors,input:function(t){t.target.composing||e.$set(e.signupInput,"username",t.target.value)}}})]),a("div",{staticClass:"form__item"},[a("label",{attrs:{for:"first_name"}},[e._v("First name")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.signupInput.first_name,expression:"signupInput.first_name"}],attrs:{type:"text",name:"first_name",id:"first_name"},domProps:{value:e.signupInput.first_name},on:{focus:e.clearErrors,input:function(t){t.target.composing||e.$set(e.signupInput,"first_name",t.target.value)}}})]),a("div",{staticClass:"form__item"},[a("label",{attrs:{for:"last_name"}},[e._v("First name")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.signupInput.last_name,expression:"signupInput.last_name"}],attrs:{type:"text",name:"last_name",id:"last_name"},domProps:{value:e.signupInput.last_name},on:{focus:e.clearErrors,input:function(t){t.target.composing||e.$set(e.signupInput,"last_name",t.target.value)}}})]),a("div",{staticClass:"form__item"},[a("label",{attrs:{for:"email"}},[e._v("E-mail")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.signupInput.email,expression:"signupInput.email"}],attrs:{type:"email",name:"email",id:"email"},domProps:{value:e.signupInput.email},on:{focus:e.clearErrors,input:function(t){t.target.composing||e.$set(e.signupInput,"email",t.target.value)}}})]),a("div",{staticClass:"form__item"},[a("label",{attrs:{for:"password"}},[e._v("Password")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.signupInput.password,expression:"signupInput.password"}],attrs:{type:"password",name:"password",id:"password"},domProps:{value:e.signupInput.password},on:{focus:e.clearErrors,input:function(t){t.target.composing||e.$set(e.signupInput,"password",t.target.value)}}})]),a("div",{staticClass:"form__item"},[a("label",{attrs:{for:"about"}},[e._v("About")]),a("ckeditor",{attrs:{editor:e.editor,config:{placeholder:"pls enter content"},name:"about"},on:{focus:e.clearErrors},model:{value:e.signupInput.user_about,callback:function(t){e.$set(e.signupInput,"user_about",t)},expression:"signupInput.user_about"}})],1),a("div",{staticClass:"form__btn"},[a("button",{attrs:{type:"submit"}},[e._v("Save")])])])])],1)},u=[],p=(s("4de4"),s("5530")),l=s("2f62"),c=s("3730"),m=s.n(c),d=s("fb3d"),_=s.n(d),f={name:"Profile",components:{ckeditor:m.a.component},data:function(){return{editor:_.a,signupInput:{_id:"",email:"",password:"",username:"",first_name:"",last_name:"",user_about:"",picture:""},user:{},appeared:!1}},computed:Object(p["a"])({},Object(l["c"])(["loggedUser","getSelectedUser","getErrors"])),methods:Object(p["a"])(Object(p["a"])({},Object(l["b"])(["signup","fetchSelectedUser","userUpdate","clearErrors"])),{},{selectFriends:function(e){this.fetchSelectedUser(e),this.$router.push({name:"UsersFriends"})},nrOfFriends:function(e){return e.filter((function(e){return 1===e.status})).length},onAppeared:function(){this.appeared=!0}}),created:function(){this.getSelectedUser._id&&this.getSelectedUser._id!==this.loggedUser._id?this.signupInput=this.getSelectedUser:this.signupInput=this.loggedUser},mounted:function(){this.onAppeared()}},v=f,g=(s("1be2"),s("2877")),b=Object(g["a"])(v,o,u,!1,null,null,null),I=b.exports,h={name:"Home",components:{Nav:i["a"],Profile:I,Footer:r["a"]}},C=h,w=(s("e8c3"),Object(g["a"])(C,a,n,!1,null,null,null));t["default"]=w.exports},"1be2":function(e,t,s){"use strict";var a=s("faf5"),n=s.n(a);n.a},"7be2":function(e,t,s){},e8c3:function(e,t,s){"use strict";var a=s("7be2"),n=s.n(a);n.a},faf5:function(e,t,s){}}]);
//# sourceMappingURL=chunk-41b1154a.131b8218.js.map