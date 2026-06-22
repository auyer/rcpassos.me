---
title: '[VIDEO] Concurrency in Linux: Intro, How Bugs happen + Paper Review [English/Portuguese]'
date: 2026-06-21
---

[**EN**] I recently presented a study about how concurrency bugs happen in the Linux Kernel to my research group.
Due to the complexity of the topic, I decided to first introduce concurrency in a friendly way. At the end, I review a recent study on concurrency bugs in Linux.
[**PT/BR**] Recentemente apresentei um estudo sobre como bugs de concorrência acontecem no Kernel Linux para o meu grupo de pesquisa.
Dado o assunto complexo, decidi primeiro introduzir o tema de concorrência de uma forma amigável. No final, faço uma análise de um estudo recente abordando bugs de concorrência no Linux.


## Video in English

<iframe width="560" height="315" src="https://www.youtube.com/embed/zEUWrMmij4A?si=i5U92uiuPQQGAJG9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Link to the original article that motivated this presentation: ["A Comprehensive Study of Concurrency Bugs in the Linux Kernel - ICSE 2026"](https://conf.researchr.org/details/icse-2026/icse-2026-research-track/262/A-Comprehensive-Study-of-Concurrency-Bugs-in-the-Linux-Kernel). I also used resources from [an open MIT course](https://web.mit.edu/6.005/www/fa14/classes/17-concurrency/), the [Linux Docs](https://docs.kernel.org/core-api/index.html#concurrency-primitives) and the [Compiler Explorer](https://godbolt.org/) website.


## Vídeo em Português

<iframe width="560" height="315" src="https://www.youtube.com/embed/mSN9-PnBy_E?si=BuqQ1U6yxQotw5x6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Link para o artigo original que motivou esta apresentação: ["A Comprehensive Study of Concurrency Bugs in the Linux Kernel - ICSE 2026"](https://conf.researchr.org/details/icse-2026/icse-2026-research-track/262/A-Comprehensive-Study-of-Concurrency-Bugs-in-the-Linux-Kernel). Também utilizei recursos de [um curso aberto do MIT](https://web.mit.edu/6.005/www/fa14/classes/17-concurrency/), da [Documentação do Linux](https://docs.kernel.org/core-api/index.html#concurrency-primitives) e do site [Compiler Explorer](https://godbolt.org/).

## [English] Takeaways

**A Comprehensive Study of Concurrency Bugs in the Linux Kernel**, [Gong et al](https://conf.researchr.org/details/icse-2026/icse-2026-research-track/262/A-Comprehensive-Study-of-Concurrency-Bugs-in-the-Linux-Kernel).

The authors did a systematic analysis of 200 real-world Kernel concurrency bugs from a 4.5 year period.

"[...] kernel concurrency bugs **differ fundamentally** from those in user-space applications, particularly in their reliance on **interrupts**, **hardware** dependencies, and **synchronization patterns**, highlighting the **need for kernel specific techniques** for addressing concurrency bugs."

---

## [PT/BR] Conclusões

**Um Estudo Abrangente sobre Bugs de Concorrência no Kernel do Linux**, [Gong et al](https://conf.researchr.org/details/icse-2026/icse-2026-research-track/262/A-Comprehensive-Study-of-Concurrency-Bugs-in-the-Linux-Kernel).

Os autores realizaram uma análise sistemática de 200 bugs de concorrência reais do Kernel em um período de 4.5 anos.

"[...] os bugs de concorrência de kernel **diferem fundamentalmente** daqueles em aplicações de espaço de usuário, particularmente em sua dependência de **interrupções**, dependências de **hardware** e **padrões de sincronização**, destacando a **necessidade de técnicas específicas de kernel** para lidar com bugs de concorrência."
