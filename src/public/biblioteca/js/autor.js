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
                    autorJS.update();
                }else{
                    autorJS.save();
                }
            }
        });
          autorJS.findAll();
    },
    getComponent:function(){
        utilGrid.methods.findById = autorJS.findById;
        utilGrid.methods.prepateToRemove =autorJS.prepateToRemove;
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

var autorJS={
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
                    autorJS.findAll();
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

    findGridObject:function(autorId){
        const rows = modsJS.grid._data.gridData;
        for(var i=0;i<rows.length;i++){
            if(rows[i].autorId ==autorId){
                return rows[i];
            }
        }
     },
    prepateToRemove:function(autorId){
        const autor = autorJS.findGridObject(autorId);
        swal({
            title: "¿Estás seguro?",
            text: "Desea eliminar la categoría: "+ autor.nombre,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "No, cancelar",
            animation: "slide-from-top",
            closeOnConfirm: false 
        },function(){   
            autorJS.remove(autorId);
            jQuery(".cancel").click();
        });
    },

    remove:function(autorId){
        $.ajax({
            method: "POST",
            url: "/biblioteca/autor/delete  ",
            data: {autorId},
            dataType: 'json'
        }).done(function (result) {
           if(result){
                console.log(result);
                if(result.status ==200){
                    autorJS.findAll();
                }
           }
        });
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