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

export const fetcher = async (url: string) => {
    const response = await fetch(url, {
        headers: {
            "X-Content-Type-Options": "nosniff",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    // console.log(response);
    // レスポンスヘッダーに「X-Content-Type-Options」ヘッダーを設定する
    // response.headers.set("X-Content-Type-Options", "nosniff");

    const data = await response.json();
    return data;
};
