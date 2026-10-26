import { useState, useEffect } from 'react';
import CategoryFilter from './components/CategoryFilter';
import MenuItemCard from './components/MenuItemCard';
import MyOrder from './components/MyOrder';
import LanguageSwitcher from './components/LanguageSwitcher';
import { categories, menuItems } from './data/menuData';
import { translations } from './data/translations';
import { appConfig } from './data/config';
import { MenuItem, OrderItem, Language } from './types';
import './App.css';

function App() {
    const [categoryVisibility, setCategoryVisibility] = useState<Record<string, number>>({});
    const [orderItems, setOrderItems] = useState<OrderItem[]>(() => {
        if (!appConfig.enableBasket) return [];

        try {
            const savedOrder = localStorage.getItem('restaurant-menu-order');
            if (!savedOrder) return [];

            const parsedOrder = JSON.parse(savedOrder) as { id: string; quantity: number }[];

            // Re-hydrate order items using fresh data from menuItems
            // This ensures we don't have stale prices/names and filters out removed items
            const hydratedOrder: OrderItem[] = parsedOrder
                .reduce((acc: OrderItem[], savedItem) => {
                    const freshMenuItem = menuItems.find(item => item.id === savedItem.id);
                    if (freshMenuItem) {
                        acc.push({
                            menuItem: freshMenuItem,
                            quantity: savedItem.quantity
                        });
                    }
                    return acc;
                }, []);

            return hydratedOrder;
        } catch (error) {
            console.error('Failed to parse saved order:', error);
            return [];
        }
    });
    const [isOrderOpen, setIsOrderOpen] = useState(false);
    const [language, setLanguage] = useState<Language>(() => {
        const savedLanguage = localStorage.getItem('restaurant-menu-language');
        return (savedLanguage as Language) || 'el';
    });
    const [viewingImage, setViewingImage] = useState<{ url: string; title: string; } | null>(null);

    const handlePreviewImage = (url: string | null, title?: string) => {
        if (url) {
            setViewingImage({ url, title: title || '' });
        } else {
            setViewingImage(null);
        }
    };

    // Prevent scrolling and listen for Escape key when image preview is open
    useEffect(() => {
        if (viewingImage) {
            document.body.style.overflow = 'hidden';
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    setViewingImage(null);
                }
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                document.body.style.overflow = '';
                window.removeEventListener('keydown', handleKeyDown);
            };
        } else {
            document.body.style.overflow = '';
        }
    }, [viewingImage]);

    // Save only necessary data (ID and quantity) to version control the order
    useEffect(() => {
        if (!appConfig.enableBasket) return;

        const orderToSave = orderItems.map(item => ({
            id: item.menuItem.id,
            quantity: item.quantity
        }));
        localStorage.setItem('restaurant-menu-order', JSON.stringify(orderToSave));
    }, [orderItems]);

    // Save language selection to localStorage
    useEffect(() => {
        localStorage.setItem('restaurant-menu-language', language);
    }, [language]);

    useEffect(() => {
        const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--theme-color').trim();
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="10" y="10" width="80" height="80" rx="20" ry="20" fill="${themeColor}"/><text x="50" y="65" font-size="50" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-weight="bold">M</text></svg>`;
        const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
        if (link) {
            link.href = `data:image/svg+xml;base64,${btoa(svg)}`;
        }
    }, [language]);

    // Calculate visibility percentage for each section
    useEffect(() => {
        const handleScroll = () => {
            const visibilityMap: Record<string, number> = {};

            // Get dynamic heights of obstructive elements
            const navElement = document.querySelector('.sticky-nav');
            const bottomElement = document.querySelector('.bottom-container');

            const navRect = navElement?.getBoundingClientRect();
            const bottomRect = bottomElement?.getBoundingClientRect();

            // The top obscuring line is the bottom of the nav (whether sticky or not)
            const topObscured = navRect ? navRect.bottom : 0;
            // The bottom obscuring line is the top of the bottom container
            const bottomObscured = bottomRect ? window.innerHeight - bottomRect.height : window.innerHeight;

            // Calculate effective available viewport height for content
            const availableViewportHeight = bottomObscured - topObscured;

            categories.forEach(cat => {
                const element = document.getElementById(`category-${cat.id}`);
                if (!element) {
                    visibilityMap[cat.id] = 0;
                    return;
                }

                const rect = element.getBoundingClientRect();

                // Calculate overlap between the element and the available viewport
                const visibleTop = Math.max(topObscured, rect.top);
                const visibleBottom = Math.min(bottomObscured, rect.bottom);
                const visibleHeight = Math.max(0, visibleBottom - visibleTop);

                // Calculate percentage:
                // We compare the visible height to two things:
                // 1. The element's total height (how much of the element is seen)
                // 2. The available viewport height (how much of the screen it takes up)
                // We take the max of these ratios to determine "active" status.
                // Actually, the previous logic used min(available, rect.height) as denominator.
                // If an element is taller than the viewport, and fills the viewport, it should be 1.0.

                const referenceHeight = Math.min(availableViewportHeight, rect.height);
                const visibilityPercent = referenceHeight > 0 ? Math.min(1, visibleHeight / referenceHeight) : 0;

                visibilityMap[cat.id] = visibilityPercent;
            });

            setCategoryVisibility(visibilityMap);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [categories, appConfig.enableBasket]);

    const t = translations[language];

    // Update document title based on current language
    useEffect(() => {
        document.title = `${t.restaurantName} ${t.menu} · ${t.restaurantType}`;
    }, [language, t]);

    const addItemToOrder = (item: MenuItem) => {
        setOrderItems(prev => {
            const existingItem = prev.find(orderItem => orderItem.menuItem.id === item.id);
            if (existingItem) {
                return prev.map(orderItem =>
                    orderItem.menuItem.id === item.id
                        ? { ...orderItem, quantity: orderItem.quantity + 1 }
                        : orderItem
                );
            } else {
                return [...prev, { menuItem: item, quantity: 1 }];
            }
        });
    };

    const removeItemFromOrder = (item: MenuItem) => {
        setOrderItems(prev => {
            const existingItem = prev.find(orderItem => orderItem.menuItem.id === item.id);
            if (!existingItem) return prev;

            if (existingItem.quantity === 1) {
                return prev.filter(orderItem => orderItem.menuItem.id !== item.id);
            } else {
                return prev.map(orderItem =>
                    orderItem.menuItem.id === item.id
                        ? { ...orderItem, quantity: orderItem.quantity - 1 }
                        : orderItem
                );
            }
        });
    };

    const increaseQuantity = (itemId: string) => {
        setOrderItems(prev =>
            prev.map(orderItem =>
                orderItem.menuItem.id === itemId
                    ? { ...orderItem, quantity: orderItem.quantity + 1 }
                    : orderItem
            )
        );
    };

    const decreaseQuantity = (itemId: string) => {
        setOrderItems(prev => {
            const item = prev.find(orderItem => orderItem.menuItem.id === itemId);
            if (!item) return prev;

            if (item.quantity === 1) {
                return prev.filter(orderItem => orderItem.menuItem.id !== itemId);
            } else {
                return prev.map(orderItem =>
                    orderItem.menuItem.id === itemId
                        ? { ...orderItem, quantity: orderItem.quantity - 1 }
                        : orderItem
                );
            }
        });
    };

    const clearAllItems = () => {
        setOrderItems([]);
    };

    const getItemQuantity = (item: MenuItem) => {
        const orderItem = orderItems.find(orderItem => orderItem.menuItem.id === item.id);
        return orderItem ? orderItem.quantity : 0;
    };

    const totalItemCount = orderItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className={`app ${appConfig.enableBasket ? 'has-basket' : 'no-basket'}`}>
            {/* Restaurant Title */}
            <div className="restaurant-header">
                <div className="restaurant-title-section">
                    <h1 className="restaurant-name">{t.restaurantName}</h1>
                    <p className="restaurant-type">{t.restaurantType}</p>
                </div>
                <LanguageSwitcher currentLanguage={language} onLanguageChange={setLanguage} />
            </div>

            {/* Category Navigation */}
            <div className="sticky-nav">
                <CategoryFilter
                    categories={categories}
                    categoryVisibility={categoryVisibility}
                    t={t}
                />
            </div>

            {/* Menu Grid */}
            <main className="menu-container">
                {/* Always render all categories */}
                {categories.map(category => {
                    const categoryItems = menuItems.filter(item => item.category === category.id);
                    if (categoryItems.length === 0) return null;

                    return (
                        <div key={category.id} id={`category-${category.id}`} className="menu-section">
                            <h2 className="section-title">
                                {t.categories[category.id] || category.name}
                            </h2>
                            <div className="menu-grid">
                                {categoryItems.map((item) => (
                                    <MenuItemCard
                                        key={item.id}
                                        item={item}
                                        quantity={getItemQuantity(item)}
                                        onAdd={addItemToOrder}
                                        onRemove={removeItemFromOrder}
                                        t={t}
                                        onPreviewImage={handlePreviewImage}
                                        enableBasket={appConfig.enableBasket}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}

            </main>

            {/* Fixed Bottom Container - shows empty message or order button (only when basket is enabled) */}
            {appConfig.enableBasket && (
                <div className="bottom-container">
                    {totalItemCount === 0 ? (
                        <div className="empty-order-message">
                            <p>{t.emptyOrder}</p>
                        </div>
                    ) : (
                        <button className="order-btn" onClick={() => setIsOrderOpen(true)}>
                            <span>{t.myOrder}</span>
                            <span className="order-badge">{totalItemCount}</span>
                        </button>
                    )}
                </div>
            )}

            {/* Order Panel (only when basket is enabled) */}
            {appConfig.enableBasket && (
                <MyOrder
                    items={orderItems}
                    isOpen={isOrderOpen}
                    onClose={() => setIsOrderOpen(false)}
                    onIncreaseQuantity={increaseQuantity}
                    onDecreaseQuantity={decreaseQuantity}
                    onClearAll={clearAllItems}
                    t={t}
                    onPreviewImage={handlePreviewImage}
                />
            )}

            {/* Image Preview Modal */}
            {viewingImage && (
                <div className="image-preview-backdrop" onClick={() => setViewingImage(null)}>
                    <div className="image-preview-container" onClick={(e) => e.stopPropagation()}>
                        <img src={viewingImage.url} alt={viewingImage.title} className="preview-image" />
                        <div className="preview-title">{viewingImage.title}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
