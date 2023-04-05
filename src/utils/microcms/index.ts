import {
    createClient,
    GetListRequest,
    MicroCMSListContent,
    MicroCMSListResponse,
} from "microcms-js-sdk";
import type { Blog, Tag } from "types/microcms";

interface Props<T> {
    getListFn: (
        options?: Omit<GetListRequest, "endpoint"> | undefined
    ) => Promise<MicroCMSListResponse<T>>;
    options?: Omit<GetListRequest, "endpoint">;
    limit?: number;
    offset?: number;
}

// クライアントの作成
const client = createClient({
    serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: import.meta.env.MICROCMS_API_KEY || "",
});

// APIを取りまとめるオブジェクト
export const microcmsFactory = {
    blogs: {
        getList: async (options?: Omit<GetListRequest, "endpoint">) => {
            return await client.getList<Blog>({
                endpoint: "blogs",
                queries: options?.queries,
            });
        },
        getLatestList: async () => {
            return await client.getList<Blog>({
                endpoint: "blogs",
                queries: { limit: 3, orders: "-createdAt" },
            });
        },
        getTagList: async (options?: Omit<GetListRequest, "endpoint">) => {
            return await client.getList<Blog>({
                endpoint: "blogs",
                queries: options?.queries,
            });
        },
        // getDetail: async (contentId: string) => {
        //     return await client.getListDetail<Blog>({
        //         endpoint: "blogs",
        //         contentId,
        //     });
        // },
    },
    tags: {
        getList: async (options?: Omit<GetListRequest, "endpoint">) => {
            return await client.getList<Tag>({
                endpoint: "tags",
                ...options,
            });
        },
    },
};

// microCMS系のutilsをまとめるclass
export class MicroCMSUtils {
    // 今回の主役
    static async getAllContents<T>({
        getListFn,
        options,
        limit = 10,
        offset = 0,
    }: Props<T>): Promise<{
        contents: (T & MicroCMSListContent)[];
        totalCount: number;
    }> {
        const data = await getListFn({
            queries: {
                limit,
                offset,
                ...options?.queries,
            },
        });

        if (data.offset + data.limit < data.totalCount) {
            const result = await MicroCMSUtils.getAllContents({
                getListFn,
                options,
                limit: data.limit,
                offset: data.offset + data.limit,
            });
            return {
                contents: [...data.contents, ...result.contents],
                totalCount: result.totalCount,
            };
        }

        return {
            contents: data.contents,
            totalCount: data.totalCount,
        };
    }

    static async getContents<T>({
        getListFn,
        options,
        limit,
        offset,
    }: Props<T>): Promise<{
        contents: (T & MicroCMSListContent)[];
        totalCount: number;
    }> {
        const data = await getListFn({
            queries: {
                limit,
                offset,
                ...options,
            },
        });

        return {
            contents: data.contents,
            totalCount: data.totalCount,
        };
    }
}
