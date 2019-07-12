document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.ini();
});

var modsJS ={
    ini:function(){
        modsJS.from = util.createVueFrom({
            el:"#autorForm",
            data:{
                libroId:'',
                isbn:'',
                titulo:'',
                editorialId:0,
                idiomaId:0,
                categoriaId:0,
                cantidad:'',
                estatusId:1,
                eliminadoId:3,
                fechaCreacion:'',
                usuarioCreo:'',
                fechaModifico:'',
                usuarioModifico:''
            }
        });

    }
}