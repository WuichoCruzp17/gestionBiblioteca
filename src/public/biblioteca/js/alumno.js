document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.ini();
});

var modsJS = {

    ini: function () {
        modsJS.from = util.createVueFrom({
            el: "#alumnoForm",
            data: {
                alumnoId: '',
                matricula: '',
                nombre: '',
                apellidoPaterno: '',
                apellidoMaterno: '',
                grupo: 0,
                grado: 0,
                mobilidad: 0,
                turno: 0,
                estatusId: 1,
                eliminadoId: 3,
                fechaCreacion: '',
                usuarioCreo: '',
                fechaModifico: '',
                usuarioModifico: ''
            }
        });
        utilCard.methods.findById = alumnoJS.findById;
        utilCard.methods.prepateToRemove = alumnoJS.prepateToRemove;
        modsJS.card = utilCard.createCard({
            script: '#card-template',
            element: '#card',
            columns: [
                { name: 'nombre' }
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
        jQuery("#btnSave").on('click', function () {
            alumnoJS.prepateToSave();
        });
        jQuery("#filtro_grado").change(function(){
            alumnoJS.reloadAlumnos();
        });
        jQuery("#filtro_grupo").change(function(){
            alumnoJS.reloadAlumnos();
        });
        jQuery("#filtro_mobilidad").change(function(){
            alumnoJS.reloadAlumnos();
        });
        jQuery("#filtro_turno").change(function(){
            alumnoJS.reloadAlumnos();
        });
        alumnoJS.reloadAlumnos();
    },
    clenForm: function () {
        modsJS.from._data.alumnoId = "";
        modsJS.from._data.matricula = "";
        modsJS.from._data.nombre = "";
        modsJS.from._data.apellidoPaterno = "";
        modsJS.from._data.apellidoMaterno = "";
        modsJS.from._data.grupo = 0;
        modsJS.from._data.grado = 0;
        modsJS.from._data.mobilidad = 0;
        modsJS.from._data.turno = 0;
        modsJS.from._data.estatusId = 1;
        modsJS.from._data.eliminadoId = 3;
        modsJS.from._data.fechaCreacion = "";
        modsJS.from._data.usuarioCreo = "";
        modsJS.from._data.fechaModifico = "";
        modsJS.from._data.usuarioModifico = "";
    }
    
};


var alumnoJS = {
    cache: {},
    findById:function(alumnoId){
        $.ajax({
            method: "POST",
            url: "/biblioteca/alumno/findById/"+alumnoId,
            dataType: 'json'
        }).done(function (result) {
            if (result) {
                if (result.status == 200) {
                    util.updateFrom(modsJS.from,result.alumno);                            
                    const  nav=jQuery(".nav-tabs li a")[0];
                    nav.click();
                } else {
                    util.messageError('Error',result.error);
                } 
            }
        });
    },
    save: function (alumno) {
        $.ajax({
            method: "POST",
            url: "/biblioteca/alumno/save",
            data: alumno,
            dataType: 'json'
        }).done(function (result) {
            if (result) {

                if (result.status == 200) {
                    modsJS.clenForm();
                    alumnoJS.reloadAlumnos();
                }else{
                    
                }
            }
        });
    },
    prepateToSave: function () {
        const isValidate = util.validateForm("alumnoForm");
        if (isValidate.validate) {
            if (isValidate.entity.alumnoId == "") {
                alumnoJS.validateMatricula(isValidate.entity);
            } else {

            }
        }
    },

    validateMatricula: function (alumno) {
        //alumnoJS.save(isValidate.alumno);
        $.ajax({
            method: "POST",
            url: "/biblioteca/alumno/" + alumno.matricula,
            dataType: 'json'
        }).done(function (result) {
            if (result) {

                if (result.status == 200) {
                    alumnoJS.save(alumno);

                } else {
                    util.messageError('Error al guardado', result.error);
                }
            }
        });
    },

    reloadAlumnos: function () {
        this.cache.matricula = jQuery("#filtro_personalizado").val();
        this.cache.grado = parseInt(jQuery("#filtro_grado").val());
        this.cache.grupo = parseInt(jQuery("#filtro_grupo").val());
        this.cache.mobilidad = parseInt(jQuery("#filtro_mobilidad").val());
        this.cache.turno = parseInt(jQuery("#filtro_turno").val());
        this.findByCriteria(this.cache);
    },

    findByCriteria:function(cache){
        $.ajax({
            method: "POST",
            url: "/biblioteca/alumno/findByCriteria",
            data: cache,
            dataType: 'json'
        }).done(function (result) {
            if (result) {
                if (result.status == 200) {
                    modsJS.card._data.cardData = [];
                    modsJS.card._data.cardData = result.alumnoList;
                } else {

                } 
            }
        });
    },
    prepateToRemove:function(alumnoId){

    }
};