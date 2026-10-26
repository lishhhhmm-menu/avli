import React from 'react';
import { MenuItem, Translations } from '../types';
import './MenuItemCard.css';

interface MenuItemCardProps {
    item: MenuItem;
    quantity: number;
    onAdd: (item: MenuItem) => void;
    onRemove: (item: MenuItem) => void;
    t: Translations;
    onPreviewImage: (item: MenuItem) => void;
    enableBasket: boolean;
    inBasket?: boolean;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
    item,
    quantity,
    onAdd,
    onRemove,
    t,
    onPreviewImage,
    enableBasket,
    inBasket = false
}) => {
    const isCardInOrder = enableBasket && quantity > 0 && !inBasket;

    return (
        <div className={`menu-card ${isCardInOrder ? 'in-order' : ''} ${!enableBasket ? 'view-only' : ''} ${item.image ? 'has-image' : ''} ${inBasket ? 'in-basket' : ''}`}>
            <div className="menu-card-content">
                <h3 className="menu-item-name">
                    <span className="menu-item-title-text">{t.menuItems[item.name]}</span>
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
                                aria-label={t.add}
                            >
                                +
                            </button>
                        )
                    )}
                </div>
            </div>

            {item.image && (
                <div
                    className="menu-card-image-wrapper"
                    onClick={(e) => {
                        e.stopPropagation();
                        onPreviewImage(item);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            e.stopPropagation();
                            onPreviewImage(item);
                        }
                    }}
                    aria-label={`View photo of ${t.menuItems[item.name]}`}
                    title={t.menuItems[item.name]}
                >
                    <img
                        src={item.image}
                        alt={t.menuItems[item.name]}
                        className="menu-card-image"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
            )}
        </div>
    );
};

export default MenuItemCard;
