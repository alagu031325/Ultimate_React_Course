import { useState } from "react";
import Item from './Item'

export default function PackingList({items, onDeleteItem, onToggleItem, onDeleteAllItems}){
    const [sortBy,setSortBy] = useState('input');//first option value by default 
  
    let sortedItems;
  
    if(sortBy === 'input'){
      sortedItems = items;
    }
    if(sortBy === 'description'){
      //since sort method mutates the original array first we need to make a copy of the original array using slice - since it is a string we use localCompare 
      sortedItems = items.slice().sort((a,b) => a.description.localeCompare(b.description))
    }
  
    if(sortBy === 'packed'){
      sortedItems = items.slice().sort((a,b) => Number(a.packed) - Number(b.packed))
    }
  
    return (
      <div className="list">
        <ul>
        {
          sortedItems.map(item => {
            return <Item itemObj={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} key={item.id}/>
          })
        }
        </ul>
        <div className="actions">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="input">Sort by input order</option>
            <option value="description">Sort by description</option>
            <option value="packed">Sort by packed status</option>
          </select>
          <button onClick={onDeleteAllItems}>Clear list</button>
        </div>
      </div>
    )
  }