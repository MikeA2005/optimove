import{q as Y,r as t,j as a,Y as j,a as M,y as O}from"./app-BJ3LYwhR.js";import{H as E}from"./ToggleSwitch-Cac-iS3i.js";import{A as S}from"./AuthenticatedLayout-jKSGqAkw.js";import{P as g,G as C,a as H,D as P}from"./DeleteModal-C8HgEYeJ.js";import i from"./PayrollHeaderDrawer-rxbLnh-S.js";import{d as c}from"./CustomDatepicker-KOevqwzL.js";import"./InputError-4CZTqiue.js";import"./Modal-DKyFmUC7.js";import"./transition-BLVpQDjA.js";function T({auth:m}){const{payrollHeaders:r}=Y().props,[u,s]=t.useState(!1),[p,n]=t.useState(!1),[h,o]=t.useState(!1),[d,l]=t.useState(null),f=new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",minimumFractionDigits:2}),b=e=>{l(e),n(!0)},y=e=>{l(e),o(!0)},x=[{key:"name",label:"Nombre",render:e=>a.jsx(M,{href:route("payroll-details.index",{header_id:e.id}),className:"underline",children:e.name})},{key:"start_date",label:"Fecha de Inicio",render:e=>c(e.start_date,"YYYY-MM-DD").format("DD MMMM YYYY")},{key:"end_date",label:"Fecha de Fin",render:e=>c(e.end_date,"YYYY-MM-DD").format("DD MMMM YYYY")},{key:"settlement_base",label:"Base de Liquidación",render:e=>f.format(e.settlement_base)}],D=e=>{O.get(route("payroll-headers.index"),{start_date:e},{preserveState:!0,replace:!0})};return a.jsxs(S,{user:m.user,children:[a.jsx(j,{title:"Encabezados de Nómina"}),a.jsx(g,{title:"Encabezados de Nómina",breadcrumbs:[{label:"Inicio",route:route("dashboard"),icon:E},{label:"Encabezados de Nómina"}],onAddClick:()=>s(!0),searchPlaceholder:"Buscar por fecha de inicio",addButtonText:"Agregar Encabezado",onSearchChange:D,initialSearchTerm:""}),a.jsx(C,{data:r.data,columns:x,onEdit:b,onDelete:y}),a.jsx(H,{links:r.links,meta:r.meta}),a.jsx(i,{isOpen:u,onClose:()=>s(!1)}),a.jsx(i,{isOpen:p,onClose:()=>n(!1),payrollHeader:d}),a.jsx(P,{isOpen:h,onClose:()=>o(!1),data:d,routeName:"payroll-headers.destroy"})]})}export{T as default};