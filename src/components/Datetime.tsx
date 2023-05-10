import { getFormatDatetime } from "@utils/helper";
import React from "react";

export interface Props {
    datetime: string | Date;
    modifiedtime: string | Date;
    size?: "sm" | "lg";
    className?: string;
    displayTime?: boolean;
}

export default function Datetime({
    datetime,
    modifiedtime,
    size = "sm",
    className,
    displayTime = false,
}: Props) {
    const pubDate = getFormatDatetime(datetime).date;
    const modDate = getFormatDatetime(modifiedtime).date;

    return (
        <div
            className={`flex flex-wrap items-center gap-x-2 opacity-80 ${className}`}
        >
            <span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${
                        size === "sm" ? "scale-90" : "scale-100"
                    } inline-block h-6 w-6 fill-skin-base`}
                    aria-hidden="true"
                >
                    <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path>
                    <path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path>
                </svg>
                <span className="sr-only">公開:</span>
                <time
                    dateTime={new Date(datetime).toISOString()}
                    itemProp="datePublished"
                    className={`italic ${
                        size === "sm" ? "text-sm" : "text-base"
                    }`}
                >
                    {pubDate}
                </time>
            </span>
            {pubDate !== modDate && (
                <span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`${
                            size === "sm" ? "scale-90" : "scale-100"
                        } inline-block h-6 w-6 fill-skin-base fill-transparent`}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                        ></path>
                        <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"></path>
                        <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"></path>
                    </svg>
                    <span className="sr-only">更新:</span>
                    <time
                        dateTime={new Date(modifiedtime).toISOString()}
                        itemProp="dateModified"
                        className={`italic ${
                            size === "sm" ? "text-sm" : "text-base"
                        }`}
                    >
                        {modDate}
                    </time>
                </span>
            )}
        </div>
    );
}
