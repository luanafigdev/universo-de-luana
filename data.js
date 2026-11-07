window.UNIVERSE = {
  width: 768,
  height: 480,
  scenes: [
    {
      id: 'lab', title: 'Laboratório de ideias', short: 'LABORATÓRIO', symbol: '⌘',
      color: '#a7e8cf', wall: '#98d3c0', floor: '#9fb1a5', furniture: '#425d65',
      x: 54, y: 29, w: 250, h: 155, doorX: 161, doorY: 190,
      objects: [
        {x: 225, y: 236, symbol: '</>', label: 'Meu computador', category: 'SOBRE MIM', title: 'Oi, eu sou Luana!', description: 'Sou engenheira de computação e desenvolvedora front-end. Crio projetos próprios e busco unir boas interfaces, programação e uma experiência agradável para quem navega.', tags: ['Engenharia de Computação','Front-end','Projetos autorais'], links: [{label:'Meu GitHub ↗',href:'https://github.com/luanafigdev'}]},
        {x: 552, y: 236, symbol: '{}', label: 'Minha bancada', category: 'TECNOLOGIAS', title: 'Ferramentas que uso', description: 'HTML, CSS, JavaScript, React, Python e Git fazem parte das tecnologias que conheço. Este pequeno universo foi desenvolvido usando Canvas e JavaScript sem bibliotecas de jogos.', tags:['HTML','CSS','JavaScript','React','Python','Git'], links:[{label:'Ver projetos no GitHub ↗',href:'https://github.com/luanafigdev'}]}
      ]
    },
    {
      id: 'flor', title: 'Confeitaria Flor de Açúcar', short: 'CONFEITARIA', symbol: '✿',
      color: '#ffc4d2', wall: '#f4d5db', floor: '#efd4c5', furniture: '#c58d9f',
      x: 469, y: 22, w: 260, h: 160, doorX: 676, doorY: 190,
      objects: [
        {x: 225, y: 236, symbol: '✿', label: 'Vitrine original', category: 'WEBSITE COMERCIAL', title: 'A primeira identidade', description: 'A primeira versão da Flor de Açúcar segue sendo o site oficial: apresenta o catálogo, permite personalizar encomendas, utilizar o carrinho e finalizar o atendimento pelo WhatsApp.', tags:['Catálogo','Personalização','Carrinho'], links:[{label:'Ver site atual ↗',href:'https://flordeacucar.netlify.app/'}]},
        {x: 552, y: 236, symbol: '❀', label: 'Nova coleção', category: 'REDESIGN · PRÉVIA 2027', title: 'Uma nova fase', description: 'O redesign da Flor de Açúcar apresenta uma nova identidade com lírio, linguagem visual editorial, catálogo reorganizado e experiência renovada. A prévia está pública, mas o lançamento oficial foi planejado para 2027.', tags:['Rebranding digital','UI/UX','Prévia de 2027'], links:[{label:'Explorar redesign ↗',href:'https://flordeacucarba.netlify.app/'}]}
      ]
    },
    {
      id: 'arcade', title: 'Fliperama Flappy Doggy', short: 'FLIPERAMA', symbol: '▣',
      color: '#ccb7ff', wall: '#7774b0', floor: '#595776', furniture: '#403653',
      x: 23, y: 225, w: 261, h: 173, doorX: 165, doorY: 403,
      objects: [
        {x: 225, y: 236, symbol: '★', label: 'Máquina arcade', category: 'JOGO WEB', title: 'Flappy Doggy', description: 'Jogo web de obstáculos e coleta de ossos, com personagem animado, recorde pessoal e dez cenários que mudam conforme a pontuação. Jogável com teclado ou toque.', tags:['JavaScript','Canvas 2D','10 cenários'], links:[{label:'Jogar agora ↗',href:'https://flappydoggy.netlify.app/'}]},
        {x: 552, y: 236, symbol: '{ }', label: 'Placa de código', category: 'BASTIDORES', title: 'Por trás do jogo', description: 'No repositório do Flappy Doggy você pode explorar as mecânicas de colisão, movimentação, pontuação, animação e mudanças de cenário programadas em JavaScript.', tags:['Código-fonte','Game logic','GitHub'], links:[{label:'Ver código ↗',href:'https://github.com/luanafigdev/flappy-doggy'}]}
      ]
    },
    {
      id: 'contact', title: 'Estação de mensagens', short: 'CORREIO', symbol: '✉',
      color: '#ffe2a5', wall: '#eed9aa', floor: '#d8bf9d', furniture: '#9d745c',
      x: 488, y: 228, w: 273, h: 167, doorX: 616, doorY: 404,
      objects: [
        {x: 225, y: 236, symbol: '✉', label: 'Caixa postal', category: 'CONTATO', title: 'Vamos conversar?', description: 'Tem um projeto, parceria ou oportunidade? Você pode entrar em contato pelo e-mail profissional luanafigueiredo.dev@gmail.com.', tags:['Freelance','Vagas','Colaborações'], links:[{label:'Enviar e-mail ↗',href:'mailto:luanafigueiredo.dev@gmail.com?subject=Contato%20pelo%20portf%C3%B3lio'}]},
        {x: 552, y: 236, symbol: '★', label: 'Quadro de projetos', category: 'MAIS PROJETOS', title: 'Veja o que já criei', description: 'Além dos projetos apresentados neste universo, meu GitHub reúne código, experimentos e o desenvolvimento do próprio portfólio.', tags:['GitHub','Portfólio'], links:[{label:'Abrir GitHub ↗',href:'https://github.com/luanafigdev'}]}
      ]
    }
  ]
};
