const useTraverseTree = () => {
  const insertNode = (tree, folderId, item, isFolder) => {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder: isFolder,
        items: [],
      });
      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((obj) => {
      return insertNode(obj, folderId, item, isFolder);
    });

    return { ...tree, items: latestNode };
  };

  const deleteNode = (tree, itemId) => {
    // If this is a folder, filter out the item with matching ID
    if (tree.isFolder) {
      const updatedItems = tree.items.filter((item) => item.id !== itemId);

      // If the number of items changed, it means we found and removed the item
      if (updatedItems.length !== tree.items.length) {
        return { ...tree, items: updatedItems };
      }

      // If not found, recursively search in child items
      const recursiveItems = tree.items.map((item) => deleteNode(item, itemId));
      return { ...tree, items: recursiveItems };
    }

    // For non-folder items, return the tree as is
    return tree;
  };

  const updateNode = (tree, itemId, itemName) => {
    if (tree.id === itemId) {
      return { ...tree, name: itemName };
    }

    let latestNode = [];
    latestNode = tree.items.map((obj) => {
      return updateNode(obj, itemId, itemName);
    });

    return { ...tree, items: latestNode };
  };

  return { insertNode, deleteNode, updateNode };
};

export default useTraverseTree;
