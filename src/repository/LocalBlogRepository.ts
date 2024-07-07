import { Post, Tag, User } from "../interfaces";
import { BlogRepository } from "./";

const DEMO_USERS: User[] = [
    {
        id: 'uid0001',
        name: 'Pepe',
        email: 'pepe@mail.com',
        group: 'gold'
    }
];

const DEMO_TAGS: Tag[] = [
    Tag.create('easy'),
    Tag.create('dessert')
]

const DEMO_POSTS: Post[] = [
    {
        id: 'aabbcc0001',
        author: DEMO_USERS[0],
        title: 'Yummy delicious recipe!',
        body: '',
        date: new Date(1699995555555),
        likes: 0,
        tags: [DEMO_TAGS[0], DEMO_TAGS[1]]
    },
];

const LocalBlogRepository: BlogRepository = {
    getPosts: async (token: string) => { return DEMO_POSTS },
    createPost: async (post:Post, token: string) => {
        const postId = 'aabbcc' + (DEMO_POSTS.length + 1).toLocaleString(
            'en-US',
            {
                minimumIntegerDigits: 4,
                useGrouping: false
            }
        );
        const newPost = {
            ...post,
            id: postId
        }
        return newPost;
    },
    updatePost: async (post: Post, token: string) => { return post },
    deletePost: async (postId: string, token: string) => { return }
};

export default LocalBlogRepository;