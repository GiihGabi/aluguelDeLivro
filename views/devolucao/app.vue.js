const AppTemplate = `
    <div class="control-section" style="margin-top: 5%">
        <div align='center'>
            <h1>DEVOLVER LIVRO</h1>
        </div>
        <div class="border p-4 col-md-12">
            <div id="form1" @keyup.enter="validaDev">
                <div class="form-group" style="padding-top: 11px;">
                    <div class='content'>
                        <ejs-dropdownlist :fields='fieldsLivro' :dataSource='itemsLivro' ref='dropdownObj' v-model="listLivro" filterType='Contains' :allowFiltering='true' :placeholder='nomeLivro'></ejs-dropdownlist>
                    </div>
                    <div class="col-lg-12 control-section">
                        <div id="wrapper">
                            <ejs-datepicker :placeholder="waterMarkText" v-model="datadevolucao"></ejs-datepicker>
                        </div>
                    </div>
                    <div id="botoesedit">
                        <div class="botoesedit">
                            <ejs-button v-on:click.native="validaDev()" class="btn btn-success">
                                Devolver
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
                <ejs-grid ref="devolucao" :dataSource="data">
                    <e-columns>
                    <e-column field="nome" headerText="Nome do aluno"></e-column>
                    <e-column field="emprestimo" v-model="emprestimo" headerText="N° do empréstimo"></e-column>
                    <e-column field="titulo" headerText="Livro"></e-column>
                    <e-column field="dataprevistadev" v-model="dataprevistadev" headerText="Data Prevista da Devolução"></e-column>
                    </e-columns>
                </ejs-grid>
            </div>
        </div>
    </div>
`;

Vue.component("AppVue", {
  template: AppTemplate,
  data: function () {
    return {
      data: [],
      fieldsLivro: { text: "titulo", value: "emprestimo" },
      itemsLivro: [],
      nomeLivro: "Digite o nome do livro à ser devolvido",
      listLivro: "",
      // DATA
      waterMarkText: "Data da devolução",
      datadevolucao: "",
      dataprevistadev: "",
      emprestimo: "",
    };
  },
  methods: {
    selectLivro() {
      axios.post(BASE + "/alugarlivro/livrosEmprestados").then((res) => {
        console.log(res.data);
        this.itemsLivro = res.data;
      });
    },
    listaDevolucao() {
      axios.post(BASE + "/devolucao/listaDevolucao").then((res) => {
        console.log(res.data);
        this.data = res.data;
      });
    },
    validaDev() {
      var dataprevistadev = { dataprevistadev: this.dataprevistadev };
      var datadevolucao = { datadevolucao: this.datadevolucao };
      var multa = 0;

      if (datadevolucao > dataprevistadev) {
        multa =
          ((new Date(datadevolucao) - new Date(dataprevistadev)) / (1000 * 60 * 60 * 24)) * 2;
      }

      const data = {
        emprestimo: this.listLivro,
        livro: this.listLivro,
        datadevolucao: this.datadevolucao,
        multa: multa,
      };

      axios.post(BASE + "/devolucao/validaDev", data).then((res) => {
        console.log(res.data);
        this.resetInput();
      });
    },
    resetInput() {
        this.$refs.dropdownObj.ej2Instances.value = null;
        this.datadevolucao = "";
        this.listaDevolucao();
    }
  },
  mounted() {
    this.listaDevolucao();
    this.selectLivro();
  },
});
