import type { CollectionEntry } from "astro:content";
import { toggleDisplayDraft } from "./helper";

const getSortedPosts = (posts: CollectionEntry<"blog">[]) =>
    posts
        .filter(toggleDisplayDraft)
        .sort(
            (a, b) =>
                Math.floor(new Date(b.data.date).getTime() / 1000) -
                Math.floor(new Date(a.data.date).getTime() / 1000)
        );

export default getSortedPosts;
