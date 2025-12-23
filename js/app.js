const recipes = [
  {
    title: "Bowl de Açaí Proteico",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
  },
  {
    title: "Frango Grelhado com Batata Doce",
    image: "https://images.unsplash.com/photo-1604908177522-9373c5d8c8e1"
  },
  {
    title: "Omelete de Claras Fitness",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8"
  },
  {
    title: "Panqueca Proteica",
    image: "https://images.unsplash.com/photo-1584270354949-c26b0d5a41fd"
  }
];

const grid = document.getElementById("recipes");

recipes.forEach(r => {
  const card = document.createElement("div");
  card.className = "recipe-card";
  card.innerHTML = `
    <img src="${r.image}" alt="${r.title}">
    <h3>${r.title}</h3>
  `;
  grid.appendChild(card);
});

document.querySelector(".btn-premium").onclick = () => {
  document.getElementById("premiumModal").classList.remove("hidden");
};

document.querySelector(".btn-secondary").onclick = () => {
  document.getElementById("premiumModal").classList.add("hidden");
};
