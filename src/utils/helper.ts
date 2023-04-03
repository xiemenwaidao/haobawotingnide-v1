import type { Blog } from "types/microcms";

/** htmlタグ削除 */
export const removeHtmlTag = (text: string) => {
    return text.replace(/(<([^>]+)>)/gi, "");
    // .trim()
    // .replace(/\s+/g, "")
};

/** */
export const getEyecatchPath = (eyecatch: Blog["eyecatch"]) => {
    const dummyPath = import.meta.env.DUMMY_IMG_PATH as string;
    return eyecatch ? eyecatch.url : dummyPath;
};
