const loadNewsPaper = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNewsPaper(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }

}
const displayNewsPaper = (newsPaper) => {
    const displayNews = document.getElementById('navBarUl');
    newsPaper.forEach(news => {
        const newsDiv = document.createElement('li');
        newsDiv.classList.add = ('nav-item');
        newsDiv.innerHTML = `
        <a onclick="loadPost('${news.category_id}')" class="nav-link active" aria-current="page" href="#"> ${news.category_name}</a>
        `;
        displayNews.appendChild(newsDiv);
    });
}





const loadPost = async (id) => {
//   ai khane id diye hpoiche
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayPost(data.data);
    }
    catch (error) {
        console.log(error);
    }
}

// post gula add
const displayPost = posts => {

    const postContainer = document.getElementById('post-container');
    postContainer.textContent = "";


    posts.sort((a, b) => {
        return b.total_view - a.total_view
    })

    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add("row", "m-3", "card-div");
        postDiv.innerHTML = `
                    <div class="col-md-4">
                        <img class="img-fluid w-100" src="${post.thumbnail_url ? post.thumbnail_url : 'No Thumbnil  '}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8 text-center">
                        <div class="card-body">
                            <h5 class="card-title c-title">${post.title ? post.title : 'No titile  '}</h5>
                            <p class="card-text c-text">${post.details ? post.details.slice(0, 150) : 'No Details  '}..</p>
                        </div>

                      <div class="d-flex flex-column flex-md-row px-5  justify-content-center align-items-center ">
                         
                         <div class="d-flex justify-content-center align-items-center" >                           
                               <div class="d-flex flex-column flex-md-row justify-content-center align-items-center p-5">
                                    <div><img class="author-image" style="width:50px; height: 50px" src="${post.author.img ? post.author.img : 'No image  '}" alt=""></div>
                                    <div><span class="ps-2">${post.author.name ? post.author.name : "Not author  "}</span></div>
                                </div>
                                <div class="d-flex justify-content-center align-items-center">
                                    <div>
                                        <li class="list-unstyled me-3">
                                            <i class="fa-regular fa-eye"></i> ${post.total_view ? post.total_view : "No viewer  "}
                                        </li>
                                    </div>
                                </div>
                            </div>
                            <div> 
                                <button  onclick = "modalPost('${post._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                        
                             </div>

                      </div>
                    </div>

        `
        postContainer.appendChild(postDiv);
    });

}






const modalPost = async (_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${_id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayModal(data.data[0]);
    }
    catch (error) {
        console.log(error);
    }
}


const displayModal = modals => {

    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = modals.title ? modals.title : 'no title  ';
    const modalDetails = document.getElementById('modal-details');
    modalDetails.innerHTML = `
    <img class="img-fluid w-100" src="${modals.image_url ? modals.image_url : 'No Image  '}" alt="">
    <p class="t-details"> <span class="bold" >Details:</span> ${modals.details ? modals.details : 'No Deatils  '}</p>
    `
}
loadPost();
loadNewsPaper();
// modalPost();