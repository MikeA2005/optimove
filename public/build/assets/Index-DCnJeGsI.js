import{q as O,r as a,j as t,Y as b,y as j}from"./app-C8aSnOsC.js";import{H as v}from"./ToggleSwitch-BZs51KRg.js";import{A as E}from"./AuthenticatedLayout-CaTCCPr1.js";import{P as S,G as Y,a as H,D as k}from"./DeleteModal-C6fSt68v.js";import g from"./OvertimeDrawer-CKdYzWjg.js";import{d as A}from"./CustomDatepicker-98gPMxCH.js";import"./InputError-VcDgzKKy.js";import"./Modal-Bwfer9c3.js";import"./transition-DFXrd4BT.js";function q({auth:m}){const{overtimes:r,employees:p,overtimeTypes:c}=O().props,[u,s]=a.useState(!1),[o,l]=a.useState(!1),[x,n]=a.useState(!1),[i,d]=a.useState(null),h=e=>{d(e),l(!0)},f=e=>{d(e),n(!0)},y=[{key:"date",label:"Fecha",render:e=>A(e.date,"YYYY-MM-DD").format("DD MMMM YYYY")},{key:"employee",label:"Empleado",render:e=>e.employee.first_name+" "+e.employee.last_name},{key:"overtime_type",label:"Tipo de Hora Extra",render:e=>e.overtime_type.type_name},{key:"hours",label:"Horas",render:e=>e.hours+" horas"}],D=e=>{j.get(route("overtimes.index"),{employee_id:e},{preserveState:!0,replace:!0})};return t.jsxs(E,{user:m.user,children:[t.jsx(b,{title:"Horas Extras"}),t.jsx(S,{title:"Todas las horas extras",breadcrumbs:[{label:"Inicio",url:route("dashboard"),icon:v},{label:"Horas extras"}],onAddClick:()=>s(!0),searchPlaceholder:"Buscar horas extras",addButtonText:"Agregar horas extras",onSearch:D,initialSearchTerm:""}),t.jsx(Y,{data:r.data,columns:y,onEdit:h,onDelete:f}),t.jsx(H,{links:r.links,meta:r.meta}),t.jsx(g,{isOpen:u||o,onClose:()=>{s(!1),l(!1)},overtime:o?i:null,employees:p,overtimeTypes:c}),t.jsx(k,{isOpen:x,onClose:()=>n(!1),data:i,routeName:"overtimes"})]})}export{q as default};