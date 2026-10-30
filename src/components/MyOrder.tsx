import React, { useState, useEffect, useRef } from 'react';
import { MenuItem, OrderItem, Translations } from '../types';
import { categories } from '../data/menuData';
import MenuItemCard from './MenuItemCard';
import './MyOrder.css';

interface MyOrderProps {
    items: OrderItem[];
    isOpen: boolean;
    onClose: () => void;
    onIncreaseQuantity: (itemId: string) => void;
    onDecreaseQuantity: (itemId: string) => void;
    onClearAll: () => void;
    t: Translations;
    onPreviewImage: (item: MenuItem) => void;
}

const MyOrder: React.FC<MyOrderProps> = ({
    items,
    isOpen,
    onClose,
    onIncreaseQuantity,
    onDecreaseQuantity,
    onClearAll,
    t,
    onPreviewImage
}) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isAnimateIn, setIsAnimateIn] = useState(false);
    const totalPrice = items.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    // Sync native <dialog> state with isOpen and trigger entry animation
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            if (!dialog.open) {
                dialog.showModal();
            }
            // Ensure the initial closed transform is painted before transitioning in
            const raf = requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsAnimateIn(true);
                });
            });
            return () => cancelAnimationFrame(raf);
        } else {
            setIsAnimateIn(false);
            if (dialog.open) {
                const timer = setTimeout(() => {
                    dialog.close();
                }, 400);
                return () => clearTimeout(timer);
            }
        }
    }, [isOpen]);

    // Prevent body scroll when panel is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <dialog
            ref={dialogRef}
            className={`my-order ${isAnimateIn ? 'open' : ''}`}
            onClick={(e) => {
                if (e.target === dialogRef.current) {
                    onClose();
                }
            }}
            onCancel={(e) => {
                e.preventDefault();
                onClose();
            }}
            aria-label={t.myOrder}
        >
            <div className="order-header">
                    <div className="order-title-section">
                        <h2 className="order-title">{t.myOrder}</h2>
                        {totalItems > 0 && (
                            <span className="item-count">
                                {totalItems} {totalItems === 1 ? t.item : t.items}
                            </span>
                        )}
                    </div>
                </div>

                <div className="order-content">
                    {items.length === 0 ? (
                        <div className="empty-order">
                            <p className="empty-text">{t.emptyOrder}</p>
                            <p className="empty-subtext">{t.emptyOrderSubtext}</p>
                        </div>
                    ) : (
                        <div className="order-items">
                            {categories.map(category => {
                                const categoryItems = items.filter(item => item.menuItem.category === category.id);
                                if (categoryItems.length === 0) return null;

                                return (
                                    <div key={category.id} className="order-category-group">
                                        <h3 className="order-category-title">
                                            {t.categories[category.id] || category.name}
                                        </h3>
                                        <div className="category-items-list">
                                            {categoryItems.map((item) => (
                                                <MenuItemCard
                                                    key={item.menuItem.id}
                                                    item={item.menuItem}
                                                    quantity={item.quantity}
                                                    onAdd={(menuItem) => onIncreaseQuantity(menuItem.id)}
                                                    onRemove={(menuItem) => onDecreaseQuantity(menuItem.id)}
                                                    t={t}
                                                    onPreviewImage={onPreviewImage}
                                                    enableBasket={true}
                                                    inBasket={true}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="order-footer">
                        <div className="footer-actions">
                            <button className="clear-all-btn" onClick={onClearAll}>
                                {t.clearAll}
                            </button>
                            <div className="order-total">
                                <span className="total-amount">{totalPrice.toFixed(2)} €</span>
                            </div>
                        </div>
                    </div>
                )}
        </dialog>
    );
};

export default MyOrder;
