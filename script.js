let count = 5;

const loadReviews = () => {
    fetch("reviews.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Response was not ok.")
            }
            return response.json();
        })
        .then(reviews => {
            for(let review of reviews) {
                createReviewElement(review);
            }
        })
        .catch(error => {
            console.error("An error occurred: ", error);
        })
}

const toggleLike = (id) => {
    const likeButton = document.getElementById("like-" + id);

    if (likeButton.dataset.liked === "false") {
        const words = likeButton.textContent.split(" ");
        let likes = Number(words[2]);

        likeButton.textContent = `unlike - ${likes + 1}`;
        likeButton.dataset.liked = "true";
    } else {
        const words = likeButton.textContent.split(" ");
        let likes = Number(words[2]);

        likeButton.textContent = `like - ${likes - 1}`;
        likeButton.dataset.liked = "false";
    }
}

const repostReview = (id) => {
    const repostButton = document.getElementById("repost-" + id);

    if (repostButton.dataset.reposted === "false") {
        const words = repostButton.textContent.split(" ");
        let reposts = Number(words[2]);

        repostButton.textContent = `unrepost - ${reposts + 1}`;
        repostButton.dataset.reposted = "true";
    } else {
        const words = repostButton.textContent.split(" ");
        let reposts = Number(words[2]);

        repostButton.textContent = `repost - ${reposts - 1}`;
        repostButton.dataset.reposted = "false";
    }
}

const handleReviewSubmit = () => {
    const newReviewData = {
        id: ++count,
        title: document.getElementById("book-title").value,
        reviewText: document.getElementById("review-text").value,
        rating: document.getElementById("rating").options[document.getElementById("rating").selectedIndex].value,
        likes: 0,
        reposts: 0
    };
    createReviewElement(newReviewData);
}

document.getElementById("review-form").addEventListener("submit", (event) => {
    event.preventDefault();
    handleReviewSubmit();
    event.target.reset();
})

const createReviewElement = (review) => {
    const newReview = document.createElement("div");
    newReview.className = "review-item";
    newReview.innerHTML = `
        <h3>${review.title}</h3>
        <p>${review.reviewText}</p>
        <h5>${review.rating}</h5>
        <button id="like-${review.id}" data-liked=false onclick="toggleLike(${review.id})">like - ${review.likes}</button>
        <button id="repost-${review.id}" data-reposted=false onclick="repostReview(${review.id})">repost - ${review.reposts}</button>
    `

    document.getElementById("reviews-list").appendChild(newReview);
}

window.addEventListener("DOMContentLoaded", loadReviews);