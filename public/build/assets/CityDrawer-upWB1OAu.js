import{W as b,r as g,j as e}from"./app-C8aSnOsC.js";import{D as i,a as y,b as E,B as _}from"./ToggleSwitch-BZs51KRg.js";import{I as N}from"./InputError-VcDgzKKy.js";function w({isOpen:o,onClose:r,city:a=null}){const t=a!==null,{data:l,setData:n,errors:c,post:u,put:d,processing:m,reset:p}=b({city_name:""});g.useEffect(()=>{a&&t&&n({city_name:a.city_name||""})},[a]);const x=s=>{s.preventDefault();const h=t?d:u,f=t?route("cities.update",a.id):route("cities.store");h(f,{onSuccess:()=>{r(),p()},onError:j=>{console.log("Error handling city: ",j)}})};return e.jsxs(i,{open:o,onClose:r,position:"right",children:[e.jsx(i.Header,{title:t?"Editar ciudad":"Agregar ciudad",titleIcon:t?y:E}),e.jsx(i.Items,{children:e.jsxs("form",{onSubmit:x,children:[e.jsx("div",{className:"space-y-2",children:e.jsxs("div",{children:[e.jsx("label",{htmlFor:"city_name",className:"label",children:"Nombre de la Ciudad"}),e.jsx("input",{type:"text",id:"city_name",value:l.city_name,onChange:s=>n("city_name",s.target.value),className:"input"}),e.jsx(N,{message:c.city_name})]})}),e.jsx(_,{type:"submit",disabled:m,color:"blue",className:"mt-4 w-full text-base font-medium",children:t?"Actualizar ciudad":"Guardar ciudad"})]})})]})}export{w as default};