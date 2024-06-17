export interface Projet {
    title: string;
    description: string;
    explanation: string;
    category: string; // Vous pouvez définir category comme string ou une autre interface si nécessaire
    image: string;
    date?: Date | string; // Date peut être un objet Date ou une chaîne de caractères
  }
  