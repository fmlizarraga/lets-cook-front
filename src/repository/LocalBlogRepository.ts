import { Comment, Post, Tag, User } from "../interfaces";
import { newTag } from "../utils/blog";
import { BlogRepository } from "./";

const DEMO_USERS: User[] = [
    {
        id: 'uid0001',
        name: 'Pepe',
        email: 'pepe@mail.com',
        group: 'Gold',
        picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Kermit_the_frog_hollywood_walk_of_fame_%286917430870%29.jpg/240px-Kermit_the_frog_hollywood_walk_of_fame_%286917430870%29.jpg'
    },
    {
        id: 'uid0002',
        name: 'Maria',
        email: 'maria@mail.com',
        group: 'Member'
    },
];

const DEMO_TAGS: Tag[] = [
    newTag('entry'),
    newTag('dessert'),
    newTag('tip'),
    {
        value: 'quick-easy',
        visualName: 'Quick & Easy'
    },
    {
        value: 'vegetarian',
        visualName: 'Vegetarian'
    },
    {
        value: 'main-course',
        visualName: 'Main Course'
    },
];

const DEMO_COMMENTS: Comment[] = [
    {
        id: 'cmnt0001',
        author: DEMO_USERS[0],
        body: 'Hello! This is a comment.',
        likes: 0,
        status: 'Approved',
        timeStamp: 1699995557555,
    },
];

const DEMO_POSTS: Post[] = [
    {
        id: 'aabbcc0001',
        author: DEMO_USERS[0],
        title: 'Yummy delicious recipe!',
        summary: 'Shoking subtitle that summarizes your post in a few short, punchy sentences and entices your audience to continue reading.',
        body: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, odit saepe?</p><p>Hic amet enim recusandae eligendi. In impedit, cum tempora praesentium itaque suscipit, sed placeat explicabo aspernatur veritatis assumenda facilis at molestiae blanditiis possimus incidunt hic culpa tenetur quo sint quos. Vel, doloremque? Autem aliquam non adipisci. Deserunt, nam dolorem? Eum vel neque quo voluptas? Ad nemo sequi eveniet quam, dolorem voluptatum totam fugiat autem iure officiis, deserunt quae adipisci sit eaque odio eius minus tenetur consequuntur veniam vero laboriosam esse libero? Neque aperiam earum animi quaerat non aliquid qui architecto, illo corporis hic? Et adipisci ea sed nam, enim eum cumque dolorum, eaque eligendi atque suscipit! Harum facere neque rem eligendi amet dolorum est corrupti tempora. Fugit, id. Fuga ab velit facere ad unde numquam similique debitis delectus quos illo vitae odio provident ipsa repellendus corrupti impedit sed ex quo, nulla facilis praesentium molestias esse eligendi! Debitis sequi illum reiciendis praesentium quod optio libero non? Enim perferendis accusantium tenetur hic nemo suscipit, laboriosam odio nulla alias libero quis voluptas ex quisquam eos? Accusamus repudiandae magnam temporibus inventore dolor corporis quidem rem, soluta corrupti perspiciatis facilis quae, sapiente iusto impedit neque velit quo quis? Ipsam consectetur earum omnis, reiciendis, eligendi deserunt molestiae error voluptate sequi, maxime consequatur iusto eos! Inventore est hic esse vel consequatur quas quaerat earum totam accusamus, voluptatibus iure adipisci perferendis soluta maxime, eligendi ipsam optio odio quis tempore recusandae. Minus mollitia, eligendi soluta esse similique earum iure qui tenetur maxime molestias explicabo ipsam delectus facere quos commodi dolorem ab repudiandae saepe laboriosam architecto? Ea optio aperiam, molestias quod quia vel omnis accusantium ipsum esse officia sed voluptas iusto quam tempore temporibus non illum reprehenderit tempora fuga natus excepturi minima! Mollitia laudantium ullam et similique eum pariatur soluta, repudiandae minus earum dolore tempore amet excepturi cupiditate ipsam.</p>',
        timeStamp: 1699995555555,
        featuredImage: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Essene_Bread_70pct_Rye_Sproud_30pct_Spelt_cut.JPG',
        likes: 3,
        tags: [DEMO_TAGS[3], DEMO_TAGS[1], DEMO_TAGS[4]],
        status: 'Approved',
        comments: [
            DEMO_COMMENTS[0],
        ]
    },
    {
        id: 'aabbcc0002',
        author: DEMO_USERS[1],
        title: 'Impress your guests with this "explossive" tip!',
        summary: 'Shoking subtitle that summarizes your post in a few short, punchy sentences and entices your audience to continue reading.',
        body: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, odit saepe?</p><p>Hic amet enim recusandae eligendi. In impedit, cum tempora praesentium itaque suscipit, sed placeat explicabo aspernatur veritatis assumenda facilis at molestiae blanditiis possimus incidunt hic culpa tenetur quo sint quos. Vel, doloremque? Autem aliquam non adipisci. Deserunt, nam dolorem? Eum vel neque quo voluptas? Ad nemo sequi eveniet quam, dolorem voluptatum totam fugiat autem iure officiis, deserunt quae adipisci sit eaque odio eius minus tenetur consequuntur veniam vero laboriosam esse libero? Neque aperiam earum animi quaerat non aliquid qui architecto, illo corporis hic? Et adipisci ea sed nam, enim eum cumque dolorum, eaque eligendi atque suscipit! Harum facere neque rem eligendi amet dolorum est corrupti tempora. Fugit, id. Fuga ab velit facere ad unde numquam similique debitis delectus quos illo vitae odio provident ipsa repellendus corrupti impedit sed ex quo, nulla facilis praesentium molestias esse eligendi! Debitis sequi illum reiciendis praesentium quod optio libero non? Enim perferendis accusantium tenetur hic nemo suscipit, laboriosam odio nulla alias libero quis voluptas ex quisquam eos? Accusamus repudiandae magnam temporibus inventore dolor corporis quidem rem, soluta corrupti perspiciatis facilis quae, sapiente iusto impedit neque velit quo quis? Ipsam consectetur earum omnis, reiciendis, eligendi deserunt molestiae error voluptate sequi, maxime consequatur iusto eos! Inventore est hic esse vel consequatur quas quaerat earum totam accusamus, voluptatibus iure adipisci perferendis soluta maxime, eligendi ipsam optio odio quis tempore recusandae. Minus mollitia, eligendi soluta esse similique earum iure qui tenetur maxime molestias explicabo ipsam delectus facere quos commodi dolorem ab repudiandae saepe laboriosam architecto? Ea optio aperiam, molestias quod quia vel omnis accusantium ipsum esse officia sed voluptas iusto quam tempore temporibus non illum reprehenderit tempora fuga natus excepturi minima! Mollitia laudantium ullam et similique eum pariatur soluta, repudiandae minus earum dolore tempore amet excepturi cupiditate ipsam.</p>',
        timeStamp: 1699995556555,
        featuredImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Castle_Bravo_Blast.jpg/800px-Castle_Bravo_Blast.jpg',
        likes: 0,
        tags: [DEMO_TAGS[3], DEMO_TAGS[2]],
        status: 'Approved',
        comments: []
    },
];

const LocalBlogRepository: BlogRepository = {
    getPosts: async () => { return DEMO_POSTS },
    createPost: async (post:Post, token: string) => {
        console.log('Test Token: ',token);
        const postId = 'aabbcc' + (DEMO_POSTS.length + 1).toLocaleString(
            'en-US',
            {
                minimumIntegerDigits: 4,
                useGrouping: false
            }
        );
        const newPost: Post = {
            ...post,
            id: postId,
            comments: []
        }
        return newPost;
    },
    updatePost: async (post: Post, token: string) => {
        console.log('Test Token: ',token);
        DEMO_POSTS.map(curr => {
            if(curr.id === post.id) return post
            return curr;
        });
        return post
    },
    deletePost: async (postId: string, token: string) => {
        console.log('Test Token: ',token);
        DEMO_POSTS.map(curr => {
            if(curr.id === postId) return {...curr, status:'Deleted'};
            return curr;
        });
        return;
    },
    addComment: async (postId: string, comment: Comment, token: string) => {
        console.log('Test Token: ',token);
        const post = DEMO_POSTS.find(p => p.id === postId);
        if(post) {
            const commentId = `cmnt${(DEMO_COMMENTS.length + 1).toLocaleString(
                'en-US',
                {
                    minimumIntegerDigits: 4,
                    useGrouping: false
                })
            }`;
            DEMO_COMMENTS.push({...comment, id: commentId});
            if(post.comments) {
                const myComments = [...post.comments, DEMO_COMMENTS[DEMO_COMMENTS.findIndex(c => c.id === commentId)]]
                DEMO_POSTS.map(p => {
                    if(p.id === postId) {
                        return {...post, comments: myComments}
                    }
                    return p;
                });
            }
            return {...comment, id: commentId};
        }
        throw new Error("The post referenced doesn't exist or was deleted.");
    },
    updateComment: async(comment, token) => {
        console.log('Test Token: ',token);
        const commentIndex = DEMO_COMMENTS.findIndex(c => c.id === comment.id);
        DEMO_COMMENTS[commentIndex] = {...comment};
        return DEMO_COMMENTS[commentIndex];
    },
    deleteComment: async(commentId, token) => {
        console.log('Test Token: ',token);
        DEMO_COMMENTS.map(c => {
            if(c.id === commentId) return {...c, status: 'Deleted'}
            return c;
        });
    },
};

export default LocalBlogRepository;