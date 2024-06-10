document.addEventListener('DOMContentLoaded', function() {
  function toggleSubMenu(id) {
      var submenus = document.querySelectorAll('.submenu');
      submenus.forEach(function(submenu) {
          if (submenu.id === id) {
              submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
          } else {
              submenu.style.display = 'none';
          }
      });
      document.querySelector('.submenu-container').style.display = 'block';

      // Exibe ou oculta os botões de ação no topo
      var actionButtons = document.getElementById('action-buttons');
      if (id === 'envelope-submenu') {
          actionButtons.classList.remove('hidden');
      } else {
          actionButtons.classList.add('hidden');
      }
  }

  document.querySelectorAll('.item-menu').forEach(function(item) {
      item.addEventListener('click', function() {
          var submenuId = this.getAttribute('data-submenu');
          toggleSubMenu(submenuId);
      });
  });

  document.getElementById('uploadBtn').addEventListener('click', function() {
      document.getElementById('fileInput').click();
  });

  document.getElementById('fileInput').addEventListener('change', function() {
      var file = this.files[0];
      var formData = new FormData();
      formData.append('file', file);

      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'url_do_seu_endpoint_de_upload');
      xhr.onload = function() {
          if (xhr.status === 200) {
              console.log('Arquivo enviado com sucesso!');
          } else {
              console.log('Erro ao enviar o arquivo. Código do erro:', xhr.status);
          }
      };
      xhr.send(formData);
  });

  document.getElementById('takePhotoBtn').addEventListener('click', function() {
      var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');

      navigator.mediaDevices.getUserMedia({ video: true })
          .then(function(stream) {
              video.srcObject = stream;
              video.onloadedmetadata = function(e) {
                  video.play();
              };
          })
          .catch(function(err) {
              console.log('Erro ao acessar a câmera:', err);
          });

      video.addEventListener('click', function() {
          context.drawImage(video, 0, 0, 400, 300);
          var imageData = canvas.toDataURL('image/png');
          console.log('Foto tirada:', imageData);
      });
  });

  // Atualiza a data e hora de último login
  function updateLastLogin() {
      var now = new Date();
      var formattedDate = now.toLocaleDateString('pt-BR');
      var formattedTime = now.toLocaleTimeString('pt-BR');
      document.getElementById('last-login').textContent = formattedDate + ' ' + formattedTime;
  }

  updateLastLogin();
});

function acaoBotao(acao) {
  console.log('Botão clicado:', acao);
}

function mostrarFormulario() {
  const filtroNome = document.getElementById('filtroNome').value.trim();
  const projetoSelecionado = document.getElementById('projeto').value;
  const formularioNomes = document.getElementById('formularioNomes');
  const nomesSelecionados = document.getElementById('nomesSelecionados');

  // Limpa o conteúdo do formulário
  nomesSelecionados.innerHTML = '';

  // Lógica para mostrar o formulário e preencher os nomes correspondentes
  if (filtroNome !== '') {
      // Aqui você pode adicionar a lógica para preencher o select com nomes correspondentes
      // Por enquanto, vou adicionar alguns nomes de exemplo

      const nomesProjetos = {
          '201': ['João', 'Ana'],
          '202': ['Maria', 'Carlos'],
          '206': ['Pedro', 'Lucas'],
          '400': ['José', 'Mariana', 'andré']
      };

      nomesProjetos[projetoSelecionado].forEach(nome => {
          if (nome.toLowerCase().includes(filtroNome.toLowerCase())) {
              const option = document.createElement('option');
              option.value = nome;
              option.textContent = nome;
              nomesSelecionados.appendChild(option);
          }
      });

      formularioNomes.style.display = 'block';
  } else {
      formularioNomes.style.display = 'none';
  }
}

function finalizarSelecaoNomes() {
  const nomesSelecionados = document.getElementById('nomesSelecionados').selectedOptions;
  const nomes = Array.from(nomesSelecionados).map(option => option.value);

  // Aqui você pode fazer o que quiser com os nomes selecionados
  console.log('Nomes selecionados:', nomes);

  // Resetar o campo de filtro e ocultar o formulário
  document.getElementById('filtroNome').value = '';
  document.getElementById('formularioNomes').style.display = 'none';
}

