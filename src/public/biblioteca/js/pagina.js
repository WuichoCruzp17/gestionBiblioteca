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
                seccionId:0,
                incluirMenu:false,
                estatusId:'',
                eliminadoId:'',
                fechaCreacion:'',
                usuarioCreo:'',
                fechaModifico:'',
                usuarioModifico:''
            },
            methods:{
                onChangeEstatus(event){
                    console.log(event);
                    modsJS.from._data.seccionId = event.target.value;
                }
            }
        });

        jQuery("#btnSave").on('click',function(){
            paginaJS.save();
        });
    }
};

var paginaJS ={

    save:function(){
        $.ajax({
            method: "POST",
            url: "/biblioteca/pagina/save",
            data: modsJS.from._data,
            dataType: 'json'
        }).done(function (result) {
           if(result){
                console.log(resul);
           }
        });
    }

};