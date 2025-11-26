# 🧠 HabitFlow - Gamificação de Hábitos para Estudantes

> Projeto desenvolvido como requisito parcial da disciplina **Tecnologia e Comportamento Humano** do curso de Psicologia.

## 📖 Sobre o Projeto

O **HabitFlow** é uma aplicação web desenvolvida para auxiliar estudantes no gerenciamento da procrastinação acadêmica através de estratégias de gamificação. O aplicativo utiliza conceitos da **Psicologia Comportamental** (especificamente o Condicionamento Operante de Skinner) para reforçar hábitos de estudo positivos.

O diferencial do projeto é o sistema de recompensas: o tempo de lazer (Chat Social) e a personalização do avatar só são liberados mediante o cumprimento de metas de estudo e acertos em exercícios de fixação.

## 🚀 Funcionalidades

* **🍅 Método Pomodoro Integrado:** Timer de foco (25 min) intercalado com pausas, visando a gestão de tempo e redução da ansiedade.
* **🤖 Roteiros de Estudo via IA:** Simulação de geração automática de tópicos de estudo baseados na temática escolhida pelo usuário.
* **📝 Exercícios de Fixação (Quiz):** Avaliação pós-estudo. O desempenho (acerto > 75%) define a magnitude da recompensa.
* **💬 Chat Social Isométrico (Estilo Habbo):** Uma sala virtual onde os estudantes podem interagir com seus avatares. O tempo de permanência na sala é "comprado" com tempo de estudo.
* **🪙 Economia de Fichas (Token Economy):** O usuário ganha moedas virtuais ao estudar, que podem ser trocadas por itens cosméticos.
* **👕 Loja de Avatares:** Personalização do personagem com chapéus, roupas e fundos.

## 🧠 Fundamentação Teórica

O projeto baseia-se em princípios sólidos da psicologia:

1. **Reforço Positivo:** Moedas e itens cosméticos aumentam a probabilidade do comportamento de estudar se repetir.
2. **Princípio de Premack:** Utilizar uma atividade de alta probabilidade (conversar no chat) como reforçador para uma de baixa probabilidade (estudar).
3. **Autorregulação:** O uso de cronômetros e roteiros ajuda o aluno a desenvolver autonomia.
4. **Engajamento Social:** O chat cria um senso de comunidade e pertencimento, essencial para a retenção.

## 🛠️ Tecnologias Utilizadas

* **Frontend:** [React.js](https://reactjs.org/)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Ícones:** [Lucide React](https://lucide.dev/)
* **Ambiente:** Node.js

## 📸 Telas do Projeto

| Dashboard | Sessão de Estudo | Chat Isométrico |
|:---:|:---:|:---:|
| Visão geral, moedas e amigos | Timer Pomodoro e Roteiro | Interação social com avatares |

## 🔧 Como Rodar o Projeto

Para executar este projeto localmente, você precisará do [Node.js](https://nodejs.org/) instalado.

1. **Clone o repositório:**
    ```bash
    git clone [https://github.com/marcosemanuelss/habitflow.git](https://github.com/marcosemanuelss/habitflow.git)
    ```

2. **Entre na pasta do projeto:**
    ```bash
    cd habitflow
    ```

3. **Instale as dependências:**
    ```bash
    npm install
    # Instale também as bibliotecas específicas de UI utilizadas
    npm install lucide-react
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```

4. **Execute a aplicação:**
    ```bash
    npm start
    ```

O aplicativo estará disponível em `http://localhost:3000`.

## 👥 Autores (Equipe)

Projeto idealizado e desenvolvido por discentes do curso de Psicologia:

* **Ingreed Rafaele Souza Feitosa**
* **Kauê Egídio de Aragão Romero Santos**
* **Lurdes Mylla Cardoso Oliveira**
* **Marcos Emanuel de Souza Santos**
* **Ricardo Menezes Carvalho**

---

**Instituição:** Universidade Tiradentes (Unit) - Aracaju/SE
**Ano:** 2025
