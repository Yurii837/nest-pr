import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class PostsService {

    constructor(
        @InjectModel(Post)
        private postRepository: typeof Post,
        private fileService: FilesService
    ){}

    async createPost(postDto: CreatePostDto, img: any) {
        const fileName = await this.fileService.createFile(img)
        const post = await this.postRepository.create({...postDto, image: fileName});
        return post;
    }
}
