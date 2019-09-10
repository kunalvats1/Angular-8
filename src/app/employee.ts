export class employee {
    key: string;
    image: File;
    firstName: string;
    lastName: string;
    email: string;
    url: string;
    totalPrice: number;
    address: {
        country: string,
        state: string,
        city: string
    }
    location: {
        latitude: string,
        longitude: string,
    };
    order: [{
        category: string,
        product: string,
        quantity: number;
        price: number
    }];
}