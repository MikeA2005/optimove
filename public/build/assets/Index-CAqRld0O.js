import{q as O,r as s,j as e,Y as S,y as D}from"./app-Bdllrnz8.js";import{H as E}from"./ToggleSwitch-BtwTgWZq.js";import{A as g}from"./AuthenticatedLayout-DjiZ5phl.js";import{P as k,G as A,a as I,D as T}from"./DeleteModal-AXHZ7uqP.js";import m from"./ClientDrawer-G_61zIsK.js";import"./InputError-BQY5xSpd.js";import"./Modal-B5aLtPjP.js";import"./transition-q5LmF065.js";function v({auth:p}){const{clients:a,cities:l}=O().props,[u,r]=s.useState(!1),[x,i]=s.useState(!1),[C,o]=s.useState(!1),[c,d]=s.useState(null),f=t=>{d(t),i(!0)},h=t=>{d(t),o(!0)},j=[{key:"company_name",label:"Nombre de la Empresa"},{key:"nit",label:"NIT de la Empresa"},{key:"ciudades",label:"Ciudades",render:t=>{const n=t.cities.map(y=>y.city_name);return n.length>1?n.join(", "):n[0]||""}}],b=t=>{D.get(route("clients.index"),{company_name:t},{preserveState:!0,replace:!0})};return e.jsxs(g,{user:p.user,children:[e.jsx(S,{title:"Clients"}),e.jsx(k,{title:"Todos los Clientes",breadcrumbs:[{label:"Inicio",url:route("dashboard"),icon:E},{label:"Clientes"}],searchPlaceholder:"Buscar Clientes",onAddClick:()=>r(!0),addButtonText:"Agregar Cliente",onSearch:b,initialSearchTerm:""}),e.jsx(A,{data:a.data,columns:j,onEdit:f,onDelete:h}),e.jsx(I,{links:a.links,meta:a.meta}),e.jsx(m,{isOpen:u,onClose:()=>r(!1),cities:l}),e.jsx(m,{isOpen:x,onClose:()=>i(!1),client:c,cities:l}),e.jsx(T,{isOpen:C,onClose:()=>o(!1),data:c,routeName:"clients"})]})}export{v as default};