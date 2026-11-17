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
  import ArrowIcon from '~icons/mdi/arrow-top-right'
  import ResumeIcon from '~icons/mdi/file-document-outline'
  import Field from './Field.svelte'
  import { kinetic, splitWords } from './kinetic'

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

  const name = splitWords('Austin Sternberg')
  const linksHeading = splitWords('My Links')
  const aboutHeading = splitWords('About Me')
</script>

<div class="ambient-field" aria-hidden="true"><Field quiet /></div>

<header class="site-header">
  <img class="header-avatar" src={myAvatar} width="45" height="45" alt="" />
  <nav aria-label="Social profiles">
    <ul class="header-socials">
      {#each socials as social}
        <li>
          <a href={social.url} target="_blank" rel="noreferrer" aria-label={social.label}>
            <social.icon aria-hidden="true" />
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</header>

<main>
  <section class="hero" aria-labelledby="hero-name">
    <Field />
    <div class="scrim" aria-hidden="true"></div>
    <div class="shell hero-inner">
      <h1 id="hero-name" class="display hero-name" aria-label="Austin Sternberg" use:kinetic>
        {#each name as word}
          <span class="word" aria-hidden="true">
            {#each word as letter}
              <span class="ch" data-kinetic-letter style="--i: {letter.i}">{letter.char}</span>
            {/each}
          </span>
        {/each}
      </h1>
      <div class="hero-bottom">
        <div class="hero-summary">
          <p>CS Senior at Kent State University.</p>
          <p>President of HacKSU, Kent State's largest computer science club.</p>
          <p>President of KSU Combat Robotics.</p>
        </div>
        <div class="hero-actions">
          <button id="open-contact-form" type="button" class="btn btn-primary">
            Get in Touch <span aria-hidden="true">→</span>
          </button>
          <a class="btn btn-ghost" href="https://resume.yoyojesus.xyz" target="_blank" rel="noreferrer">View my Resume</a>
          <a class="btn btn-ghost" href="https://blog.yoyojesus.xyz" target="_blank" rel="noreferrer">Read my Blog</a>
        </div>
      </div>
    </div>
  </section>

  <div class="content-column">
    <section class="content-section" aria-labelledby="links-heading">
      <h2 id="links-heading" aria-label="My Links" use:kinetic>
        {#each linksHeading as word, w}
          <span class="heading-word" class:secondary={w > 0} aria-hidden="true">
            {#each word as letter}
              <span class="heading-letter" data-kinetic-letter style="--i: {letter.i}">{letter.char}</span>
            {/each}
          </span>{' '}
        {/each}
      </h2>
      <ul class="links">
        {#each links as link}
          <li>
            <a class="row" href={link.url} target="_blank" rel="noreferrer">
              {#if link.icon}
                <span class="row-logo row-logo-icon"><link.icon aria-hidden="true" /></span>
              {:else}
                <img src={link.logo} class="row-logo" class:row-logo-invert={link.invert} alt="" width="44" height="44" />
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
    </section>

    <section class="content-section compact-end" aria-labelledby="about-heading">
      <h2 id="about-heading" aria-label="About Me" use:kinetic>
        {#each aboutHeading as word, w}
          <span class="heading-word" class:secondary={w > 0} aria-hidden="true">
            {#each word as letter}
              <span class="heading-letter" data-kinetic-letter style="--i: {letter.i}">{letter.char}</span>
            {/each}
          </span>{' '}
        {/each}
      </h2>
      <p class="about-body">
        I'm a CS senior at Kent State University from Mentor, Ohio, and I'm into cybersecurity, networking, and building
        things. Most of my projects are built with SvelteKit and Python, and on the security side I work with tools like
        Wireshark, Nmap, and Burp Suite.
      </p>
    </section>

    <footer class="footer">{new Date().getFullYear()} Austin Sternberg</footer>
  </div>
</main>

<div id="contact-modal" class="modal">
  <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="contact-title">
    <button id="close-modal" class="close-btn" aria-label="Close">&times;</button>
    <h2 id="contact-title" class="modal-title">Get in Touch</h2>
    <form id="contact-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required class="form-input" placeholder="Your name" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required class="form-input" placeholder="you@example.com" />
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="5" required class="form-input" placeholder="Your message"></textarea>
      </div>
      <button type="submit" id="submit-btn" class="submit-btn">Send message</button>
    </form>
  </div>
</div>

<div id="toast" class="toast" role="status">
  <p id="toast-message"></p>
</div>
