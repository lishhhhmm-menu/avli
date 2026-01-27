import { Translations } from '../types';
import { unifiedMenuItems, unifiedCategories } from './unifiedMenuData';

const generateMenuItemsTranslations = (lang: 'en' | 'el' | 'it') => {
    const itemsMap: Record<string, string> = {};
    unifiedMenuItems.forEach(item => {
        itemsMap[item.id] = item.translations[lang].name;
        itemsMap[`${item.id}-desc`] = item.translations[lang].description;
    });
    return itemsMap;
};

const generateCategoryTranslations = (lang: 'en' | 'el' | 'it') => {
    const categoriesMap: Record<string, string> = {};
    unifiedCategories.forEach(cat => {
        categoriesMap[cat.id] = cat.translations[lang].name;
    });
    return categoriesMap;
};

export const translations: Record<string, Translations> = {
    en: {
        restaurantName: 'Avli',
        restaurantTagline: 'Browse our menu and prepare your order',
        restaurantType: 'All Day Bar Restaurant',
        menu: 'Menu',
        myOrder: 'My Order',
        items: 'items',
        item: 'item',
        total: 'Total',
        clearAll: 'Clear All',
        remove: 'Remove',
        emptyOrder: 'Your order is empty',
        emptyOrderSubtext: 'Start adding items from the menu',
        orderNote: 'Ready to order? Show this list to your server',
        add: 'Add',
        added: 'Added',
        all: 'All',
        quantity: 'Qty',
        categories: {
            ...generateCategoryTranslations('en'),
        },
        dietary: {
            vegetarian: 'vegetarian',
            'gluten-free': 'gluten-free',
        },
        menuItems: generateMenuItemsTranslations('en'),
    },
    el: {
        restaurantName: 'Avli',
        restaurantTagline: 'Περιηγηθείτε στο μενού και ετοιμάστε την παραγγελία σας',
        restaurantType: 'Ολοήμερο Μπαρ Εστιατόριο',
        menu: 'Μενού',
        myOrder: 'Η Παραγγελία μου',
        items: 'είδη',
        item: 'είδος',
        total: 'Σύνολο',
        clearAll: 'Καθαρισμός Όλων',
        remove: 'Αφαίρεση',
        emptyOrder: 'Η παραγγελία σας είναι άδεια',
        emptyOrderSubtext: 'Ξεκινήστε να προσθέτετε είδη από το μενού',
        orderNote: 'Έτοιμοι να παραγγείλετε; Δείξτε τη λίστα στον σερβιτόρο',
        add: 'Προσθήκη',
        added: 'Προστέθηκε',
        all: 'Όλα',
        quantity: 'Ποσ.',
        categories: {
            ...generateCategoryTranslations('el'),
        },
        dietary: {
            vegetarian: 'χορτοφαγικό',
            'gluten-free': 'χωρίς γλουτένη',
        },
        menuItems: generateMenuItemsTranslations('el'),
    },
    it: {
        restaurantName: 'Avli',
        restaurantTagline: 'Sfoglia il nostro menu e prepara il tuo ordine',
        restaurantType: 'Ristorante Bar Tutto Il Giorno',
        menu: 'Menu',
        myOrder: 'Il Mio Ordine',
        items: 'articoli',
        item: 'articolo',
        total: 'Totale',
        clearAll: 'Cancella Tutto',
        remove: 'Rimuovi',
        emptyOrder: 'Il tuo ordine è vuoto',
        emptyOrderSubtext: 'Inizia ad aggiungere articoli dal menu',
        orderNote: 'Pronto per ordinare? Mostra questo elenco al tuo cameriere',
        add: 'Aggiungi',
        added: 'Aggiunto',
        all: 'Tutti',
        quantity: 'Qtà',
        categories: {
            ...generateCategoryTranslations('it'),
        },
        dietary: {
            vegetarian: 'vegetariano',
            'gluten-free': 'senza glutine',
        },
        menuItems: generateMenuItemsTranslations('it'),
    },
};
