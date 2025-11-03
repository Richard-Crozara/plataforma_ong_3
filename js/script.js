// ===========================
// SPA + Templates JS
// ===========================
(function() {
  const app = document.getElementById('app');
  const links = document.querySelectorAll('nav a[data-page]');

  // Templates
  const templates = {
    home: `
      <section>
        <h2>Quem Somos</h2>
        <p>O Instituto Esperança é uma ONG que atua na inclusão social e combate à fome, promovendo projetos comunitários em todo o Brasil.</p>
        <img src="imagens/ong1.jpg" alt="Voluntários ajudando em ação social" width="100%">
      </section>
      <section>
        <h2>Missão, Visão e Valores</h2>
        <ul>
          <li><strong>Missão:</strong> Promover solidariedade e inclusão social.</li>
          <li><strong>Visão:</strong> Um Brasil com mais igualdade e oportunidades.</li>
          <li><strong>Valores:</strong> Empatia, Transparência e Dedicação.</li>
        </ul>
      </section>
      <section>
        <h2>Contato</h2>
        <p>Email: contato@institutoesperanca.org</p>
        <p>Telefone: (11) 99999-0000</p>
      </section>
    `,
    projetos: `
      <section class="card" id="alimentar">
        <img src="imagens/projeto1.jpg" alt="Distribuição de alimentos">
        <div class="card-body">
          <h3>Projeto Alimentar com Amor</h3>
          <span class="badge">Alimentação</span>
          <p>Distribuição de cestas básicas e refeições para famílias em situação de vulnerabilidade.</p>
        </div>
      </section>
      <section class="card" id="futuro">
        <img src="imagens/projeto2.jpg" alt="Aulas de capacitação">
        <div class="card-body">
          <h3>Projeto Futuro Brilhante</h3>
          <span class="badge">Educação</span>
          <p>Oferece cursos gratuitos de capacitação profissional para jovens e adultos.</p>
        </div>
      </section>
      <section class="card" id="verde">
        <img src="imagens/projeto3.jpg" alt="Plantio de árvores">
        <div class="card-body">
          <h3>Projeto Verde Esperança</h3>
          <span class="badge">Meio Ambiente</span>
          <p>Reflorestamento e cuidado com o meio ambiente em comunidades carentes.</p>
        </div>
      </section>
    `,
    cadastro: `
      <section class="formulario-cadastro">
        <h2>Preencha o formulário abaixo</h2>
        <form id="formCadastro" novalidate>
          <fieldset>
            <legend>Dados Pessoais</legend>
            <label for="nome">Nome completo:</label>
            <input type="text" id="nome" name="nome" required>
            <label for="email">E-mail:</label>
            <input type="email" id="email" name="email" required>
            <label for="cpf">CPF:</label>
            <input type="text" id="cpf" name="cpf" maxlength="14" placeholder="000.000.000-00" required>
            <label for="telefone">Telefone:</label>
            <input type="tel" id="telefone" name="telefone" maxlength="15" placeholder="(00) 00000-0000" required>
            <label for="data-nasc">Data de nascimento:</label>
            <input type="date" id="data-nasc" name="data-nasc" required>
          </fieldset>
          <fieldset>
            <legend>Endereço</legend>
            <label for="endereco">Endereço:</label>
            <input type="text" id="endereco" name="endereco" required>
            <label for="cep">CEP:</label>
            <input type="text" id="cep" name="cep" maxlength="9" placeholder="00000-000" required>
            <label for="cidade">Cidade:</label>
            <input type="text" id="cidade" name="cidade" required>
            <label for="estado">Estado:</label>
            <input type="text" id="estado" name="estado" maxlength="2" placeholder="UF" required>
          </fieldset>
          <input type="submit" value="Enviar Cadastro" class="botao-enviar">
          <div id="alerta"></div>
        </form>
      </section>
    `
  };

  // Função para trocar conteúdo
  function loadPage(page, anchor) {
    app.innerHTML = templates[page] || templates.home;

    // Scroll para anchor se existir
    if (anchor) {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }

    // Reaplicar máscaras e validação no cadastro
    if (page === 'cadastro') setupForm();
  }

  // Links do menu
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      const anchor = link.dataset.anchor || null;

      // Remove classe ativo
      links.forEach(l => l.classList.remove('ativo'));
      link.classList.add('ativo');

      loadPage(page, anchor);
    });
  });

  // ===========================
  // Formulário Cadastro
  // ===========================
  function setupForm() {
    const cpf = document.getElementById('cpf');
    const telefone = document.getElementById('telefone');
    const cep = document.getElementById('cep');
    const form = document.getElementById('formCadastro');
    const alerta = document.getElementById('alerta');

    const mask = (el, fn) => { if(!el) return; el.addEventListener('input', fn); };

    mask(cpf, e => {
      let v = e.target.value.replace(/\D/g,'');
      v = v.replace(/(\d{3})(\d)/,'$1.$2');
      v = v.replace(/(\d{3})(\d)/,'$1.$2');
      v = v.replace(/(\d{3})(\d{1,2})$/,'$1-$2');
      e.target.value = v;
    });

    mask(telefone, e => {
      let v = e.target.value.replace(/\D/g,'');
      v = v.replace(/^(\d{2})(\d)/g,'($1) $2');
      v = v.replace(/(\d{5})(\d)/,'$1-$2');
      e.target.value = v;
    });

    mask(cep, e => {
      let v = e.target.value.replace(/\D/g,'');
      v = v.replace(/^(\d{5})(\d)/,'$1-$2');
      e.target.value = v;
    });

    if(form && alerta) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if(!form.checkValidity()){
          alerta.innerHTML = '<div class="alert alert-erro">Por favor, preencha todos os campos corretamente.</div>';
          setTimeout(()=>{ alerta.innerHTML = ''; }, 4000);
          return;
        }
        alerta.innerHTML = '<div class="alert alert-sucesso">Cadastro enviado com sucesso!</div>';
        form.reset();
        setTimeout(()=>{ alerta.innerHTML = ''; }, 4000);
      });
    }
  }

  // ===========================
  // Menu Mobile + Dropdown + A11y
  // ===========================
  (function() {
    const menuBtn = document.querySelector('.menu-hamburguer');
    const navMenu = document.querySelector('nav ul');
    if(menuBtn && navMenu){
      menuBtn.setAttribute('role','button');
      menuBtn.setAttribute('tabindex','0');
      menuBtn.setAttribute('aria-expanded','false');
      const toggleMenu = () => {
        const open = navMenu.classList.toggle('ativo');
        menuBtn.setAttribute('aria-expanded', open ? 'true':'false');
      };
      menuBtn.addEventListener('click', toggleMenu);
      menuBtn.addEventListener('keydown', (e)=>{
        if(e.key==='Enter'||e.key===' '){ e.preventDefault(); toggleMenu(); }
      });
      document.addEventListener('click',(e)=>{
        if(!navMenu.contains(e.target) && !menuBtn.contains(e.target) && navMenu.classList.contains('ativo')){
          navMenu.classList.remove('ativo'); 
          menuBtn.setAttribute('aria-expanded','false');
        }
      });
    }
  })();

  // Carrega página inicial
  loadPage('home');
})();
