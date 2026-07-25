# 🌤️ Weather Radar - Clima Dashboard

Dashboard moderno de previsão do tempo desenvolvido em **React**, **TypeScript**, **Sass** e empacotado com **Vite**. O projeto realiza consultas em tempo real em APIs RESTful e conta com cobertura de testes automatizados com **Vitest**.

## 🛠️ Tecnologias e Conceitos Aplicados

- **React (Hooks & Estado):** Gerenciamento dinâmico de busca, loading e renderização.
- **TypeScript:** Tipagem estrita de dados (`WeatherData`) garantindo consistência no fluxo da aplicação.
- **Sass (SCSS):** Estilização avançada com variáveis, nesting e layouts totalmente responsivos.
- **Consumo de API RESTful:** Integração assíncrona com a API da Open-Meteo via `async/await`.
- **Testes Unitários:** Cobertura de componentes essenciais utilizando `Vitest` e `React Testing Library`.

## 🔄 Resolução de Código Legado e Refatoração

O projeto possuía um módulo legado (`src/legacy/weatherServiceOld.js`) estruturado em JavaScript antigo (ES5), que utilizava `XMLHttpRequest` e padrões de _callback_ para gerenciar requisições de rede.

**Ações de melhoria tomadas:**

1. Identificação de débitos técnicos no tratamento de assincronismo antigo.
2. Refatoração completa da lógica de comunicação com o servidor substituindo por `Fetch API` integrada a estruturas modernas de `async/await` e tratamento de exceções robusto com `try/catch`.
3. Migração para o ecossistema do **TypeScript**, prevenindo erros de tipagem em tempo de execução no componente principal (`App.tsx`).
