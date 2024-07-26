import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

const firebaseConfig = {};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fetchVideoData() {
  const videos = [];
  const snapshot = await getDocs(collection(db, "videos"));
  snapshot.forEach((doc) => {
    videos.push(doc.data());
  });
  return videos;
}

async function likeVideo(videoId) {
  const videoRef = doc(db, "videos", videoId);
  await runTransaction(async (transaction) => {
    const docSnap = await transaction.get(videoRef);
    if (!docSnap.exists()) {
      throw "El video no existe!";
    }
    const newLikes = (docSnap.data().likes || 0) + 1;
    transaction.update(videoRef, { likes: newLikes });
  });
}

function createVideoElement(videoData) {
  const { url, titleCredits, description, videoId } = videoData;

  const videoWrapper = document.createElement("div");
  videoWrapper.classList.add("video-wrapper");

  const videoElement = document.createElement("video");
  videoElement.src = url;
  videoElement.autoplay = true;
  videoElement.loop = true;
  videoElement.muted = true;

  const likeIcon = document.createElement("span");
  likeIcon.classList.add("like-icon");
  likeIcon.innerHTML = "❤️";

  const titleElement = document.createElement("div");
  titleElement.classList.add("video-title");
  titleElement.textContent = titleCredits;

  const descriptionIcon = document.createElement("span");
  descriptionIcon.classList.add("description-icon");
  descriptionIcon.innerHTML = "ℹ️";

  const descriptionCard = document.createElement("div");
  descriptionCard.classList.add("description-card");
  descriptionCard.innerHTML = description;

  videoElement.appendChild(likeIcon);
  videoElement.appendChild(titleElement);
  videoElement.appendChild(descriptionIcon);
  videoWrapper.appendChild(videoElement);
  videoWrapper.appendChild(descriptionCard);

  return { videoWrapper, likeIcon, descriptionIcon, descriptionCard, videoId };
}

function showLikeEffect() {
  const likeEffect = document.createElement("div");
  likeEffect.classList.add("like-effect");
  likeEffect.innerHTML = "❤️";
  document.body.appendChild(likeEffect);

  setTimeout(() => {
    likeEffect.classList.add("active");
    setTimeout(() => {
      likeEffect.classList.remove("active");
    }, 2000);
  }, 0);
}

function showDescriptionCard(descriptionCard) {
  descriptionCard.classList.add("show");
}

function hideDescriptionCard(descriptionCard) {
  descriptionCard.classList.remove("show");
}

function setupInteractions(
  videoElement,
  likeIcon,
  descriptionIcon,
  descriptionCard,
  videoId
) {
  videoElement.addEventListener("click", () => {
    likeVideo(videoId);
    showLikeEffect();
  });

  likeIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    likeVideo(videoId);
    showLikeEffect();
  });

  descriptionIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    showDescriptionCard(descriptionCard);
  });

  descriptionCard.addEventListener("click", (e) => {
    e.stopPropagation();
    hideDescriptionCard(descriptionCard);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const videoContainer = document.getElementById("video-container");
  const videoData = await fetchVideoData();

  videoData.forEach((video) => {
    const {
      videoWrapper,
      likeIcon,
      descriptionIcon,
      descriptionCard,
      videoId,
    } = createVideoElement(video);
    videoContainer.appendChild(videoWrapper);

    setupInteractions(
      videoWrapper.querySelector("video"),
      likeIcon,
      descriptionIcon,
      descriptionCard,
      videoId
    );
  });

  videoContainer.addEventListener("scroll", () => {
    if (
      videoContainer.scrollTop + videoContainer.clientHeight >=
      videoContainer.scrollHeight
    ) {
    }
  });
});
