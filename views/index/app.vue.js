const AppTemplate = `

<div class="control-section" style="margin-top: 5%">
    <div align='center'>
        <h1>SEJA BEM-VINDO AO BOOKSONLINE <3</h1>
        
        <!-- <ejs-textbox cssClass="e-outline" v-model="dados.texto">teste</ejs-textbox> -->
    </div>
    <div id="ancora_index">
        <a class="ancora_index" href="alugarlivro">QUERO ALUGAR UM LIVRO!</a>
    </div>
</div>

`;

Vue.component('AppVue', {
    template: AppTemplate,
    data: function() {
        return {
            // dados: {
            //     texto: null
            // }
        }
    },
    // methods: Onde deixa todas as funções
    methods: {
    },
    // mounted:Renderiza tudo quando a página estiver renderizando
    // computed: Renderiza tudo antes da página renderizar
    // watch: Fica constantemente verificando a variável 
    // watch: {
    //     "dados.texto": function (args) {
    //         if (args.length > 5) {
    //             this.dados.texto = 'oi';
    //         }
    //         console.log(args);
    //     }
    // }
})
