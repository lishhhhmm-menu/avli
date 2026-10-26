import React from 'react';
import { MenuItem, OrderItem, Translations } from '../types';
import MenuItemCard from './MenuItemCard';

interface OrderPanelItemProps {
    item: OrderItem;
    t: Translations;
    onIncrease: (id: string) => void;
    onDecrease: (id: string) => void;
    onPreviewImage: (item: MenuItem) => void;
}

const OrderPanelItem: React.FC<OrderPanelItemProps> = ({
    item,
    t,
    onIncrease,
    onDecrease,
    onPreviewImage
}) => {
    return (
        <MenuItemCard
            item={item.menuItem}
            quantity={item.quantity}
            onAdd={(menuItem) => onIncrease(menuItem.id)}
            onRemove={(menuItem) => onDecrease(menuItem.id)}
            t={t}
            onPreviewImage={onPreviewImage}
            enableBasket={true}
            inBasket={true}
        />
    );
};

export default OrderPanelItem;
