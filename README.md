# DESAFIO-FRONTEND-3---COMPASS-UOL

## Visão Geral do Projeto

Este projeto tem como objetivo desenvolver um frontend de um e-commerce de teste. Ele foi desenvolvido como desafio da Compass UOL e utiliza tecnologias como React, TypeScript e Tailwind CSS.

## Funcionalidades

- Navegação entre as páginas de produtos.
- Carrinho de compras funcional com adição e remoção de itens.
- Página de detalhes do produto com informações relevantes e imagens.
- Busca de produtos por nome ou categoria.
- Autenticação de usuário com login e cadastro.

## Tecnologias Utilizadas

- React: Biblioteca JavaScript para construção de interfaces de usuário.
- TypeScript: Superset do JavaScript que adiciona tipagem estática.
- Tailwind CSS: Framework CSS utilitário para estilização rápida e responsiva.

## Estrutura do Projeto

src/
├── assets/                # Arquivos estáticos (imagens, ícones, etc.)
│   ├── avatar.svg
│   ├── bg-login.svg
│   ├── logo.svg
│   ├── phone.png
│   └── react.svg
├── components/            # Componentes reutilizáveis da aplicação
│   ├── CartButton.tsx
│   ├── header.tsx
│   ├── ProductCard.tsx
│   ├── ProductCardSmall.tsx
│   ├── ProductCarousel.tsx
│   └── UserPorfile.tsx
├── context/               # Contextos para gerenciamento de estados
│   └── CartContext.tsx
├── models/                # Interfaces e tipos de dados
│   └── Product.ts
├── pages/                 # Páginas da aplicação
│   ├── AllProducts.tsx
│   ├── Cart.tsx
│   ├── Productinfo.tsx
│   └── SearchPage.tsx
├── App.tsx               # Componente principal da aplicação
├── AuthRoute.tsx          # Componente para rotas protegidas
├── index.css             # Estilos globais da aplicação
├── Login.tsx             # Página de login
├── main.tsx              # Ponto de entrada da aplicação
├── Signup.tsx            # Página de cadastro
├── vite-env.d.ts         # Definições de tipos para o Vite
├── .gitignore            # Arquivos ignorados pelo Git
├── eslint.config.js      # Configuração do ESLint
├── index.html            # Arquivo HTML principal
├── package-lock.json     # Arquivos de lock das dependências
├── package.json          # Arquivo de manifesto do projeto
├── postcss.config.js     # Configuração do PostCSS
├── README.md             # Este arquivo
├── tailwind.config.js    # Configuração do Tailwind CSS
├── tsconfig.app.json     # Configuração do TypeScript para o aplicativo
├── tsconfig.json         # Configuração raiz do TypeScript
├── tsconfig.node.json    # Configuração do TypeScript para o Node.js
├── vercel.json           # Configuração para deploy na Vercel
└── vite.config.ts        # Configuração do Vite

## Como Executar o Projeto

1. Clone o repositório: `git clone https://github.com/Rangel64/Desafio-Frontend-3---Compass-UOL.git`
2. Instale as dependências: `npm install` ou `yarn install`
3. Inicie o servidor de desenvolvimento: `npm run dev` ou `yarn dev`
4. O aplicativo estará disponível em `http://localhost:5173`
