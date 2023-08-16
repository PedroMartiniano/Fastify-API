import { Post } from "@prisma/client"

interface CreatePostRequest {
    title: string,
    description: string,
    userId: string
}

interface CreatePostResponse {
    post: Post
}

export class CreatePost {
    constructor(private postRepository: any) { }
    async execute({ title, description }: CreatePostRequest): Promise<CreatePostResponse> {
        const post = await this.postRepository.create({ title, description })
        return { post }
    }
}