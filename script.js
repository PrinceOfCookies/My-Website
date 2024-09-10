const text = "I'm PrinceOfCookies";
const speed = 50; // Speed of typing in milliseconds
let i = 0;

function typeWriter() {
  if (i < text.length) {
    document.getElementById("typewriterText").textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

function moveLeft(element, targetX, onComplete) {
  const duration = 500; // 1 second
  const startX = parseInt(getComputedStyle(element).transform.split(',')[4]) || 0; // Get current X position
  const distance = targetX - startX;
  const startTime = performance.now();

  function animate(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1); // Ensure progress doesn't exceed 1
    const currentX = startX + (distance * progress);

    // Apply transformation to move the element
    if (typeof(targetX) === 'string') {
      element.style.transform = `translateX(${targetX})`;
    } else {
      element.style.transform = `translateX(${currentX}px)`;
    }

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      if (onComplete) onComplete(); // Call onComplete callback when animation finishes
    }
  }

  requestAnimationFrame(animate);
}

// Show Project Info
function showProjectInfo(project) {
  const projectInfo = document.getElementById('projectInfo');
  const container = document.querySelector('.content');
  const typeWriter = document.querySelector('.typewriter');
    console.log(project)
  const projectData = {
    tsCookieLang: {
      title: "TS-CookieLang",
      description: `TS-CookieLang is a TypeScript project where I explored creating a custom programming language. 
      The project involved designing syntax rules, parsing logic, and a basic interpreter. 
      Although unfinished, it provided valuable insights into language design and compiler theory.`,
      image: "public/ts-cookielang.png",
      link: "https://github.com/PrinceOfCookies/TS-CookieLang"
    },
    cookieOS: {
      title: "CookieOS",
      description: `CookieOS is a Minecraft mod for CC:Tweaked that enhances the in-game computer experience. 
      It replaces several base functions, adds new programs, and introduces a user-friendly UI. 
      The project aims to provide a more intuitive and powerful operating system within Minecraft.`,
      image: "public/cookieos.png",
      link: "https://github.com/PrinceOfCookies/CookieOS"
    },
    lowSodium: {
      title: "Low Sodium Hit System",
      description: `This is a private project developed for the Low Sodium Garry's Mod server. 
      The Hit System allows players to place and fulfill hits within the game, adding an exciting layer of interaction. 
      Feedback and suggestions are welcomed through our Discord community.`,
      image: "public/lowsodium.png",
      link: "https://discord.com/invite/BTjYMp3FWe"
    },
    skibidiware: {
      title: "Skibidiware",
      description: `Skibidiware is a personal project focused on learning and experimenting with new technologies and coding practices. 
      It's a sandbox for testing ideas and improving my development skills across different programming languages.`,
      image: "public/skibidiware.png",
      link: "#"
    },
    strw: {
        title: "Strawhat Remastered",
        description: `blahblah`,
        image: "public/strw.png",
        link: "https://github.com/PrinceOfCookies/StrwRemastered"
    }
  };

  const data = projectData[project];

  if (data) {
    // Move content off-screen
    const windowWidth = window.innerWidth;
    moveLeft(container, -windowWidth, () => {
      container.style.display = 'none';
      typeWriter.style.display = 'none';

      // Create the projectInfo container if it doesn't exist
      let projectInfo = document.getElementById('projectInfo');
      if (!projectInfo) {
        projectInfo = document.createElement('div');
        projectInfo.id = 'projectInfo';
        projectInfo.style.position = 'fixed';
        projectInfo.style.top = '50%';
        projectInfo.style.left = '50%';
        projectInfo.style.transform = 'translate(-50%, -50%)';
        projectInfo.style.backgroundColor = '#3d3d3d';
        projectInfo.style.color = '#fff';
        projectInfo.style.padding = '20px';
        projectInfo.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        projectInfo.style.zIndex = '1000';
        


        document.body.appendChild(projectInfo);
      }

      // Populate the projectInfo container
      projectInfo.innerHTML = `
        <h2>${data.title}</h2>
        <img src="${data.image}" alt="${data.title}" style="max-width: 100%;">
        <p>${data.description}</p>
        <a href="${data.link}" target="_blank"><button id="viewMore">Github</button></a>
        <button id="closeInfo">Close</button>
      `;
      
      // Show the projectInfo container
      projectInfo.style.display = 'block';
    });
  }
}

// Hide Project Info and restore the content
function hideProjectInfo() {
  const projectInfo = document.getElementById('projectInfo');
  const container = document.querySelector('.content');
  const typeWriter = document.querySelector('.typewriter');

  // Hide project info
  if (projectInfo) {
    projectInfo.style.display = 'none';
  }

  // Restore content and move it back to its original position
  container.style.display = 'block';
  typeWriter.style.display = 'block';

  moveLeft(container, 0); // Move back to its original position
  moveLeft(typeWriter, "-50");
}

// Close Info Panel when clicking the close button
document.body.addEventListener('click', function(e) {
  if (e.target.id === 'closeInfo') {
    hideProjectInfo();
  }
});

window.onload = typeWriter;
