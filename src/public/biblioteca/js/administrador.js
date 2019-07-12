document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.ini();
});

var modsJS = {
    from:null,
    ini:function(){
        modsJS.from = util.createVueFrom({
            el:"#administradorForm",
            data:{
                administradorId:'',
                perfilId:0,
                nombre:'',
                apellidoPaterno:'',
                apellidoMaterno:'',
                correo:'',
                contrasena:'',
                estatusId:1,
                eliminadoId:3,
                fechaCreacion:'',
                usuarioCreo:'',
                fechaModifico:'',
                usuarioModifico:''
            },
            methods:{
            }
        });
        modsJS.grid = utilGrid.createGrid({
            script:'#grid-template',
            element:'#demo',
            columns:[
                {name:'nombre'},{name:'correo'}, {name:'', name:''}
            ],
            data:[],
            component:modsJS.getComponent()
        });
        jQuery("#btnSave").on('click',function(){
            if(modsJS.from._data.administradorId != ""){
                administradorJS.update();
            }else{
                administradorJS.save();
            }
            
        });
        administradorJS.findAll();
    },
    getComponent:function(){
        utilGrid.methods.findById = administradorJS.findById;
        utilGrid.methods.prepareToRemove =administradorJS.prepareToRemove;
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
        modsJS.from._data.administradorId = "";
        modsJS.from._data.paginaId ="";
        modsJS.from._data.apellidoPaterno="";
        modsJS.from._data.apellidoMaterno="";
        modsJS.from._data.correo ="",
        modsJS.from._data.contrasena ="";
        modsJS.from._data.estatusId =1;
        modsJS.from._data.eliminadoId = 3;
        modsJS.fechaCreacion = "";
        modsJS.usuarioCreo = "";
        modsJS.fechaModifico ="";
        modsJS.usuarioModifico ="";
    }
};

var administradorJS ={

    findById:function(administradorId){
        $.ajax({
            method: "GET",
            url: "/biblioteca/administrador/"+administradorId,
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
    save:function(){
        $.ajax({
            method: "POST",
            url: "/biblioteca/administrador/save",
            data: modsJS.from._data,
            dataType: 'json'
        }).done(function (result) {
           if(result){
                console.log(result);
                if(result.status ==200){
                    modsJS.clenForm();
                    administradorJS.findAll();
                }
           }
        });
    },

    update:function(){
        $.ajax({
            method: "POST",
            url: "/biblioteca/administrador/update",
            data: modsJS.from._data,
            dataType: 'json'
        }).done(function (result) {
           if(result){
                console.log(result);
                if(result.status ==200){
                    modsJS.clenForm();
                    administradorJS.findAll();
                }
           }
        });
    },
    findAll:function(){
        $.ajax({
            method: "GET",
            url: "/biblioteca/administrador/findAll",
            data: modsJS.from._data,
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
    },

    findGridObject:function(administradorId){
        const rows = modsJS.grid._data.gridData;
        for(var i=0;i<rows.length;i++){
            if(rows[i].administradorId ==administradorId){
                return rows[i];
            }
        }
     },
 
    prepareToRemove:function(administradorId){
        const administrador = administradorJS.findGridObject(administradorId);
        swal({
            title: "¿Estás seguro?",
            text: "De eliminar el editorial: "+ administrador.nombre,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "No, cancelar",
            animation: "slide-from-top",
            closeOnConfirm: false 
        },function(){   
            administradorJS .remove(administradorId);
            jQuery(".cancel").click();
        });
    },

    remove:function(administradorId){
        $.ajax({
            method: "POST",
            url: "/biblioteca/administrador/delete  ",
            data: {administradorId},
            dataType: 'json'
        }).done(function (result) {
           if(result){
                console.log(result);
                if(result.status ==200){
                   administradorJS.findAll();
                }
           }
        });
    }
};