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
                estatusId:1,
                eliminadoId:3,
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
    },

    clenForm:function(){
        modsJS.from._data.paginaId ="";
        modsJS.from._data.url="";
        modsJS.from._data.seccionId = 0,
        modsJS.from._data.incluirMenu =false;
        modsJS.from._data.estatusId =1;
        modsJS.from._data.eliminadoId = 3;
        modsJS.fechaCreacion = "";
        modsJS.usuarioCreo = "";
        modsJS.fechaModifico ="";
        modsJS.usuarioModifico ="";
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
                console.log(result);
                if(result.status ==200){
                    modsJS.clenForm();
                }
           }
        });
    }

};