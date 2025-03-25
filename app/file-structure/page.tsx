'use client';

import { useState } from "react";
import explorer from "@/app/data/folderData";
import Folder from "@/app/components/FileStructure/Folder";
import useTraverseTree from "@/app/hooks/FileStructure/useTraverseTree";
export default function FileStructurePage() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode } = useTraverseTree();

  const handleAddFolder = (folderId: string, item: string, isFolder: boolean) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };
  
  return (
    <div className="p-8 w-[600px]">
      <h1 className="text-2xl font-bold mb-4">File Structure</h1>
      <Folder data={explorerData} onAddFolder={handleAddFolder}  />
    </div>
  );
}