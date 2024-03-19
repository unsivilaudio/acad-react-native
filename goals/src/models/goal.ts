import { genUUID } from '@/util/uuid';

class Goal {
    static create(text: string) {
        const uuid = genUUID();

        return new Goal(uuid, text);
    }

    private constructor(public id: string, public text: string) {
        this.id = id;
        this.text = text;
    }
}

export default Goal;
