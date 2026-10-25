import React from 'react';
import { MenuItem, Translations } from '../types';
import './MenuItemCard.css';

interface MenuItemCardProps {
    item: MenuItem;
    quantity: number;
    onAdd: (item: MenuItem) => void;
    onRemove: (item: MenuItem) => void;
    t: Translations;
    onPreviewImage: (url: string | null, title?: string) => void;
    enableBasket: boolean;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
    item,
    quantity,
    onAdd,
    onRemove,
    t,
    onPreviewImage,
    enableBasket
}) => {
    return (
        <div className={`menu-card ${enableBasket && quantity > 0 ? 'in-order' : ''} ${!enableBasket ? 'view-only' : ''}`}>
            <div className="menu-card-content">
                <h3
                    className="menu-item-name"
                    onClick={() => item.image && onPreviewImage(item.image, t.menuItems[item.name])}
                    style={{ cursor: item.image ? 'pointer' : 'inherit' }}
                >
                    <span className="menu-item-title-text">{t.menuItems[item.name]}</span>
                    {item.image && (
                        <span className="image-icon-indicator" aria-label="View image">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                <polyline points="21 15 16 10 5 21"></polyline>
                            </svg>
                        </span>
                    )}
                </h3>

                <p className="menu-item-description">{t.menuItems[item.description]}</p>

                <div className="menu-card-footer">
                    <span className="menu-item-price">{item.price.toFixed(2)} €</span>

                    {enableBasket && (
                        quantity > 0 ? (
                            <div className="quantity-controls"
                                onMouseDown={(e) => e.stopPropagation()}
                                onTouchStart={(e) => e.stopPropagation()}
                            >
                                <button
                                    className="qty-btn minus"
                                    onClick={(e) => { e.stopPropagation(); onRemove(item); }}
                                    aria-label="Decrease quantity"
                                >
                                    −
                                </button>
                                <span className="qty-display">{quantity}</span>
                                <button
                                    className="qty-btn plus"
                                    onClick={(e) => { e.stopPropagation(); onAdd(item); }}
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>
                        ) : (
                            <button
                                className="add-btn"
                                onClick={(e) => { e.stopPropagation(); onAdd(item); }}
                                onMouseDown={(e) => e.stopPropagation()}
                                onTouchStart={(e) => e.stopPropagation()}
                                aria-label="Add to order"
                            >
                                {t.add}
                            </button>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default MenuItemCard;
