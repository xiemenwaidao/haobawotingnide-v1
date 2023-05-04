/** @see https://github.com/70-10/blog/blob/main/src/pages/og/%5Bslug%5D.png.ts */
import type { APIContext } from "astro";
import { getOgImage } from "@components/OgImage";
import { getCollection } from "astro:content";
import slugify from "@utils/slugify";

export async function getStaticPaths() {
    const posts = await getCollection("blog");

    return posts.map(({ data }) => ({
        params: { slug: slugify(data) },
        props: { title: data.title },
    }));
}

export async function get({ params, props }: APIContext) {
    const { slug } = params;
    const { title } = props;

    if (!slug) {
        throw new Error("Id not found");
    }

    const body = await getOgImage(title);

    return {
        body,
        encoding: "binary",
    };
}
