getCategory();
async function getCategory() {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();
    const categories = await data.data;
    bindCategory(categories);
    getData();
}

async function getData(categoryID = 1000) {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryID}`);
    const data = await response.json();
    const posts = await data.data;
    bindData(posts);
}

function bindCategory(categories) {
    // console.log(categories);
    const catagoryContainer = document.querySelector("#catagory-container");
    for (const category of categories) {
        const div = document.createElement("div");
        div.innerHTML = `<button onclick='getData(${category.category_id})' id="sort-btn"  class="btn btn-sm btn-active">${category.category}</button>`;
        catagoryContainer.appendChild(div);
    }
}

function bindData(posts) {
    // console.log(posts);
    const dataContainer = document.querySelector("#data-container");
    dataContainer.innerHTML = "";
    for (const post of posts) {
        // console.log();
        const div = document.createElement("div");
        div.innerHTML = ` 
        <div class="card">
            <img src="${post?.thumbnail}" class="rounded-xl h-48">
            <div class="py-4 flex gap-4">
                <img src="${post?.authors[0]?.profile_picture}" class="w-10 h-10 rounded-full">
                <div class="space-y-2">
                    <h1 class="text-lg font-bold">${post?.title}</h1>
                    <div>
                        <p class="text-sm text-[#171717B2]">${post?.authors[0]?.profile_name} <span>${post?.authors[0]?.verified ? '<i class="fa-solid fa-circle-check" style="color: #2568EF;"></i>' : ''}</span></p>                        
                    </div>
                    <p class="text-sm text-[#171717B2]">${post?.others?.views} views</p>
                </div>
            </div>
        </div>`;
        dataContainer.appendChild(div);
    }
}
