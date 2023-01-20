<script>
  import { bio, name } from '$lib/info.js'
</script>

<svelte:head>
  <title>{name}</title>
  <meta name="description" content={bio} />
</svelte:head>

<container class="flex flex-col flex-grow w-full mx-auto max-w-4xl">
  <header class="hero">
    <img alt="Rafael walking a bridge" width="1600" height="1230" src="/assets/hero.webp" />
    <div class="gradient" />
    <div class="overlay" />
  </header>
</container>
<br />
<container class="flex flex-col flex-grow w-full mx-auto max-w-4xl">
  <p>
    I am a Computer Scientist with a Bachelor’s Degree from IFB - <i
      >Instituto Federal de Brasília</i
    > (Federal institute of Brasília).
  </p>

  <p>
    I was a Researcher from Dec 2017 to Dec 2019 with the University of Brasília and governmental
    agencies. I did Micro Service development with Python and GO.
  </p>

  <p>
    I started working in the tech industry in Dec 2019. Due to a combination of company needs and
    personal interests, I specialized in Data Engineering.
  </p>

  <p>I formed and led a six members squad with Data analysts and Data engineers.</p>

  <p>In this team, I was the technical leader and guided our solutions.</p>

  <p>With them, I created and evolved what became our current data platform.</p>

  <p>
    Since then, we have gone through a downsizing. I no longer have a team to manage. I am still the
    maintainer of the platform, but that's not all I do. I also do software development in Golang
    and Vue, also Python and Rust when needed.
  </p>

  <p>Want to know more? Contact me. Thanks!</p>
</container>

<style lang="scss">
  $w-s: 750px;

  .hero {
    position: relative;
    overflow: hidden;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  .gradient {
    background-image: url('/assets/mesh-gradient.jpg');
    background-size: cover;
    pointer-events: none;
    mix-blend-mode: screen;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-left: 2rem;

    @media (min-width: $w-s) {
      padding-left: 4rem;
    }
  }
</style>
