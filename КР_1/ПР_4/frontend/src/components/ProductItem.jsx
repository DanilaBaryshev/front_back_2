import React from 'react';

export default function ProductItem({ product, onEdit, onDelete }) {
  return (
    <div className="productRow">
      <div className="productMain">
        <div className="productId">#{product.id}</div>
        <div className="productInfo">
          <div className="productName">{product.name}</div>
          <div className="productMeta">
            <span className="productCategory">{product.category}</span>
            <span className="productDesc">{product.description}</span>
          </div>
        </div>
        <div className="productPrice">{product.price.toLocaleString('ru-RU')} ₽</div>
        <div className="productStock">Склад: {product.stock} шт.</div>
      </div>
      <div className="productActions">
        <button className="btn" onClick={() => onEdit(product)}>
          Редактировать
        </button>
        <button className="btn btn--danger" onClick={() => onDelete(product.id)}>
          Удалить
        </button>
      </div>
    </div>
  );
}
