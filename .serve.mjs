import http from 'http';
import fs from 'fs';
import path from 'path';
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.xml':'application/xml','.txt':'text/plain'};
http.createServer((req,res)=>{
  let p = decodeURIComponent(req.url.split('?')[0]).replace(/^\//,'') || 'index.html';
  const f = path.resolve(process.cwd(), p);
  fs.readFile(f,(e,d)=>{
    if(e){res.writeHead(404);res.end('404');return;}
    res.writeHead(200,{'Content-Type':types[path.extname(f)]||'application/octet-stream'});
    res.end(d);
  });
}).listen(8080, ()=>console.log('LegiLearn en http://localhost:8080'));
