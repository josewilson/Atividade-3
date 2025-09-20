console.log('script.js carregado');

// ---------------- Funções ---------------- //

// Calcula o total = preço unitário * quantidade
function calcularTotal(precoUnitario, quantidade) {
  const p = Number(precoUnitario);
  const q = Number(quantidade);
  if (!isFinite(p) || !isFinite(q) || p < 0 || q < 0) {
    throw new Error('Preço ou quantidade inválidos');
  }
  return p * q;
}

// Aplica desconto: >=100 → 10%; abaixo de 100 → sem desconto
function aplicarDesconto(total) {
  if (typeof total !== 'number' || !isFinite(total)) {
    throw new Error('Total inválido');
  }
  return total >= 100 ? total * 0.9 : total;
}

// Formata como moeda BRL
function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Exibe resumo final
function exibirResumo(totalAntes, totalDepois) {
  const mensagem =
    'Resumo da compra:\n' +
    '- Valor total (antes do desconto): ' + formatarMoeda(totalAntes) + '\n' +
    '- Valor final (após desconto): ' + formatarMoeda(totalDepois);

  alert(mensagem);
  console.log(mensagem);
}

// ---------------- Fluxo principal ---------------- //

// Adiciona evento no botão da página
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btnRun');

  btn.addEventListener('click', () => {
    try {
      const precoInput = prompt('Digite o preço unitário (ex: 12.50 ou 12,50):');
      if (precoInput === null) return alert('Operação cancelada.');

      const qtdInput = prompt('Digite a quantidade (ex: 3):');
      if (qtdInput === null) return alert('Operação cancelada.');

      const preco = parseFloat(precoInput.replace(',', '.').trim());
      const quantidade = parseInt(qtdInput.trim(), 10);

      if (isNaN(preco) || isNaN(quantidade) || preco < 0 || quantidade < 0) {
        return alert('Entrada inválida. Informe valores numéricos válidos.');
      }

      const total = calcularTotal(preco, quantidade);
      const totalComDesconto = aplicarDesconto(total);

      exibirResumo(total, totalComDesconto);
    } catch (err) {
      console.error(err);
      alert('Erro: ' + err.message);
    }
  });
});

// ---------------- Exporta globalmente (opcional para testes no console) ---------------- //
window.calcularTotal = calcularTotal;
window.aplicarDesconto = aplicarDesconto;
window.exibirResumo = exibirResumo;
