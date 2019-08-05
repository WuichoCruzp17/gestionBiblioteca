document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.ini();
});

var modsJS ={
    ini:function(){
        utilCard.methods.prepateToRemove = prestamoLibroJS.prepateToRemove;
        utilCard.methods.prepateToEndLoad = prestamoLibroJS.prepateToEndLoad;
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
        jQuery("#filtro_fechaInicio").on('change',function(){
           modsJS.eventChangeInputDate(this);
        });
        jQuery("#filtro_fechaFinal").on('change',function(){
            modsJS.eventChangeInputDate(this);
        });
        jQuery("#filtro_turnoId").on("change",function(){
            prestamoLibroJS.resoloadPrestamos();
        });
        jQuery("#filtro_estatus").on("change",function(){
            prestamoLibroJS.resoloadPrestamos();
        });
        var d   = new Date();
        d.setDate(1);
        d.setMonth(d.getMonth()-1);
        console.log(d.getMonth());
        jQuery("#filtro_fechaInicio").val(util.formatDateInput(d,'-'));
        d = new Date();
        // d.setMonth(d.getMonth());
         //d.setDate( util.getDaysMonth(d.getMonth(),d.getFullYear()));
        jQuery("#filtro_fechaFinal").val(util.formatDateInput(d,'-'));

        prestamoLibroJS.resoloadPrestamos();
    },
    clenFrom:function(){
        jQuery("#prestamoForm_libroId").val(0).change();
        jQuery("#prestamoForm_alumnoId").val(0).change();
        jQuery("prestamoForm_prestamoLibroId").val("");
    },

    isValdateDate:function(f){
        const d = new Date();
        return d>=f;
    },

    eventChangeInputDate:function(obj){
        const f = obj.value;
        if(!modsJS.isValdateDate( new Date(f.split("-")[0],(f.split("-")[1]-1),f.split("-")[2]))){
            util.messageError('Error en el filtro', 'No se permite seleccionar una fecha que no haya pasado')
            obj.value ="";
        }else{
            prestamoLibroJS.resoloadPrestamos();
        }
    }
};


var prestamoLibroJS ={
    cache:{},

    findById:function(prestamoLibroId){
        $.ajax({
            method: "GET",
            url: "/biblioteca/prestamos/"+prestamoLibroId,
            dataType: 'json'
        }).done(function (result) {
            console.log(result);
            if(result.status ==200){      
        jQuery("#prestamoForm_prestamoLibroId").val(result.prestamoLibro.prestamoLibroId).change();
        jQuery("#prestamoForm_libroId").val(result.prestamoLibro.libroId).change();
        jQuery("#prestamoForm_alumnoId").val(result.prestamoLibro.alumnoId).change();
        const  nav=jQuery(".nav-tabs li a")[0];
        nav.click();
        }else{
            util.messageError('Error', result.error);
        } 
        });
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
                 if(prestamoLibro.prestamoLibroId != ""){
                   
                 }else{
                    prestamoLibroJS.save(prestamoLibro);
                 }

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
                    modsJS.clenFrom();
            prestamoLibroJS.resoloadPrestamos();
        }else{
            util.messageError('Error', result.error);
        } 
        });
    },

    update:function(prestamoLibro){
       
        ///Un prestamo no se puede actualizar
    },
    resoloadPrestamos:function(){
        prestamoLibroJS.cache.fechaInicial = jQuery("#filtro_fechaInicio").val();
        prestamoLibroJS.cache.fechaFinal = jQuery("#filtro_fechaFinal").val();
        prestamoLibroJS.cache.turno = jQuery("#filtro_turnoId").val();
        prestamoLibroJS.cache.estatus = jQuery("#filtro_estatus").val();
        prestamoLibroJS.findByCriteria();
    },

    findByCriteria:function(){
        $.ajax({
            method: "POST",
            url: "/biblioteca/prestamos/findByCriteria",
            data: prestamoLibroJS.cache,
            dataType: 'json'
        }).done(function (result) {
            if(result.status ==200){
                modsJS.card._data.cardData = [];
                    modsJS.card._data.cardData = result.prestamoList;
            }
        });
    },

    prepateToRemove:function(prestamoLibroId){
        const prestamoLibro = utilCard.findCardObject(modsJS.card,'prestamoLibroId',prestamoLibroId,);
        modsJS.prestamoLibro  = prestamoLibro;
        swal({
            title: "¿Estás seguro?",
            text: "Desea eliminar el prestamo del libro: "+ prestamoLibro.titulo,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "No, cancelar",
            animation: "slide-from-top",
            closeOnConfirm: false 
        },function(){   
            prestamoLibroJS.delete(prestamoLibroId);
            jQuery(".cancel").click();
        });
    },

    delete:function(prestamoLibroId){
        $.ajax({
            method: "DELETE",
            url: "/biblioteca/prestamos/"+prestamoLibroId,
            dataType: 'json'
        }).done(function (result) {
            if(result.status ==200){
            prestamoLibroJS.resoloadPrestamos();
        }else{
            util.messageError('Error', result.error);
        } 
        });
    },

    prepateToEndLoad:function(prestamoLibroId){
        const prestamoLibro = utilCard.findCardObject(modsJS.card,'prestamoLibroId',prestamoLibroId,);
        modsJS.prestamoLibro  = prestamoLibro;
        swal({
            title: "Confirmación",
            text: "¿Desea  finalizar el prestamo del libro: "+ prestamoLibro.titulo +"?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "No, cancelar",
            animation: "slide-from-top",
            closeOnConfirm: false 
        },function(){   
            prestamoLibroJS.update(prestamoLibroId);
            jQuery(".cancel").click();
        });
        
    },
    update:function(prestamoLibroId){
        $.ajax({
            method: "POST",
            url: "/biblioteca/prestamos/update",
            data:{prestamoLibroId},
            dataType: 'json'
        }).done(function (result) {
            if(result.status ==200){
            prestamoLibroJS.resoloadPrestamos();
        }else{
            util.messageError('Error', result.error);
        } 
        });
    }
};