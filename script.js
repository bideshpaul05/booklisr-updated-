function getbook()
{
    let library
    if(localStorage.getItem('library')===null)
    {
         library=[];

    }
    else{
        library = JSON.parse(localStorage.getItem('library'))
    }
    console.log(library)
    
    return library;
}
function setbook(book)
{
    const books = getbook()
    books.push(book)
    
    localStorage.setItem('library',JSON.stringify(books))
}

function display()
{
    const myLibrary = getbook()
            
        
    const books = myLibrary
    books.forEach((book)=>createBox(book))
}



const container = document.querySelector('.container');

const add_book = document.querySelector('.add-book');
const new_book= document.querySelector('.New-book');
// console.log(new)

 const submitbtn = document.getElementById('submit');






submitbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const bookname = document.getElementById('bookName');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const checkbox = document.getElementById('gridCheck');
    var book = bookname.value
    
    var Author = author.value;
    var NumberofPages= pages.value;
    var Checked = checkbox.checked;
    if(book==='' || Author=== ''|| NumberofPages==='')
    {
        alert("fill up the form properly before submitting");
        return;
    }   
    var Book = {
        bookname : book,
        author: Author,
        Page: NumberofPages,
        Check: Checked,
        id: Date.now()
    }
     setbook(Book);

    bookname.value= "";
    author.value= "";
    pages.value= "";
    checkbox.checked= false;

    // console.log(library);

    alert("Book added to the library successfully!")
    location.reload()
    // display();
})
function split(s)
{
    const a =s.split(" ");
    return a[1];
}
function del(e)
{
    // console.log();
    var isbnText= e.target.parentElement.parentElement.childNodes[3].innerText;
    var isbn = split(isbnText);
    const books= getbook();
    isbn= JSON.parse(isbn)
    const newBooks = []
    books.forEach(i=>{
        if(i.id!==isbn) newBooks.push(i)
        console.log(i)
    })
    console.log(newBooks)

    localStorage.setItem('library',JSON.stringify(newBooks))
    location.reload()


}
function changeStatus(e)
{
  
    var isbnText= e.target.parentElement.parentElement.childNodes[3].innerText;
    var isbn = split(isbnText);
    const books= getbook();
    isbn= JSON.parse(isbn)
    books.forEach(i=>{
        if(i.id===isbn)
        {
            i.Check = !i.Check 
        }
    })
    console.log(books)
    localStorage.setItem('library',JSON.stringify(books))
    if(e.target.id==='done')
    {
        e.target.removeAttribute('id');
        e.target.setAttribute("id", "not_done");
        e.target.textContent = "yet to read"

        
        
    }
    else{
        e.target.removeAttribute('id');
        e.target.setAttribute("id", "done");
        e.target.textContent = "Already Done"
    }

}
function createBox(props)
{
    const box = document.createElement('div')
    box.classList.add('book');
    const Bookname = document.createElement('div')
    const Author = document.createElement('div')
    const pages= document.createElement('div')
    const readstatus = document.createElement('div')
    const Delete = document.createElement('div')
    const isbn = document.createElement('div')
    const icon = document.createElement('i')
    const DelBtn = document.createElement('button')
    const statusBtn = document.createElement('button')

    // const delete = document.createElement('div').classList.add('element')
    Bookname.classList.add('element')
    Bookname.classList.add('book-name')
    
    Author.classList.add('element')
    Author.classList.add('author')

    pages.classList.add('element')
    pages.classList.add('pages')

    isbn.classList.add('element')
    isbn.classList.add('isbn')

    readstatus.classList.add('element')
    readstatus.classList.add('read-status')

    Delete.classList.add('element');
    Delete.classList.add('delete');
    icon.classList.add('fa');
    icon.classList.add('fa-trash');
    DelBtn.setAttribute("id", "delete");
    


    Bookname.textContent =`Book:  ${props.bookname}`
    Author.textContent = `Author:  ${props.author}` 
    pages.textContent = `Pages:  ${props.Page}`
    isbn.textContent = `ISBN: ${props.id}`;
   

    if(props.Check)
    {
        statusBtn.setAttribute("id", "done");
        statusBtn.textContent ="Already Done"
    }
    else{
        statusBtn.setAttribute("id", "not_done");
        statusBtn.textContent = "yet to read"

    }
        statusBtn.addEventListener('click',(e)=>{
         
           
            changeStatus(e);
        })    
        DelBtn.addEventListener('click',(e)=>{
            del(e);
                });



    box.appendChild(Bookname)
    box.appendChild(Author)
    box.appendChild(pages)
    // box.appendChild(readstatus)
    // box.appendChild(Delete)
    box.appendChild(isbn)
    readstatus.appendChild(statusBtn)
    box.appendChild(readstatus)
    DelBtn.appendChild(icon)
    Delete.appendChild(DelBtn)
    box.appendChild(Delete)

   
    container.appendChild(box)
    

}

// console.log(library.length)


add_book.addEventListener("click",()=>{
    if(new_book.style.display=="block")
    {
        new_book.style.display="none";
    }
    else 
    new_book.style.display="block";
    console.log('clicked')
    
}) ;
// document.addEventListener('DOMContentLoaded',display()) 
display()