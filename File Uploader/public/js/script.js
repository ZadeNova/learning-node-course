function editFolder(e){
            
    document.getElementById('editfoldername').value = e.dataset.foldername
    
    const editFolderForm = document.getElementById('editFolderForm');
    editFolderForm.action = `/folder/edit/${e.dataset.folderid}`;
    
    
   
    
}

function deleteFolder(e){

    console.log(e.dataset.folderid);
    fetch(`/folder/delete/${e.dataset.folderid}`,{method:"DELETE"}).then((response) => response.json()).then(window.location.reload());
    
}