import { getBlogs } from "@utils/api";
import useSWR from "swr";
import Card from "./Card";

const BlogSearch = () => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");

    const { data, error, isLoading } = useSWR(
        q === null ? null : ["/search", q],
        ([, q]) =>
            getBlogs({
                fields: ["id", "title", "description", "publishedAt"],
                q,
            })
    );

    if (error) return <div>エラーが発生しました</div>;

    if (isLoading) return <div>読み込み中...</div>;

    // console.log({ data });

    return (
        <>
            {q && q.length > 1 && (
                <div className="mt-8">
                    Found {data?.totalCount}
                    {data?.totalCount === 1 ? " result" : " results"} for '{q}'
                </div>
            )}

            <ul>
                {data &&
                    data.contents.map(blog => (
                        <Card
                            href={`/posts/${blog.id}`}
                            blog={blog}
                            key={`${blog.id}`}
                        />
                    ))}
            </ul>
        </>
    );
};

export default BlogSearch;
