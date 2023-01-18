<script>
  let activeTab = 'home'
  import { base } from "$app/paths";
</script>

<nav class="nav flex items-center w-full mx-auto">
  <a class="logolink" href="/" on:click={() => (activeTab = 'home')} active={activeTab == 'home'}>
    <img src="/assets/logo.svg" alt="Auyer" width="30px" height="30px" />
  </a>
  <a
    class="link"
    href="/about"
    on:click={() => (activeTab = 'about')}
    active={activeTab == 'about'}
  >
    About
  </a>
  <a
    class="link"
    href="/posts"
    on:click={() => (activeTab = 'posts')}
    active={activeTab == 'posts'}
  >
    Posts
  </a>
</nav>

<style lang="scss">
  nav {
    display: flex;
    align-items: center;
    padding-top: 1rem;
    padding-right: 2rem;
    padding-bottom: 1rem;
    padding-left: 2rem;
  }

  .selected {
    background-color: #ff3e00;
    color: white;
  }

  logolink {
    display: block;
    color: var(--t-fg);
    text-decoration: none;
  }

  .link {
    color: var(--t-subdue);
    display: block;
    margin-left: 1rem;
    text-decoration: none;
    font-size: var(--f-d1);
    text-transform: uppercase;
    padding-top: 0.75em;
    padding-bottom: 0.75em;

    &:focus,
    &:hover {
      color: var(--t-active);
    }
  }
</style>
