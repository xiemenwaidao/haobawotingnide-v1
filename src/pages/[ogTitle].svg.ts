import generateOgImage from "@utils/generateOgImage";
import type { APIRoute } from "astro";
import { MicroCMSUtils, microcmsFactory } from "@utils/microcms";

export const get: APIRoute = async ({ params }) => ({
    body: await generateOgImage(params.ogTitle),
});

const blogResponse = await MicroCMSUtils.getAllContents({
    getListFn: microcmsFactory.blogs.getList,
});
const blogs = blogResponse.contents;

export function getStaticPaths() {
    return (
        blogs
            // .filter(blog => !blog.eyecatch?.url)
            .map(blog => ({
                params: { ogTitle: blog.title },
            }))
    );
}
