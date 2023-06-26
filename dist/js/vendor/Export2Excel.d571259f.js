import{F as w}from"../file-saver/file-saver.e7641da1.js";import{w as y,u as b,S as l}from"../xlsx/xlsx.7367b54f.js";import"../@amap/@amap.39c0400f.js";function A(o){for(var a=[],s=o.querySelectorAll("tr"),e=[],r=0;r<s.length;++r){for(var t=[],n=s[r],v=n.querySelectorAll("td"),c=0;c<v.length;++c){var g=v[c],p=g.getAttribute("colspan"),i=g.getAttribute("rowspan"),h=g.innerText;if(h!==""&&h==+h&&(h=+h),e.forEach(function(f){if(r>=f.s.r&&r<=f.e.r&&t.length>=f.s.c&&t.length<=f.e.c)for(var m=0;m<=f.e.c-f.s.c;++m)t.push(null)}),(i||p)&&(i=i||1,p=p||1,e.push({s:{r,c:t.length},e:{r:r+i-1,c:t.length+p-1}})),t.push(h!==""?h:null),p)for(var u=0;u<p-1;++u)t.push(null)}a.push(t)}return[a,e]}function T(o,a){a&&(o+=1462);var s=Date.parse(o);return(s-new Date(Date.UTC(1899,11,30)))/(24*60*60*1e3)}function _(o,a){for(var s={},e={s:{c:1e7,r:1e7},e:{c:0,r:0}},r=0;r!=o.length;++r)for(var t=0;t!=o[r].length;++t){e.s.r>r&&(e.s.r=r),e.s.c>t&&(e.s.c=t),e.e.r<r&&(e.e.r=r),e.e.c<t&&(e.e.c=t);var n={v:o[r][t]};if(n.v!=null){var v=b.encode_cell({c:t,r});typeof n.v=="number"?n.t="n":typeof n.v=="boolean"?n.t="b":n.v instanceof Date?(n.t="n",n.z=l._table[14],n.v=T(n.v)):n.t="s",s[v]=n}}return e.s.c<1e7&&(s["!ref"]=b.encode_range(e)),s}function S(){if(!(this instanceof S))return new S;this.SheetNames=[],this.Sheets={}}function x(o){for(var a=new ArrayBuffer(o.length),s=new Uint8Array(a),e=0;e!=o.length;++e)s[e]=o.charCodeAt(e)&255;return a}function D(o){var a=document.getElementById(o),s=A(a),e=s[1],r=s[0],t="SheetJS",n=new S,v=_(r);v["!merges"]=e,n.SheetNames.push(t),n.Sheets[t]=v;var c=y(n,{bookType:"xlsx",bookSST:!1,type:"binary"});w.saveAs(new Blob([x(c)],{type:"application/octet-stream"}),"test.xlsx")}function E({multiHeader:o=[],header:a,data:s,filename:e,merges:r=[],autoWidth:t=!0,bookType:n="xlsx"}={}){e=e||"excel-list",s=[...s],s.unshift(a);for(let i=o.length-1;i>-1;i--)s.unshift(o[i]);var v="SheetJS",c=new S,g=_(s);if(r.length>0&&(g["!merges"]||(g["!merges"]=[]),r.forEach(i=>{g["!merges"].push(b.decode_range(i))})),t){const i=s.map(u=>u.map(f=>f==null?{wch:10}:f.toString().charCodeAt(0)>255?{wch:f.toString().length*2}:{wch:f.toString().length}));let h=i[0];for(let u=1;u<i.length;u++)for(let f=0;f<i[u].length;f++)h[f].wch<i[u][f].wch&&(h[f].wch=i[u][f].wch);g["!cols"]=h}c.SheetNames.push(v),c.Sheets[v]=g;var p=y(c,{bookType:n,bookSST:!1,type:"binary"});w.saveAs(new Blob([x(p)],{type:"application/octet-stream"}),`${e}.${n}`)}export{E as export_json_to_excel,D as export_table_to_excel};