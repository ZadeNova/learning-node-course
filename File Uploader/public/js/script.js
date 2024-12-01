function editFolder(e){
            
    document.getElementById('editfoldername').value = e.dataset.foldername
    console.log(e.dataset.foldername)
    const editFolderForm = document.getElementById('editFolderForm');
    editFolderForm.action = `/folder/edit/${e.dataset.folderid}`;
    
}

function deleteFolder(e){

    if (confirm(`Delete ${e.dataset.folderid}`)){
        fetch(`/folder/delete/${e.dataset.folderid}`,{method:"DELETE"}).then((response) => response.json()).then(window.location.reload());
    }
    
}

function editFile(e){
    
    document.getElementById("editfilename").value = e.dataset.filename
    console.log(e.dataset.filename)
    const editFileForm = document.getElementById("editFileForm")
    
    editFileForm.action = `/file/edit/${e.dataset.fileid}`

}

function deleteFile(e){
    

    if (confirm(`Delete ${e.dataset.filename}`)){

        fetch(`/file/delete/${e.dataset.fileid}`,{method:"DELETE"}).then((response) => response.json()).then(window.location.reload());
    }
    

    
}

function downloadThis(e){

    fetch(`/file/download/${e.dataset.fileid}`,{method:"GET"}).then((response) => response.json());

}