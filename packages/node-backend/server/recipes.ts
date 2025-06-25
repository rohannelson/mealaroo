import { publicProcedure } from "./trpc";
import { db } from "../db";
import { insertRecipesSchema, recipes, ingredients } from "../db/schema";
import { z } from "zod/v4";

export const insertRecipeWithIngredientsSchema = z.object({
  recipe: insertRecipesSchema,
  ingredients: z.array(
    z.object({ rawIngredient: z.string(), isHeading: z.boolean().optional() })
  ),
});

export const recipeCreate = publicProcedure
  .input(insertRecipeWithIngredientsSchema)
  .mutation(async (opts) => {
    const { input } = opts;
    // Create a new user in the database
    const [recipe] = await db
      .insert(recipes)
      .values({ ...input.recipe })
      .returning();
    const ingredientList = await db
      .insert(ingredients)
      .values(
        input.ingredients.map((ingredient, i) => ({
          line: i,
          rawIngredient: ingredient.rawIngredient,
          isHeading: ingredient.isHeading,
          recipeId: recipe.id,
        }))
      )
      .returning();
    return { recipe, ingredients: ingredientList };
  });
