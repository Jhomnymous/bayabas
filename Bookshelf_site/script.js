function save() {
    const title = document.getElementById("inputBookTitle");
    const author = document.getElementById("inputBookAuthor");
    const year = document.getElementById("inputBookYear");
    const read = document.getElementById("inputBookisComplete");
    const bookId = document.getElementById("inputBookId");
    
    if (read.checked === true) {
        
        let id;
        
        let bookList = JSON.parse(localStorage.getItem("listItem3")) ?? [];
        bookList.length !== 0 ? bookList.findLast(item => id = item.id) : id = 0;
        
        if (parseInt(bookId.value)) {
            
            bookList.forEach(value => {
                
                if (parseInt(bookId.value) === value.id) {
                    
                    value.title = title.value;
                    value.author = author.value;
                    value.year = year.value;
                    value.isComplete = 1;
                    
                }
            });
            
            bookId.value = "";
            
        } else {
            
            let item = {
                id: id + 1,
                title: title.value,
                author: author.value,
                year: year.value,
                isComplete: 1
            };
            
            bookList.push(item);
        }
        
        localStorage.setItem("listItem3", JSON.stringify(bookList));
        
    } else {
        
        let id;
        
        let bookList2 = JSON.parse(localStorage.getItem("listItem4")) ?? [];
        bookList2.length !== 0 ? bookList2.findLast(item => id = item.id) : id = 0;
        
        if (parseInt(bookId.value)) {
            
            bookList2.forEach(value => {
                
                if (parseInt(bookId.value) === value.id) {
                    
                    value.title = title.value;
                    value.author = author.value;
                    value.year = year.value;
                    value.isComplete = 0;
                    
                }
            });
            
            bookId.value = "";
            
        } else {
            let item = {
                id: id + 1,
                title: title.value,
                author: author.value,
                year: year.value,
                isComplete: 0
            }
            bookList2.push(item);
        }
        
        localStorage.setItem("listItem4", JSON.stringify(bookList2));
    
    }
    
    allData();
    
    document.getElementById("form").reset();
}

function allData() {
    
    //Table for unread
    let table = document.getElementById("table");
    
    let bookList = JSON.parse(localStorage.getItem("listItem4")) ?? [];
    
    bookList.forEach((value, i) => {
        
        if (value.isComplete === 0) {
            
            const row = document.createElement("tr");
            
            row.innerHTML = `
                <tr>
                    <td>${i + 1}</td>
                    <td>${value.title}</td>
                    <td>${value.author}</td>
                    <td>${value.year}</td>
                    <td>
                        <button class="btn btn-sm btn-warning" onclick="read(${value.id}, '${value.title}', '${value.author}', '${value.year}')">
                            <i class='fa fa-check'></i>
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-success" onclick="find(${value.id})">
                            <i class='fa fa-edit'></i>
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-danger" onclick="removeData4(${value.id})">
                            <i class='fa fa-trash'></i>
                        </button>
                    </td>
                </tr>
            `;
            
            table.appendChild(row);
        }
        
    });
    
    //Table for read
    let table2 = document.getElementById("table2");
    
    let bookList2 = JSON.parse(localStorage.getItem("listItem3")) ?? [];
    
    bookList2.forEach((value2, i) => {
        
        if (value2.isComplete === 1) {
            
            const row2 = document.createElement("tr");
            
            row2.innerHTML = `
                <tr>
                    <td>${i + 1}</td>
                    <td>${value2.title}</td>
                    <td>${value2.author}</td>
                    <td>${value2.year}</td>
                    <td>
                        <button class="btn btn-sm btn-warning" onclick="read(${value2.id}, '${value2.title}', '${value2.author}', '${value2.year}')">
                            <i class='fa fa-check'></i>
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-success" onclick="find(${value2.id})">
                            <i class='fa fa-edit'></i>
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-danger" onclick="removeData3(${value2.id})">
                            <i class='fa fa-trash'></i>
                        </button>
                    </td>
                </tr>
            `;
            
            table2.appendChild(row2);
        }
        
    });
    
}

function removeData3(id) {
    let bookList = JSON.parse(localStorage.getItem("listItem3")) ?? [];
    
    bookList = bookList.filter(value => {
        
        return value.id !== id;
        
    });
    
    // localStorage.clear();
    localStorage.setItem('listItem3', JSON.stringify(bookList));
    
    allData();
}

function removeData4(id){
    let bookList = JSON.parse(localStorage.getItem('listItem4')) ?? [];
    
    bookList = bookList.filter(function(value){ 
        
        return value.id !== id;
        
    });
    
    localStorage.setItem('listItem4', JSON.stringify(bookList));
    
    allData();
}

function find(id) {
    
    let bookList = JSON.parse(localStorage.getItem('listItem4')) ?? [];
    
    bookList.forEach(value => {
        
        if (value.id === id) {
            
            document.getElementById('inputBookId').value = id;
            document.getElementById('inputBookTitle').value = value.title;
            document.getElementById('inputBookAuthor').value = value.author; 
            document.getElementById('inputBookYear').value = value.year;
            
        }
        
    });
    
    let bookList2 = JSON.parse(localStorage.getItem('listItem3')) ?? [];
    
    bookList2.forEach(value2 => {
        document.getElementById("inputBookisComplete").checked = true;
        
        if (value2.id === id) {
            
            document.getElementById('inputBookId').value = id;
            document.getElementById('inputBookTitle').value = value2.title;
            document.getElementById('inputBookAuthor').value = value2.author; 
            document.getElementById('inputBookYear').value = value2.year;
            
        }
        
    });
    
}

function read(id1, title1, author1, year1) {
    
    if (id1) {
        let item = [{
            id          : id1, 
            title       : title1, 
            author      : author1, 
            year        : year1, 
            isComplete  : 1,
        }];   
        
        let bookList = JSON.parse(localStorage.getItem('listItem3')) ?? [];
        let books = item.concat(bookList);
        let itemString = JSON.stringify(books);
        
        localStorage.setItem('listItem3', itemString);
    }
    
    let bookList4 = JSON.parse(localStorage.getItem('listItem4')) ?? [];
    bookList4 = bookList4.filter(value => {
        
        return value.id !== id1;
        
    });
    
    localStorage.setItem('listItem4', JSON.stringify(bookList4));
    
    allData();
}

function read2(id1, title1, author1, year1) {
    
    if (id1) {
        let item = [{
            id          : id1, 
            title       : title1, 
            author      : author1, 
            year        : year1, 
            isComplete  : 1,
        }];
        
        let bookList = JSON.parse(localStorage.getItem('listItem4')) ?? [];
        let books = item.concat(bookList);
        let itemString = JSON.stringify(books);
        
        localStorage.setItem('listItem4', itemString);
    }
    
    let bookList3 = JSON.parse(localStorage.getItem('listItem3')) ?? [];
    
    bookList3 = bookList3.filter(value => {
        
        return value.id !== id1;
        
    });
    
    localStorage.setItem('listItem3', JSON.stringify(bookList3));
    
    allData();
}

function clearData(){
    document.getElementById('form').reset();
};