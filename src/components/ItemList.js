const ItemList = ({ items, onDelete, onUpdate, setEditingItem }) => {
    return (
        <ul>
            {items.map((item) => (
                <li key={item.id}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <button onClick={() => setEditingItem(item)}>Edit</button>
                    <button onClick={() => onDelete(item.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default ItemList;
