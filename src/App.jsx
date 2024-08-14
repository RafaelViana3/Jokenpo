import React, { useState } from 'react';
import papel from '../public/icons/papel.svg';
import pedra from '../public/icons/pedra.svg';
import tesoura from '../public/icons/tesoura.svg';
import './App.css'; 

function App() {
  const [userChoice, setUserChoice] = useState(''); // setagem da escolha do usúario, que recebe pedra,papel ou tesoura enviada como argumento do clique do botão -> !!
  const [computerChoice, setComputerChoice] = useState(''); // setagem da escolha aleátoria do computador -> !!
  const [result, setResult] = useState(''); // setagem do resultado, que receberá empate, você ganhou ou você perdeu **

  const [win, setWin] = useState(0); // contador de vitórias
  const [draw, setDraw] = useState(0); // contador de empates
  const [def, setDef] = useState(0); // contador de derrotas

  const [bot, setBot] = useState(''); // imagem da jogada do bot
  const [player, setPlayer] = useState(''); // imagem da jogada do player

  const vitorias = () => setWin(win + 1);
  const empates = () => setDraw(draw + 1);
  const derrotas = () => setDef(def + 1);

  const resetar = () => {
    setWin(win - win);
    setDraw(draw - draw);
    setDef(def - def);
    setUserChoice(''); 
    setComputerChoice(''); 
    setResult('');
    setPlayer('');
    setBot('');
  };

  const choices = [papel, tesoura, pedra]; // vetor de opções para serem escolhidos pela máquina

  const getRandomChoice = () => {
    return choices[Math.floor(Math.random() * choices.length)]; // retorna um número aleatório como escolha de acordo com o tamanho do vetor 'choices'
  };

  const determineWinner = (user, computer) => { // recebe como argumento as variáveis choice e computer, enviadas pela função handleclick do botão e setadas pelo use estate lá em cima -> !!
    if (user === computer) {
      empates();
      console.log(draw)
      return 'Empate!'; // **
    } else if (
      (user === pedra && computer === tesoura) ||
      (user === papel && computer === pedra) ||
      (user === tesoura && computer === papel)
    ) {
      vitorias();
      console.log(win)
      return 'Você ganhou!'; // **
    } else {
      derrotas();
      console.log(def)
      return 'Você perdeu!'; // **
    }
  };

  const handleClick = (choice) => { // Recebe o valor em '' enviado pelo botão selecionado
    const computer = getRandomChoice(); // chama a função para gerar uma escolha para a máquina
    setUserChoice(choice); // useState recebe o valor enviado pelo botão -> !!
    setComputerChoice(computer); // useState recebe o valor enviado pela funçao do getRandomChoice -> !!
    setPlayer(choice);
    setBot(computer);
    setResult(determineWinner(choice, computer)); // envia as variávies choice e computer para a determineWinner que verifica o vencedor, e então o useState setResult('') recebe como retorno uma string, como Empate, Vc ganhou e vc perdeu!!
  };

  return (
    <div className="App">
      <h1>Pedra, Papel e Tesoura</h1>
      <div>
        <button onClick={() => handleClick(pedra)}>Pedra</button> {/* envia 'pedra' como argumento para a função*/} 
        <button onClick={() => handleClick(papel)}>Papel</button> {/* envia 'papel' como argumento para a função*/} 
        <button onClick={() => handleClick(tesoura)}>Tesoura</button> {/* envia 'tesoura' como argumento para a função*/} 
      </div>
      <div>
        <p>Sua escolha: <img src={player} alt="Sua escolha" style={{ width: '30px', height: 'auto' }}/></p> {/* escreve sua escolha com iterpolação do useState*/} 
        <p>Escolha do computador: <img src={bot} alt="escolha do bot" style={{ width: '30px', height: 'auto' }}/></p> {/* escreve a escolha da máquina com iterpolação do useState*/} 
        <p>Resultado: {result}</p> {/* revela o vencedor */} 
      </div>
      <div id="imgs">
        <img src={player} alt="Sua jogada" style={{ width: '300px', height: 'auto' }}/>
 
        <img src={bot} alt="Jogada do bot" style={{ width: '300px', height: 'auto' }}/>
      </div>
      <div id="resul">
        <p>Vitórias: {win}</p>
        <p>Empates: {draw}</p>
        <p>Derrotas: {def}</p>
        <button onClick={() => resetar()}>Resetar</button>
      </div>
    </div>
  );
}

export default App;
