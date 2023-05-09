import { z } from "astro:content";

export const blogSchema = z
    .object({
        title: z.string(),
        description: z.string(),
        postSlug: z.string().optional(),
        featured: z.boolean().optional(),
        date: z.date(),
        lastmod: z.date(),
        draft: z.boolean().optional(),
        tags: z.array(z.string()).default(["others"]),
    })
    .strict();
export type BlogFrontmatter = z.infer<typeof blogSchema>;

// export const aboutSchema = z
//     .object({
//         type: z.string(),
//         date: z.date(),
//         lastmod: z.date(),
//         // slug: z.string(),
//     })
//     .strict();
// export type AboutFrontmatter = z.infer<typeof aboutSchema>;
