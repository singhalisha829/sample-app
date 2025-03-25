'use client';

import { useState } from 'react';

interface FolderProps {
  data: {
    id: string;
    name: string;
    isFolder: boolean;
    items?: FolderProps['data'][];
  };
  onAddFolder: (id: string, item: string, isFolder: boolean) => void;
}

const Folder: React.FC<FolderProps> = ({ data, onAddFolder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });

  const handleNewChild = (e: React.MouseEvent<HTMLButtonElement>, isFolder: boolean) => {
    console.log('isFolder', isFolder);
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


  if (!data.isFolder) {
    return (
      <div className="flex items-center gap-2 p-1">
        <span>📄</span>
        <span>{data.name}</span>
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
        <span>{data.name}</span></div>
        <div className='flex gap-2'>
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
            <Folder key={item.id} data={item} onAddFolder={onAddFolder} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Folder; 