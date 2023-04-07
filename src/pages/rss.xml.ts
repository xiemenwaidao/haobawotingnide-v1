import rss from "@astrojs/rss";
import { SITE } from "@config";
import { MicroCMSUtils, microcmsFactory } from "@utils/microcms";

export async function get() {
    const blogResponse = await MicroCMSUtils.getAllContents({
        getListFn: microcmsFactory.blogs.getList,
    });
    const blogs = blogResponse.contents;

    return rss({
        title: SITE.title,
        description: SITE.desc,
        site: SITE.website,
        items: blogs.map(blog => ({
            link: `posts/${blog.id}`,
            title: blog.title,
            description: blog.description,
            pubDate: new Date(blog.publishedAt),
        })),
    });
}
