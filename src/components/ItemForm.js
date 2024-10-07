import { useState, useEffect } from 'react';

const ItemForm = ({ onSubmit, editingItem }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (editingItem) {
            setTitle(editingItem.title);
            setDescription(editingItem.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [editingItem]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description });
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Title" 
                required 
            />
            <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Description" 
                required 
            />
            <button type="submit">{editingItem ? 'Update Item' : 'Add Item'}</button>
        </form>
    );
};

export default ItemForm;
