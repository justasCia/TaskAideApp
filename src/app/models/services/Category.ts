import Service from "./Service";

export default interface Category {
    id: number;
    name: string;
    imageUrl: string;
    services: Service[];
  }