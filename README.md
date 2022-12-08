This is a solution to the [Advice generator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/advice-generator-app-QdUG-13db). Frontend Mentor challenges help you improve your coding skills by building real projects.

## Table of contents

-   [Overview](#overview)
    -   [The challenge](#the-challenge)
    -   [Screenshot](#screenshot)
    -   [Links](#links)
-   [My process](#my-process)
    -   [Built with](#built-with)
    -   [What I learned](#what-i-learned)
    -   [Continued development](#continued-development)
    -   [Useful resources](#useful-resources)
-   [Author](#author)
-   [Acknowledgments](#acknowledgments)

## Overview

I built a react component that fetches and displays a random advice from [Advice slip API](https://api.adviceslip.com/advice) anytime the trigger is clicked. I used `animate.css` for the flashy animation and `tailwindcss` to style the component. Deployed to GitHub pages (See links below)

### The challenge

Users should be able to:

-   View the optimal layout for the app depending on their device's screen size
-   See hover states for all interactive elements on the page
-   Generate a new piece of advice by clicking the dice icon

### Preview

![](./advice%20generator%20screenshot.gif)

### Links

-   Solution URL: [View Repo](https://github.com/Jeffreyon/advice-generator)
-   Live Site URL: [Deploy to GitHub Pages](https://jeffreyon.github.io/advice-generator/)

## My process

Okay, so I started this project by understanding how API requests are done in react, after going through an article that explained how `useEffect()` hook is used to fire off functionality when the page is loaded, I dived into coding.

Scaffolding with Vite, I started prototyping with the functionality and made requests to the API using `fetch`. The API caches requests for 2s (This meant I could only retrieve unique advice after 2s) so to avoid my fastest users from having a slow user experience, I disabled the button for 2s and added a flashing animation as the next advice loaded. The simulated slow speed looks better.

Once I was done with the functionality and markup, I got to styling and installed TailwindCSS to jazz up the project and Animate.css for the flashing animation.

Wrapping up, I first deployed the project to Netlify since I had experience with it, but I preferred the cleaner URL slug of GitHub pages so that's what I went with instead. You can [view the live project here](https://jeffreyon.github.io/advice-generator/).

And that's how I built this.

### Built with

-   Semantic HTML5 markup
-   CSS custom properties
-   Mobile-first workflow
-   Flexbox
-   TailwindCSS
-   Animate.css
-   [React](https://reactjs.org/) - JS library
-   Vite (Toolchain for building React projects)

### What I learned

There were some challenges I faced when building this project, actually there were a lot...

For instance, to fix the cache problem from the API, I had to disable the trigger for 2s like so

```js
async function fetchAdvice() {
    trigger.current.disabled = true;
    animateCSS("#advice-text", "flash");

    await fetch(`https://api.adviceslip.com/advice`)
        .then((response) => response.json())
        .then(({ slip }) => {
            setAdvice(slip);
            setTimeout(() => {
                trigger.current.disabled = false;
            }, 2000);
        })
        .catch(console.log);
    //
}
```

I used `useRefs` hook to reference the trigger button and disable it when clicked, then the `fetchAdvice()` function fetches a random advice from the API and sets an `advice` state variable after which it enables the trigger again after 2s using a `setTimeout` call.

The second problem I faced was making a smooth flashing transition between advice generation, I tried doing this...

```js
let advice_text = useRefs(null);

// in fetchAdvice()
advice_text.current.classList.toggle("animate_animated animate_flash");
```

But the animation was jumpy and sometimes it didn't even flash at all. After searching for a solution via the js docs and google, I saw a small script on animate.css homepage that I copied into `./src/lib/animatecss.js` and would you believe I only had to call that function like this and I had a smooth flashing animation? Nice

```js
// in fetchAdvice()
animateCSS("#advice-text", "flash");
```

The last problem I faced (And believe me, this was hard) was deploying my Vite project to Github pages. I read a bunch of conflicting articles and tried:

1.  Adding a deploy script to my repo for automatic deploys. That didn't work
2.  Deploying from Github's UI, but I couldn't find the `./dist` folder. So I tried checking it into git (Bad workflow) but that also didn't work

Once I started getting into it though, I learnt about setting a `base` key to my Vite config file and my site deployed for the first time. But my static assets were not being fetched due to a URL error, so my page loaded but not the javascript file to render it.

Finding a Github issue, I learnt about adding a `homepage` key to `package.json` and that fixed the problem instantly.

Finally, I installed `gh-pages` and wrote deploy scripts (`npm run deploy`) for deploying my application manually, there's no automatic deployment from branch functionality but I will learn how to set that up in the future.

Deployment done.

### Continued development

I wanted to customize my tailwind build with custom colours to better match the design specs but got derailed trying to deploy the project, but I'll dedicate learning that to another project.

Also, I learnt a bit about how TailwindCSS works with Vite's toolchain, and I'll prune unused CSS during build time in my next project.

Ship first, iterate later right?

### Useful resources that unstuck me

-   [Vite deploy demo](https://github.com/sitek94/vite-deploy-demo) - This repo explained how to deploy vite projects to GitHub pages
-   [Smooth animation with animate.css](https://animate.style/#:~:text=You%20can%20also%20use%20a%20simple%20function%20to%20add%20the%20animations%20classes%20and%20remove%20them%20automatically%3A) - I just copied this into my project and I had a smoother flashing animation for the advice text

## Let's connect

-   GitHub - [Jeffrey Onuigbo](https://www.github.com/Jeffreyon)
-   Frontend Mentor - [@jeffreyon](https://www.frontendmentor.io/profile/Jeffreyon)
-   Twitter - [Jeff The Builder](https://www.twitter.com/jeffreyon_)
