export class Ad {
    title: string;
    description: string;
    price: number;
    phone: number;
    image: File;
    address: {
        country: string,
        state: string,
        city: string
    };
    url: string;
    progress: number;
}