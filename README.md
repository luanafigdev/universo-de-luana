# Universo de Luana — V1 ilustrada

Portfólio interativo em ilustração 2D desenvolvido com **HTML, CSS, JavaScript e Canvas 2D**. O visitante passeia por uma vila com quatro locais, conhece projetos reais e encontra o mascote Dudu.

## Como executar

1. Extraia a pasta `universo`.
2. Abra `index.html` diretamente no navegador.
3. Se preferir, use a extensão Live Server no VS Code. Não é necessário instalar dependências.

## Controles

- **WASD** ou **setas**: caminhar.
- **E**: interagir com porta, objeto ou Dudu quando estiver perto.
- **Esc**: fechar um painel ou sair de um ambiente.
- **Clique/toque**: selecionar um edifício ou objeto sem caminhar.
- **Celular**: controle direcional na tela e botão Interagir. Também é possível navegar pelo guia lateral sem usar a movimentação.

## O que você pode explorar

- **Confeitaria:** primeira versão da Flor de Açúcar e prévia pública do redesign planejado para 2027.
- **Fliperama:** Flappy Doggy e o repositório de seu código.
- **Laboratório:** apresentação, formação e tecnologias utilizadas.
- **Correio:** contato profissional e perfil do GitHub.
- **Dudu:** meu cachorro pessoal, um shih-tzu preto e branco que passeia pela vila. Aproxime-se para fazer carinho. Existe uma pequena surpresa para visitantes curiosos.

## Organização

```text
universo/
├── index.html       # página, navegação e acessibilidade
├── style.css        # aparência e adaptação a telas menores
├── data.js          # conteúdo dos projetos, links e pontos interativos
├── game.js          # movimentação, colisão, eventos e progresso
├── art.js           # personagens, sprites e animações do Canvas
├── favicon.svg
└── assets/           # cenários vetoriais, ilustrações e Dudu
```

## Acessibilidade e experiência

- Botões de acesso direto aos ambientes, como alternativa à movimentação do personagem.
- Diálogos acessíveis por teclado, com retorno do foco ao fechar.
- Opção de animação reduzida respeita a preferência do sistema.
- Controles por toque e orientação de como jogar na própria página.
- Progresso de exploração armazenado no `localStorage` do navegador, em uma chave exclusiva da V1 (para não importar conquistas de testes anteriores). Use **Reiniciar conquistas** para voltar a 0/4. O segredo do Dudu é armazenado apenas nesta sessão, quando o navegador permite.


## Tecnologias

- HTML semântico, CSS responsivo e JavaScript nativo.
- Canvas 2D para a vila, interiores, animações e personagem.
- Ilustrações SVG/WebP e sprites PNG. Não há dependências externas.

Todos os direitos reservados. 
