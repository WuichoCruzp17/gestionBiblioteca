document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.ini();
});

var modsJS ={
    ini:function(){
        modsJS.article = utilArticle.createArticle({
            script: '#article-template',
            element: '#article',
            columns: [
                { name: 'name' }
            ],
            data: [],
            component: {
                template: '#article-template',
                props: utilArticle.propsDefault,
                data: utilArticle.dataDefault,
                component: utilArticle.component,
                computed: utilArticle.computed,
                methods: utilArticle.methods

            }
        });
        indexJS.findArticle();
    }
};


var indexJS ={

    findArticle:function(){
        $.ajax({
            method: "GET",
            url: "/biblioteca/index/findArticle",
            dataType: 'json'
        }).done(function (result) {
            const a = result.articles;
            var h ="";
            for(var i=0;i<a.length;i++){
                h+=indexJS.buildHTML(a[i]);
            }
            jQuery("#article").append(h);
           modsJS.article._data .articleData=[];
           modsJS.article._data.articleData = result.articles;
        });
    },

    buildHTML:function(entity){
        return `<article class="tile">
        <div class="tile-icon full-reset"><i class="${entity.icon}"></i></div>
        <div class="tile-name all-tittles">${entity.name}</div>
        <div class="tile-num full-reset">${entity.c}</div>
    </article>`;
    }

};