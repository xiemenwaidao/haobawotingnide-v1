import { createClient, MicroCMSQueries } from "microcms-js-sdk";
import type {
    Blog,
    Contents,
    ContentsResponse,
    EndPoint,
    Tag,
} from "../types/microcms";

/** MicroCMSのAPIを使用するためのクライアントを生成する */
const client = createClient({
    serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN, // MicroCMSのサービスドメインを指定する
    apiKey: import.meta.env.MICROCMS_API_KEY, // MicroCMSのAPIキーを指定する
});

/** 汎用ジェネリック関数 */
export const getContents = async <T extends Contents>(
    endpoint: EndPoint,
    queries?: MicroCMSQueries
) => {
    return await client.get<ContentsResponse<T>>({
        endpoint,
        queries,
    });
};

/* ======================
 * BLOGS
 ====================== */

/** ブログ記事一覧を取得する関数(クエリ指定可) */
export const getBlogs = async (queries?: MicroCMSQueries) => {
    return await getContents<Blog>("blogs", queries);
};

/** ブログ記事一覧を取得する関数 */
export const getAllBlogs = async () => {
    return await getContents<Blog>("blogs");
};

/** 最新3件の記事を取得 */
export const getLatestBlogs = async () => {
    const queries: MicroCMSQueries = { limit: 3, orders: "-createdAt" };
    return await getContents<Blog>("blogs", queries);
};

/** タグIDで記事を絞り込み取得 */
export const getTagBlogs = async (id: string) => {
    const queries: MicroCMSQueries = { filters: `tag[contains]${id}` };
    return await getContents<Blog>("blogs", queries);
};

/** ブログ記事の詳細を取得する関数 */
export const getBlogDetail = async (
    contentId: string,
    queries?: MicroCMSQueries
) => {
    return await client.getListDetail<Blog>({
        endpoint: "blogs",
        contentId,
        queries,
    });
};

/* ======================
 * TAGS
 ====================== */

/** タグ取得（クエリ指定可） */
export const getTags = async (queries?: MicroCMSQueries) => {
    return await getContents<Tag>("tags", queries);
};

/** 全タグ取得 */
export const getAllTags = async () => {
    return await getContents<Tag>("tags");
};
