import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";
import partytown from "@astrojs/partytown";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
    site: SITE.website,
    markdown: {
        remarkPlugins: [
            [remarkToc, { heading: "目次" }],
            [
                remarkCollapse,
                {
                    test: "目次",
                    summary: str => `${str}を開く`,
                },
            ],
            // [
            //     remarkCollapse,
            //     {
            //         test: "別の実装",
            //         summary: str => `${str}を開く`,
            //     },
            // ],
        ],
        shikiConfig: {
            theme: "one-dark-pro",
            // wrap: true,
        },
        extendDefaultPlugins: true,
    },
    integrations: [
        tailwind({
            config: {
                applyBaseStyles: false,
            },
        }),
        react(),
        sitemap(),
        mdx(),
        partytown({
            // Adds dataLayer.push as a forwarding-event.
            config: {
                forward: ["dataLayer.push"],
            },
        }),
    ],
    // vite: {
    //     optimizeDeps: {
    //         exclude: ["@resvg/resvg-js"],
    //     },
    // },
});
