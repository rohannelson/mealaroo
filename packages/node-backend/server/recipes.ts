import { publicProcedure } from "./trpc";
import { db } from "../db";
import { insertRecipesSchema, recipes, ingredients } from "../db/schema";
import { z } from "zod/v4";

export const recipeCreate = publicProcedure
  .input(
    z.object({
      recipe: insertRecipesSchema,
      ingredients: z.array(
        z.object({ text: z.string(), isHeading: z.boolean().optional() })
      ),
    })
  )
  .mutation(async (opts) => {
    const { input } = opts;
    // Create a new user in the database
    const recipe = await db
      .insert(recipes)
      .values({ ...input.recipe })
      .returning();
    const ingredientList = await db
      .insert(ingredients)
      .values(
        input.ingredients.map((ingredient, i) => ({
          line: i,
          rawIngredient: ingredient.text,
          isHeading: ingredient.isHeading,
          recipeId: recipe[0].id,
        }))
      )
      .returning();
    return { recipe, ingredientList };
  });
