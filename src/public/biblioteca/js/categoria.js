document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.ini();
});

var modsJS={
    ini:function(){
        modsJS.from = util.createVueFrom({
            el:"#categoriaForm",
            data:{
                categoriaId:'',
                nombre:'',
                descripcion:'',
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
                {name:'nombre'}, {name:'Descripcion'},{name:''}
            ],
            data:[],
            component:modsJS.getComponent()
        });
        jQuery("#btnSave").on('click',function(){
            if(modsJS.from._data.nombre != ""){
                if(modsJS.from._data.categoriaId != ""){
                    categoriaJS.update();
                }else{
                    categoriaJS.save();
                }
            }
        });

        categoriaJS.findAll();
    },
    getComponent:function(){
        utilGrid.methods.findById = categoriaJS.findById;
        utilGrid.methods.prepareToRemove =categoriaJS.prepareToRemove;
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
        modsJS.from._data.categoriaId ='';
        modsJS.from._data.nombre ='';
        modsJS.from._data.descripcion ='';
        modsJS.from._data.estatusId =1;
        modsJS.from._data.eliminadoId =3;
        modsJS.from._data.fechaCreacion='';
        modsJS.from._data.usuarioCreo='';
        modsJS.from._data.fechaModifico ='';
        modsJS.from._data.usuarioModifico='';
    }
};


var categoriaJS={

    findById:function(categoriaId){},

    findAll:function(){

        $.ajax({
            method: "GET",
            url: "/biblioteca/categoria/findAll",
            dataType: 'json'
        }).done(function (result) {
            if(result.status ==200){
                modsJS.grid._data.gridData =[];
                modsJS.grid._data.gridData =result.rows;
            }
        });
    },

    save:function(){
        $.ajax({
            method: "POST",
            url: "/biblioteca/categoria/save",
            data: modsJS.from._data,
            dataType: 'json'
        }).done(function (result) {
           if(result){
                console.log(result);
                if(result.status ==200){
                    modsJS.clenForm();
                    //categoriaJS.findAll();
                }
           }
        });
    },

    findGridObject:function(categoriaId){
        const rows = modsJS.grid._data.gridData;
        for(var i=0;i<rows.length;i++){
            if(rows[i].categoriaId ==categoriaId){
                return rows[i];
            }
        }
     },

    upadte:function(){},

    prepareToRemove:function(categoriaId){
        const categoria = categoriaJS.findGridObject(categoriaId);
        swal({
            title: "¿Estás seguro?",
            text: "Desea eliminar la categoría: "+ categoria.nombre,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "No, cancelar",
            animation: "slide-from-top",
            closeOnConfirm: false 
        },function(){   
            categoriaJS.remove(categoriaId);
            jQuery(".cancel").click();
        });
    },

    remove:function(categoriaId){
        $.ajax({
            method: "POST",
            url: "/biblioteca/categoria/delete  ",
            data: {categoriaId},
            dataType: 'json'
        }).done(function (result) {
           if(result){
                console.log(result);
                if(result.status ==200){
                    categoriaJS.findAll();
                }
           }
        });
    }

};