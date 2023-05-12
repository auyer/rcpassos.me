<script>
  import '../theme.postcss'
  // This contains the bulk of Skeletons required styles:
  import '@skeletonlabs/skeleton/styles/all.css'
  // Finally, your application's global stylesheet (sometimes labeled 'app.css')
  import '../app.postcss'
  import Nav from '$lib/components/Nav.svelte'
  import Footer from '$lib/components/Footer.svelte'
  import { LightSwitch } from '@skeletonlabs/skeleton'

  import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom'

  import { storePopup } from '@skeletonlabs/skeleton'
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow })
</script>

<div class="flex flex-col min-h-screen">
  <div class="flex flex-col flex-grow w-full px-4 py-2">
    <header class="flex items-center justify-between w-full max-w-4xl py-4 mx-auto lg:pb-8">
      <Nav />
      <LightSwitch />
    </header>
    <main>
      <slot />
      <Footer />
    </main>
  </div>
</div>
