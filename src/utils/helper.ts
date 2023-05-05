import type { Quad, Triplet } from "@react-three/cannon";

/** htmlタグ削除 */
export const removeHtmlTag = (text: string) => {
    return text.replace(/(<([^>]+)>)/gi, "");
    // .trim()
    // .replace(/\s+/g, "")
};

/** */
// export const getEyecatchPath = (eyecatch: Blog["eyecatch"]) => {
//     const dummyPath = import.meta.env.DUMMY_IMG_PATH as string;
//     return eyecatch ? eyecatch.url : dummyPath;
// };

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

export const tripletsAlmostEqual = (
    t1: Triplet,
    t2: Triplet,
    epsilon: number
): boolean => {
    const distance = Math.sqrt(
        Math.pow(t2[0] - t1[0], 2) +
            Math.pow(t2[1] - t1[1], 2) +
            Math.pow(t2[2] - t1[2], 2)
    );
    return distance < epsilon;
};
export const quadsAlmostEqual = (
    q1: Quad,
    q2: Quad,
    epsilon: number
): boolean => {
    const distance = Math.sqrt(
        Math.pow(q2[0] - q1[0], 2) +
            Math.pow(q2[1] - q1[1], 2) +
            Math.pow(q2[2] - q1[2], 2) +
            Math.pow(q2[3] - q1[3], 2)
    );
    return distance < epsilon;
};
