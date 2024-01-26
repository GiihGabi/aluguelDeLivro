const AppTemplate = `
    <div class="control-section" style="margin-top: 5%">
        <div align='center'>
            <h1>CADASTRAR ALUNO</h1>
        </div>
        <div class="border p-4 col-md-12">
            <div id="form1" @keyup.enter="cadAluno">
                <div class="form-group" style="padding-top: 11px;">
                    <div class="e-float-input">
                        <ejs-textbox floatLabelType="Auto" v-model="nome" placeholder="Nome do Aluno"></ejs-textbox>
                    </div>
                <div id="botoesedit">
                    <div class="botoesedit">
                        <ejs-button v-on:click.native="cadAluno()" class="btn btn-success">
                            Cadastrar
                        </ejs-button>
                        <ejs-button v-on:click.native="resetInput()" class="btn btn-warning">
                            Cancelar
                        </ejs-button>
                    </div>
                </div>
            </div> 
        </div>
        <br>
		<div>
            <ejs-grid ref="alunos" :dataSource="data">
                <e-columns>
                    <e-column field="ra" headerText="Ra"></e-column>
                    <e-column field="nome" headerText="Nome"></e-column>
                </e-columns>
            </ejs-grid>
		</div>
    </div>
`;

Vue.component("AppVue", {
  template: AppTemplate,
  data: function () {
    return {
      data: [],
      nome: '',
    };
  },
  methods: {
    listaAlunos() {
        axios.post(BASE + "/cadastraraluno/listaAlunos").then((res)=> {
            console.log(res.data);
            this.data = res.data;
        })
    },
    cadAluno() {
        const data = { 'nome': this.nome };
        axios.post(BASE + '/cadastraraluno/cadAluno', data).then((res) => {
            console.log(res.data);
            this.resetInput();
        });
    },
    resetInput() {
        this.nome = "";
        this.listaAlunos();
    }
  },
  mounted() {
    this.listaAlunos();
  }
});