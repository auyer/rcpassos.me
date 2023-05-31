<script>
  import '../theme.postcss'
  // This contains the bulk of Skeletons required styles:
  import '@skeletonlabs/skeleton/styles/all.css'
  // Finally, your application's global stylesheet (sometimes labeled 'app.css')
  import '../app.postcss'
  import Nav from '$lib/components/Nav.svelte'
  import Footer from '$lib/components/Footer.svelte'

  import { storePopup } from '@skeletonlabs/skeleton'
</script>

<div class="flex flex-col min-h-screen">
  <header>
    <Nav />
  </header>
  <main class="m-4">
    <slot />
    <Footer />
  </main>
</div>
