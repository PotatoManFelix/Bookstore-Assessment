export interface Book{
    id: string;
    name: string;
    description: string;
    image: string;
    author: string;
    year: number;
    price: number;
    lang: string;
    format: string;
}
export interface BookCart{
    id : string;
    name: string;
    image: string;
    author: string;
    price : number;
    quantity: number;
    selected: boolean;
}