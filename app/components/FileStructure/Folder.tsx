'use client';

import { useState } from 'react';

interface FolderProps {
  data: {
    id: string;
    name: string;
    isFolder: boolean;
    isRoot?:boolean;
    items?: FolderProps['data'][];
  };
  onAddFolder: (id: string, item: string, isFolder: boolean) => void;
  handleDeleteFolder: (itemId: string) => void;
  handleUpdateItem: (itemId: string, itemName: string) => void;
}

const Folder: React.FC<FolderProps> = ({ data, onAddFolder, handleDeleteFolder, handleUpdateItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showEditInput,setShowEditInput] = useState({
    visible:false,
    isFolder:false
  })
  const [editValue, setEditValue] = useState(data.name);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });

  const handleNewChild = (e: React.MouseEvent<HTMLButtonElement>, isFolder: boolean) => {
    e.stopPropagation();
    setIsOpen(true);
    setShowInput({
      visible: true,
      isFolder: isFolder,
    });
  }

  const onAddNewFolder = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter' && e.currentTarget.value != '') {
      onAddFolder(data.id, e.currentTarget.value, showInput.isFolder);
      e.currentTarget.value = '';
      setShowInput({ visible: false, isFolder: false });
    }
  }

  const onDeleteItem = (e: React.MouseEvent<HTMLButtonElement>) =>{
    e.stopPropagation();
    handleDeleteFolder(data.id);
  }

  const handleEditChild = (e: React.MouseEvent<HTMLButtonElement>,isFolder:boolean) =>{
    e.stopPropagation();
    setShowEditInput({
      visible:true,
      isFolder:isFolder
    })
    setEditValue(data.name)
  }

  const onEditFolder = (e: React.KeyboardEvent<HTMLInputElement>) =>{
    if(e.key === 'Enter' && e.currentTarget.value != '') {
      handleUpdateItem(data.id, e.currentTarget.value);
      e.currentTarget.value = '';
      setShowEditInput({ visible: false, isFolder: false });
    }
  }


  if (!data.isFolder) {
    return (
      <div className="flex items-center justify-between gap-2 p-1">
        <div><span>📄</span>
        <span>{(showEditInput.visible && !showEditInput.isFolder) ?
          <input value={editValue} 
              autoFocus 
              onBlur={() => setShowEditInput({ visible: false, isFolder: false })}
              onKeyDown={onEditFolder}
              onChange={(e)=>setEditValue(e.target.value)}
          />:`${data.name}`}</span></div>
        <div className='flex gap-2'>
          <button onClick={onDeleteItem}>🗑️</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={(e) => handleEditChild(e, false)}>🖋️ Edit</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div 
        className="flex items-center justify-between gap-2 p-1 cursor-pointer hover:bg-gray-100 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div><span>{isOpen ? '📂 ' : '📁 '}</span>
        <span>{showEditInput.visible && showEditInput.isFolder ?
          <input 
              value={editValue} 
              autoFocus 
              onChange={(e)=>setEditValue(e.target.value)}
              onBlur={() => setShowEditInput({ visible: false, isFolder: false })}
              onKeyDown={onEditFolder}/>:`${data.name}`}</span></div>
        <div className='flex gap-2'>
          {!data.isRoot && <button onClick={onDeleteItem}>🗑️</button>}
          <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={(e) => handleEditChild(e, true)}>🖋️ Edit</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={(e) => handleNewChild(e, true)}>+ Folder</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={(e) => handleNewChild(e, false)}>+ File</button>
        </div>
      </div>
      {isOpen && (
        <div className="ml-4">
          {showInput.visible && (
            <div className="flex items-center gap-2">
              {showInput.isFolder?'📁':'📄'}
              <input type="text" className="border border-gray-300 rounded p-1" 
              autoFocus 
              onBlur={() => setShowInput({ visible: false, isFolder: false })}
              onKeyDown={onAddNewFolder}/>
            </div>
          )}
          {data.items?.map((item) => (
            <Folder 
              key={item.id} 
              data={item} 
              onAddFolder={onAddFolder} 
              handleDeleteFolder={handleDeleteFolder}
              handleUpdateItem={handleUpdateItem} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Folder; 