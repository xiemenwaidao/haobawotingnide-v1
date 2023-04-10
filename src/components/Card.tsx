import type { Blog } from "types/microcms";
import Datetime from "./Datetime";

export interface Props {
    href?: string;
    blog: Blog;
    secHeading?: boolean;
}

export default function Card({ href, blog, secHeading = true }: Props) {
    const { title, publishedAt, description } = blog;

    return (
        <li className="my-6">
            <a
                href={href}
                className="inline-block w-full text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
            >
                {secHeading ? (
                    <h2 className="text-lg font-medium decoration-dashed hover:underline max-sm:truncate">
                        {title}
                    </h2>
                ) : (
                    <h3 className="text-lg font-medium decoration-dashed hover:underline max-sm:truncate">
                        {title}
                    </h3>
                )}
            </a>
            <Datetime datetime={publishedAt} />
            <p>{description}</p>
        </li>
    );
}
