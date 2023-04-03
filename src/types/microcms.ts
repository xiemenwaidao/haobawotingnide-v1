export type EndPoint = "blogs" | "tags";

/** レスポンス */
export interface Response {
    totalCount: number; // 取得されたブログ記事の総数
    offset: number; // 取得されたブログ記事のオフセット
    limit: number; // 1回のAPIリクエストで取得されるブログ記事の数
}

// Blogオブジェクトの型定義
export type Blog = {
    id: string; // 【自動付与】
    createdAt: string; // 【自動付与】
    updatedAt: string; // 【自動付与】
    publishedAt: string; // 【自動付与】コンテンツの公開日時
    revisedAt: string; // 【自動付与】コンテンツの改定日時
    title: string;
    content: string; // body(HTML or Object)
    description: string; // 説明
    // アイキャッチ画像
    eyecatch?: {
        url: string;
        height: number;
        width: number;
    };
    tag: Tag[];
};

// タグ
export type Tag = {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    name: string;
};

export type Contents = Blog | Tag;

// 汎用型レスポンス
export interface ContentsResponse<T extends Contents> extends Response {
    contents: T[];
}
