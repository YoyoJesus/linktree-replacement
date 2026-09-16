<script>
  import myAvatar from '/myAvatar.png'
  import portfolioLogo from '/portfolio.jpg'
  import kheLogo from '/khe.ico'
  import hacksuLogo from '/hacksu.svg'
  import combatLogo from '/Combat.png'
  import khiLogo from '/2026_KHI_Logo.png'
  import blogLogo from '/blog.png'
  import toolsmithLogo from '/toolsmith.svg'
  import GithubIcon from '~icons/fa-brands/github'
  import LinkedinIcon from '~icons/fa-brands/linkedin'
  import YoutubeIcon from '~icons/fa-brands/youtube'
  import InstagramIcon from '~icons/fa-brands/instagram'
  import EmailIcon from '~icons/mdi/email-outline'
  import ArrowIcon from '~icons/mdi/arrow-top-right'
  import ResumeIcon from '~icons/mdi/file-document-outline'

  const links = [
    { name: 'Portfolio', note: 'Projects and experience', url: 'https://asternberg.xyz', logo: portfolioLogo, invert: true },
    { name: 'Resume', note: 'Education, experience, and skills', url: 'https://resume.yoyojesus.xyz', icon: ResumeIcon },
    { name: 'HacKSU', note: 'The largest CS club at Kent State', url: 'https://hacksu.com', logo: hacksuLogo },
    { name: 'Kent Hack It', note: 'HacKSU capture the flag competition', url: 'https://ctf.hacksu.com', logo: khiLogo },
    { name: 'Kent Hack Enough', note: 'Kent State hackathon', url: 'https://khe.io', logo: kheLogo },
    { name: 'KSU Combat Robotics', note: 'Building robots to break other robots', url: 'https://ksucombat.club', logo: combatLogo },
    { name: 'Toolsmith', note: 'Tools for resumes and business cards', url: 'https://toolsmith.online', logo: toolsmithLogo },
    { name: 'Blog', note: 'Writeups and notes', url: 'https://blog.yoyojesus.xyz', logo: blogLogo },
  ]

  const socials = [
    { label: 'GitHub', url: 'https://github.com/yoyojesus', icon: GithubIcon },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/austin-sternberg-765620218/', icon: LinkedinIcon },
    { label: 'YouTube', url: 'https://www.youtube.com/@yoyojesus', icon: YoutubeIcon },
    { label: 'Instagram', url: 'https://www.instagram.com/yoyoje_sus/', icon: InstagramIcon },
  ]
</script>

<main class="page">
  <header class="intro">
    <img src={myAvatar} class="avatar" alt="" width="64" height="64" />
    <div>
      <h1 class="name">Austin Sternberg</h1>
      <p class="lede">CS senior at Kent State University. President of HacKSU and KSU Combat Robotics.</p>
    </div>
  </header>

  <ul class="links">
    {#each links as link}
      <li>
        <a class="row" href={link.url} target="_blank" rel="noreferrer">
          {#if link.icon}
            <span class="row-logo row-logo-icon"><link.icon aria-hidden="true" /></span>
          {:else}
            <img src={link.logo} class="row-logo" class:row-logo-invert={link.invert} alt="" width="40" height="40" />
          {/if}
          <span class="row-text">
            <span class="row-name">{link.name}</span>
            <span class="row-note">{link.note}</span>
          </span>
          <ArrowIcon class="row-arrow" aria-hidden="true" />
        </a>
      </li>
    {/each}
  </ul>

  <nav class="socials" aria-label="Social profiles">
    {#each socials as social}
      <a href={social.url} target="_blank" rel="noreferrer" aria-label={social.label} class="social">
        <social.icon aria-hidden="true" />
      </a>
    {/each}
    <button type="button" id="open-contact-form" class="social social-email">
      <EmailIcon aria-hidden="true" />
      <span>Email me</span>
    </button>
  </nav>

  <details class="about">
    <summary>About me</summary>
    <div class="about-body">
      <p>
        I'm a CS senior at Kent State University from Mentor, Ohio, and I'm into cybersecurity, networking, and building
        things. I serve as president of HacKSU, the largest computer science club at Kent State, and of KSU Combat
        Robotics. Most of my projects are built with SvelteKit and Python, and on the security side I work with tools
        like Wireshark, Nmap, and Burp Suite.
      </p>
    </div>
  </details>

  <footer class="footer">{new Date().getFullYear()} Austin Sternberg</footer>
</main>

<div id="contact-modal" class="modal">
  <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="contact-title">
    <button id="close-modal" class="close-btn" aria-label="Close">&times;</button>
    <h2 id="contact-title" class="modal-title">Send me a message</h2>
    <form id="contact-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required class="form-input" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required class="form-input" />
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="5" required class="form-input"></textarea>
      </div>
      <button type="submit" id="submit-btn" class="submit-btn">Send message</button>
    </form>
  </div>
</div>

<div id="toast" class="toast" role="status">
  <p id="toast-message"></p>
</div>
