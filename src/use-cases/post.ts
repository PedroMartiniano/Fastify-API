
interface CreatePostData {
    title: string,
    description: string
}

export class CreatePost{
    constructor(private postRepository: any){}
    async execute({title, description}: CreatePostData){
        await this.postRepository.create({title, description})
    }
}