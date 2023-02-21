let input = document.querySelector(".repos-container .input");
let getButton = document.querySelector(".repos-container .get-button");
let reposData = document.querySelector(".repos-container .show-data");

getButton.onclick = function () {
    getRepos();
};

function getRepos() {
    if (input.value == "") {
        reposData.innerHTML = "<span>Please Write Github Username.</span>";
    } else {
        fetch(`https://api.github.com/users/${input.value}/repos`)
            .then((response) => {
                return response.json();
            })
            .then((repos) => {
                reposData.innerHTML = "";

                repos.forEach((repo) => {
                    let mainDiv = document.createElement("div");

                    let repoName = document.createTextNode(repo.name);

                    mainDiv.appendChild(repoName);

                    let theUrl = document.createElement("a");

                    let theUrlText = document.createTextNode("Visit");

                    theUrl.appendChild(theUrlText);

                    theUrl.href = `https://github.com/${input.value}/${repo.name}`;

                    theUrl.setAttribute("target", "_blank");

                    mainDiv.appendChild(theUrl);
                    let starsSpan = document.createElement("span");

                    let StarsText = document.createTextNode(
                        `Stars ${repo.stargazers_count}`
                    );

                    starsSpan.appendChild(StarsText);

                    mainDiv.appendChild(starsSpan);

                    mainDiv.className = "repo-box";

                    reposData.appendChild(mainDiv);
                });
            });
    }
}
