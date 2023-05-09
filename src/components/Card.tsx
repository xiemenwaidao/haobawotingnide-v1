import Datetime from "./Datetime";
import React from "react";
import type { BlogFrontmatter } from "@content/_schemas";

export interface Props {
    href?: string;
    frontmatter: BlogFrontmatter;
    secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
    const { title, date, description } = frontmatter;

    return (
        <li className="my-6">
            <a
                href={href}
                className="inline-block w-fit text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
                title={title}
            >
                {secHeading ? (
                    <h2 className="w-fit text-lg font-medium decoration-dashed hover:underline max-sm:truncate">
                        {title}
                    </h2>
                ) : (
                    <h3 className="w-fit text-lg font-medium decoration-dashed hover:underline max-sm:truncate">
                        {title}
                    </h3>
                )}
            </a>
            <Datetime datetime={date} />
            <p>{description}</p>
        </li>
    );
}
