'use client';

import { useState } from "react";
import explorer from "@/app/data/folderData";
import Folder from "@/app/components/FileStructure/Folder";
import useTraverseTree from "@/app/hooks/FileStructure/useTraverseTree";
export default function FileStructurePage() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode, deleteNode, updateNode } = useTraverseTree();

  const handleAddFolder = (folderId: string, item: string, isFolder: boolean) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  const handleDeleteFolder = (itemId: string) => {
    const finalTree = deleteNode(explorerData,itemId);
    setExplorerData(finalTree);
  };

  const handleUpdateItem = (itemId:String,itemName:string) =>{
    const finalTree = updateNode(explorerData,itemId,itemName);
    setExplorerData(finalTree);
  }
  
  return (
    <div className="p-8 w-[600px]">
      <h1 className="text-2xl font-bold mb-4">File Structure</h1>
      <Folder 
        data={explorerData} 
        onAddFolder={handleAddFolder} 
        handleDeleteFolder={handleDeleteFolder}
        handleUpdateItem={handleUpdateItem}  
      />
    </div>
  );
}