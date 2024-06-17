export interface Projet {
    title: string;
    description: string;
    explanation: string;
    category: {
    _id: string;
    name: string;
  }
    image: string;
    date?: Date | string; // Date peut être un objet Date ou une chaîne de caractères
  }
  