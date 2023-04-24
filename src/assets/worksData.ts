export interface Work {
    title: string;
    description: string;
    date: string;
    imgSrc: string;
    href: string;
    tags: string[];
}

const worksData: Work[] = [
    {
        title: "webglschool2021_three001 ",
        description:
            "WebGL School 2021の課題で作ったものです。Boxを使ってなんか作れという課題だったような。。。",
        date: "2021/5",
        imgSrc: "/assets/img/works/webglschool2021_three001.png",
        href: "https://menxielijiao.github.io/webglschool2021_three001/",
        tags: ["Three.js", "Vue.js", "gsap"],
    },
    {
        title: "Fan",
        description:
            "WebGL School 2021の課題で作ったものです。扇風機を作ろうという課題でした。",
        date: "2021/6",
        imgSrc: "/assets/img/works/Fan.png",
        href: "https://menxielijiao.github.io/Fan/",
        tags: ["Three.js", "Vue.js", "gsap"],
    },
    {
        title: "solarSystem",
        description:
            "WebGL School 2021の課題で作ったものです。地球という課題だったような。。。土星が美しい。。。",
        date: "2021/6",
        imgSrc: "/assets/img/works/solarSystem.png",
        href: "https://menxielijiao.github.io/solarSystem/",
        tags: ["Three.js", "Vue.js"],
    },
    {
        title: "lowpoy-room",
        description:
            "ThreeJsJourneyを受講後に作成。bakeが難しかった。この頃からTypeScriptを使い始める。Blenderも初めて使用した。",
        date: "2021/11",
        imgSrc: "/assets/img/works/lowpoy-room.png",
        href: "https://lowpoly-room.vercel.app/",
        tags: ["Three.js", "Blender"],
    },
    {
        title: "orange",
        description: "R3Fの勉強で作成。",
        date: "2021/12",
        imgSrc: "/assets/img/works/orange.png",
        href: "https://orange-nine.vercel.app/",
        tags: ["React.js", "r3f", "Blender"],
    },
    {
        title: "jikka-2022-1",
        description:
            "実家に併設されている神殿を思い出しながら作成。1年以上放置していたのでWeb上にアップしてみた。いろいろと未完成の作品なので、再度手を加えてリリースしたい。",
        date: "2022/1",
        imgSrc: "/assets/img/works/jikka-2022-1.png",
        href: "https://jikka-2022-1.vercel.app/",
        tags: ["React.js", "r3f", "Blender", "gsap"],
    },
];

export default worksData;
