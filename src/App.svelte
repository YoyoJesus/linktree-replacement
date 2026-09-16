<script>
  import myAvatar from '/myAvatar.png'
  import portfolioLogo from '/portfolio.jpg'
  import kheLogo from '/khe.ico'
  import hacksuLogo from '/hacksu.svg'
  import combatLogo from '/Combat.png'
  import khiLogo from '/2026_KHI_Logo.png'
  import blogLogo from '/blog.png'
  import GithubIcon from '~icons/fa-brands/github'
  import LinkedinIcon from '~icons/fa-brands/linkedin'
  import YoutubeIcon from '~icons/fa-brands/youtube'
  import InstagramIcon from '~icons/fa-brands/instagram'
  import EmailIcon from '~icons/mdi/email-outline'
  import ArrowIcon from '~icons/mdi/arrow-top-right'

  const links = [
    { name: 'Portfolio', note: 'Projects and experience', url: 'https://asternberg.xyz', logo: portfolioLogo },
    { name: 'HacKSU', note: 'Kent State hacking club', url: 'https://hacksu.com', logo: hacksuLogo },
    { name: 'HacKSU CTF', note: 'Capture the flag challenges', url: 'https://ctf.hacksu.com', logo: khiLogo },
    { name: 'Kent Hack Enough', note: 'Kent State hackathon', url: 'https://khe.io', logo: kheLogo, darkLogo: true },
    { name: 'KSU Combat Robotics', note: 'Building robots to break other robots', url: 'https://ksucombat.club', logo: combatLogo },
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
      <p class="lede">Computer science senior at Kent State. President of HacKSU and KSU Combat Robotics.</p>
    </div>
  </header>

  <ul class="links">
    {#each links as link}
      <li>
        <a class="row" href={link.url} target="_blank" rel="noreferrer">
          <img src={link.logo} class="row-logo" class:row-logo-dark={link.darkLogo} alt="" width="40" height="40" />
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
        I'm a senior at Kent State University studying computer science with a minor in computer engineering.
      </p>
      <p>
        I intern in the IT department at Awetomaton, a defense contractor in Beavercreek, Ohio, where I build internal
        tools and help existing processes scale.
      </p>
      <p>
        As president of HacKSU and Kent State Combat Robotics, I run events, maintain infrastructure, and lead projects
        in both groups.
      </p>
      <p>In my free time I build Python security tools, which you can find on my GitHub.</p>
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
