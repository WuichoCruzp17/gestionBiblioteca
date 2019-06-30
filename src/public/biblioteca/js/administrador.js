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

        jQuery("#btnSave").on('click',function(){
            administradorJS.save();
        });
    },

    clenForm:function(){
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
                }
           }
        });
    }
};