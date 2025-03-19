document.addEventListener('DOMContentLoaded', () => {
  // Logo animation
  anime({
    targets: '.logo-path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 1500,
    delay: function(el, i) { return i * 250 },
    direction: 'alternate',
    loop: true
  });

  // Heart animation
  anime({
    targets: '.heart-path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 2000,
    delay: 300,
    loop: true
  });

  // Heart pulse animation
  anime({
    targets: '.heart-animation svg',
    scale: [1, 1.1, 1],
    duration: 1800,
    easing: 'easeInOutQuad',
    loop: true
  });

  // Hero title animation
  anime({
    targets: '.hero-title',
    opacity: [0, 1],
    translateY: [20, 0],
    easing: 'easeOutExpo',
    duration: 1200,
    delay: 800
  });

  // Hero subtitle animation
  anime({
    targets: '.hero-subtitle',
    opacity: [0, 1],
    translateY: [20, 0],
    easing: 'easeOutExpo',
    duration: 1200,
    delay: 1000
  });

  // Input container animation
  anime({
    targets: '.input-container',
    opacity: [0, 1],
    translateY: [20, 0],
    easing: 'easeOutExpo',
    duration: 1200,
    delay: 1200
  });

  // Demo box animation
  anime({
    targets: '.demo-box',
    opacity: [0, 1],
    translateY: [40, 0],
    easing: 'easeOutExpo',
    duration: 1200,
    delay: 1400
  });

  // Animation examples array
  const animationExamples = [
    {
      prompt: "Create a bouncing logo animation",
      execute: (demoLogo) => {
        // Bouncing animation
        anime.remove(demoLogo);
        return anime({
          targets: demoLogo,
          translateY: [-40, 0],
          duration: 1200,
          direction: 'alternate',
          loop: true,
          easing: 'easeInOutQuad',
          autoplay: true
        });
      }
    },
    {
      prompt: "Design a pulsing text effect",
      execute: (demoLogo) => {
        anime.remove(demoLogo);
        return anime({
          targets: demoLogo,
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
          background: [
            'linear-gradient(90deg, #FF6CAB 0%, #7366FF 100%)',
            'linear-gradient(90deg, #7366FF 0%, #FF6CAB 100%)',
            'linear-gradient(90deg, #FF6CAB 0%, #7366FF 100%)'
          ],
          duration: 1800,
          easing: 'easeInOutSine',
          loop: true,
          autoplay: true
        });
      }
    },
    {
      prompt: "Make the logo rotate in 3D",
      execute: (demoLogo) => {
        anime.remove(demoLogo);
        return anime({
          targets: demoLogo,
          rotateY: ['0deg', '360deg'],
          duration: 3000,
          easing: 'easeInOutSine',
          loop: true,
          autoplay: true
        });
      }
    },
    {
      prompt: "Create a typing effect for the logo",
      execute: (demoLogo) => {
        const element = demoLogo;
        element.innerHTML = '';
        element.style.opacity = '1';
        element.style.transform = 'none';
        element.style.textShadow = 'none';
        
        anime.remove(demoLogo);
        
        const text = "AgentMate";
        
        // Create a typing effect using timeline
        const timeline = anime.timeline({
          loop: true,
          autoplay: true
        });
        
        // Type out the text
        for (let i = 0; i < text.length; i++) {
          timeline.add({
            begin: function() {
              element.innerHTML = text.substring(0, i + 1);
            },
            duration: 150,
            easing: 'steps(1)'
          });
        }
        
        // Wait a bit
        timeline.add({
          duration: 1000
        });
        
        // Delete the text
        for (let i = text.length; i > 0; i--) {
          timeline.add({
            begin: function() {
              element.innerHTML = text.substring(0, i - 1) + (i > 1 ? '|' : '');
            },
            duration: 75,
            easing: 'steps(1)'
          });
        }
        
        // Wait before restarting
        timeline.add({
          duration: 800
        });
        
        return timeline;
      }
    },
    {
      prompt: "Animate a glowing effect for the logo",
      execute: (demoLogo) => {
        anime.remove(demoLogo);
        demoLogo.innerHTML = "AgentMate";
        demoLogo.style.transform = 'none';
        
        return anime({
          targets: demoLogo,
          textShadow: [
            '0 0 5px rgba(255,108,171,0.5)',
            '0 0 20px rgba(115,102,255,0.8)',
            '0 0 5px rgba(255,108,171,0.5)'
          ],
          duration: 2000,
          easing: 'easeInOutSine',
          loop: true,
          autoplay: true
        });
      }
    }
  ];

  // Function to simulate typing
  const typePrompt = (element, newText) => {
    return new Promise((resolve) => {
      element.textContent = '';
      
      // Type the new text
      const typeText = (index) => {
        if (index < newText.length) {
          element.textContent += newText.charAt(index);
          setTimeout(() => typeText(index + 1), 50 + Math.random() * 30);
        } else {
          resolve();
        }
      };
      
      typeText(0);
    });
  };

  // Initialize the showcase
  let currentAnimationIndex = 0;
  let currentAnimation = null;
  const userPromptElement = document.querySelector('.user-prompt');
  const demoLogo = document.querySelector('#example-1 .demo-logo');
  
  // Reset demo logo to initial state
  const resetDemoLogo = () => {
    demoLogo.innerHTML = "AgentMate";
    demoLogo.style.opacity = '1';
    demoLogo.style.transform = 'none';
    demoLogo.style.textShadow = 'none';
    demoLogo.style.background = 'linear-gradient(90deg, #FF6CAB 0%, #7366FF 100%)';
    demoLogo.style.webkitBackgroundClip = 'text';
    demoLogo.style.webkitTextFillColor = 'transparent';
  };
  
  // Function to show next animation
  const showNextAnimation = async () => {
    // Reset any ongoing animations
    if (currentAnimation) {
      anime.remove(demoLogo);
    }
    
    resetDemoLogo();
    
    // Get the current example
    const example = animationExamples[currentAnimationIndex];
    
    // Type the prompt
    await typePrompt(userPromptElement, example.prompt);
    
    // Wait a moment after typing finishes
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Execute the animation
    currentAnimation = example.execute(demoLogo);
    
    // Increment index for next animation
    currentAnimationIndex = (currentAnimationIndex + 1) % animationExamples.length;
    
    // Schedule the next animation after current one has played for a while
    setTimeout(showNextAnimation, 6000);
  };
  
  // Start the animation showcase
  setTimeout(() => {
    showNextAnimation();
  }, 2000);
}); 