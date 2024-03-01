const btnContainer = document.getElementById('btn-container'); 
const fetchCategories = () =>{
    const url = 'https://openapi.programming-hero.com/api/videos/categories'
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        data.data.forEach((card) =>{
            console.log(card)
            const newBtn = document.createElement('button')
            newBtn.className = 'btn btn-ghost bg-[#25252533] hover:bg-[#FF1F3D] text-black text-lg'
            newBtn.innerText = card.category
            btnContainer.appendChild(newBtn)
        })
    })
}
fetchCategories();