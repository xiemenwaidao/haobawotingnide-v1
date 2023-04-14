import type { APIContext } from "astro";
import { getOgImage } from "@components/OgImage";
import { MicroCMSUtils, microcmsFactory } from "@utils/microcms";

export async function getStaticPaths() {
    const blogResponse = await MicroCMSUtils.getAllContents({
        getListFn: microcmsFactory.blogs.getList,
    });
    const blogs = blogResponse.contents;

    return blogs.map(blog => ({
        params: { id: blog.id },
        props: { title: blog.title },
    }));
}

export async function get({ params, props }: APIContext) {
    const { id } = params;
    const { title } = props;

    if (!id) {
        throw new Error("Id not found");
    }

    const body = await getOgImage(title);

    return {
        body,
        encoding: "binary",
    };
}
