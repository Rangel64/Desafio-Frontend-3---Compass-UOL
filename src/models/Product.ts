

export interface Review {
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    postedAt: string; // ISO date string
  }
  
  export interface Product {
    id: string; // ID do produto
    name: string; // Nome do produto
    category: string; // Categoria (ex: "headsets", "headphones")
    price: number; // Preço do produto
    details: string; // Descrição detalhada do produto
    img: string; // URL da imagem do produto
    reviews: Review[]; // Lista de avaliações
    popularity: number; // Popularidade do produto
    createdAt: string; // Data de criação (ISO string)
  }