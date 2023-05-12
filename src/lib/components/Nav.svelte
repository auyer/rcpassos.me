<script lang="ts">
  import { page } from '$app/stores'
  import type { PopupSettings } from '@skeletonlabs/skeleton'
  import { popup } from '@skeletonlabs/skeleton'
  import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton'

  $: classesActive = (href: string) =>
    href === $page.url.pathname ? 'variant-filled-primary' : 'variant-ghost-primary'

  $: classesActiveContains = (href: string) =>
    $page.url.pathname.includes(href) ? 'variant-filled-primary' : 'variant-ghost-primary'

  let comboboxValue: string

  const popupCombobox: PopupSettings = {
    event: 'focus-click',
    target: 'popupCombobox',
    placement: 'bottom',
    closeQuery: '.btn'
  }
</script>

<div>
  <nav class="nav flex items-center w-full mx-auto gap-2">
    <a class="btn min-w-fit" href="/">
      <img src="/assets/logo.svg" alt="Auyer" width="35px" height="35px" />
    </a>
    <a class="btn no-underline {classesActive('/about')}" href="/about"> About </a>
    <a class="btn no-underline {classesActive('/posts')}" href="/posts"> Posts </a>

    <button class="btn variant-ghost-primary w-25 justify-between" use:popup={popupCombobox}>
      <span class="capitalize"> Projects</span>
      <span>↓</span>
    </button>
    <div class="card z-40 w-25 shadow-xl py-2 gap-2" data-popup="popupCombobox">
      <ol class="list">
        <li>
          <a class="btn w-30 no-underline {classesActive('/projects/kv')}" href="/projects/kv"
            >MemoryKV DEMO</a
          >
        </li>
        <li>
          <a
            class="btn w-30 no-underline {classesActive('/projects/kv')}"
            href="https://github.com/auyer/">GitHub Projects</a
          >
        </li>
      </ol>
      <div class="arrow bg-surface-100-800-token" />
    </div>
  </nav>
</div>
