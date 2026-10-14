const repoList = document.querySelector(".repo-list");

export async function loadRepos() {
  repoList.textContent = "Loading...";

  try {
    const response = await fetch(
      "https://api.github.com/users/moronihouck/repos?sort=updated&per_page=6",
    );
    if (!response.ok) {
      throw new Error("请求失败：" + response.status);
    }
    const repos = await response.json();

    const cards = repos.map((repo) => {
      const card = document.createElement("a");
      card.className = "repo-card";
      card.href = repo.html_url;
      card.target = "_blank";

      const cardName = document.createElement("h4");
      cardName.textContent = repo.name;
      const cardDesc = document.createElement("p");
      cardDesc.textContent = repo.description || "No Desc";
      card.appendChild(cardName);
      card.appendChild(cardDesc);

      return card;
    });

    repoList.replaceChildren(...cards);
  } catch (error) {
    repoList.textContent = "Failed to load repos";
    console.error(error);
  }
}
