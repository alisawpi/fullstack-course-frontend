(this.webpackJsonpmaiden_tiedot=this.webpackJsonpmaiden_tiedot||[]).push([[0],{37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var c=t(3),r=t(0),a=t(2),o=t.n(a),u=t(14),s=t.n(u),i=t(4),j=t.n(i),l="/api/persons",d=function(){return j.a.get(l).then((function(e){return e.data}))},b=function(e){return j.a.post(l,e).then((function(e){return e.data}))},h=function(e){return console.log("".concat(l,"/").concat(e)),j.a.delete("".concat(l,"/").concat(e)).then()},f=(t(37),function(e){var n=e.message,t=e.status;return null===n?null:Object(r.jsx)("div",{className:t?"succesess":"error",children:n})}),O=function(e){var n=e.person,t=e.handleDelete;return Object(r.jsxs)("p",{children:[" ",n.name," ",n.number,Object(r.jsx)("button",{onClick:function(){return t(n.id,n.name)},children:" Delete "})]})},m=function(e){var n=e.people,t=e.handleDelete;return n.map((function(e){return Object(r.jsx)(O,{person:e,handleDelete:t},e.name)}))},p=function(e){return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("h2",{children:"Add new person"}),Object(r.jsxs)("form",{onSubmit:e.addPerson,children:[Object(r.jsxs)("div",{children:["name:",Object(r.jsx)("input",{value:e.newName,onChange:e.changeName})]}),Object(r.jsxs)("div",{children:["number:",Object(r.jsx)("input",{value:e.newNumber,onChange:e.changeNumber})]}),Object(r.jsx)("div",{children:Object(r.jsx)("button",{type:"submit",children:"add"})})]})]})},x=function(e){return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("p",{children:"filter shown with: "}),Object(r.jsx)("input",{value:e.filterName,onChange:e.changeFilter})]})},g=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],u=n[1],s=Object(a.useState)(""),i=Object(c.a)(s,2),j=i[0],l=i[1],O=Object(a.useState)(""),g=Object(c.a)(O,2),v=g[0],N=g[1],w=Object(a.useState)(""),S=Object(c.a)(w,2),D=S[0],k=S[1],y=Object(a.useState)(null),C=Object(c.a)(y,2),F=C[0],J=C[1],P=Object(a.useState)(!1),E=Object(c.a)(P,2),L=E[0],_=E[1];o.a.useEffect((function(){return d().then((function(e){return u(e)}))}),[]);var A=t.filter((function(e){return e.name.toLowerCase().includes(D.toLowerCase())}));return Object(r.jsxs)("div",{children:[Object(r.jsx)(f,{message:F,status:L}),Object(r.jsx)("h2",{children:"Phonebook"}),Object(r.jsx)(x,{filterName:D,changeFilter:function(e){k(e.target.value)}}),Object(r.jsx)(p,{addPerson:function(e){e.preventDefault(),b({name:j,number:v}).then((function(e){u(t.concat(e)),J("New person ".concat(j," added to your phonebook!")),_(!0)})).catch((function(e){J(JSON.stringify(e.response.data.error)),_(!1)})),l(""),N("")},newName:j,changeName:function(e){l(e.target.value)},newNumber:v,changeNumber:function(e){N(e.target.value)}}),Object(r.jsx)("h2",{children:"Numbers"}),Object(r.jsx)(m,{people:A,handleDelete:function(e,n){window.confirm("Delete ".concat(n))&&(h(e).then((function(c){u(t.filter((function(n){return n.id!==e}))),J("Person ".concat(n," deleted from your phonebook!")),_(!0)})).catch((function(e){J(JSON.stringify(e.response.data)),_(!1)})),setTimeout((function(){J(null)}),5e3))}})]})};s.a.render(Object(r.jsx)(g,{}),document.getElementById("root"));n.default=g}},[[38,1,2]]]);
//# sourceMappingURL=main.037c4c78.chunk.js.map