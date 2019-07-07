document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.ini();
});

var modsJS ={
    ini:function(){
        modsJS.from = util.createVueFrom({
            el:"#autorForm",
            data:{
                autorId:'',
                nombre:'',
                estatusId:1,
                eliminadoId:3,
                fechaCreacion:'',
                usuarioCreo:'',
                fechaModifico:'',
                usuarioModifico:''
            }
        });
        modsJS.grid = utilGrid.createGrid({
            script:'#grid-template',
            element:'#demo',
            columns:[
                {name:'nombre'}, {name:''}
            ],
            data:[],
            component:modsJS.getComponent()
        });
        jQuery("#btnSave").on('click',function(){
            if(modsJS.from._data.nombre != ""){
                if(modsJS.from._data.autorId != ""){
                    autor.update();
                }else{
                    autor.save();
                }
            }
        });
          autor.findAll();
    },
    getComponent:function(){
        utilGrid.methods.findById = autor.findById;
        utilGrid.methods.remove =autor.remove;
        return {
            template:'#grid-template',
              props:    utilGrid.propsDefault,
              data: utilGrid.dataDefault,
              component: utilGrid.component,
              computed: utilGrid.computed,
              filters: utilGrid.filters,
              methods: utilGrid.methods
        }
      
    },
    clenForm:function(){
        modsJS.from._data.autorId ='';
        modsJS.from._data.nombre ='';
        modsJS.from._data.estatusId =1;
        modsJS.from._data.eliminadoId =3;
        modsJS.from._data.fechaCreacion='';
        modsJS.from._data.usuarioCreo='';
        modsJS.from._data.fechaModifico ='';
        modsJS.from._data.usuarioModifico='';
    }
    
};

var autor={
    save:function(){
        $.ajax({
            method: "POST",
            url: "/biblioteca/autor/save",
            data: modsJS.from._data,
            dataType: 'json'
        }).done(function (result) {
           if(result){
                console.log(result);
                if(result.status ==200){
                    modsJS.clenForm();
                    //administradorJS.findAll();
                }
           }
        });
    },
    update:function(){
        $.ajax({
            method: "POST",
            url: "/biblioteca/autor/update",
            data: modsJS.from._data,
            dataType: 'json'
        }).done(function (result) {
           if(result){
                if(result.status ==200){
                    modsJS.clenForm();
                    autor.findAll();
                }
           }
        });
    },
    findById:function(autorId){
        $.ajax({
            method: "GET",
            url: "/biblioteca/autor/"+autorId,
            dataType: 'json'
        }).done(function (result) {
           if(result){
                console.log(result);
                if(result.status ==200){
                    util.updateFrom(modsJS.from,result.object);
                }
           }
        });
    },

    remove:function(autorId){

    },
    findAll:function(){
        $.ajax({
            method: "GET",
            url: "/biblioteca/autor/findAll",
            dataType: 'json'
        }).done(function (result) {
           if(result){
                console.log(result);
                if(result.status ==200){
                    modsJS.grid._data.gridData =[];
                    modsJS.grid._data.gridData =result.rows;
                }
           }
        });
    }
};