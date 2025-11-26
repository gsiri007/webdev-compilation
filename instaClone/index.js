const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4
    },
    {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152
    }
];

const containerDiv = document.getElementById("container");

for (const post of posts) {
    containerDiv.innerHTML += `
    <section class="post-container">
        <div class="post-header">
            <img class="user-avatar" src="${post.avatar}" alt="profile picture">
            <div class="post-header-info">
                <h2 class="username">${post.name}</h2>
                <p class="location">${post.location}</p>
            </div>
        </div>
        <img class="post-img" src="${post.post}" alt="post-vangogh">
        <div class="post-controls">
            <button class="btn post-like-btn">
                <img src="./images/icon-heart.png" alt="like button">
            </button>
            <button class="btn post-comment-btn">
                <img src="./images/icon-comment.png" alt="comment button">
            </button>
            <button class="btn post-share-btn">
                <img src="./images/icon-dm.png" alt="share button">
            </button>
        </div>
        <p class="post-like-count">${post.likes} likes</p>
        <ul class="post-comments">
            <li class="comment"><span class="username">${post.username}</span> ${post.comment}</li>
        </ul>
    </section>
    `;

};

