const pagina = require('../models/pagina');
const catalogoParametroController = require('../controllers/catalogoParametroController');
const {MENU_RAIZ} = require('../resources/codeBss');
const paginaController ={};

paginaController.index = async (req, res)=>{
    var catalagoParametroAI = await catalogoParametroController.findByProperty('catalogoId',1);
    var catalagoParametroENE = await catalogoParametroController.findByProperty('catalogoId',2);
    var catalagoParametroMenu = await catalogoParametroController.findByProperty('catalogoId',3);
    catalagoParametroAI = (catalagoParametroAI !== null) ? catalagoParametroAI:[];
    catalagoParametroENE = (catalagoParametroENE != null) ? catalagoParametroENE:[];
    catalagoParametroMenu = (catalagoParametroMenu != null) ? catalagoParametroMenu:[];
    res.render('biblioteca/pagina',{activoInactivo:catalagoParametroAI, eliminadoList:catalagoParametroENE,catalagoParametroMenu});
};

paginaController.save = async (req, res)=>{
    const body = req.body;
    body.paginaId = (body.paginaId =="") ? null:parseInt(body.paginaId);
    body.seccionId =(typeof body.seccionId == 'string') ?parseInt(body.seccionId):body.seccionId;
    body.estatusId = (typeof body.estatusId =='string') ? parseInt(body.estatusId) :body.parseInt;
    body.eliminadoId = (typeof body.eliminadoId =='string')? parseInt(body.eliminadoId):body.eliminadoId;
    body.incluirMenu =(body.incluirMenu =="false") ? 0:1;
    const row = await pagina.save(null,[body.paginaId,body.nombre, body.url,body.seccionId,body.incluirMenu, body.estatusId, body.eliminadoId,null,req.user.administradorId,null,req.user.administradorId]);
    if(row != null){
        res.status(200).json({ status:200,success: 'OK' });
    }else{
        res.status(500).json({ status:500, error: 'Error en la  insercción' });
    }
};

paginaController.menu = async(perfilId)=>{
    const rows = await pagina.executeStored("getMenu",[perfilId]);
    return rows;
}

paginaController.buildMenuHtml = async(paginas)=>{

    const menu = {};
    var tempMenu =0;
    console.log("Paginas --> ", paginas);
    for(var i=0; i<paginas.length;i++){
        if(paginas[i].seccion ==MENU_RAIZ){
            console.log("Entro a la seccion de Menu Raiz: ", paginas[i].nombre);
            menu[paginas[i].nombre] =[{nombre:paginas[i].nombre, url:paginas[i].url}];
        }else{
            if(tempMenu ===0){
                tempMenu = paginas[i].seccion;
                if(typeof menu[paginas[i].nombreMenu] =="undefined"){
                    menu[paginas[i].nombreMenu] =[];
                    menu[paginas[i].nombreMenu].push({
                        paginaId:paginas[i].paginaId,
                        url:paginas[i].url,
                        icon:paginas[i].icon,
                        nombreMenu:paginas[i].nombreMenu,
                        pagina:paginas[i].nombre
                    });
                }else{
                    menu[paginas[i].nombreMenu] =[];
                    menu[paginas[i].nombreMenu].push({
                        paginaId:paginas[i].paginaId,
                        url:paginas[i].url,
                        icon:paginas[i].icon,
                        nombreMenu:paginas[i].nombreMenu,
                        pagina:paginas[i].nombre
                    });
                }
               
            }else if(tempMenu === paginas[i].seccion){
                if(typeof menu[paginas[i].nombreMenu] =="undefined"){
                    menu[paginas[i].nombreMenu] =[];
                    menu[paginas[i].nombreMenu].push({
                        paginaId:paginas[i].paginaId,
                        url:paginas[i].url,
                        icon:paginas[i].icon,
                        nombreMenu:paginas[i].nombreMenu,
                        pagina:paginas[i].nombre
                    });
                }else{
                    menu[paginas[i].nombreMenu].push({
                        paginaId:paginas[i].paginaId,
                        url:paginas[i].url,
                        icon:paginas[i].icon,
                        nombreMenu:paginas[i].nombreMenu,
                        pagina:paginas[i].nombre
                    });
                }
            }
            
        }
    }
    var html="";
    console.log("Menu-->",menu);
    var dropMenu ="";
    for(var key in menu){
        if(Array.isArray(menu[key])){
            var a = menu[key];
            for(var i=0;i<a.length;i++){
                if(a[i].seccion ===MENU_RAIZ){
                    html +=`<li>
                    <a href="${a[i].url}">
                    <i class="${((a[i].icon === null) ? 'zmdi zmdi-home zmdi-hc-fw':a[i].icon)}"> </i>
                    &nbsp;&nbsp; ${a[i].nombreMenu}
                </a>
                </i>
                    `;
                }else{
                    console.log("ELSE-->");
                    if(dropMenu ==""){
                        dropMenu +=`
                        <li>
                        <div class="dropdown-menu-button">
                        <i class="zmdi zmdi-case zmdi-hc-fw">
                        </i>&nbsp;&nbsp; ${a[i].nombreMenu} 
                        <i class="zmdi zmdi-chevron-down pull-right zmdi-hc-fw"></i>
                        </div>
                        <ul class="list-unstyled">
                        
                         
                        `;
                    }
                    if(dropMenu!=""){
                        dropMenu +=`
                        <li>
                        <a href="${a[i].url}">
                        <i class="${((a[i].icon === null) ? "zmdi zmdi-home zmdi-hc-fw":a[i].icon)}">
                        </i>&nbsp;&nbsp; ${a[i].pagina}
                        </a>
                        </li>
                        `;
                    }
                    if((i+1)==a.length){
                        dropMenu+=`</ul></li>`;
                        html+=dropMenu;
                        dropMenu = "";
                    }
                }
            }
        }
    }
      console.log(html);
return html;
}

module.exports = paginaController;