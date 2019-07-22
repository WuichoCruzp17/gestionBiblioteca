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
        modsJS.card = utilCard.createCard({
            script:'#card-template',
            element:'#card',
            columns:[
                {name:'titulo'}
            ],
            data:[],
            component:{
                template:'#card-template',
                  props:    utilCard.propsDefault,
                  data: utilCard.dataDefault,
                  component: utilCard.component,
                  computed: utilCard.computed,
                  filters: utilCard.filters,
                  methods: utilCard.methods
                  
            }
        });
        jQuery("#libroForm_autoresId").select2({
            placeholder: 'Seleciona uno o mas autores'
        });
        jQuery("#filtro_autorId").select2({
            placeholder: 'Seleciona uno autor'
        });
        jQuery("#libroForm_editorialId").select2({
            placeholder: 'Seleciona una editorial'
        });
        jQuery("#filtro_editorialId").select2({
            placeholder: 'Seleciona una editorial'
        });
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

    getComponent:function(){
        
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
    }

};



var libroJS = {

    cache:{},
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

            libroJS.save(libro);
        }
    },

    save: function (libro) {
        console.log(libro);
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
                    //administradorJS.findAll();
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

    reloadLibros:function(){
        this.cache.nombre = jQuery("#filtro_titulo").val();
        this.cache.autorId = jQuery("#filtro_autorId").val();
        this.cache.editorialId = jQuery("#filtro_editorialId").val();
        this.cache.orden ="";
        this.ordenarAscDesc ="";
        this.findByCriteria(this.cache);
    },

    findByCriteria:function(cache){
        $.ajax({
            method: "GET",
            url: "/biblioteca/libro/findCriteria",
            data: cache,
            dataType: 'json'
        }).done(function (result) {
            if (result) {

                if (result.status == 200) {
                    modsJS.card._data.cardData =[];
                    modsJS.card._data.cardData =result.libros;
                } else {
                   
                }   console.log(result);
            }
        });
    }
};