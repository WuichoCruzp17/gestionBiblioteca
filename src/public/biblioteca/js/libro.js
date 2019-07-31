document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.ini();
});

var modsJS = {

    ini: function () {
        util.dinamicIdFrom("libroForm");
        modsJS.from = util.createVueFrom({
            el: "#libroForm",
            data: {
                libroId: '',
                isbn: '',
                titulo: '',
                idiomaId: 0,
                categoriaId: 0,
                cantidad: '',
                estatusId: 1,
                eliminadoId: 3,
                fechaCreacion: '',
                usuarioCreo: '',
                fechaModifico: '',
                usuarioModifico: ''
            }
        });
        jQuery("#libroForm_autoresId").select2({
            placeholder: 'Seleciona uno o mas autores'
        });

        jQuery("#libroForm_editorialId").select2({
            placeholder: 'Seleciona una editorial'
        });
        utilCard.methods.findById = libroJS.findById;
        utilCard.methods.prepateToRemove = libroJS.prepateToRemove;
        modsJS.card = utilCard.createCard({
            script: '#card-template',
            element: '#card',
            columns: [
                { name: 'titulo' }
            ],
            data: [],
            component: {
                template: '#card-template',
                props: utilCard.propsDefault,
                data: utilCard.dataDefault,
                component: utilCard.component,
                computed: utilCard.computed,
                filters: utilCard.filters,
                methods: utilCard.methods

            }
        });
        jQuery("#filtro_autorId").change(function(event){
            libroJS.reloadLibros(); 
        });
        jQuery("#filtro_editorialId").change(function(event){
            libroJS.reloadLibros(); 
        });
        /* jQuery("#filtro_editorialId").select2({
            placeholder: 'Seleciona una editorial'
        });
        jQuery("#filtro_autorId").select2({
            placeholder: 'Seleciona uno autor'
        }); */
        

        /*  $('#libroForm_editorialId').on('select2:select', function (e) {
             var data = e.params.data;
             jQuery(this).val([data.id]);
         }); */
        jQuery("#btnSave").on('click', function () {
            libroJS.prepateToSave();
        });
        jQuery("#btnClen").on('click', function () { modsJS.clenForm(); });
        libroJS.reloadLibros();
    },

    getComponent: function () {

    },

    clenForm: function () {
        modsJS.from._data.libroId = '';
        modsJS.from._data.isbn = '';
        modsJS.from._data.titulo = '';
        modsJS.from._data.idiomaId = 0;
        modsJS.from._data.categoriaId = 0;
        modsJS.from._data.cantidad = "";
        modsJS.from._data.estatusId = 1;
        modsJS.from._data.eliminadoId = 3;
        modsJS.from._data.fechaCreacion = '';
        modsJS.from._data.usuarioCreo = '';
        modsJS.from._data.fechaModifico = '';
        modsJS.from._data.usuarioModifico = '';
        jQuery("#libroForm_autoresId").val(null).trigger("change");
        jQuery("#libroForm_editorialId").val([0]).trigger("change");
    },

    setArray:function(array,property){
        var a = [];
        for(var i=0;i<array.length;i++){
            a.push(array[i][property]);
        }
        return a;
    }

};



var libroJS = {

    cache: {},
    findById:function(libroId){
        $.ajax({
            method: "GET",
            url: "/biblioteca/libro/"+libroId,
            dataType: 'json'
        }).done(function (result) {
            if (result) {
                if (result.status == 200) {
                    util.updateFrom(modsJS.from,result.object);                 
                    jQuery("#libroForm_autoresId").val(modsJS.setArray(result.object.autores,'autorId')).change();
                    jQuery("#libroForm_editorialId").val(result.object.editorialId).change();
                    const  nav=jQuery(".nav-tabs li a")[0];
                    nav.click();
                } else {

                } 
            }
        });
    },
    prepateToSave: function () {
        var $elements = jQuery("#libroForm .material-control");
        const libro = {};
        const inputsErr = [];
        for (var i = 0; i < $elements.length; i++) {
            if ($elements[i].hasAttribute('required')) {
                if (util.validateNullOrEmpty(jQuery($elements[i]).val())) {
                    if ($elements[i].hasAttribute('pattern')) {
                        var result = RegExp($elements.pattern).exec($elements[i].value);
                        if (result != null) {
                            libro[$elements[i].name] = jQuery($elements[i]).val();
                        } else {
                            inputsErr.push({
                                pattern: true,
                                title: "Información proporcionada no valida",
                                name: $elements[i].dataset.name
                            });
                        }
                    } else {
                        libro[$elements[i].name] = jQuery($elements[i]).val();
                    }
                } else {
                    inputsErr.push({
                        pattern: false,
                        title: $elements[i].getAttribute('data-original-title'),
                        name: $elements[i].dataset.name
                    });
                }
            } else {
                libro[$elements[i].name] = jQuery($elements[i]).val();
            }
        }

        if (inputsErr.length > 0) {
            var text = "Revise los siguientes campos del formulario :\n";
            var cant = inputsErr.length - 1;
            for (var i = 0; i < inputsErr.length; i++) {
                text += (i < cant) ? inputsErr[i].name + ", " : inputsErr[i].name;
            }
            swal({
                title: "!Formulario No valido!",
                text: text,
                type: "warning",
                showCancelButton: false,
                confirmButtonColor: "#5cb85c",
                confirmButtonText: "OK",
                animation: "slide-from-top",
                closeOnConfirm: false
            }, function () {

                jQuery(".cancel").click();
            });
        } else {
            modsJS.cache = libro;
            if(libro.libroId !=""){
                libroJS.update(libro);
            }else{
                libroJS.save(libro);
            }
           
        }
    },

    save: function (libro) {
        if (Array.isArray(libro.autoresId)) {
            const autorestText = jQuery("#libroForm_autoresId").select2('data');
            var autores = "";
            var cantAutores = autorestText.length - 1;
            for (var i = 0; i < autorestText.length; i++) {
                autores += (i < cantAutores) ? autorestText[i].text + ", " : autorestText[i].text;
            }
            libro.autoresText = autores;
        } else { libro.autoresText = null; }
        $.ajax({
            method: "POST",
            url: "/biblioteca/libro/save",
            data: libro,
            dataType: 'json'
        }).done(function (result) {
            if (result) {

                if (result.status == 200) {
                    modsJS.clenForm();
                    libroJS.reloadLibros();
                } else {
                    swal({
                        title: "!ISBN del libro no valido!",
                        text: modsJS.cache.isbn,
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonColor: "#5cb85c",
                        confirmButtonText: "OK",
                        animation: "slide-from-top",
                        closeOnConfirm: false
                    }, function () {
                        jQuery(".cancel").click();
                    });
                }
            }
        });
    },

    update:function(libro){
        if (Array.isArray(libro.autoresId)) {
            const autorestText = jQuery("#libroForm_autoresId").select2('data');
            var autores = "";
            var cantAutores = autorestText.length - 1;
            for (var i = 0; i < autorestText.length; i++) {
                autores += (i < cantAutores) ? autorestText[i].text + ", " : autorestText[i].text;
            }
            libro.autoresText = autores;
        } else { libro.autoresText = null; }
        $.ajax({
            method: "POST",
            url: "/biblioteca/libro/update",
            data: libro,
            dataType: 'json'
        }).done(function (result) {
            if (result) {

                if (result.status == 200) {
                    modsJS.clenForm();
                    libroJS.reloadLibros();
                } else {
                    swal({
                        title: "!ISBN del libro no valido!",
                        text: modsJS.cache.isbn,
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonColor: "#5cb85c",
                        confirmButtonText: "OK",
                        animation: "slide-from-top",
                        closeOnConfirm: false
                    }, function () {
                        jQuery(".cancel").click();
                    });
                }
            }
        });
    },

    reloadLibros: function () {
        this.cache.nombre = jQuery("#filtro_titulo").val();
        this.cache.autorId = parseInt(jQuery("#filtro_autorId").val());
        this.cache.editorialId = parseInt(jQuery("#filtro_editorialId").val());
        this.cache.orden = "";
        this.ordenarAscDesc = "";
        this.findByCriteria(this.cache);
    },

    findByCriteria: function (cache) {
        $.ajax({
            method: "POST",
            url: "/biblioteca/libro/findCriteria",
            data: cache,
            dataType: 'json'
        }).done(function (result) {
            if (result) {

                if (result.status == 200) {
                    modsJS.card._data.cardData = [];
                    modsJS.card._data.cardData = result.libros;
                } else {

                } 
            }
        });
    },
    prepateToRemove:function(libroId){
        const libro = utilCard.findCardObject(modsJS.card,'libroId',libroId,);
        modsJS.cache  = libro;
        swal({
            title: "¿Estás seguro?",
            text: "Desea eliminar el libro: "+ libro.titulo,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "No, cancelar",
            animation: "slide-from-top",
            closeOnConfirm: false 
        },function(){   
            libroJS.remove(libroId);
            jQuery(".cancel").click();
        });
    },
    remove:function(libroId){
        $.ajax({
            method: "POST",
            url: "/biblioteca/libro/delete",
            data: {libroId},
            dataType: 'json'
        }).done(function (result) {
           if(result){
                if(result.status ==200){
                    libroJS.reloadLibros();
                }else{
                    swal({
                        title: "!Error al intentar eliminar el libro!",
                        text: "No se pudo eliminar el libro: "+modsJS.cache.titulo,
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonColor: "#5cb85c",
                        confirmButtonText: "OK",
                        animation: "slide-from-top",
                        closeOnConfirm: false
                    }, function () {
                        jQuery(".cancel").click();
                    });
                }
           }
        });
    }
};