export interface Plant {
    id: number;
    name: string;
    type?: string;
    description: string;
    image_url: string | null;
    approuvee: boolean;
    proprietaire_id: number;
    created_by: string;
    statut?: string;
  }