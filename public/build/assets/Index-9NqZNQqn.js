import{q as j,r as s,j as t,Y as S,y as T}from"./app-DJrw0BWf.js";import{H as D}from"./ToggleSwitch-3zIi9tcj.js";import{A as O}from"./AuthenticatedLayout-CoMBBdJ8.js";import{P as I,G as _,a as k,D as A}from"./DeleteModal-D2QJkCBi.js";import m from"./EmployeeDrawer-DCXROQJm.js";import"./InputError-Cpb82Hsi.js";import"./Modal-Bl6Ke1i-.js";import"./transition-BXLYznrF.js";import"./CustomDatepicker-w10sqpR6.js";function G({auth:c}){const{employees:a,users:o}=j().props,[p,r]=s.useState(!1),[u,n]=s.useState(!1),[f,l]=s.useState(!1),[i,d]=s.useState(null),x=e=>{d(e),n(!0)},y=e=>{d(e),l(!0)},b={TIN:"Termino Indefinido",TFI:"Termino Fijo",PS:"Prestación de Servicios"},h=[{key:"full_name",label:"Nombre Completo",render:e=>e.last_name+" "+e.first_name},{key:"document",label:"Documento",render:e=>e.document_type+" "+e.document_number},{key:"contract_type",label:"Tipo de Contrato",render:e=>b[e.contract_type]||"N/A"},{key:"user",label:"Usuario",render:e=>e.user.name}],E=e=>{T.get(route("employees.index"),{last_name:e},{preserveState:!0,replace:!0})};return t.jsxs(O,{user:c.user,children:[t.jsx(S,{title:"Empleados"}),t.jsx(I,{title:"Todos los Empleados",breadcrumbs:[{label:"Inicio",url:route("dashboard"),icon:D},{label:"Empleados"}],onAddClick:()=>r(!0),searchPlaceholder:"Buscar empleados",addButtonText:"Agregar empleado",onSearch:E,initialSearchTerm:""}),t.jsx(_,{data:a.data,columns:h,onEdit:x,onDelete:y}),t.jsx(k,{links:a.links,meta:a.meta}),t.jsx(m,{isOpen:p,onClose:()=>r(!1),users:o}),t.jsx(m,{isOpen:u,onClose:()=>n(!1),employee:i,users:o}),t.jsx(A,{isOpen:f,onClose:()=>l(!1),data:i,routeName:"employees"})]})}export{G as default};