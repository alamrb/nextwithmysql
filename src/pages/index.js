import { useEffect, useState } from 'react';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';

const Home = () => {
    const [items, setItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch('/api/items');
            const data = await response.json();
            setItems(data);
        };
        fetchItems();
    }, []);

    const handleAddItem = async (item) => {
        const response = await fetch('/api/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
        });
        const newItem = await response.json();
        setItems([...items, newItem]);
    };

    const handleDeleteItem = async (id) => {
        await fetch(`/api/items/${id}`, { method: 'DELETE' });
        setItems(items.filter(item => item.id !== id));
    };

    const handleUpdateItem = async (item) => {
        const response = await fetch(`/api/items/${editingItem.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
        });
        const updatedItem = await response.json();
        setItems(items.map(i => (i.id === updatedItem.id ? updatedItem : i)));
        setEditingItem(null); // Reset editingItem after update
    };

    const handleFormSubmit = (item) => {
        if (editingItem) {
            handleUpdateItem(item); // Update the item if in editing mode
        } else {
            handleAddItem(item); // Add a new item if not editing
        }
    };

    return (
        <div>
            <h1>CRUD App</h1>
            <ItemForm onSubmit={handleFormSubmit} editingItem={editingItem} />
            <ItemList items={items} onDelete={handleDeleteItem} setEditingItem={setEditingItem} />
        </div>
    );
};

export default Home;
