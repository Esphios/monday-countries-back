# AGENTS.md

## Visão Geral

Este repositório contém um backend TypeScript/Express que atua como proxy simples
para a WeatherAPI. O contrato principal é o endpoint `GET /weather/:country`,
consumido pelo frontend `monday-countries-front`.

## Tecnologias Principais

| Categoria | Tecnologia | Evidência | Uso |
| --- | --- | --- | --- |
| Runtime | Node.js + TypeScript | `package.json`, `server.ts`, `tsconfig.json` | servidor HTTP |
| API | Express 4 | `server.ts`, `package.json` | rota `/weather/:country` |
| HTTP client | Axios | `server.ts`, `package.json` | chamada à WeatherAPI |
| Configuração | `dotenv` | `server.ts`, `package.json` | variáveis de ambiente |
| CORS | `cors` | `server.ts`, `package.json` | acesso do frontend local |
| Desenvolvimento | `typescript`, `nodemon` | `package.json` | transpile + reload |

## Estrutura do Repositório

- `server.ts`: toda a aplicação HTTP.
- `dist/`: saída compilada do TypeScript.
- `package.json`: script de build/start e dependências.
- `README.md`: contrato funcional e setup manual.

## Setup e Comandos

- Variáveis obrigatórias:
  - `WEATHER_API_KEY`
  - `SERVER_PORT`
- Dependência externa: `http://api.weatherapi.com/v1/current.json`

```bash
npm install
npm start
```

`npm start` executa `npx tsc && nodemon dist/server.js`.

## Convenções e Limites

- Preserve o contrato de resposta usado pelo frontend:
  - `temperature`
  - `condition`
  - `icon`
  - `wind_speed_kph`
  - `wind_direction`
- Evite transformar `server.ts` em um backend mais complexo sem necessidade.
- Se mudar a rota ou o payload, revise o frontend em `monday-countries-front` ao mesmo tempo.
- Não commite `.env` nem chaves de API.

## Peculiaridades do Projeto

- Toda a lógica vive em um único `server.ts`; isso é intencionalmente simples.
- O build de desenvolvimento roda sobre `dist/server.js`, não sobre `ts-node`.
- O histórico de commits é informal e incremental, sem convenção rígida.
