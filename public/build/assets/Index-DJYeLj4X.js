import{q as b,r as t,j as e,Y as j,y as S}from"./app-C8aSnOsC.js";import{H as D}from"./ToggleSwitch-BZs51KRg.js";import{A as O}from"./AuthenticatedLayout-CaTCCPr1.js";import{P as E,G as g,a as A,D as U}from"./DeleteModal-C6fSt68v.js";import k from"./UserDrawer-Dsffq8qw.js";import"./InputError-VcDgzKKy.js";import"./Modal-Bwfer9c3.js";import"./transition-DFXrd4BT.js";function G({auth:c}){const{users:r}=b().props,[d,a]=t.useState(!1),[o,n]=t.useState(!1),[m,l]=t.useState(!1),[i,u]=t.useState(null),p=s=>{u(s),n(!0)},x=s=>{u(s),l(!0)},f=[{key:"name",label:"Nombre"},{key:"email",label:"Correo Electrónico"}],h=s=>{S.get(route("users.index"),{email:s},{preserveState:!0,replace:!0})};return e.jsxs(O,{user:c.user,children:[e.jsx(j,{title:"Usuarios"}),e.jsx(E,{title:"Todos los Usuarios",breadcrumbs:[{label:"Inicio",route:route("dashboard"),icon:D},{label:"Usuarios"}],searchPlaceholder:"Buscar usuarios por correo electrónico",onAddClick:()=>a(!0),addButtonText:"Agregar usuario",onSearch:h,initialSearchTerm:""}),e.jsx(g,{data:r.data,columns:f,onEdit:p,onDelete:x}),e.jsx(A,{links:r.links,meta:r.meta}),e.jsx(k,{isOpen:d||o,onClose:()=>{a(!1),n(!1)},user:o?i:null}),e.jsx(U,{isOpen:m,onClose:()=>l(!1),data:i,routeName:"users"})]})}export{G as default};