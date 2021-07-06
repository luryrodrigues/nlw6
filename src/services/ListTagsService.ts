import { getCustomRepository } from "typeorm"
import { TagsRepository } from "../repositories/TagsRepository";


class ListTagsService {
    async execute() {
        const tagsRepository = await getCustomRepository(TagsRepository);

        let tags = await tagsRepository.find();
        tags = tags.map(tag => ({ ...tag, nameCustom: `#${tag.name}`}));

        return tags;
    }

}

export { ListTagsService }