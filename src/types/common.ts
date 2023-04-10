export type Site = {
    website: string;
    author: string;
    desc: string;
    title: string;
    ogImage: string;
    lightAndDarkMode: boolean;
    postPerPage: number;
};

export type SocialObjects = {
    name: SocialMedia;
    href: string;
    active: boolean;
    linkTitle: string;
}[];

export type SocialIcons = {
    [social in SocialMedia]: string;
};

export type SocialMedia =
    | "Github"
    | "Facebook"
    | "Instagram"
    | "LinkedIn"
    | "Mail"
    | "Twitter"
    | "Twitch"
    | "YouTube"
    | "WhatsApp"
    | "Snapchat"
    | "Pinterest"
    | "TikTok"
    | "CodePen"
    | "Discord"
    | "GitLab"
    | "Reddit"
    | "Skype"
    | "Steam"
    | "Telegram"
    | "Mastodon";

export interface HitokotoResponse {
    id: string; // 一言标识
    hitokoto: string; // 一言正文。编码方式 unicode。使用 utf-8。
    type: string; // 类型。请参考第三节参数的表格
    from: string; // 一言的出处
    from_who: string; // 一言的作者
    creator: string; // 添加者
    creator_uid: string; // 添加者用户标识
    reviewer: string; // 审核员标识
    uuid: string; // 一言唯一标识；可以链接到 https://hitokoto.cn?uuid=[uuid] 查看这个一言的完整信息
    commit_from: string; // 提交方式
    created_at: string; // 添加时间
    length: string; // 句子长度
}
