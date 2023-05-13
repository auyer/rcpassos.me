<script lang="ts">
  import { page } from '$app/stores'
  import type { PopupSettings } from '@skeletonlabs/skeleton'
  import { popup } from '@skeletonlabs/skeleton'

  $: classesActive = (href: string) =>
    href === $page.url.pathname ? 'variant-filled-primary' : 'variant-ghost-primary'

  $: classesActiveContains = (href: string) =>
    $page.url.pathname.includes(href) ? 'variant-filled-primary' : 'variant-ghost-primary'

  const popupCombobox: PopupSettings = {
    event: 'focus-click',
    target: 'popupCombobox',
    placement: 'bottom',
    closeQuery: '.btn'
  }
</script>

<div>
  <nav class="nav flex flex-wrap w-full gap-2">
    <a class="btn min-w-fit" href="/" data-sveltekit-preload-data="hover">
      <img src="/assets/logo.svg" alt="Auyer" width="30px" height="30px" />
    </a>
    <a
      class="btn no-underline {classesActive('/about')}"
      href="/about"
      data-sveltekit-preload-data="hover"
    >
      About
    </a>
    <a
      class="btn no-underline {classesActive('/posts')}"
      href="/posts"
      data-sveltekit-preload-data="hover"
    >
      Posts
    </a>
    <div>
      <button class="btn variant-ghost-primary justify-between" use:popup={popupCombobox}>
        <span> Projects</span>
        <span>↓</span>
      </button>
      <div class="card z-40 shadow-xl py-2 gap-2" data-popup="popupCombobox">
        <ol class="list">
          <li>
            <a
              class="btn no-underline {classesActive('/projects/kv')}"
              href="/projects/kv"
              data-sveltekit-preload-data="hover">MemoryKV DEMO</a
            >
          </li>
          <li>
            <a class="btn no-underline" href="https://github.com/auyer/">GitHub Projects</a>
          </li>
        </ol>
      </div>
    </div>
  </nav>
</div>
