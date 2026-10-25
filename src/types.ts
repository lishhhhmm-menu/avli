export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    dietary?: string[];
    spicyLevel?: number;
    image?: string;
}

export interface OrderItem {
    menuItem: MenuItem;
    quantity: number;
}

export type Category = {
    id: string;
    name: string;
    icon: string;
};

export type Language = 'en' | 'el' | 'it';

export interface AppConfig {
    enableBasket: boolean;
}

export interface Translations {
    restaurantName: string;
    restaurantTagline: string;
    restaurantType: string;
    menu: string;
    myOrder: string;
    items: string;
    item: string;
    total: string;
    clearAll: string;
    remove: string;
    emptyOrder: string;
    emptyOrderSubtext: string;
    orderNote: string;
    add: string;
    added: string;
    all: string;
    quantity: string;
    categories: {
        [key: string]: string;
    };
    dietary: {
        vegetarian: string;
        'gluten-free': string;
    };
    menuItems: {
        [key: string]: string;
    };
}
