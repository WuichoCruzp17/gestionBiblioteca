document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.ini();
});

var modsJS = {
    from:null,
    ini:function(){
        modsJS.from = util.createVueFrom({
            el:"#paginaForm",
            data:{
                paginaId:'',
                nombre:'',
                url:'',
                seccionId:'',
                incluirMenu:false,
                estatusId:'',
                eliminadoId:'',
                fechaCreacion:'',
                usuarioCreo:'',
                fechaModifico:'',
                usuarioModifico:''
            }
        });

        jQuery("#btnSave").on('click',function(){

        });
    }
};

var paginaJS ={

    save:function(){

    }

};