const URL = "https://jsonplaceholder.typicode.com/users";

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const fechar = document.getElementById("fechar");

const resultado = document.getElementById("resultado");
const inputBusca = document.getElementById("busca");

let usuarios = [];

inputBusca.addEventListener("input", filtrarUsuarios);

async function carregarUsuarios() {
  resultado.innerHTML = "Carregando...";

  try {
    const resp = await fetch(URL);
    usuarios = await resp.json();

    mostrarUsuarios(usuarios);

  } catch (erro) {
    resultado.innerHTML = "Erro ao carregar usuários";
  }
}

function filtrarUsuarios() {
  const busca = inputBusca.value.toLowerCase().trim();

  const filtrados = usuarios.filter(usuario =>
    usuario.name.toLowerCase().includes(busca)
  );

  mostrarUsuarios(filtrados);
}

function mostrarUsuarios(lista) {
  resultado.innerHTML = "";

  if (lista.length === 0) {
    resultado.innerHTML = "Nenhum usuário encontrado";
    return;
  }

  lista.forEach(usuario => {
    const div = document.createElement("div");
    div.classList.add("usuario");

    div.addEventListener("click", () => {
  modal.style.display = "block";

  modalBody.innerHTML = `
    <h2>${usuario.name}</h2>
    <p><strong>Email:</strong> ${usuario.email}</p>
    <p><strong>Telefone:</strong> ${usuario.phone}</p>
    <p><strong>Cidade:</strong> ${usuario.address.city}</p>
    <p><strong>Empresa:</strong> ${usuario.company.name}</p>
  `;
});

    div.innerHTML = `
      <strong>${usuario.name}</strong><br>
      <small>${usuario.email}</small>
    `;

    resultado.appendChild(div);
  });
}

carregarUsuarios();

fechar.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

