Developing with Tailwind doesn't need any special configs
It is bundled by webpack
It doesn't provide any generated styles until build time, hence it's fast in development

Vite pulls in styles from tailwind via those directives during build time

In production, prune your tailwind files
