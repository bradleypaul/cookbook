import { Recipe } from './recipe';

export class Format {
    nameString: string;
    ingredientString: string;
    instructionString: string;

    isValid(): boolean {
        return Boolean(this.nameString)
            && Boolean(this.ingredientString)
            && Boolean(this.instructionString);
    }

    formatFields(): Recipe {
        const recipe: Recipe = new Recipe();
        recipe.name = this.titleCase(this.nameString);
        recipe.ingredients = this.ingredientString.split('\n');
        recipe.instructions = this.instructionString.replace('\n', ' ');
        return recipe;
    }

    private titleCase(str: string) {
        if (str) {
            return str.toLowerCase().split(/ |-/)
                .map((item: string) => {
                    return item.charAt(0).toUpperCase() + item.slice(1);
                }).join(' ');
        }
    }
}
