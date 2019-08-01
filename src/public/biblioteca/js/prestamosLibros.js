document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.ini();
});

var modsJS ={
    ini:function(){
        utilCard.methods.findById = prestamoLibroJS.findById;
        utilCard.methods.prepateToRemove = prestamoLibroJS.prepateToRemove;
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
        util.dinamicIdFrom("prestamoForm");

        jQuery("#prestamoForm_libroId").select2({
            placeholder: 'Seleciona un libro'
        });
        jQuery("#prestamoForm_alumnoId").select2({
            placeholder: 'Seleciona un Alumno'
        });
        jQuery("#btnSave").on('click',function(){
            prestamoLibroJS.prepareToSave();
        });
        jQuery("#btnClen").on('click',function(){
            modsJS.clenFrom();
        });
        var d   = new Date();
        d.setDate(1);
        jQuery("#filtro_fechaInicio").val(util.formatDateInput(d,'-'));
         
         d.setMonth(d.getMonth()+1);
         d.setDate( util.getDaysMonth(d.getMonth(),d.getFullYear()));
        jQuery("#filtro_fechaFinal").val(util.formatDateInput(d,'-'));

        prestamoLibroJS.resoloadPrestamos();
    },
    clenFrom:function(){
        jQuery("#prestamoForm_libroId").val(0).change();
        jQuery("#prestamoForm_alumnoId").val(0).change();
        jQuery("prestamoForm_prestamoLibroId").val("");
    }
};


var prestamoLibroJS ={
    cache:{},

    findById:function(){

    },
    prepareToSave:function(){
        const isValidate = util.validateForm("prestamoForm");
        if (isValidate.validate) {
            if (isValidate.entity.prestamoLibroId == "") {
                prestamoLibroJS.validateStock(isValidate.entity);
            } else {
                prestamoLibroJS.update(isValidate.entity);
            }
        }
    },

    validateStock:function(prestamoLibro){
        $.ajax({
            method: "POST",
            url: "/biblioteca/prestamos/validateStock",
            data: {libroId:prestamoLibro.libroId, alumnoId:prestamoLibro.alumnoId},
            dataType: 'json'
        }).done(function (result) {
            if(result.status ==200){
                if(result.isValidate){
                 
                        prestamoLibroJS.save(prestamoLibro);
                    
                    
                }else if(result.status ==501){
                    util.messageError('El presatmo no se puede realizar por: ',result.error);
                }else{
                     util.messageError('El presatmo no se puede realizar por: ','No se cuenta con copias disponibles para el presatmo del libro');
                }
            }else{
                util.messageError('Error al validar el stock', result.error);
            }   
        });
    },

    save:function(prestamoLibro){
        $.ajax({
            method: "POST",
            url: "/biblioteca/prestamos/save",
            data: prestamoLibro,
            dataType: 'json'
        }).done(function (result) {
            if(result.status ==200){
                    alert("Guardado");
            
        }else{
            util.messageError('Error', result.error);
        } 
        });
    },

    resoloadPrestamos:function(){
        prestamoLibroJS.cache.fechaInicial = jQuery("#filtro_fechaInicio").val();
        prestamoLibroJS.cache.fechaInicial = jQuery("#filtro_fechaFinal").val();
        prestamoLibroJS.cache.turno = jQuery("#filtro_turnoId").val();
        prestamoLibroJS.findByCriteria();
    },

    findByCriteria:function(){
        $.ajax({
            method: "POST",
            url: "/biblioteca/prestamos/findByCriteria",
            data: prestamoLibroJS.change,
            dataType: 'json'
        }).done(function (result) {
            if(result.status ==200){
                modsJS.card._data.cardData = [];
                    modsJS.card._data.cardData = result.prestamoList;
            }
        });
    },

    prepateToRemove:function(){
        
    }
};