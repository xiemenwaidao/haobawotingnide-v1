import { defineCollection } from "astro:content";
import { aboutSchema, blogSchema } from "./_schemas";

const blog = defineCollection({
    schema: blogSchema,
});
const about = defineCollection({ schema: aboutSchema });

export const collections = { blog, about };
