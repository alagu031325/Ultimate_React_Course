export default function Item({ itemObj, onDeleteItem, onToggleItem }) {
  return (
    <li>
      {/* Should be a controlled element - value defined by some state - and has event handler that listens for a change and updates the state accordingly */}
      <input type='checkbox' value={itemObj.packed} onChange={() => { onToggleItem(itemObj.id); }} />
      <span style={itemObj.packed ? { textDecoration: 'line-through' } : {}}>{itemObj.description} {itemObj.quantity}</span>
      <button onClick={() => onDeleteItem(itemObj.id)}>❌</button>
    </li>
  );
}
