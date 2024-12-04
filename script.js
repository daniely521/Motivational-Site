//init functions 

async function loadLinks() { //load the links from the links.txt file
    try {
        const response = await fetch('links.txt');
        if (!response.ok) throw new Error('Failed to Load YT Links');
        const text = await response.text();
        return text
            .split('\n')
            .map(link => link.trim())
            .filter(link => link.startsWith('https://www.youtube.com/watch?v='));
    } catch (error) { //error if the links cannot be loaded
        console.error('Error loading links:', error);
        alert("Could not load links, please check links file");
        return [];
    }
}

function getEmbedUrl(videoLink) { //find each individual link
    try {
        const url = new URL(videoLink);
        const videoId = url.searchParams.get('v');
        if (!videoId) throw new Error('Invalid YT Link');
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } catch (error) { //cannot play the links error
        console.error('Error Parsing Video Link:', error);
        return null;
    }
}

function playRandomVideo(links) { //the random element of list
    if (links.length === 0) {
        alert('No valid video links');
        return;
    }
    const randomLink = links[Math.floor(Math.random() * links.length)];
    const embedUrl = getEmbedUrl(randomLink);

    if (embedUrl) { //emb url into the youtube player
        const iframe = document.getElementById('youtube-player');
        iframe.src = embedUrl;

        const skipButton = document.getElementById('skip-btn');
        skipButton.style.display = 'block';
        skipButton.onclick = () => playRandomVideo(links);
    } else{ //error if cannot generate the video
        console.error('Failed to generate Url for: ', randomLink);
        playRandomVideo(links);
    }
}


document.addEventListener('DOMContentLoaded', async () => { //init the code to run
    const links = await loadLinks();
    playRandomVideo(links);
});
