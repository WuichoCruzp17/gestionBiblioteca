document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.ini();
});

var modsJS = {
    ini:function(){
        modsJS.from = util.createVueFrom({
            el:"#editorailFrom",
            data:{
                editorialId:'',
                nombre:'',
                direccion:'',
                telefono:'',
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
                {name:'nombre'}, {name:''}
            ],
            data:[],
            component:modsJS.getComponent()
        });
        jQuery("#btnSave").on('click',function(){
            if(modsJS.from._data.editorialId != ""){
                editorialJS.update();
            }else{
                editorialJS.save();
            }
            
        });
        editorialJS.findAll();
    },getComponent:function(){
        utilGrid.methods.findById = editorialJS.findById;
        utilGrid.methods.prepareToRemove =editorialJS.prepareToRemove;
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
        modsJS.from._data.editorialId = "";
        modsJS.from._data.nombre ="";
        modsJS.from._data.direccion ="",
        modsJS.from._data.telefono ="";
        modsJS.from._data.estatusId =1;
        modsJS.from._data.eliminadoId = 3;
        modsJS.fechaCreacion = "";
        modsJS.usuarioCreo = "";
        modsJS.fechaModifico ="";
        modsJS.usuarioModifico ="";
    }
};

var editorialJS = {

    findById:function(editorialId){
        $.ajax({
            method: "GET",
            url: "/biblioteca/editorial/"+editorialId,
            dataType: 'json'
        }).done(function (result) {
           if(result){
                if(result.status ==200){
                    util.updateFrom(modsJS.from,result.object);
                }
           }
        });
    },
    save:function(){
        $.ajax({
            method: "POST",
            url: "/biblioteca/editorial/save",
            data: modsJS.from._data,
            dataType: 'json'
        }).done(function (result) {
           if(result){
                console.log(result);
                if(result.status ==200){
                    modsJS.clenForm();
                   editorialJS.findAll();
                }
           }
        });
    },

    update:function(){
        $.ajax({
            method: "POST",
            url: "/biblioteca/editorial/update",
            data: modsJS.from._data,
            dataType: 'json'
        }).done(function (result) {
           if(result){
                console.log(result);
                if(result.status ==200){
                    modsJS.clenForm();
                   editorialJS.findAll();
                }
           }
        });
    },

    prepareToRemove:function(editorialId){
        const editorial = editorialJS.findGridObject(editorialId);
        swal({
            title: "¿Estás seguro?",
            text: "De eliminar el editorial: "+ editorial.nombre,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "No, cancelar",
            animation: "slide-from-top",
            closeOnConfirm: false 
        },function(){   
            editorialJS.remove(editorialId);
            jQuery(".cancel").click();
        });
    },

    remove:function(editorialId){
        $.ajax({
            method: "POST",
            url: "/biblioteca/editorial/delete  ",
            data: {editorialId},
            dataType: 'json'
        }).done(function (result) {
           if(result){
                console.log(result);
                if(result.status ==200){
                   editorialJS.findAll();
                }
           }
        });
    },
    findAll:function(){
        $.ajax({
            method: "GET",
            url: "/biblioteca/editorial/findAll",
            dataType: 'json'
        }).done(function (result) {
           if(result){
                if(result.status ==200){
                    modsJS.grid._data.gridData =[];
                    modsJS.grid._data.gridData =result.rows;
                }
           }
        });
    },

    findGridObject:function(editorialId){
       const rows = modsJS.grid._data.gridData;
       for(var i=0;i<rows.length;i++){
           if(rows[i].editorialId ==editorialId){
               return rows[i];
           }
       }
    }

};