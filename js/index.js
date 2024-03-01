const btnContainer = document.getElementById('btn-container');
const cardContainer = document.getElementById('card-container');
const errorEl = document.getElementById('error-element');
const sortBtn = document.getElementById('sort-btn');

let selectedCategory = 1000;
let sortByView = false;


const handleSort = () =>{
    console.log("click");
    sortByView = true;
    fetchDataByCategories(selectedCategory, sortByView)
}

const fetchCategories = () =>{
    const url = 'https://openapi.programming-hero.com/api/videos/categories'
    fetch(url)
    .then((res) => res.json())
    .then(({data}) => {
        data.forEach((card) =>{
            console.log(card)
            const newBtn = document.createElement('button')
            newBtn.className = 'category-btn btn btn-ghost bg-[#25252533] hover:bg-[#FF1F3D] text-black text-lg'
            newBtn.innerText = card.category
            newBtn.addEventListener('click', () => {
                fetchDataByCategories(card.category_id)
                const allBtns = document.querySelectorAll('.category-btn')
                for(const btn of allBtns){
                    btn.classList.remove('bg-yellow-500')
                }
                newBtn.classList.add('bg-yellow-500')
            })
            btnContainer.appendChild(newBtn)
        })
    })
}

const fetchDataByCategories = (categoryId, sortByView) =>{
    selectedCategory = categoryId;
    const url = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    fetch(url)
    .then((res) => res.json())
    .then(({data}) => {

        if(sortByView) {
            data.sort((a, b) => {
                const totalViewsStrFirst = a.others?.views;
                const totalViewsStrSecond = b.others?.views;
                const totalViewFirstNumber = parseFloat(totalViewsStrFirst.replace("K", '')) || 0;
                const totalViewSecondNumber = parseFloat(totalViewsStrSecond.replace("K", '')) || 0;
                return totalViewSecondNumber - totalViewFirstNumber;
            })
        }

        if(data.length === 0){
            errorEl.classList.remove('hidden')
        } else{
            errorEl.classList.add('hidden')
        }
        cardContainer.innerHTML = ''
        data.forEach((video) =>{
            let verifiedBadge = ''
            if(video.authors[0].verified){
                verifiedBadge = `<img src="./images/right.png" alt="" class="w-5 h-5">`
            }
            // console.log(video)
            const newCard = document.createElement('div')
            newCard.innerHTML = `
            <div class="card card-compact w-full bg-base-100 shadow-xl">
                    <figure class="overflow-hidden h-72">
                        <img src="${video.thumbnail}" alt="Shoes" class = "w-full h-full"/>
                        <h6 class="absolute bottom-[40%] right-12">0 hr</h6>
                    </figure>
                    <div class="card-body">
                      <div class="flex space-x-4 justify-start items-start">
                            <div>
                                <img src="${video.authors[0].profile_picture}" alt="" class="w-12 h-12 rounded-full">
                            </div>
                            <div>
                                <h2 class="card-title">${video.title}</h2>
                                <div class="flex mt-3 gap-3">
                                  <span class="">${video.authors[0].profile_name}</span>
                                  ${verifiedBadge}
                                </div>
                                <p class="mt-3">${video.others.views}</p>
                            </div>
                      </div>
                    </div>
                </div>
            `
            cardContainer.appendChild(newCard);
        })
    })
}
fetchCategories();
fetchDataByCategories(selectedCategory, sortByView);