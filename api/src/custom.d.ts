declare module "custom" {
    interface RecipeAttributes {
        id: string,
        name: string,
        resume: string,
        rate: number,
        healthy_level: number,
        instructions: string,
        img: string,
        created_in_db: boolean,
    }
    interface DietAttributes {
        name: string
    }
}