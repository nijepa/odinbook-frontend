(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-883b0ad4"],{"007d":function(e,t,n){"use strict";var i=n("2c18"),s=n.n(i);s.a},"2c18":function(e,t,n){},"49ef":function(e,t,n){"use strict";var i=n("66f0"),s=n.n(i);s.a},"66f0":function(e,t,n){},d318:function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("transition",{attrs:{name:"fall"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.appeared,expression:"appeared"}],staticClass:"friends",on:{load:e.onAppeared}},[i("div",{},[i("h1",[e._v(e._s(e.title))]),i("hr")]),e.friendsType?i("div",{},[e.friendsType.length?e._e():i("div",{},[i("h3",[e._v("No friends")])]),i("transition-group",{attrs:{name:"slide-fade",mode:"out-in"}},e._l(e.friendsType,(function(t){return i("div",{key:t._id,staticClass:"friend"},[i("a",{staticClass:"friend__img",on:{click:function(n){return e.selectUser(t)}}},[i("img",{staticClass:"friend__img",attrs:{src:t.picture||n("0656")("./nopic"+Math.floor(5*Math.random())+".png")}})]),i("a",{staticClass:"u__name",on:{click:function(n){return e.selectUser(t)}}},[i("h3",{staticClass:"u__name"},[e._v(e._s(t.username))])]),i("a",{staticClass:"u__friends",on:{click:function(n){return e.selectFriends(t)}}},[i("p",[e._v("Friends ("+e._s(e.nrOfFriends(t.friends))+")")])]),i("a",{staticClass:"user__link",on:{click:function(n){return e.selectUser(t)}}},[e._v(e._s(t.last_name)+", "+e._s(t.first_name))]),e.btnName?i("a",{staticClass:"toggle__friend",class:"Un-friend"===e.btnName||"Abort"===e.btnName?"btn__type1":"btn__type2",attrs:{href:"#"},on:{click:function(n){return e.toggleBtns(e.btnName,t._id)}}},[e._v(e._s(e.btnName)+" ")]):e._e()])})),0)],1):i("div",{},[i("img",{staticClass:"loading__img",attrs:{src:n("cf1c"),alt:""}})])])])},s=[],r=(n("4de4"),n("5530")),d=n("2f62"),a={name:"Friends",data:function(){return{friendsNr:0,appeared:!1}},props:{title:{type:String},btnName:{type:String},friendsType:{type:Array},isFriend:{type:Boolean,default:!1}},computed:Object(r["a"])({},Object(d["c"])(["loggedUser","getUserPosts","getFriends"])),methods:Object(r["a"])(Object(r["a"])({},Object(d["b"])(["unFriend","requestFriend","abortFriend","acceptFriend","fetchSelectedUser","loadUserPosts","fetchFriends"])),{},{removeFriend:function(e){this.unFriend({_id:this.loggedUser._id,friend_id:e})},addFriend:function(e){this.requestFriend({_id:this.loggedUser._id,friend_id:e})},accFriend:function(e){this.acceptFriend({_id:this.loggedUser._id,friend_id:e})},aboFriend:function(e){this.abortFriend({_id:this.loggedUser._id,friend_id:e})},toggleBtns:function(e,t){"Un-friend"===e?this.removeFriend(t):"Add friend"===e?this.addFriend(t):"Accept"===e?this.accFriend(t):"Abort"===e&&this.aboFriend(t)},selectUser:function(e){this.fetchSelectedUser(e),this.loadUserPosts(e._id),this.$router.push({name:"Timeline"})},selectFriends:function(e){this.fetchSelectedUser(e),this.isFriend?this.fetchFriends(e._id):this.$router.push({name:"UsersFriends"})},nrOfFriends:function(e){return e.filter((function(e){return 1===e.status})).length},onAppeared:function(){this.appeared=!0}}),mounted:function(){this.onAppeared()}},c=a,o=(n("007d"),n("2877")),u=Object(o["a"])(c,i,s,!1,null,null,null);t["a"]=u.exports},ed81:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"users"},[i("Nav"),i("transition",{attrs:{name:"slide-fade",mode:"out-in"}},[e.isLoadedFriends?i("div",{staticClass:"friends__lists"},[i("Friends",{attrs:{title:"Friends Request",btnName:"Abort",friendsType:e.getRequestFriend.user}}),i("Friends",{attrs:{title:"Friends Invitation",btnName:"Accept",friendsType:e.getFriendInvitation.user}}),i("Friends",{attrs:{title:"Friends",btnName:"Un-friend",friendsType:e.getFriends.user,isFriend:!1}}),i("Friends",{attrs:{title:"Not Friends",btnName:"Add friend",friendsType:e.getNotFriends.users}})],1):i("div",{},[i("img",{staticClass:"loading__img",attrs:{src:n("cf1c"),alt:""}})])]),i("Footer"),i("top-button")],1)},s=[],r=(n("96cf"),n("1da1")),d=n("5530"),a=n("2f62"),c=n("216c"),o=n("fd2d"),u=n("d318"),f=n("c5f3"),l={name:"Users",components:{Nav:c["a"],Friends:u["a"],Footer:o["a"],TopButton:f["a"]},data:function(){return{isLoadedFriends:!1}},computed:Object(d["a"])({},Object(a["c"])(["loggedUser","getFriends","getNotFriends","getFriendInvitation","getRequestFriend"])),methods:Object(d["a"])(Object(d["a"])({},Object(a["b"])(["fetchFriends","fetchNotFriends","fetchRequestedFriends","fetchFriendsInvitations","unFriend","requestFriend","abortFriend","acceptFriend","fetchSelectedUser"])),{},{loadFriends:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.fetchFriends(e.loggedUser._id);case 2:return t.next=4,e.fetchNotFriends(e.loggedUser._id);case 4:return t.next=6,e.fetchRequestedFriends(e.loggedUser._id);case 6:return t.next=8,e.fetchFriendsInvitations(e.loggedUser._id);case 8:e.isLoadedFriends=!0;case 9:case"end":return t.stop()}}),t)})))()}}),created:function(){this.loadFriends()}},F=l,_=(n("49ef"),n("2877")),h=Object(_["a"])(F,i,s,!1,null,null,null);t["default"]=h.exports}}]);
//# sourceMappingURL=chunk-883b0ad4.6c4ec3da.js.map