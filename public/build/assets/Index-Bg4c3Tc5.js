import{q as b,r as t,j as e,Y as O,y as S}from"./app-BJ3LYwhR.js";import{H as D}from"./ToggleSwitch-Cac-iS3i.js";import{A as E}from"./AuthenticatedLayout-jKSGqAkw.js";import{P as g,G as A,a as C,D as U}from"./DeleteModal-C8HgEYeJ.js";import u from"./UserDrawer-D9BSgkm1.js";import"./InputError-4CZTqiue.js";import"./Modal-DKyFmUC7.js";import"./transition-BLVpQDjA.js";function G({auth:c}){const{users:r}=b().props,[d,a]=t.useState(!1),[m,o]=t.useState(!1),[p,n]=t.useState(!1),[i,l]=t.useState(null),x=s=>{l(s),o(!0)},f=s=>{l(s),n(!0)},h=[{key:"name",label:"Nombre"},{key:"email",label:"Correo Electrónico"}],j=s=>{S.get(route("users.index"),{email:s},{preserveState:!0,replace:!0})};return e.jsxs(E,{user:c.user,children:[e.jsx(O,{title:"Usuarios"}),e.jsx(g,{title:"Todos los Usuarios",breadcrumbs:[{label:"Inicio",route:route("dashboard"),icon:D},{label:"Usuarios"}],searchPlaceholder:"Buscar usuarios por correo electrónico",onAddClick:()=>a(!0),addButtonText:"Agregar usuario",onSearch:j,initialSearchTerm:""}),e.jsx(A,{data:r.data,columns:h,onEdit:x,onDelete:f}),e.jsx(C,{links:r.links,meta:r.meta}),e.jsx(u,{isOpen:d,onClose:()=>a(!1)}),e.jsx(u,{isOpen:m,onClose:()=>o(!1),user:i}),e.jsx(U,{isOpen:p,onClose:()=>n(!1),data:i,routeName:"users"})]})}export{G as default};