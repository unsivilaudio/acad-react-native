class Category {
    static create(id: string, title: string, color: string) {
        return new Category(id, title, color);
    }

    private constructor(
        public id: string,
        public title: string,
        public color: string,
    ) {
        this.id = id;
        this.title = title;
        this.color = color;
    }
}

export default Category;
